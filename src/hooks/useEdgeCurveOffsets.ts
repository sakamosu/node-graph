import { useMemo } from 'react'
import { Edge, PositionedNode } from '@/types/graph'

interface UseEdgeCurveOffsetsProps {
  edges: Edge[]
  nodes: PositionedNode[]
  nodeMap: Map<string, PositionedNode>
}

export function useEdgeCurveOffsets({ edges, nodes, nodeMap }: UseEdgeCurveOffsetsProps) {
  return useMemo(() => {
    const offsets = new Map<string, number>()
    
    // 三角形パターンの検出
    const isTriangular = nodes.length === 3 && edges.length === 3
    
    if (isTriangular) {
      // 三角形パターンでは直線のみ使用
      edges.forEach(edge => {
        offsets.set(edge.id, 0)
      })
    } else {
      // 三角形以外のグラフでの曲線ロジック
      const edgePairs = new Map<string, number>()
      
      edges.forEach((edge) => {
        const sourceNode = nodeMap.get(edge.source)
        const targetNode = nodeMap.get(edge.target)
        
        if (!sourceNode || !targetNode) return
        
        const sourceLevel = sourceNode.y || 0
        const targetLevel = targetNode.y || 0
        const levelDiff = Math.abs(targetLevel - sourceLevel)
        
        if (levelDiff > 100) {
          const pairKey = [edge.source, edge.target].sort().join('-')
          const existingCount = edgePairs.get(pairKey) || 0
          edgePairs.set(pairKey, existingCount + 1)
          
          offsets.set(edge.id, 50 * (existingCount % 2 === 0 ? 1 : -1))
        } else {
          offsets.set(edge.id, 0)
        }
      })
    }
    
    return offsets
  }, [edges, nodes, nodeMap])
}