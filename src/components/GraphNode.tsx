import React from 'react'
import { Node } from '@/types/graph'
import { colors } from '@/utils/colors'
import { roundToFixed } from '@/utils/mathUtils'
import { GRAPH_CONSTANTS } from '@/config/constants'

interface GraphNodeProps {
  node: Node
  width?: number
  height?: number
  labelOffset?: number
  isHighlighted?: boolean
  isHovered?: boolean
  isDimmed?: boolean
  onHover?: (nodeId: string | null) => void
}

export const GraphNode = React.memo<GraphNodeProps>(function GraphNode({ node, width = GRAPH_CONSTANTS.node.defaultWidth, height = GRAPH_CONSTANTS.node.defaultHeight, labelOffset = 0, isHighlighted = false, isHovered = false, isDimmed = false, onHover }) {
  // 座標を丸めてSSR/クライアント間の精度差を解決
  const x = roundToFixed(node.x || 0)
  const y = roundToFixed(node.y || 0)
  const baseRadius = Math.min(width, height) / 2 * GRAPH_CONSTANTS.node.radiusRatio
  // ホバー中のノードのみサイズを大きくする
  const radius = isHovered ? baseRadius * 1.3 : baseRadius
  
  // ラベルの基本位置計算
  const baseLabelY = radius + GRAPH_CONSTANTS.node.padding.vertical * 2
  // labelOffsetを使用して重複を回避
  const adjustedLabelY = baseLabelY + labelOffset

  // スタイルの決定
  const getNodeStyle = () => {
    if (isHovered) {
      return {
        fill: colors.node.background.highlighted,
        stroke: "none",
        strokeWidth: 0,
      }
    }
    if (isHighlighted) {
      return {
        fill: colors.node.background.highlighted,
        stroke: "none",
        strokeWidth: 0,
      }
    }
    if (isDimmed) {
      return {
        fill: colors.node.background.dimmed,
        stroke: "none",
        strokeWidth: 0,
      }
    }
    return {
      fill: colors.node.background.dimmedCompact,
      stroke: "none",
      strokeWidth: 0,
    }
  }

  const getTextStyle = () => {
    if (isHovered || isHighlighted) {
      return colors.node.stroke.highlighted
    }
    if (isDimmed) {
      return colors.node.stroke.dimmed
    }
    return colors.node.stroke.normal
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
        style={{
          transition: 'r 0.3s ease-out, fill 0.3s ease-out',
        }}
      />
      <text
        x={0}
        y={adjustedLabelY}
        textAnchor="middle"
        dominantBaseline="hanging"
        fontSize={GRAPH_CONSTANTS.node.fontSize - 3}
        fill={getTextStyle()}
        fontFamily="Arial, sans-serif"
        textRendering="optimizeLegibility"
        style={{ 
          userSelect: 'none', 
          pointerEvents: 'none',
          transition: 'fill 0.3s ease-out',
        }}
      >
        {node.label}
      </text>
    </g>
  )
})