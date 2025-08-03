import React from 'react'
import { Edge, Node } from '@/types/graph'

interface GraphEdgeProps {
  edge: Edge
  sourceNode: Node
  targetNode: Node
  nodeWidth?: number
  nodeHeight?: number
  curveOffset?: number
  isHighlighted?: boolean
}

export function GraphEdge({
  sourceNode,
  targetNode,
  nodeWidth = 80,
  nodeHeight = 40,
  curveOffset = 0,
  isHighlighted = false,
}: GraphEdgeProps) {
  const sourceX = sourceNode.x || 0
  const sourceY = sourceNode.y || 0
  const targetX = targetNode.x || 0
  const targetY = targetNode.y || 0

  const dx = targetX - sourceX
  const dy = targetY - sourceY
  const baseAngle = Math.atan2(dy, dx)

  // Calculate connection points on circle boundary
  const radius = Math.min(nodeWidth, nodeHeight) / 2 * 0.7
  
  const startX = sourceX + radius * Math.cos(baseAngle)
  const startY = sourceY + radius * Math.sin(baseAngle)
  const endX = targetX - radius * Math.cos(baseAngle)
  const endY = targetY - radius * Math.sin(baseAngle)

  // Arrow for direction - scale with node size
  const arrowSize = radius * 0.5
  const arrowAngle = Math.PI / 6
  const arrowX1 = endX - arrowSize * Math.cos(baseAngle - arrowAngle)
  const arrowY1 = endY - arrowSize * Math.sin(baseAngle - arrowAngle)
  const arrowX2 = endX - arrowSize * Math.cos(baseAngle + arrowAngle)
  const arrowY2 = endY - arrowSize * Math.sin(baseAngle + arrowAngle)

  // Cubic bezier with control points extending from start and end points
  const distance = Math.sqrt(dx * dx + dy * dy)
  
  // Control points extend from start and end points in the direction of the connection
  // This creates the natural curve shown in the image
  const controlDistance = distance * 0.4 // How far control points extend
  
  let path: string
  if (curveOffset === 0) {
    // Standard cubic bezier: control points extend along the connection direction
    const control1X = startX + controlDistance * Math.cos(baseAngle)
    const control1Y = startY + controlDistance * Math.sin(baseAngle)
    const control2X = endX - controlDistance * Math.cos(baseAngle)
    const control2Y = endY - controlDistance * Math.sin(baseAngle)
    
    path = `M ${startX} ${startY} C ${control1X} ${control1Y} ${control2X} ${control2Y} ${endX} ${endY}`
  } else {
    // For offset curves, add perpendicular offset to control points
    const perpAngle = baseAngle + Math.PI / 2
    const offsetFactor = curveOffset * 0.3
    
    const control1X = startX + controlDistance * Math.cos(baseAngle) + offsetFactor * Math.cos(perpAngle)
    const control1Y = startY + controlDistance * Math.sin(baseAngle) + offsetFactor * Math.sin(perpAngle)
    const control2X = endX - controlDistance * Math.cos(baseAngle) + offsetFactor * Math.cos(perpAngle)
    const control2Y = endY - controlDistance * Math.sin(baseAngle) + offsetFactor * Math.sin(perpAngle)
    
    path = `M ${startX} ${startY} C ${control1X} ${control1Y} ${control2X} ${control2Y} ${endX} ${endY}`
  }

  return (
    <g>
      <path
        d={path}
        fill="none"
        stroke={isHighlighted ? "#00bcd4" : "#CCCCCC"}
        strokeWidth={isHighlighted ? 2 : 1}
      />
      <polygon
        points={`${endX},${endY} ${arrowX1},${arrowY1} ${arrowX2},${arrowY2}`}
        fill={isHighlighted ? "#00bcd4" : "#CCCCCC"}
      />
    </g>
  )
}