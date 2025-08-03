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
  isDimmed?: boolean
  showAnimation?: boolean
}

export function GraphEdge({
  edge,
  sourceNode,
  targetNode,
  nodeWidth = 80,
  nodeHeight = 40,
  curveOffset = 0,
  isHighlighted = false,
  isDimmed = false,
  showAnimation = false,
}: GraphEdgeProps) {
  const sourceX = sourceNode.x || 0
  const sourceY = sourceNode.y || 0
  const targetX = targetNode.x || 0
  const targetY = targetNode.y || 0

  const dx = targetX - sourceX
  const dy = targetY - sourceY
  const baseAngle = Math.atan2(dy, dx)

  // Calculate connection points on circle boundary
  const baseRadius = Math.min(nodeWidth, nodeHeight) / 2 * 0.7
  const sourceRadius = baseRadius
  const targetRadius = baseRadius
  
  const startX = sourceX + sourceRadius * Math.cos(baseAngle)
  const startY = sourceY + sourceRadius * Math.sin(baseAngle)
  const endX = targetX - targetRadius * Math.cos(baseAngle)
  const endY = targetY - targetRadius * Math.sin(baseAngle)

  // Arrow for direction - fixed size
  const arrowSize = baseRadius * 0.5
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

  // スタイルの決定
  const getEdgeColor = () => {
    if (isHighlighted) {
      return "#87CEFA"
    }
    if (isDimmed) {
      return "#e0e0e0"
    }
    return "#CCCCCC"
  }

  const getStrokeWidth = () => {
    if (isHighlighted) {
      return 2
    }
    if (isDimmed) {
      return 0.5
    }
    return 1
  }

  const edgeColor = getEdgeColor()
  const strokeWidth = getStrokeWidth()

  return (
    <g>

      {/* ホバー用の透明な太いパス */}
      <path
        d={path}
        fill="none"
        stroke="transparent"
        strokeWidth="20"
        style={{ cursor: 'pointer' }}
      />
      
      {/* メインのエッジパス */}
      <path
        d={path}
        fill="none"
        stroke={edgeColor}
        strokeWidth={strokeWidth}
        style={{
          transition: 'stroke 0.5s ease-out, stroke-width 0.5s ease-out, d 0.5s ease-out',
          pointerEvents: 'none',
        }}
      />

      {/* ノードホバー時のドット流れアニメーション */}
      {showAnimation && (
        <g>
          <defs>
            <path id={`motion-path-${edge.source}-${edge.target}`} d={path} />
          </defs>
          {[0, 1, 2, 3].map((index) => (
            <circle
              key={index}
              r="3"
              fill="#87CEFA"
              opacity="0"
              style={{
                filter: 'drop-shadow(0 0 4px rgba(135, 206, 250, 0.9))'
              }}
            >
              <animateMotion
                dur="2.5s"
                repeatCount="indefinite"
                begin={`${index * 0.625}s`}
              >
                <mpath href={`#motion-path-${edge.source}-${edge.target}`} />
              </animateMotion>
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                dur="2.5s"
                repeatCount="indefinite"
                begin={`${index * 0.625}s`}
              />
            </circle>
          ))}
        </g>
      )}

      {/* 矢印 */}
      <polygon
        points={`${endX},${endY} ${arrowX1},${arrowY1} ${arrowX2},${arrowY2}`}
        fill={edgeColor}
        style={{
          transition: 'fill 0.5s ease-out',
          transformOrigin: `${endX}px ${endY}px`,
          cursor: 'pointer',
        }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      />
    </g>
  )
}