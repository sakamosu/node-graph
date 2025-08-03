import { useMemo, useState, useCallback } from 'react'
import { Edge } from '@/types/graph'

interface UseGraphHighlightProps {
  edges: Edge[]
}

interface HighlightTargets {
  nodes: Set<string>
  edges: Set<string>
}

export function useGraphHighlight({ edges }: UseGraphHighlightProps) {
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null)

  // ホバー時のハイライト対象を計算
  const highlightTargets = useMemo((): HighlightTargets => {
    if (!hoveredNodeId) return { nodes: new Set<string>(), edges: new Set<string>() }

    const highlightedNodes = new Set<string>([hoveredNodeId])
    const highlightedEdges = new Set<string>()

    edges.forEach(edge => {
      if (edge.source === hoveredNodeId) {
        highlightedNodes.add(edge.target)
        highlightedEdges.add(edge.id)
      }
      if (edge.target === hoveredNodeId) {
        highlightedNodes.add(edge.source)
        highlightedEdges.add(edge.id)
      }
    })

    return { nodes: highlightedNodes, edges: highlightedEdges }
  }, [hoveredNodeId, edges])

  const handleNodeHover = useCallback((nodeId: string | null) => {
    setHoveredNodeId(nodeId)
  }, [])

  return {
    hoveredNodeId,
    highlightTargets,
    handleNodeHover
  }
}