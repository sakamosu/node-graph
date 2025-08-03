import { useMemo } from 'react'
import { PositionedNode } from '@/types/graph'
import { roundToFixed } from '@/utils/mathUtils'

interface UseViewBoxProps {
  nodes: PositionedNode[]
  nodeWidth: number
  nodeHeight: number
  width: number
  height: number
}

export function useViewBox({ nodes, nodeWidth, nodeHeight, width, height }: UseViewBoxProps) {
  return useMemo(() => {
    if (nodes.length === 0) {
      return `0 0 ${width} ${height}`
    }

    let minX = Infinity
    let minY = Infinity
    let maxX = -Infinity
    let maxY = -Infinity

    nodes.forEach(node => {
      // 座標を丸めてSSR/クライアント間の精度差を解決
      const x = roundToFixed(node.x || 0)
      const y = roundToFixed(node.y || 0)
      const nodeRadius = Math.min(nodeWidth, nodeHeight) / 2
      const labelSpace = 20
      minX = Math.min(minX, x - nodeRadius)
      minY = Math.min(minY, y - nodeRadius)
      maxX = Math.max(maxX, x + nodeRadius)
      maxY = Math.max(maxY, y + nodeRadius + labelSpace)
    })

    const padding = 50
    const viewWidth = maxX - minX + padding * 2
    const viewHeight = maxY - minY + padding * 2
    const centerX = (minX + maxX) / 2
    const centerY = (minY + maxY) / 2

    // viewBox値も精度を統一
    const roundedCenterX = roundToFixed(centerX - viewWidth / 2)
    const roundedCenterY = roundToFixed(centerY - viewHeight / 2)
    const roundedViewWidth = roundToFixed(viewWidth)
    const roundedViewHeight = roundToFixed(viewHeight)

    return `${roundedCenterX} ${roundedCenterY} ${roundedViewWidth} ${roundedViewHeight}`
  }, [nodes, nodeWidth, nodeHeight, width, height])
}