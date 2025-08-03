import { Node, Edge } from '@/types/graph'

export interface Point {
  x: number
  y: number
}

export interface EdgePath {
  points: Point[]
  curveType: 'straight' | 'bezier'
  curveIntensity: number
}

export interface RouteOptions {
  nodeWidth: number
  nodeHeight: number
  avoidanceMargin: number
  maxDetour: number
}

export function calculateEdgeRoutes(
  nodes: Node[],
  edges: Edge[],
  options: RouteOptions = {
    nodeWidth: 80,
    nodeHeight: 40,
    avoidanceMargin: 20,
    maxDetour: 200
  }
): Map<string, EdgePath> {
  const routes = new Map<string, EdgePath>()
  const nodeMap = new Map(nodes.map(node => [node.id, node]))
  
  // Group edges by node pairs to handle multiple edges
  const edgeGroups = new Map<string, Edge[]>()
  edges.forEach(edge => {
    const key = `${edge.source}-${edge.target}`
    if (!edgeGroups.has(key)) {
      edgeGroups.set(key, [])
    }
    edgeGroups.get(key)!.push(edge)
  })

  // Calculate routes for each edge group
  edgeGroups.forEach((groupEdges, groupKey) => {
    const sourceNode = nodeMap.get(groupEdges[0].source)
    const targetNode = nodeMap.get(groupEdges[0].target)
    
    if (!sourceNode || !targetNode) return

    const baseRoute = calculateBaseRoute(sourceNode, targetNode, nodes, options)
    
    // Distribute multiple edges in a fan pattern
    groupEdges.forEach((edge, index) => {
      const distributedRoute = distributeEdgeInGroup(
        baseRoute,
        index,
        groupEdges.length,
        sourceNode,
        targetNode,
        options
      )
      routes.set(edge.id, distributedRoute)
    })
  })

  return routes
}

function calculateBaseRoute(
  sourceNode: Node,
  targetNode: Node,
  allNodes: Node[],
  options: RouteOptions
): EdgePath {
  const start = getNodeEdgePoint(sourceNode, targetNode, options)
  const end = getNodeEdgePoint(targetNode, sourceNode, options)
  
  // Check if direct path intersects with any nodes
  const obstacles = allNodes.filter(node => 
    node.id !== sourceNode.id && node.id !== targetNode.id
  )
  
  const directPath = { points: [start, end], curveType: 'straight' as const, curveIntensity: 0 }
  
  if (!pathIntersectsNodes(directPath.points, obstacles, options)) {
    return directPath
  }

  // Use A* pathfinding to avoid obstacles
  const waypoints = findPathAroundObstacles(start, end, obstacles, options)
  
  if (waypoints.length > 2) {
    // Multiple waypoints - use bezier curves between segments
    return {
      points: waypoints,
      curveType: 'bezier',
      curveIntensity: 0.3
    }
  }
  
  // Fallback to curved direct path
  return {
    points: [start, end],
    curveType: 'bezier',
    curveIntensity: 0.5
  }
}

function distributeEdgeInGroup(
  baseRoute: EdgePath,
  edgeIndex: number,
  totalEdges: number,
  sourceNode: Node,
  targetNode: Node,
  options: RouteOptions
): EdgePath {
  if (totalEdges === 1) {
    return baseRoute
  }

  const spreadAngle = Math.PI / 6 // 30 degrees total spread
  const angleStep = spreadAngle / Math.max(1, totalEdges - 1)
  const startAngle = -spreadAngle / 2
  const edgeAngle = startAngle + angleStep * edgeIndex

  // Calculate the base direction
  const dx = (targetNode.x || 0) - (sourceNode.x || 0)
  const dy = (targetNode.y || 0) - (sourceNode.y || 0)
  const baseAngle = Math.atan2(dy, dx)
  
  // Apply distribution offset
  const distributedAngle = baseAngle + edgeAngle
  const offsetDistance = 30 * Math.abs(edgeIndex - (totalEdges - 1) / 2)
  
  // Create offset points
  const offsetX = offsetDistance * Math.cos(distributedAngle + Math.PI / 2)
  const offsetY = offsetDistance * Math.sin(distributedAngle + Math.PI / 2)
  
  const distributedPoints = baseRoute.points.map((point, index) => {
    // Apply less offset to start and end points, more to middle waypoints
    const factor = index === 0 || index === baseRoute.points.length - 1 ? 0.3 : 1.0
    return {
      x: point.x + offsetX * factor,
      y: point.y + offsetY * factor
    }
  })

  return {
    ...baseRoute,
    points: distributedPoints,
    curveIntensity: Math.max(baseRoute.curveIntensity, 0.2)
  }
}

function getNodeEdgePoint(fromNode: Node, toNode: Node, options: RouteOptions): Point {
  const fromX = fromNode.x || 0
  const fromY = fromNode.y || 0
  const toX = toNode.x || 0
  const toY = toNode.y || 0
  
  const dx = toX - fromX
  const dy = toY - fromY
  const angle = Math.atan2(dy, dx)
  
  // Calculate connection point on circular node edge
  const radius = Math.min(options.nodeWidth, options.nodeHeight) / 2
  const edgeX = fromX + radius * Math.cos(angle)
  const edgeY = fromY + radius * Math.sin(angle)
  
  return { x: edgeX, y: edgeY }
}

function pathIntersectsNodes(path: Point[], nodes: Node[], options: RouteOptions): boolean {
  for (let i = 0; i < path.length - 1; i++) {
    const segment = { start: path[i], end: path[i + 1] }
    
    for (const node of nodes) {
      if (lineIntersectsCircle(segment, node, options)) {
        return true
      }
    }
  }
  return false
}

function lineIntersectsCircle(
  segment: { start: Point; end: Point },
  node: Node,
  options: RouteOptions
): boolean {
  const nodeX = node.x || 0
  const nodeY = node.y || 0
  const radius = Math.min(options.nodeWidth, options.nodeHeight) / 2 + options.avoidanceMargin
  
  return lineIntersectsCircleGeometry(segment.start, segment.end, { x: nodeX, y: nodeY }, radius)
}

function lineIntersectsCircleGeometry(
  lineStart: Point,
  lineEnd: Point,
  center: Point,
  radius: number
): boolean {
  // Vector from line start to center
  const dx = center.x - lineStart.x
  const dy = center.y - lineStart.y
  
  // Vector from line start to line end
  const ldx = lineEnd.x - lineStart.x
  const ldy = lineEnd.y - lineStart.y
  
  // Length squared of line segment
  const lineLength2 = ldx * ldx + ldy * ldy
  
  // If line segment has zero length, check point-to-circle distance
  if (lineLength2 === 0) {
    return Math.sqrt(dx * dx + dy * dy) <= radius
  }
  
  // Project center onto line segment (clamped to segment)
  const t = Math.max(0, Math.min(1, (dx * ldx + dy * ldy) / lineLength2))
  
  // Find closest point on line segment to circle center
  const closestX = lineStart.x + t * ldx
  const closestY = lineStart.y + t * ldy
  
  // Distance from circle center to closest point
  const distanceX = center.x - closestX
  const distanceY = center.y - closestY
  const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY)
  
  return distance <= radius
}

function lineIntersectsRectangle(
  p1: Point,
  p2: Point,
  rect: { left: number; right: number; top: number; bottom: number }
): boolean {
  // Check if either endpoint is inside the rectangle
  if (pointInRectangle(p1, rect) || pointInRectangle(p2, rect)) {
    return true
  }
  
  // Check if line intersects any edge of the rectangle
  const edges = [
    { start: { x: rect.left, y: rect.top }, end: { x: rect.right, y: rect.top } },
    { start: { x: rect.right, y: rect.top }, end: { x: rect.right, y: rect.bottom } },
    { start: { x: rect.right, y: rect.bottom }, end: { x: rect.left, y: rect.bottom } },
    { start: { x: rect.left, y: rect.bottom }, end: { x: rect.left, y: rect.top } }
  ]
  
  return edges.some(edge => linesIntersect(p1, p2, edge.start, edge.end))
}

function pointInRectangle(
  point: Point,
  rect: { left: number; right: number; top: number; bottom: number }
): boolean {
  return point.x >= rect.left && point.x <= rect.right &&
         point.y >= rect.top && point.y <= rect.bottom
}

function linesIntersect(p1: Point, p2: Point, p3: Point, p4: Point): boolean {
  const denominator = (p1.x - p2.x) * (p3.y - p4.y) - (p1.y - p2.y) * (p3.x - p4.x)
  
  if (Math.abs(denominator) < 1e-10) {
    return false // Lines are parallel
  }
  
  const t = ((p1.x - p3.x) * (p3.y - p4.y) - (p1.y - p3.y) * (p3.x - p4.x)) / denominator
  const u = -((p1.x - p2.x) * (p1.y - p3.y) - (p1.y - p2.y) * (p1.x - p3.x)) / denominator
  
  return t >= 0 && t <= 1 && u >= 0 && u <= 1
}

function findPathAroundObstacles(
  start: Point,
  end: Point,
  obstacles: Node[],
  options: RouteOptions
): Point[] {
  // Simple A* implementation for pathfinding
  interface PathNode {
    point: Point
    g: number // Cost from start
    h: number // Heuristic to end
    f: number // Total cost
    parent?: PathNode
  }
  
  const heuristic = (p1: Point, p2: Point) => 
    Math.sqrt((p1.x - p2.x) ** 2 + (p1.y - p2.y) ** 2)
  
  // Generate waypoints around obstacles
  const waypoints: Point[] = [start]
  
  obstacles.forEach(obstacle => {
    const ox = obstacle.x || 0
    const oy = obstacle.y || 0
    const margin = options.avoidanceMargin + 10
    const radius = Math.min(options.nodeWidth, options.nodeHeight) / 2 + margin
    
    // Add points around the circular obstacle at 8 positions
    const angleStep = (2 * Math.PI) / 8
    for (let i = 0; i < 8; i++) {
      const angle = i * angleStep
      waypoints.push({
        x: ox + radius * Math.cos(angle),
        y: oy + radius * Math.sin(angle)
      })
    }
  })
  
  waypoints.push(end)
  
  // Find shortest valid path through waypoints
  const openSet: PathNode[] = [{ point: start, g: 0, h: heuristic(start, end), f: heuristic(start, end) }]
  const closedSet: PathNode[] = []
  
  while (openSet.length > 0) {
    // Get node with lowest f score
    openSet.sort((a, b) => a.f - b.f)
    const current = openSet.shift()!
    closedSet.push(current)
    
    // Check if we reached the end
    if (heuristic(current.point, end) < 10) {
      // Reconstruct path
      const path: Point[] = []
      let node: PathNode | undefined = current
      while (node) {
        path.unshift(node.point)
        node = node.parent
      }
      path.push(end) // Ensure end point is included
      return path
    }
    
    // Check all waypoints as potential next steps
    waypoints.forEach(waypoint => {
      // Skip if this waypoint is in closed set
      if (closedSet.some(node => heuristic(node.point, waypoint) < 5)) {
        return
      }
      
      // Check if path to this waypoint is clear
      if (pathIntersectsNodes([current.point, waypoint], obstacles, options)) {
        return
      }
      
      const g = current.g + heuristic(current.point, waypoint)
      const h = heuristic(waypoint, end)
      const f = g + h
      
      // Check if this waypoint is already in open set with better score
      const existingIndex = openSet.findIndex(node => heuristic(node.point, waypoint) < 5)
      if (existingIndex >= 0 && openSet[existingIndex].g <= g) {
        return
      }
      
      // Add or update waypoint in open set
      const pathNode: PathNode = { point: waypoint, g, h, f, parent: current }
      if (existingIndex >= 0) {
        openSet[existingIndex] = pathNode
      } else {
        openSet.push(pathNode)
      }
    })
  }
  
  // Fallback to direct path if no route found
  return [start, end]
}