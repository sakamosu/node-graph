import { useMemo } from 'react'
import { PositionedNode } from '@/types/graph'

interface UseNodeMapProps {
  nodes: PositionedNode[]
}

export function useNodeMap({ nodes }: UseNodeMapProps) {
  return useMemo(() => {
    const map = new Map<string, PositionedNode>()
    nodes.forEach(node => {
      map.set(node.id, node)
    })
    return map
  }, [nodes])
}