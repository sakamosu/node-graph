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
    // ノードの実際のサイズ（半径）を考慮して判定
    const nodeRadius = GRAPH_CONSTANTS.node.defaultWidth / 2 * GRAPH_CONSTANTS.node.radiusRatio
    const minSafeDistance = nodeRadius * 2 + 20 // ラベルが重ならない最小距離
    
    if (distance < minSafeDistance) {
      const offsetAmount = GRAPH_CONSTANTS.node.labelSpacing * 0.75
      // 交互にオフセットを適用
      if (!offsets.has(current.id)) {
        offsets.set(current.id, 0)
      }
      offsets.set(next.id, offsetAmount)
    }
  }
  
  return offsets
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