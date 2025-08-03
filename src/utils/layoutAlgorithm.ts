import { Node, Edge, Graph } from '@/types/graph'

interface CollisionOptions {
  nodeRadius?: number
  minimumDistance?: number
  edgeAvoidanceMargin?: number
}

interface LayoutOptions {
  nodeWidth: number
  nodeHeight: number
  horizontalSpacing: number
  verticalSpacing: number
  compactMode?: boolean
  maxWidth?: number
  minNodeSpacing?: number
  enableCollisionAvoidance?: boolean
  collisionOptions?: CollisionOptions
  useForceDirected?: boolean
  forceStrength?: number
  layoutMode?: 'hierarchical' | 'radial' | 'force' | 'auto'
  radialOptions?: {
    centerRadius?: number
    layerSpacing?: number
  }
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

function applyRadialLayout(graph: Graph, options: { centerRadius?: number, layerSpacing?: number } = {}): Graph {
  const { centerRadius = 100, layerSpacing = 80 } = options
  const nodes = [...graph.nodes]
  const edges = graph.edges
  
  if (nodes.length === 0) return graph
  
  // Build adjacency lists to determine node levels from center
  const adjacencyList = new Map<string, string[]>()
  const inDegree = new Map<string, number>()
  
  nodes.forEach(node => {
    adjacencyList.set(node.id, [])
    inDegree.set(node.id, 0)
  })
  
  edges.forEach(edge => {
    adjacencyList.get(edge.source)?.push(edge.target)
    inDegree.set(edge.target, (inDegree.get(edge.target) || 0) + 1)
  })
  
  // Find root nodes (nodes with no incoming edges)
  const rootNodes = nodes.filter(node => inDegree.get(node.id) === 0)
  
  // If no clear hierarchy, treat all nodes as potential centers
  if (rootNodes.length === 0 || rootNodes.length > 3) {
    // Circular layout for flat structures
    nodes.forEach((node, index) => {
      const angle = (index / nodes.length) * 2 * Math.PI
      const radius = centerRadius + (Math.floor(index / 8) * layerSpacing)
      node.x = Math.cos(angle) * radius
      node.y = Math.sin(angle) * radius
    })
    return { ...graph, nodes }
  }
  
  // BFS to assign levels from root nodes
  const levels = new Map<string, number>()
  const queue: string[] = []
  
  rootNodes.forEach(node => {
    levels.set(node.id, 0)
    queue.push(node.id)
  })
  
  while (queue.length > 0) {
    const currentId = queue.shift()!
    const currentLevel = levels.get(currentId) || 0
    
    adjacencyList.get(currentId)?.forEach(targetId => {
      if (!levels.has(targetId)) {
        levels.set(targetId, currentLevel + 1)
        queue.push(targetId)
      }
    })
  }
  
  // Group nodes by level
  const nodesByLevel = new Map<number, string[]>()
  let maxLevel = 0
  
  nodes.forEach(node => {
    const level = levels.get(node.id) || 0
    maxLevel = Math.max(maxLevel, level)
    
    if (!nodesByLevel.has(level)) {
      nodesByLevel.set(level, [])
    }
    nodesByLevel.get(level)?.push(node.id)
  })
  
  // Position nodes in concentric circles
  for (let level = 0; level <= maxLevel; level++) {
    const nodesInLevel = nodesByLevel.get(level) || []
    const radius = level === 0 ? 0 : centerRadius + (level * layerSpacing)
    
    nodesInLevel.forEach((nodeId, index) => {
      const node = nodes.find(n => n.id === nodeId)
      if (!node) return
      
      if (level === 0) {
        // Center nodes
        const offset = nodesInLevel.length > 1 ? (index - (nodesInLevel.length - 1) / 2) * 30 : 0
        node.x = offset
        node.y = 0
      } else {
        // Outer ring nodes
        const angle = (index / nodesInLevel.length) * 2 * Math.PI
        node.x = Math.cos(angle) * radius
        node.y = Math.sin(angle) * radius
      }
    })
  }
  
  return { ...graph, nodes }
}

function applyForceDirectedLayout(graph: Graph, options: { forceStrength: number, iterations?: number }): Graph {
  const { forceStrength = 0.1, iterations = 100 } = options
  const nodes = [...graph.nodes]
  const edges = graph.edges
  
  // Ensure all nodes have defined coordinates
  nodes.forEach((node, index) => {
    if (node.x === undefined || node.y === undefined) {
      const angle = (index / nodes.length) * 2 * Math.PI
      const radius = 200
      node.x = Math.cos(angle) * radius
      node.y = Math.sin(angle) * radius
    }
    // Guarantee coordinates are numbers
    node.x = node.x || 0
    node.y = node.y || 0
  })

  for (let iter = 0; iter < iterations; iter++) {
    const forces = nodes.map(() => ({ x: 0, y: 0 }))

    // Repulsive forces between all nodes
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const nodeA = nodes[i]
        const nodeB = nodes[j]
        
        const dx = nodeB.x! - nodeA.x!
        const dy = nodeB.y! - nodeA.y!
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance > 0) {
          const repulsion = forceStrength * 1000 / (distance * distance)
          const fx = (dx / distance) * repulsion
          const fy = (dy / distance) * repulsion
          
          forces[i].x -= fx
          forces[i].y -= fy
          forces[j].x += fx
          forces[j].y += fy
        }
      }
    }

    // Attractive forces along edges
    edges.forEach(edge => {
      const sourceIndex = nodes.findIndex(n => n.id === edge.source)
      const targetIndex = nodes.findIndex(n => n.id === edge.target)
      
      if (sourceIndex >= 0 && targetIndex >= 0) {
        const nodeA = nodes[sourceIndex]
        const nodeB = nodes[targetIndex]
        
        const dx = nodeB.x! - nodeA.x!
        const dy = nodeB.y! - nodeA.y!
        const distance = Math.sqrt(dx * dx + dy * dy)
        
        if (distance > 0) {
          const attraction = forceStrength * distance * 0.01
          const fx = (dx / distance) * attraction
          const fy = (dy / distance) * attraction
          
          forces[sourceIndex].x += fx
          forces[sourceIndex].y += fy
          forces[targetIndex].x -= fx
          forces[targetIndex].y -= fy
        }
      }
    })

    // Apply forces with damping
    const damping = 0.9
    nodes.forEach((node, i) => {
      node.x = node.x! + forces[i].x * damping
      node.y = node.y! + forces[i].y * damping
    })
  }

  return { ...graph, nodes }
}

function applyCollisionAvoidance(graph: Graph, options: CollisionOptions): Graph {
  const { nodeRadius = 20, minimumDistance = 80 } = options
  const nodes = [...graph.nodes]
  const maxIterations = 50
  const pushForce = 0.3

  for (let iteration = 0; iteration < maxIterations; iteration++) {
    let moved = false

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const nodeA = nodes[i]
        const nodeB = nodes[j]
        
        if (!nodeA.x || !nodeA.y || !nodeB.x || !nodeB.y) continue

        const dx = nodeB.x - nodeA.x
        const dy = nodeB.y - nodeA.y
        const distance = Math.sqrt(dx * dx + dy * dy)

        if (distance < minimumDistance && distance > 0) {
          // Calculate push direction
          const pushDistance = (minimumDistance - distance) / 2
          const pushX = (dx / distance) * pushDistance * pushForce
          const pushY = (dy / distance) * pushDistance * pushForce

          // Push nodes apart
          nodeA.x -= pushX
          nodeA.y -= pushY
          nodeB.x += pushX
          nodeB.y += pushY

          moved = true
        }
      }
    }

    // Early exit if no movement occurred
    if (!moved) break
  }

  return { ...graph, nodes }
}

export function calculateNodePositions(
  graph: Graph,
  options: LayoutOptions = {
    nodeWidth: 80,
    nodeHeight: 40,
    horizontalSpacing: 150,
    verticalSpacing: 100,
    compactMode: false,
    maxWidth: 1200,
    minNodeSpacing: 60,
    enableCollisionAvoidance: false,
    useForceDirected: false,
    forceStrength: 0.1,
    layoutMode: 'auto',
  }
): Graph {
  const { nodes, edges } = graph
  const { nodeWidth, nodeHeight, horizontalSpacing, verticalSpacing, compactMode, maxWidth, minNodeSpacing, layoutMode } = options
  
  // Early layout mode selection for non-hierarchical layouts
  if (layoutMode === 'radial') {
    const radialGraph = applyRadialLayout(graph, options.radialOptions)
    return {
      nodes: radialGraph.nodes.map(node => ({
        ...node,
        x: node.x || 0,
        y: node.y || 0,
      })),
      edges: radialGraph.edges
    }
  }
  
  if (layoutMode === 'force') {
    const forceGraph = applyForceDirectedLayout(graph, {
      forceStrength: options.forceStrength || 0.1,
      iterations: Math.min(150, nodes.length * 4)
    })
    return {
      nodes: forceGraph.nodes.map(node => ({
        ...node,
        x: node.x || 0,
        y: node.y || 0,
      })),
      edges: forceGraph.edges
    }
  }
  
  // Auto mode: choose layout based on graph characteristics
  if (layoutMode === 'auto') {
    const nodeCount = nodes.length
    const edgeCount = edges.length
    const density = edgeCount / (nodeCount * (nodeCount - 1) / 2)
    
    // Use radial layout for medium-sized dense graphs (like music ecosystem)
    if (nodeCount >= 15 && nodeCount <= 50 && density > 0.1) {
      const radialGraph = applyRadialLayout(graph, {
        centerRadius: options.radialOptions?.centerRadius || 120,
        layerSpacing: options.radialOptions?.layerSpacing || 100
      })
      return {
        nodes: radialGraph.nodes.map(node => ({
          ...node,
          x: node.x || 0,
          y: node.y || 0,
        })),
        edges: radialGraph.edges
      }
    }
    
    // Use force layout for very large or very dense graphs
    if (nodeCount > 50 || density > 0.3) {
      const forceGraph = applyForceDirectedLayout(graph, {
        forceStrength: options.forceStrength || 0.1,
        iterations: Math.min(150, nodeCount * 3)
      })
      return {
        nodes: forceGraph.nodes.map(node => ({
          ...node,
          x: node.x || 0,
          y: node.y || 0,
        })),
        edges: forceGraph.edges
      }
    }
  }
  
  // Continue with hierarchical layout for other cases
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
    
    let spacing: number
    if (compactMode) {
      // Compact mode: prioritize density over spreading
      const minSpacing = minNodeSpacing || 60
      const maxLevelWidth = maxWidth || 1200
      const availableWidth = maxLevelWidth - (nodeWidth * nodesInLevel.length)
      const maxSpacing = nodesInLevel.length > 1 ? availableWidth / (nodesInLevel.length - 1) : minSpacing
      spacing = Math.max(minSpacing, Math.min(horizontalSpacing * 0.7, maxSpacing))
    } else {
      // Improved spacing logic for better node distribution
      const totalSubtreeWidth = levelNodeInfos.reduce((sum, info) => sum + info.subtreeWidth, 0)
      const baseSpacing = horizontalSpacing
      
      // Calculate density factor: more nodes = more spacing needed
      const densityFactor = Math.max(1, nodesInLevel.length / 4)
      
      // For dense graphs, increase spacing significantly
      const dynamicSpacing = baseSpacing * Math.min(densityFactor * 1.5, 3)
      
      // Ensure minimum spacing based on node count
      const minSpacingForLevel = Math.max(baseSpacing, nodeWidth + 40)
      
      spacing = Math.max(minSpacingForLevel, dynamicSpacing)
    }
    
    let currentX = -(nodesInLevel.length - 1) * spacing / 2
    
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
          const maxOffset = spacing / 3
          if (Math.abs(offset) < maxOffset) {
            currentX += offset * (compactMode ? 0.2 : 0.3)
          }
        }
      }
      
      nodePositions.set(nodeId, {
        x: currentX,
        y: level * verticalSpacing + nodeHeight / 2,
      })
      
      currentX += spacing
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

  let finalGraph = {
    nodes: positionedNodes,
    edges: edges,
  }

  // Apply force-directed layout if requested or for very dense graphs
  if (options.useForceDirected || (nodes.length > 20 && !compactMode)) {
    const forceLayoutResult = applyForceDirectedLayout(finalGraph, {
      forceStrength: options.forceStrength || 0.1,
      iterations: Math.min(100, nodes.length * 3)
    })
    // Ensure all nodes have defined coordinates after force layout
    finalGraph = {
      nodes: forceLayoutResult.nodes.map(node => ({
        ...node,
        x: node.x || 0,
        y: node.y || 0,
      })),
      edges: forceLayoutResult.edges
    }
  }

  // Adjust aspect ratio to make width and height roughly equal
  if (positionedNodes.length > 0) {
    // Calculate current bounds
    let minX = Infinity, maxX = -Infinity
    let minY = Infinity, maxY = -Infinity
    
    positionedNodes.forEach(node => {
      const x = node.x || 0
      const y = node.y || 0
      minX = Math.min(minX, x)
      maxX = Math.max(maxX, x)
      minY = Math.min(minY, y)
      maxY = Math.max(maxY, y)
    })
    
    const currentWidth = maxX - minX
    const currentHeight = maxY - minY
    
    // Only adjust if there's a significant difference
    if (currentWidth > 0 && currentHeight > 0) {
      const aspectRatio = currentWidth / currentHeight
      
      // If width is much larger than height, compress horizontally
      // If height is much larger than width, compress vertically
      let scaleX = 1
      let scaleY = 1
      
      if (aspectRatio > 1.5) {
        // Width too large - compress horizontally
        scaleX = 1.5 / aspectRatio
      } else if (aspectRatio < 0.67) {
        // Height too large - compress vertically
        scaleY = aspectRatio / 0.67
      }
      
      // Apply scaling if needed
      if (scaleX !== 1 || scaleY !== 1) {
        const centerX = (minX + maxX) / 2
        const centerY = (minY + maxY) / 2
        
        finalGraph.nodes = positionedNodes.map(node => ({
          ...node,
          x: centerX + ((node.x || 0) - centerX) * scaleX,
          y: centerY + ((node.y || 0) - centerY) * scaleY,
        }))
      }
    }
  }

  // Apply collision avoidance to prevent node overlaps
  if (options.enableCollisionAvoidance || finalGraph.nodes.length > 15) {
    const collisionResult = applyCollisionAvoidance(finalGraph, {
      nodeRadius: Math.max(nodeWidth, nodeHeight) / 2,
      minimumDistance: options.collisionOptions?.minimumDistance || Math.max(nodeWidth, nodeHeight) + 20,
      edgeAvoidanceMargin: options.collisionOptions?.edgeAvoidanceMargin || 10
    })
    // Ensure all nodes have defined coordinates after collision avoidance
    finalGraph = {
      nodes: collisionResult.nodes.map(node => ({
        ...node,
        x: node.x || 0,
        y: node.y || 0,
      })),
      edges: collisionResult.edges
    }
  }

  return finalGraph
}
