import { useMemo } from 'react'
import { Edge, PositionedNode } from '@/types/graph'

interface UseEdgeCurveOffsetsProps {
  edges: Edge[]
  nodes: PositionedNode[]
  nodeMap: Map<string, PositionedNode>
}

// 三角形パターンの検出を分離
const isTriangularPattern = (nodeCount: number, edgeCount: number) => {
  return nodeCount === 3 && edgeCount === 3
}

// エッジオフセット計算を分離
const calculateEdgeOffset = (
  edge: Edge, 
  nodeMap: Map<string, PositionedNode>, 
  edgePairs: Map<string, number>
) => {
  const sourceNode = nodeMap.get(edge.source)
  const targetNode = nodeMap.get(edge.target)
  
  if (!sourceNode || !targetNode) return 0
  
  const sourceLevel = sourceNode.y || 0
  const targetLevel = targetNode.y || 0
  const levelDiff = Math.abs(targetLevel - sourceLevel)
  
  if (levelDiff > 100) {
    const pairKey = [edge.source, edge.target].sort().join('-')
    const existingCount = edgePairs.get(pairKey) || 0
    edgePairs.set(pairKey, existingCount + 1)
    
    return 50 * (existingCount % 2 === 0 ? 1 : -1)
  }
  
  return 0
}

export function useEdgeCurveOffsets({ edges, nodes, nodeMap }: UseEdgeCurveOffsetsProps) {
  // グラフ構造のハッシュを計算して、実際の構造変更のみを検出
  const graphHash = useMemo(() => {
    const nodeHash = nodes.map(node => 
      `${node.id}:${Math.round((node.y || 0) / 10) * 10}`
    ).sort().join('|')
    const edgeHash = edges.map(edge => `${edge.source}-${edge.target}`).sort().join('|')
    return `${nodeHash}#${edgeHash}`
  }, [nodes, edges])
  
  // 三角形パターンの検出結果をメモ化
  const isTriangular = useMemo(() => {
    return isTriangularPattern(nodes.length, edges.length)
  }, [nodes.length, edges.length])

  return useMemo(() => {
    const offsets = new Map<string, number>()
    
    if (isTriangular) {
      // 三角形パターンでは直線のみ使用
      for (const edge of edges) {
        offsets.set(edge.id, 0)
      }
    } else {
      // 三角形以外のグラフでの曲線ロジック
      const edgePairs = new Map<string, number>()
      
      for (const edge of edges) {
        const offset = calculateEdgeOffset(edge, nodeMap, edgePairs)
        offsets.set(edge.id, offset)
      }
    }
    
    return offsets
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [graphHash, isTriangular, nodeMap])
}