import { Node, Edge, Graph } from '@/types/graph'

interface LayoutOptions {
  nodeWidth: number
  nodeHeight: number
  horizontalSpacing: number
  verticalSpacing: number
}

interface NodeInfo {
  id: string
  level: number
  children: string[]
  parents: string[]
  subtreeWidth: number
}

function detectTriangularPattern(graph: Graph): { isTriangular: boolean; nodes?: { A: string; B: string; C: string } } {
  const { nodes, edges } = graph
  
  // Check if we have exactly 3 nodes and 3 edges (A→B, B→C, A→C pattern)
  if (nodes.length !== 3 || edges.length !== 3) {
    return { isTriangular: false }
  }
  
  // Build adjacency map
  const adjacency = new Map<string, Set<string>>()
  nodes.forEach(node => adjacency.set(node.id, new Set()))
  
  edges.forEach(edge => {
    adjacency.get(edge.source)?.add(edge.target)
  })
  
  // Look for A→B, B→C, A→C pattern
  // Find node with 2 outgoing edges (A)
  // Find node with 1 incoming and 1 outgoing (B) 
  // Find node with 2 incoming edges (C)
  
  let nodeA: string | undefined
  let nodeB: string | undefined  
  let nodeC: string | undefined
  
  nodes.forEach(node => {
    const outDegree = adjacency.get(node.id)?.size || 0
    let inDegree = 0
    
    // Count incoming edges
    edges.forEach(edge => {
      if (edge.target === node.id) inDegree++
    })
    
    if (outDegree === 2 && inDegree === 0) {
      nodeA = node.id  // A has 2 out, 0 in
    } else if (outDegree === 1 && inDegree === 1) {
      nodeB = node.id  // B has 1 out, 1 in
    } else if (outDegree === 0 && inDegree === 2) {
      nodeC = node.id  // C has 0 out, 2 in
    }
  })
  
  // Verify the pattern: A→B, B→C, A→C
  if (nodeA && nodeB && nodeC) {
    const ATargets = Array.from(adjacency.get(nodeA) || [])
    const BTargets = Array.from(adjacency.get(nodeB) || [])
    
    if (ATargets.includes(nodeB) && ATargets.includes(nodeC) && BTargets.includes(nodeC)) {
      return {
        isTriangular: true,
        nodes: { A: nodeA, B: nodeB, C: nodeC }
      }
    }
  }
  
  return { isTriangular: false }
}

export function calculateNodePositions(
  graph: Graph,
  options: LayoutOptions = {
    nodeWidth: 80,
    nodeHeight: 40,
    horizontalSpacing: 150,
    verticalSpacing: 100,
  }
): Graph {
  const { nodes, edges } = graph
  const { nodeWidth, nodeHeight, horizontalSpacing, verticalSpacing } = options
  
  // Check for triangular pattern
  const triangularPattern = detectTriangularPattern(graph)
  
  if (triangularPattern.isTriangular && triangularPattern.nodes) {
    // Special layout for A→B, B→C, A→C triangular pattern
    const { A, B, C } = triangularPattern.nodes
    
    // Create triangle layout: A(top-left), B(top-right), C(bottom-center)
    const triangleWidth = horizontalSpacing * 2
    const triangleHeight = verticalSpacing * 1.2
    
    const positionedNodes = nodes.map(node => {
      if (node.id === A) {
        return { ...node, x: -triangleWidth / 2, y: 0 }  // A: top-left
      } else if (node.id === B) {
        return { ...node, x: triangleWidth / 2, y: 0 }   // B: top-right
      } else if (node.id === C) {
        return { ...node, x: 0, y: triangleHeight }      // C: bottom-center
      }
      return node
    })
    
    return { nodes: positionedNodes, edges }
  }

  const adjacencyList = new Map<string, string[]>()
  const reverseAdjacencyList = new Map<string, string[]>()
  const inDegree = new Map<string, number>()
  
  nodes.forEach(node => {
    adjacencyList.set(node.id, [])
    reverseAdjacencyList.set(node.id, [])
    inDegree.set(node.id, 0)
  })

  edges.forEach(edge => {
    adjacencyList.get(edge.source)?.push(edge.target)
    reverseAdjacencyList.get(edge.target)?.push(edge.source)
    inDegree.set(edge.target, (inDegree.get(edge.target) || 0) + 1)
  })

  const levels = new Map<string, number>()
  const queue: string[] = []

  nodes.forEach(node => {
    if (inDegree.get(node.id) === 0) {
      queue.push(node.id)
      levels.set(node.id, 0)
    }
  })

  while (queue.length > 0) {
    const currentId = queue.shift()!
    const currentLevel = levels.get(currentId) || 0

    adjacencyList.get(currentId)?.forEach(targetId => {
      const newInDegree = (inDegree.get(targetId) || 0) - 1
      inDegree.set(targetId, newInDegree)

      if (newInDegree === 0) {
        queue.push(targetId)
        levels.set(targetId, currentLevel + 1)
      }
    })
  }

  const nodeInfoMap = new Map<string, NodeInfo>()
  nodes.forEach(node => {
    nodeInfoMap.set(node.id, {
      id: node.id,
      level: levels.get(node.id) || 0,
      children: adjacencyList.get(node.id) || [],
      parents: reverseAdjacencyList.get(node.id) || [],
      subtreeWidth: 0,
    })
  })

  const calculateSubtreeWidth = (nodeId: string, visited: Set<string> = new Set()): number => {
    if (visited.has(nodeId)) return 0
    visited.add(nodeId)
    
    const nodeInfo = nodeInfoMap.get(nodeId)
    if (!nodeInfo) return 0
    
    const children = nodeInfo.children
    if (children.length === 0) {
      nodeInfo.subtreeWidth = 1
      return 1
    }
    
    let totalWidth = 0
    children.forEach(childId => {
      totalWidth += calculateSubtreeWidth(childId, visited)
    })
    
    nodeInfo.subtreeWidth = Math.max(1, totalWidth)
    return nodeInfo.subtreeWidth
  }

  nodes.forEach(node => {
    if (inDegree.get(node.id) === 0) {
      calculateSubtreeWidth(node.id)
    }
  })

  const nodesPerLevel = new Map<number, string[]>()
  let maxLevel = 0

  nodes.forEach(node => {
    const level = levels.get(node.id) ?? 0
    maxLevel = Math.max(maxLevel, level)
    
    if (!nodesPerLevel.has(level)) {
      nodesPerLevel.set(level, [])
    }
    nodesPerLevel.get(level)?.push(node.id)
  })

  for (let level = 0; level <= maxLevel; level++) {
    const nodesInLevel = nodesPerLevel.get(level) || []
    nodesInLevel.sort((a, b) => {
      const aInfo = nodeInfoMap.get(a)
      const bInfo = nodeInfoMap.get(b)
      return (bInfo?.subtreeWidth || 0) - (aInfo?.subtreeWidth || 0)
    })
    nodesPerLevel.set(level, nodesInLevel)
  }

  const nodePositions = new Map<string, { x: number; y: number }>()

  for (let level = 0; level <= maxLevel; level++) {
    const nodesInLevel = nodesPerLevel.get(level) || []
    const levelNodeInfos = nodesInLevel.map(id => nodeInfoMap.get(id)!).filter(Boolean)
    
    const totalSubtreeWidth = levelNodeInfos.reduce((sum, info) => sum + info.subtreeWidth, 0)
    const dynamicSpacing = Math.max(horizontalSpacing, horizontalSpacing * (totalSubtreeWidth / nodesInLevel.length))
    
    let currentX = -(nodesInLevel.length - 1) * dynamicSpacing / 2
    
    nodesInLevel.forEach((nodeId, index) => {
      const nodeInfo = nodeInfoMap.get(nodeId)
      if (!nodeInfo) return
      
      if (nodeInfo.parents.length > 0 && level > 0) {
        let parentXSum = 0
        let parentCount = 0
        nodeInfo.parents.forEach(parentId => {
          const parentPos = nodePositions.get(parentId)
          if (parentPos) {
            parentXSum += parentPos.x
            parentCount++
          }
        })
        
        if (parentCount > 0) {
          const targetX = parentXSum / parentCount
          const offset = targetX - currentX
          if (Math.abs(offset) < dynamicSpacing / 2) {
            currentX += offset * 0.5
          }
        }
      }
      
      nodePositions.set(nodeId, {
        x: currentX,
        y: level * verticalSpacing + nodeHeight / 2,
      })
      
      currentX += dynamicSpacing
    })
  }

  const positionedNodes = nodes.map(node => {
    const position = nodePositions.get(node.id) || { x: 0, y: 0 }
    return {
      ...node,
      x: position.x,
      y: position.y,
    }
  })

  return {
    nodes: positionedNodes,
    edges: edges,
  }
}