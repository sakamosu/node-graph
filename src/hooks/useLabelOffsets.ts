import { useMemo } from 'react'
import { PositionedNode } from '@/types/graph'

interface UseLabelOffsetsProps {
  nodes: PositionedNode[]
}

export function useLabelOffsets({ nodes }: UseLabelOffsetsProps) {
  // ラベルオフセット機能を一時的に無効化
  // すべてのノードのラベルオフセットを0に設定
  return useMemo(() => {
    const offsets = new Map<string, number>()
    nodes.forEach(node => {
      offsets.set(node.id, 0)
    })
    return offsets
  }, [nodes])
}