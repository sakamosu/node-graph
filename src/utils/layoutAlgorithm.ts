import { Node, Edge, Graph } from '@/types/graph'

interface CollisionOptions {
  readonly nodeRadius?: number
  readonly minimumDistance?: number
  readonly edgeAvoidanceMargin?: number
}

interface LayoutOptions {
  readonly nodeWidth: number
  readonly nodeHeight: number
  readonly horizontalSpacing: number
  readonly verticalSpacing: number
  readonly compactMode?: boolean
  readonly maxWidth?: number
  readonly minNodeSpacing?: number
  readonly enableCollisionAvoidance?: boolean
  readonly collisionOptions?: CollisionOptions
  readonly useForceDirected?: boolean
  readonly forceStrength?: number
  readonly layoutMode?: 'hierarchical' | 'radial' | 'force' | 'auto'
  readonly radialOptions?: {
    readonly centerRadius?: number
    readonly layerSpacing?: number
  }
}

interface NodeInfo {
  readonly id: string
  readonly level: number
  readonly children: ReadonlyArray<string>
  readonly parents: ReadonlyArray<string>
  readonly subtreeWidth: number
}

interface Vector2D {
  readonly x: number
  readonly y: number
}

interface ForceVector {
  readonly x: number
  readonly y: number
}

interface TriangularPattern {
  readonly isTriangular: boolean
  readonly nodes?: {
    readonly A: string
    readonly B: string
    readonly C: string
  }
}

interface StarPattern {
  readonly isStar: boolean
  readonly centerNode?: string
  readonly peripheralNodes?: ReadonlyArray<string>
}

const createVector = (x: number, y: number): Vector2D => ({ x, y })

const addVectors = (a: Vector2D, b: Vector2D): Vector2D => ({
  x: a.x + b.x,
  y: a.y + b.y
})

const subtractVectors = (a: Vector2D, b: Vector2D): Vector2D => ({
  x: a.x - b.x,
  y: a.y - b.y
})

const scaleVector = (v: Vector2D, scale: number): Vector2D => ({
  x: v.x * scale,
  y: v.y * scale
})

const vectorLength = (v: Vector2D): number => 
  Math.sqrt(v.x * v.x + v.y * v.y)

const normalizeVector = (v: Vector2D): Vector2D => {
  const length = vectorLength(v)
  return length > 0 ? scaleVector(v, 1 / length) : createVector(0, 0)
}

const detectTriangularPattern = (graph: Readonly<Graph>): TriangularPattern => {
  const { nodes, edges } = graph
  
  if (nodes.length !== 3 || edges.length !== 3) {
    return { isTriangular: false }
  }
  
  const adjacency = nodes.reduce((map, node) => 
    map.set(node.id, new Set<string>()), new Map<string, Set<string>>())
  
  edges.forEach(edge => adjacency.get(edge.source)?.add(edge.target))
  
  const nodesByDegree = nodes.map(node => {
    const outDegree = adjacency.get(node.id)?.size || 0
    const inDegree = edges.filter(edge => edge.target === node.id).length
    return { id: node.id, outDegree, inDegree }
  })
  
  const nodeA = nodesByDegree.find(n => n.outDegree === 2 && n.inDegree === 0)?.id
  const nodeB = nodesByDegree.find(n => n.outDegree === 1 && n.inDegree === 1)?.id
  const nodeC = nodesByDegree.find(n => n.outDegree === 0 && n.inDegree === 2)?.id
  
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

const detectStarPattern = (graph: Readonly<Graph>): StarPattern => {
  const { nodes, edges } = graph
  
  if (nodes.length < 3) {
    return { isStar: false }
  }
  
  // 各ノードの次数を計算
  const nodeConnections = new Map<string, Set<string>>()
  nodes.forEach(node => nodeConnections.set(node.id, new Set()))
  
  edges.forEach(edge => {
    nodeConnections.get(edge.source)?.add(edge.target)
    nodeConnections.get(edge.target)?.add(edge.source)
  })
  
  // 中心ノードの候補を探す（高い次数を持つノード）
  const nodeDegrees = Array.from(nodeConnections.entries()).map(([nodeId, connections]) => ({
    nodeId,
    degree: connections.size
  }))
  
  // 次数でソート
  nodeDegrees.sort((a, b) => b.degree - a.degree)
  
  const potentialCenter = nodeDegrees[0]
  
  // 星型パターンの条件チェック
  if (potentialCenter.degree >= nodes.length / 2) {
    const centerConnections = nodeConnections.get(potentialCenter.nodeId)
    if (!centerConnections) return { isStar: false }
    
    // 周辺ノードがすべて中心ノードとのみ接続されているかチェック
    const peripheralNodes = Array.from(centerConnections)
    const isValidStar = peripheralNodes.every(nodeId => {
      const connections = nodeConnections.get(nodeId)
      return connections && connections.size === 1 && connections.has(potentialCenter.nodeId)
    })
    
    if (isValidStar) {
      return {
        isStar: true,
        centerNode: potentialCenter.nodeId,
        peripheralNodes
      }
    }
  }
  
  return { isStar: false }
}

const positionStarPattern = (
  nodes: ReadonlyArray<Node>,
  pattern: StarPattern,
  spacing: { horizontal: number; vertical: number }
): ReadonlyArray<Node> => {
  if (!pattern.centerNode || !pattern.peripheralNodes) return nodes
  
  const { centerNode, peripheralNodes } = pattern
  const { horizontal } = spacing
  
  // 周辺ノード数に基づいて半径を調整
  const nodeCount = peripheralNodes.length
  const baseRadius = Math.max(horizontal * 1.2, nodeCount * 30)
  
  return nodes.map(node => {
    if (node.id === centerNode) {
      // 中心ノードは原点に配置
      return { ...node, x: 0, y: 0 }
    } else if (peripheralNodes.includes(node.id)) {
      // 周辺ノードを円周上に配置
      const index = peripheralNodes.indexOf(node.id)
      const angle = (index / nodeCount) * 2 * Math.PI
      
      return {
        ...node,
        x: Math.cos(angle) * baseRadius,
        y: Math.sin(angle) * baseRadius
      }
    }
    
    return node
  })
}

const buildAdjacencyLists = (nodes: ReadonlyArray<Node>, edges: ReadonlyArray<Edge>) => {
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
  
  return { adjacencyList, reverseAdjacencyList, inDegree }
}

const assignNodeLevels = (
  nodes: ReadonlyArray<Node>,
  adjacencyList: Map<string, string[]>,
  inDegree: Map<string, number>
): Map<string, number> => {
  const levels = new Map<string, number>()
  const queue = nodes
    .filter(node => inDegree.get(node.id) === 0)
    .map(node => ({ id: node.id, level: 0 }))
  
  queue.forEach(({ id, level }) => levels.set(id, level))
  
  const processQueue = [...queue]
  while (processQueue.length > 0) {
    const current = processQueue.shift()!
    const children = adjacencyList.get(current.id) || []
    
    children.forEach(childId => {
      const newInDegree = (inDegree.get(childId) || 0) - 1
      inDegree.set(childId, newInDegree)
      
      if (newInDegree === 0 && !levels.has(childId)) {
        levels.set(childId, current.level + 1)
        processQueue.push({ id: childId, level: current.level + 1 })
      }
    })
  }
  
  return levels
}

const calculateSubtreeWidths = (
  nodes: ReadonlyArray<Node>,
  adjacencyList: Map<string, string[]>
): Map<string, number> => {
  const widths = new Map<string, number>()
  const visited = new Set<string>()
  
  const calculateWidth = (nodeId: string): number => {
    if (visited.has(nodeId)) return widths.get(nodeId) || 0
    visited.add(nodeId)
    
    const children = adjacencyList.get(nodeId) || []
    if (children.length === 0) {
      widths.set(nodeId, 1)
      return 1
    }
    
    const totalWidth = children.reduce((sum, childId) => 
      sum + calculateWidth(childId), 0)
    
    widths.set(nodeId, Math.max(1, totalWidth))
    return widths.get(nodeId)!
  }
  
  nodes.forEach(node => {
    if (!visited.has(node.id)) {
      calculateWidth(node.id)
    }
  })
  
  return widths
}

const positionNodesRadially = (
  nodes: ReadonlyArray<Node>,
  edges: ReadonlyArray<Edge>,
  options: { centerRadius: number; layerSpacing: number }
): ReadonlyArray<Node> => {
  const { centerRadius, layerSpacing } = options
  
  if (nodes.length === 0) return nodes
  
  const { adjacencyList, inDegree } = buildAdjacencyLists(nodes, edges)
  const rootNodes = nodes.filter(node => inDegree.get(node.id) === 0)
  
  if (rootNodes.length === 0 || rootNodes.length > 3) {
    return nodes.map((node, index) => {
      const angle = (index / nodes.length) * 2 * Math.PI
      const radius = centerRadius + Math.floor(index / 8) * layerSpacing
      return {
        ...node,
        x: Math.cos(angle) * radius,
        y: Math.sin(angle) * radius
      }
    })
  }
  
  const levels = assignNodeLevels(nodes, adjacencyList, inDegree)
  
  const nodesByLevel = Array.from(levels.entries()).reduce((acc, [nodeId, level]) => {
    if (!acc.has(level)) acc.set(level, [])
    acc.get(level)!.push(nodeId)
    return acc
  }, new Map<number, string[]>())
  
  const positionedNodes = new Map<string, Node>()
  
  Array.from(nodesByLevel.entries()).forEach(([level, nodeIds]) => {
    if (level === 0) {
      // 中心ノード
      nodeIds.forEach((nodeId, index) => {
        const node = nodes.find(n => n.id === nodeId)
        if (!node) return
        const offset = nodeIds.length > 1 ? (index - (nodeIds.length - 1) / 2) * 40 : 0
        positionedNodes.set(nodeId, { ...node, x: offset, y: 0 })
      })
    } else {
      // 周辺ノード - 十分な間隔を確保
      const nodesCount = nodeIds.length
      const minRadius = Math.max(centerRadius + level * layerSpacing, nodesCount * 25)
      
      nodeIds.forEach((nodeId, index) => {
        const node = nodes.find(n => n.id === nodeId)
        if (!node) return
        
        // 角度に少しのオフセットを加えて重複を防ぐ
        const angleOffset = Math.PI / (nodesCount * 2)
        const angle = (index / nodesCount) * 2 * Math.PI + angleOffset
        
        positionedNodes.set(nodeId, {
          ...node,
          x: Math.cos(angle) * minRadius,
          y: Math.sin(angle) * minRadius
        })
      })
    }
  })
  
  return nodes.map(node => positionedNodes.get(node.id) || node)
}

const calculateRepulsiveForce = (
  nodeA: Vector2D,
  nodeB: Vector2D,
  strength: number
): ForceVector => {
  const delta = subtractVectors(nodeB, nodeA)
  const distance = vectorLength(delta)
  
  if (distance === 0) return createVector(0, 0)
  
  const repulsion = strength * 1000 / (distance * distance)
  return scaleVector(normalizeVector(delta), repulsion)
}

const calculateAttractiveForce = (
  nodeA: Vector2D,
  nodeB: Vector2D,
  strength: number
): ForceVector => {
  const delta = subtractVectors(nodeB, nodeA)
  const distance = vectorLength(delta)
  
  if (distance === 0) return createVector(0, 0)
  
  const attraction = strength * distance * 0.01
  return scaleVector(normalizeVector(delta), attraction)
}

const applyForceDirectedIteration = (
  nodes: ReadonlyArray<Node>,
  edges: ReadonlyArray<Edge>,
  forceStrength: number
): ReadonlyArray<Node> => {
  const nodeMap = new Map(nodes.map(node => [node.id, node]))
  const forces = new Map<string, ForceVector>()
  
  nodes.forEach(node => forces.set(node.id, createVector(0, 0)))
  
  nodes.forEach((nodeA, i) => {
    nodes.slice(i + 1).forEach(nodeB => {
      const posA = createVector(nodeA.x || 0, nodeA.y || 0)
      const posB = createVector(nodeB.x || 0, nodeB.y || 0)
      
      const force = calculateRepulsiveForce(posA, posB, forceStrength)
      
      forces.set(nodeA.id, subtractVectors(forces.get(nodeA.id)!, force))
      forces.set(nodeB.id, addVectors(forces.get(nodeB.id)!, force))
    })
  })
  
  edges.forEach(edge => {
    const nodeA = nodeMap.get(edge.source)
    const nodeB = nodeMap.get(edge.target)
    
    if (nodeA && nodeB) {
      const posA = createVector(nodeA.x || 0, nodeA.y || 0)
      const posB = createVector(nodeB.x || 0, nodeB.y || 0)
      
      const force = calculateAttractiveForce(posA, posB, forceStrength)
      
      forces.set(nodeA.id, addVectors(forces.get(nodeA.id)!, force))
      forces.set(nodeB.id, subtractVectors(forces.get(nodeB.id)!, force))
    }
  })
  
  const damping = 0.9
  return nodes.map(node => {
    const force = forces.get(node.id) || createVector(0, 0)
    const dampedForce = scaleVector(force, damping)
    
    return {
      ...node,
      x: (node.x || 0) + dampedForce.x,
      y: (node.y || 0) + dampedForce.y
    }
  })
}

const applyForceDirectedLayout = (
  graph: Readonly<Graph>,
  options: { forceStrength: number; iterations: number }
): Graph => {
  const { forceStrength, iterations } = options
  
  const initialNodes = graph.nodes.map((node, index) => {
    if (node.x !== undefined && node.y !== undefined) {
      return node
    }
    const angle = (index / graph.nodes.length) * 2 * Math.PI
    const radius = 200
    return {
      ...node,
      x: Math.cos(angle) * radius,
      y: Math.sin(angle) * radius
    }
  })
  
  const finalNodes = Array.from({ length: iterations }).reduce(
    (nodes: ReadonlyArray<Node>) => 
      applyForceDirectedIteration(nodes, graph.edges, forceStrength),
    initialNodes
  )
  
  return { ...graph, nodes: [...finalNodes] }
}

const resolveNodeCollisions = (
  nodes: ReadonlyArray<Node>,
  options: { minimumDistance: number; pushForce: number }
): ReadonlyArray<Node> => {
  const { minimumDistance, pushForce } = options
  
  const adjustedNodes = [...nodes]
  let hasCollisions = true
  let iterations = 0
  const maxIterations = 50
  
  while (hasCollisions && iterations < maxIterations) {
    hasCollisions = false
    
    for (let i = 0; i < adjustedNodes.length; i++) {
      for (let j = i + 1; j < adjustedNodes.length; j++) {
        const nodeA = adjustedNodes[i]
        const nodeB = adjustedNodes[j]
        
        if (!nodeA.x || !nodeA.y || !nodeB.x || !nodeB.y) continue
        
        const delta = subtractVectors(
          createVector(nodeB.x, nodeB.y),
          createVector(nodeA.x, nodeA.y)
        )
        const distance = vectorLength(delta)
        
        if (distance < minimumDistance && distance > 0) {
          const pushDistance = (minimumDistance - distance) / 2
          const pushVector = scaleVector(normalizeVector(delta), pushDistance * pushForce)
          
          adjustedNodes[i] = {
            ...nodeA,
            x: nodeA.x - pushVector.x,
            y: nodeA.y - pushVector.y
          }
          
          adjustedNodes[j] = {
            ...nodeB,
            x: nodeB.x + pushVector.x,
            y: nodeB.y + pushVector.y
          }
          
          hasCollisions = true
        }
      }
    }
    
    iterations++
  }
  
  return adjustedNodes
}

const positionTriangularPattern = (
  nodes: ReadonlyArray<Node>,
  pattern: TriangularPattern,
  spacing: { horizontal: number; vertical: number }
): ReadonlyArray<Node> => {
  if (!pattern.nodes) return nodes
  
  const { A, B, C } = pattern.nodes
  const triangleWidth = spacing.horizontal * 2
  const triangleHeight = spacing.vertical * 1.2
  
  return nodes.map(node => {
    switch (node.id) {
      case A:
        return { ...node, x: -triangleWidth / 2, y: 0 }
      case B:
        return { ...node, x: triangleWidth / 2, y: 0 }
      case C:
        return { ...node, x: 0, y: triangleHeight }
      default:
        return node
    }
  })
}

const groupNodesByLevel = (
  nodes: ReadonlyArray<Node>,
  levels: Map<string, number>
): Map<number, string[]> => {
  return nodes.reduce((acc, node) => {
    const level = levels.get(node.id) ?? 0
    if (!acc.has(level)) acc.set(level, [])
    acc.get(level)!.push(node.id)
    return acc
  }, new Map<number, string[]>())
}

const calculateLevelSpacing = (
  nodesInLevel: number,
  options: {
    nodeWidth: number
    horizontalSpacing: number
    compactMode: boolean
    maxWidth?: number
    minNodeSpacing?: number
  }
): number => {
  const { nodeWidth, horizontalSpacing, compactMode, maxWidth, minNodeSpacing } = options
  
  if (compactMode) {
    const minSpacing = minNodeSpacing || 60
    const maxLevelWidth = maxWidth || 1200
    const availableWidth = maxLevelWidth - (nodeWidth * nodesInLevel)
    const maxSpacing = nodesInLevel > 1 
      ? availableWidth / (nodesInLevel - 1) 
      : minSpacing
    return Math.max(minSpacing, Math.min(horizontalSpacing * 0.7, maxSpacing))
  }
  
  const densityFactor = Math.max(1, nodesInLevel / 4)
  const dynamicSpacing = horizontalSpacing * Math.min(densityFactor * 1.5, 3)
  const minSpacingForLevel = Math.max(horizontalSpacing, nodeWidth + 40)
  
  return Math.max(minSpacingForLevel, dynamicSpacing)
}

const positionNodesInLevel = (
  nodeIds: ReadonlyArray<string>,
  level: number,
  spacing: number,
  verticalSpacing: number,
  nodeHeight: number,
  parentPositions: Map<string, Vector2D>,
  nodeInfoMap: Map<string, NodeInfo>,
  compactMode: boolean
): Map<string, Vector2D> => {
  const positions = new Map<string, Vector2D>()
  let currentX = -(nodeIds.length - 1) * spacing / 2
  
  nodeIds.forEach(nodeId => {
    const nodeInfo = nodeInfoMap.get(nodeId)
    if (!nodeInfo) return
    
    let x = currentX
    
    if (nodeInfo.parents.length > 0 && level > 0) {
      const parentPositions$ = nodeInfo.parents
        .map(parentId => parentPositions.get(parentId))
        .filter((pos): pos is Vector2D => pos !== undefined)
      
      if (parentPositions$.length > 0) {
        const avgParentX = parentPositions$.reduce((sum, pos) => sum + pos.x, 0) / parentPositions$.length
        const offset = avgParentX - x
        const maxOffset = spacing / 3
        
        if (Math.abs(offset) < maxOffset) {
          x += offset * (compactMode ? 0.2 : 0.3)
        }
      }
    }
    
    positions.set(nodeId, createVector(x, level * verticalSpacing + nodeHeight / 2))
    currentX += spacing
  })
  
  return positions
}

const applyHierarchicalLayout = (
  graph: Readonly<Graph>,
  options: LayoutOptions
): ReadonlyArray<Node> => {
  const { nodes, edges } = graph
  const { nodeWidth, nodeHeight, horizontalSpacing, verticalSpacing, compactMode } = options
  
  // 2ノードの場合の特別処理 - 必ず水平に配置
  if (nodes.length === 2) {
    if (edges.length === 1) {
      // 単一エッジの場合：ソース → ターゲットの順で配置
      const edge = edges[0]
      const sourceNode = nodes.find(n => n.id === edge.source)
      const targetNode = nodes.find(n => n.id === edge.target)
      
      if (sourceNode && targetNode) {
        return [
          { ...sourceNode, x: -horizontalSpacing / 2, y: 0 },
          { ...targetNode, x: horizontalSpacing / 2, y: 0 }
        ]
      }
    }
    
    // エッジがない場合：左右に配置
    return [
      { ...nodes[0], x: -horizontalSpacing / 2, y: 0 },
      { ...nodes[1], x: horizontalSpacing / 2, y: 0 }
    ]
  }
  
  // 星型パターンの検出と特別処理
  const starPattern = detectStarPattern(graph)
  if (starPattern.isStar) {
    return positionStarPattern(nodes, starPattern, {
      horizontal: horizontalSpacing,
      vertical: verticalSpacing
    })
  }
  
  const triangularPattern = detectTriangularPattern(graph)
  if (triangularPattern.isTriangular) {
    return positionTriangularPattern(nodes, triangularPattern, {
      horizontal: horizontalSpacing,
      vertical: verticalSpacing
    })
  }
  
  const { adjacencyList, reverseAdjacencyList, inDegree } = buildAdjacencyLists(nodes, edges)
  const levels = assignNodeLevels(nodes, adjacencyList, inDegree)
  const subtreeWidths = calculateSubtreeWidths(nodes, adjacencyList)
  
  const nodeInfoMap = new Map<string, NodeInfo>(
    nodes.map(node => [
      node.id,
      {
        id: node.id,
        level: levels.get(node.id) || 0,
        children: adjacencyList.get(node.id) || [],
        parents: reverseAdjacencyList.get(node.id) || [],
        subtreeWidth: subtreeWidths.get(node.id) || 1
      }
    ])
  )
  
  const nodesByLevel = groupNodesByLevel(nodes, levels)
  const maxLevel = Math.max(...Array.from(nodesByLevel.keys()))
  
  const sortedNodesByLevel = new Map<number, string[]>()
  Array.from(nodesByLevel.entries()).forEach(([level, nodeIds]) => {
    const sorted = [...nodeIds].sort((a, b) => {
      const aWidth = nodeInfoMap.get(a)?.subtreeWidth || 0
      const bWidth = nodeInfoMap.get(b)?.subtreeWidth || 0
      return bWidth - aWidth
    })
    sortedNodesByLevel.set(level, sorted)
  })
  
  const allPositions = new Map<string, Vector2D>()
  
  for (let level = 0; level <= maxLevel; level++) {
    const nodeIds = sortedNodesByLevel.get(level) || []
    const spacing = calculateLevelSpacing(nodeIds.length, {
      nodeWidth,
      horizontalSpacing,
      compactMode: compactMode || false,
      maxWidth: options.maxWidth,
      minNodeSpacing: options.minNodeSpacing
    })
    
    const levelPositions = positionNodesInLevel(
      nodeIds,
      level,
      spacing,
      verticalSpacing,
      nodeHeight,
      allPositions,
      nodeInfoMap,
      compactMode || false
    )
    
    levelPositions.forEach((pos, id) => allPositions.set(id, pos))
  }
  
  return nodes.map(node => {
    const pos = allPositions.get(node.id) || createVector(0, 0)
    return { ...node, x: pos.x, y: pos.y }
  })
}

const normalizeAspectRatio = (nodes: ReadonlyArray<Node>): ReadonlyArray<Node> => {
  if (nodes.length === 0) return nodes
  
  const bounds = nodes.reduce(
    (acc, node) => ({
      minX: Math.min(acc.minX, node.x || 0),
      maxX: Math.max(acc.maxX, node.x || 0),
      minY: Math.min(acc.minY, node.y || 0),
      maxY: Math.max(acc.maxY, node.y || 0)
    }),
    { minX: Infinity, maxX: -Infinity, minY: Infinity, maxY: -Infinity }
  )
  
  const width = bounds.maxX - bounds.minX
  const height = bounds.maxY - bounds.minY
  
  if (width === 0 || height === 0) return nodes
  
  const aspectRatio = width / height
  let scaleX = 1
  let scaleY = 1
  
  if (aspectRatio > 1.5) {
    scaleX = 1.5 / aspectRatio
  } else if (aspectRatio < 0.67) {
    scaleY = aspectRatio / 0.67
  }
  
  if (scaleX === 1 && scaleY === 1) return nodes
  
  const centerX = (bounds.minX + bounds.maxX) / 2
  const centerY = (bounds.minY + bounds.maxY) / 2
  
  return nodes.map(node => ({
    ...node,
    x: centerX + ((node.x || 0) - centerX) * scaleX,
    y: centerY + ((node.y || 0) - centerY) * scaleY
  }))
}

const selectLayoutMode = (
  graph: Readonly<Graph>,
  layoutMode: string
): 'hierarchical' | 'radial' | 'force' => {
  if (layoutMode !== 'auto') {
    return layoutMode as 'hierarchical' | 'radial' | 'force'
  }
  
  const nodeCount = graph.nodes.length
  const edgeCount = graph.edges.length
  
  // 2ノードの場合は必ずhierarchicalを選択
  if (nodeCount === 2) {
    return 'hierarchical'
  }
  
  const density = edgeCount / (nodeCount * (nodeCount - 1) / 2)
  
  if (nodeCount >= 15 && nodeCount <= 50 && density > 0.1) {
    return 'radial'
  }
  
  if (nodeCount > 50 || density > 0.3) {
    return 'force'
  }
  
  return 'hierarchical'
}

export function calculateNodePositions(
  graph: Readonly<Graph>,
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
  const { nodeWidth, nodeHeight, enableCollisionAvoidance } = options
  
  const effectiveLayoutMode = selectLayoutMode(graph, options.layoutMode || 'auto')
  
  let positionedNodes: ReadonlyArray<Node>
  
  switch (effectiveLayoutMode) {
    case 'radial':
      positionedNodes = positionNodesRadially(nodes, edges, {
        centerRadius: options.radialOptions?.centerRadius || 100,
        layerSpacing: options.radialOptions?.layerSpacing || 80
      })
      break
      
    case 'force': {
      const forceGraph = applyForceDirectedLayout(graph, {
        forceStrength: options.forceStrength || 0.1,
        iterations: Math.min(150, nodes.length * 4)
      })
      positionedNodes = forceGraph.nodes
      break
    }
    
    default:
      positionedNodes = applyHierarchicalLayout(graph, options)
      
      if (options.useForceDirected || (nodes.length > 20 && !options.compactMode)) {
        const forceGraph = applyForceDirectedLayout(
          { nodes: [...positionedNodes], edges },
          {
            forceStrength: options.forceStrength || 0.1,
            iterations: Math.min(100, nodes.length * 3)
          }
        )
        positionedNodes = forceGraph.nodes
      }
  }
  
  positionedNodes = normalizeAspectRatio(positionedNodes)
  
  if (enableCollisionAvoidance || positionedNodes.length > 15) {
    positionedNodes = resolveNodeCollisions(positionedNodes, {
      minimumDistance: options.collisionOptions?.minimumDistance || 
        Math.max(nodeWidth, nodeHeight) + 20,
      pushForce: 0.3
    })
  }
  
  return {
    nodes: positionedNodes.map(node => ({
      ...node,
      x: node.x || 0,
      y: node.y || 0
    })),
    edges
  }
}