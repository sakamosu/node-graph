import React from 'react'
import { Node } from '@/types/graph'

interface GraphNodeProps {
  node: Node
  width?: number
  height?: number
  labelOffset?: number
  isHighlighted?: boolean
  isDimmed?: boolean
  onHover?: (nodeId: string | null) => void
}

export function GraphNode({ node, width = 80, height = 40, labelOffset = 0, isHighlighted = false, isDimmed = false, onHover }: GraphNodeProps) {
  const x = node.x || 0
  const y = node.y || 0
  const radius = Math.min(width, height) / 2 * 0.7
  
  // ラベルの基本位置計算
  const baseLabelY = radius + 16
  // labelOffsetを使用して重複を回避
  const adjustedLabelY = baseLabelY + labelOffset

  // スタイルの決定
  const getNodeStyle = () => {
    if (isHighlighted) {
      return {
        fill: "#00bcd4",
        stroke: "#0097a7",
        strokeWidth: 2,
      }
    }
    if (isDimmed) {
      return {
        fill: "#d0d0d0",
        stroke: "none",
        strokeWidth: 0,
      }
    }
    return {
      fill: "#808080",
      stroke: "none",
      strokeWidth: 0,
    }
  }

  const getTextStyle = () => {
    if (isHighlighted) {
      return "#006064"
    }
    if (isDimmed) {
      return "#999999"
    }
    return "#333333"
  }

  const nodeStyle = getNodeStyle()

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
        fill={nodeStyle.fill}
        stroke={nodeStyle.stroke}
        strokeWidth={nodeStyle.strokeWidth}
      />
      <text
        x={0}
        y={adjustedLabelY}
        textAnchor="middle"
        dominantBaseline="hanging"
        fontSize={11}
        fill={getTextStyle()}
        fontFamily="Arial, sans-serif"
        textRendering="optimizeLegibility"
        style={{ userSelect: 'none', pointerEvents: 'none' }}
      >
        {node.label}
      </text>
    </g>
  )
}