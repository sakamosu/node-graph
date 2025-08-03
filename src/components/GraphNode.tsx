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
  const radius = Math.min(width, height) / 2

  return (
    <g transform={`translate(${x}, ${y})`}>
      <circle
        cx={0}
        cy={0}
        r={radius}
        fill="#ffffff"
        stroke="#333333"
        strokeWidth={2}
      />
      <text
        x={0}
        y={0}
        textAnchor="middle"
        dominantBaseline="middle"
        fontSize={14}
        fill="#333333"
      >
        {node.label}
      </text>
    </g>
  )
}