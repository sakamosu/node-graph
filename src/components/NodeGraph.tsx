'use client'

import React, { useMemo } from 'react'
import { Graph, GraphInteractionHandlers } from '@/types/graph'
import { GraphNodeList } from './GraphNodeList'
import { GraphEdgeList } from './GraphEdgeList'
import { calculateNodePositions } from '@/utils/layoutAlgorithm'
import { colors } from '@/utils/colors'
import { useViewBox } from '@/hooks/useViewBox'
import { useEdgeCurveOffsets } from '@/hooks/useEdgeCurveOffsets'
import { useLabelOffsets } from '@/hooks/useLabelOffsets'
import { useGraphHighlight } from '@/hooks/useGraphHighlight'
import { useNodeMap } from '@/hooks/useNodeMap'
import { useZoomPan } from '@/hooks/useZoomPan'
import { ZoomControls } from './ZoomControls'

interface NodeGraphProps {
  graph: Graph
  width?: number
  height?: number
  compact?: boolean
  nodeWidth?: number
  nodeHeight?: number
  layoutMode?: 'hierarchical' | 'radial' | 'force' | 'auto'
  handlers?: GraphInteractionHandlers
}

export function NodeGraph({ graph, width = 800, height = 600, compact = false, nodeWidth = 80, nodeHeight = 40, layoutMode = 'auto', handlers }: NodeGraphProps) {
  const positionedGraph = useMemo(() => {
    return calculateNodePositions(graph, {
      nodeWidth,
      nodeHeight,
      horizontalSpacing: compact ? 100 : 150,
      verticalSpacing: compact ? 80 : 100,
      compactMode: compact,
      maxWidth: width * 1.5,
      minNodeSpacing: compact ? 50 : 60,
      enableCollisionAvoidance: false, // Temporarily disabled
      layoutMode,
    })
  }, [graph, compact, width, nodeWidth, nodeHeight, layoutMode])

  // カスタムフックを使用してロジックを分離
  const nodeMap = useNodeMap({ nodes: positionedGraph.nodes })
  const viewBox = useViewBox({ 
    nodes: positionedGraph.nodes, 
    nodeWidth, 
    nodeHeight, 
    width, 
    height 
  })
  const edgeCurveOffsets = useEdgeCurveOffsets({ 
    edges: positionedGraph.edges, 
    nodes: positionedGraph.nodes, 
    nodeMap 
  })
  const labelOffsets = useLabelOffsets({ nodes: positionedGraph.nodes })
  const { hoveredNodeId, highlightTargets, handleNodeHover } = useGraphHighlight({ 
    edges: positionedGraph.edges 
  })
  const zoomPan = useZoomPan({
    onZoom: handlers?.onZoom,
    onPan: handlers?.onPan
  })


  return (
    <div style={{ position: 'relative', width, height }}>
      <svg
      ref={zoomPan.svgRef}
      width={width}
      height={height}
      viewBox={viewBox}
      style={{
        border: `1px solid ${colors.ui.panel.border}`,
        borderRadius: '8px',
        backgroundColor: colors.ui.panel.background,
        cursor: zoomPan.isPanning ? 'grabbing' : 'grab',
      }}
      onMouseDown={zoomPan.handleMouseDown}
      onMouseMove={zoomPan.handleMouseMove}
      onMouseUp={zoomPan.handleMouseUp}
      onMouseLeave={zoomPan.handleMouseUp}
    >
      <g transform={zoomPan.getTransform()}>
        <GraphEdgeList
          edges={positionedGraph.edges}
          nodeMap={nodeMap}
          nodeWidth={nodeWidth}
          nodeHeight={nodeHeight}
          edgeCurveOffsets={edgeCurveOffsets}
          highlightedEdges={highlightTargets.edges}
          hoveredNodeId={hoveredNodeId}
        />
        <GraphNodeList
          nodes={positionedGraph.nodes}
          nodeWidth={nodeWidth}
          nodeHeight={nodeHeight}
          labelOffsets={labelOffsets}
          highlightedNodes={highlightTargets.nodes}
          hoveredNodeId={hoveredNodeId}
          onNodeHover={handleNodeHover}
          onNodeClick={handlers?.onNodeClick}
        />
      </g>
    </svg>
      <ZoomControls
        onZoomIn={zoomPan.zoomIn}
        onZoomOut={zoomPan.zoomOut}
        onResetZoom={zoomPan.resetZoom}
        scale={zoomPan.scale}
      />
    </div>
  )
}