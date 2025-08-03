import React from 'react'
import { Node } from '@/types/graph'

interface GraphNodeProps {
  node: Node
  width?: number
  height?: number
  labelOffset?: number
}

export function GraphNode({ node, width = 80, height = 40, labelOffset = 0 }: GraphNodeProps) {
  const x = node.x || 0
  const y = node.y || 0
  const radius = Math.min(width, height) / 2 * 0.7
  
  // ラベルの基本位置計算
  const baseLabelY = radius + 16
  // labelOffsetを使用して重複を回避
  const adjustedLabelY = baseLabelY + labelOffset

  return (
    <g transform={`translate(${x}, ${y})`}>
      <circle
        cx={0}
        cy={0}
        r={radius}
        fill="#808080"
        stroke="none"
        strokeWidth={0}
      />
      <text
        x={0}
        y={adjustedLabelY}
        textAnchor="middle"
        dominantBaseline="hanging"
        fontSize={11}
        fill="#333333"
        fontFamily="Arial, sans-serif"
        textRendering="optimizeLegibility"
        style={{ userSelect: 'none', pointerEvents: 'none' }}
      >
        {node.label}
      </text>
    </g>
  )
}