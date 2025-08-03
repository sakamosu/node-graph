import React from 'react'
import { Node } from '@/types/graph'

interface GraphNodeProps {
  node: Node
  width?: number
  height?: number
  labelOffset?: number
  isHighlighted?: boolean
  onHover?: (nodeId: string | null) => void
}

export function GraphNode({ node, width = 80, height = 40, labelOffset = 0, isHighlighted = false, onHover }: GraphNodeProps) {
  const x = node.x || 0
  const y = node.y || 0
  const radius = Math.min(width, height) / 2 * 0.7
  
  // ラベルの基本位置計算
  const baseLabelY = radius + 16
  // labelOffsetを使用して重複を回避
  const adjustedLabelY = baseLabelY + labelOffset

  return (
    <g 
      transform={`translate(${x}, ${y})`}
      style={{ cursor: 'pointer' }}
      onMouseEnter={() => onHover?.(node.id)}
      onMouseLeave={() => onHover?.(null)}
    >
      <circle
        cx={0}
        cy={0}
        r={radius}
        fill={isHighlighted ? "#00bcd4" : "#808080"}
        stroke={isHighlighted ? "#0097a7" : "none"}
        strokeWidth={isHighlighted ? 2 : 0}
      />
      <text
        x={0}
        y={adjustedLabelY}
        textAnchor="middle"
        dominantBaseline="hanging"
        fontSize={11}
        fill={isHighlighted ? "#006064" : "#333333"}
        fontFamily="Arial, sans-serif"
        textRendering="optimizeLegibility"
        style={{ userSelect: 'none', pointerEvents: 'none' }}
      >
        {node.label}
      </text>
    </g>
  )
}