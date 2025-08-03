import { useMemo } from 'react'
import { PositionedNode } from '@/types/graph'

interface UseLabelOffsetsProps {
  nodes: PositionedNode[]
}

export function useLabelOffsets({ nodes }: UseLabelOffsetsProps) {
  return useMemo(() => {
    const offsets = new Map<string, number>()
    
    // ノードをy座標でグループ化
    const nodeGroups = new Map<number, Array<{ id: string, x: number }>>()
    
    nodes.forEach(node => {
      const y = Math.round((node.y || 0) / 10) * 10 // 10px単位でグループ化
      if (!nodeGroups.has(y)) {
        nodeGroups.set(y, [])
      }
      nodeGroups.get(y)!.push({ id: node.id, x: node.x || 0 })
    })
    
    // 各グループ内でラベルの重複を避ける
    nodeGroups.forEach(nodesInGroup => {
      if (nodesInGroup.length <= 1) return
      
      // x座標でソート
      nodesInGroup.sort((a, b) => a.x - b.x)
      
      // 隣接ノード間の距離をチェック
      for (let i = 0; i < nodesInGroup.length - 1; i++) {
        const current = nodesInGroup[i]
        const next = nodesInGroup[i + 1]
        const distance = Math.abs(next.x - current.x)
        
        // ノード間距離が小さい場合、ラベルオフセットを適用
        if (distance < 80) { // ラベル重複の閾値
          const offsetAmount = 15
          offsets.set(current.id, i % 2 === 0 ? 0 : offsetAmount)
          offsets.set(next.id, (i + 1) % 2 === 0 ? 0 : offsetAmount)
        }
      }
    })
    
    return offsets
  }, [nodes])
}