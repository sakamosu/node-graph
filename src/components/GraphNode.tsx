import React from 'react'
import { Node } from '@/types/graph'

interface GraphNodeProps {
  node: Node
  width?: number
  height?: number
}

export function GraphNode({ node, width = 80, height = 40 }: GraphNodeProps) {
  const x = node.x || 0
  const y = node.y || 0
  const radius = Math.min(width, height) / 2 * 0.7

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
        y={radius + 16}
        textAnchor="middle"
        dominantBaseline="hanging"
        fontSize={12}
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