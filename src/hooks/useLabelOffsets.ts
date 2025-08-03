import { useMemo } from 'react'
import { PositionedNode } from '@/types/graph'
import { GRAPH_CONSTANTS } from '@/config/constants'

interface UseLabelOffsetsProps {
  nodes: PositionedNode[]
}

// グループ化の計算を分離
const groupNodesByY = (nodes: PositionedNode[]) => {
  const nodeGroups = new Map<number, Array<{ id: string, x: number }>>()
  
  for (const node of nodes) {
    const y = Math.round((node.y || 0) / 10) * 10
    if (!nodeGroups.has(y)) {
      nodeGroups.set(y, [])
    }
    nodeGroups.get(y)!.push({ id: node.id, x: node.x || 0 })
  }
  
  return nodeGroups
}

// オフセット計算を分離
const calculateOffsetsForGroup = (nodesInGroup: Array<{ id: string, x: number }>) => {
  const offsets = new Map<string, number>()
  
  if (nodesInGroup.length <= 1) return offsets
  
  // x座標でソート
  const sortedNodes = [...nodesInGroup].sort((a, b) => a.x - b.x)
  
  // 隣接ノード間の距離をチェック
  for (let i = 0; i < sortedNodes.length - 1; i++) {
    const current = sortedNodes[i]
    const next = sortedNodes[i + 1]
    const distance = Math.abs(next.x - current.x)
    
    // ノード間距離が小さい場合、ラベルオフセットを適用
    if (distance < GRAPH_CONSTANTS.node.defaultWidth) {
      const offsetAmount = GRAPH_CONSTANTS.node.labelSpacing * 0.75
      offsets.set(current.id, i % 2 === 0 ? 0 : offsetAmount)
      offsets.set(next.id, (i + 1) % 2 === 0 ? 0 : offsetAmount)
    }
  }
  
  return offsets
}

export function useLabelOffsets({ nodes }: UseLabelOffsetsProps) {
  // ノード位置のハッシュを計算して、実際の位置変更のみを検出
  const nodesHash = useMemo(() => {
    return nodes.map(node => `${node.id}:${Math.round((node.x || 0) / 5) * 5}:${Math.round((node.y || 0) / 5) * 5}`).join('|')
  }, [nodes])

  return useMemo(() => {
    const nodeGroups = groupNodesByY(nodes)
    const offsets = new Map<string, number>()
    
    // 各グループを並列処理可能な形で処理
    for (const [, nodesInGroup] of nodeGroups) {
      const groupOffsets = calculateOffsetsForGroup(nodesInGroup)
      for (const [id, offset] of groupOffsets) {
        offsets.set(id, offset)
      }
    }
    
    return offsets
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [nodesHash])
}