import React from 'react'
import { Edge, PositionedNode } from '@/types/graph'
import { GraphEdge } from './GraphEdge'

interface GraphEdgeListProps {
  edges: Edge[]
  nodeMap: Map<string, PositionedNode>
  nodeWidth: number
  nodeHeight: number
  edgeCurveOffsets: Map<string, number>
  highlightedEdges: Set<string>
  hoveredNodeId: string | null
}

export function GraphEdgeList({
  edges,
  nodeMap,
  nodeWidth,
  nodeHeight,
  edgeCurveOffsets,
  highlightedEdges,
  hoveredNodeId
}: GraphEdgeListProps) {
  return (
    <g>
      {edges.map(edge => {
        const sourceNode = nodeMap.get(edge.source)
        const targetNode = nodeMap.get(edge.target)
        
        if (!sourceNode || !targetNode) return null
        
        return (
          <GraphEdge
            key={edge.id}
            edge={edge}
            sourceNode={sourceNode}
            targetNode={targetNode}
            nodeWidth={nodeWidth}
            nodeHeight={nodeHeight}
            curveOffset={edgeCurveOffsets.get(edge.id) || 0}
            isHighlighted={highlightedEdges.has(edge.id)}
            isDimmed={hoveredNodeId !== null && !highlightedEdges.has(edge.id)}
            showAnimation={highlightedEdges.has(edge.id)}
          />
        )
      })}
    </g>
  )
}