import React from 'react'
import { PositionedNode } from '@/types/graph'
import { GraphNode } from './GraphNode'

interface GraphNodeListProps {
  nodes: PositionedNode[]
  nodeWidth: number
  nodeHeight: number
  labelOffsets: Map<string, number>
  highlightedNodes: Set<string>
  hoveredNodeId: string | null
  onNodeHover: (nodeId: string | null) => void
}

export function GraphNodeList({
  nodes,
  nodeWidth,
  nodeHeight,
  labelOffsets,
  highlightedNodes,
  hoveredNodeId,
  onNodeHover
}: GraphNodeListProps) {
  return (
    <g>
      {nodes.map(node => (
        <GraphNode 
          key={node.id} 
          node={node} 
          width={nodeWidth} 
          height={nodeHeight}
          labelOffset={labelOffsets.get(node.id) || 0}
          isHighlighted={highlightedNodes.has(node.id)}
          isHovered={hoveredNodeId === node.id}
          isDimmed={hoveredNodeId !== null && !highlightedNodes.has(node.id)}
          onHover={onNodeHover}
        />
      ))}
    </g>
  )
}