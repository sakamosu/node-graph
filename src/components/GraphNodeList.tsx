import React from 'react'
import { PositionedNode, Node } from '@/types/graph'
import { GraphNode } from './GraphNode'

interface GraphNodeListProps {
  nodes: PositionedNode[]
  nodeWidth: number
  nodeHeight: number
  labelOffsets: Map<string, number>
  highlightedNodes: Set<string>
  hoveredNodeId: string | null
  onNodeHover: (nodeId: string | null) => void
  onNodeClick?: (node: Node) => void
}

export const GraphNodeList = React.memo<GraphNodeListProps>(function GraphNodeList({
  nodes,
  nodeWidth,
  nodeHeight,
  labelOffsets,
  highlightedNodes,
  hoveredNodeId,
  onNodeHover,
  onNodeClick
}) {
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
          onClick={onNodeClick}
        />
      ))}
    </g>
  )
})