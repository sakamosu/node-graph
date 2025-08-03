import React from 'react'
import { Edge, Node } from '@/types/graph'

interface GraphEdgeProps {
  edge: Edge
  sourceNode: Node
  targetNode: Node
  nodeWidth?: number
  nodeHeight?: number
  curveOffset?: number
}

export function GraphEdge({
  edge,
  sourceNode,
  targetNode,
  nodeWidth = 80,
  nodeHeight = 40,
  curveOffset = 0,
}: GraphEdgeProps) {
  const sourceX = sourceNode.x || 0
  const sourceY = sourceNode.y || 0
  const targetX = targetNode.x || 0
  const targetY = targetNode.y || 0

  const dx = targetX - sourceX
  const dy = targetY - sourceY
  const baseAngle = Math.atan2(dy, dx)

  // Calculate connection points on circle boundary
  const radius = Math.min(nodeWidth, nodeHeight) / 2
  
  const startX = sourceX + radius * Math.cos(baseAngle)
  const startY = sourceY + radius * Math.sin(baseAngle)
  const endX = targetX - radius * Math.cos(baseAngle)
  const endY = targetY - radius * Math.sin(baseAngle)

  // Arrow for direction
  const arrowSize = 10
  const arrowAngle = Math.PI / 6
  const arrowX1 = endX - arrowSize * Math.cos(baseAngle - arrowAngle)
  const arrowY1 = endY - arrowSize * Math.sin(baseAngle - arrowAngle)
  const arrowX2 = endX - arrowSize * Math.cos(baseAngle + arrowAngle)
  const arrowY2 = endY - arrowSize * Math.sin(baseAngle + arrowAngle)

  // Cubic bezier path for smooth curves
  let path: string
  if (curveOffset === 0) {
    // Even straight lines use subtle bezier for natural feel
    const distance = Math.sqrt(dx * dx + dy * dy)
    const controlOffset = distance * 0.25 // 25% of distance for control points
    
    const control1X = startX + controlOffset * Math.cos(baseAngle)
    const control1Y = startY + controlOffset * Math.sin(baseAngle)
    const control2X = endX - controlOffset * Math.cos(baseAngle)
    const control2Y = endY - controlOffset * Math.sin(baseAngle)
    
    path = `M ${startX} ${startY} C ${control1X} ${control1Y} ${control2X} ${control2Y} ${endX} ${endY}`
  } else {
    // Curved bezier with perpendicular offset
    const distance = Math.sqrt((endX - startX) ** 2 + (endY - startY) ** 2)
    const controlOffset = distance * 0.4 // 40% of distance for more pronounced curves
    
    // Calculate perpendicular direction for curve offset
    const perpAngle = baseAngle + Math.PI / 2
    
    const control1X = startX + controlOffset * Math.cos(baseAngle) + curveOffset * Math.cos(perpAngle) * 0.3
    const control1Y = startY + controlOffset * Math.sin(baseAngle) + curveOffset * Math.sin(perpAngle) * 0.3
    const control2X = endX - controlOffset * Math.cos(baseAngle) + curveOffset * Math.cos(perpAngle) * 0.3
    const control2Y = endY - controlOffset * Math.sin(baseAngle) + curveOffset * Math.sin(perpAngle) * 0.3
    
    path = `M ${startX} ${startY} C ${control1X} ${control1Y} ${control2X} ${control2Y} ${endX} ${endY}`
  }

  return (
    <g>
      <path
        d={path}
        fill="none"
        stroke="#666666"
        strokeWidth={2}
      />
      <polygon
        points={`${endX},${endY} ${arrowX1},${arrowY1} ${arrowX2},${arrowY2}`}
        fill="#666666"
      />
    </g>
  )
}

