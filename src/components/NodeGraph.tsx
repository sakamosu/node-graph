'use client'

import React, { useMemo } from 'react'
import { Graph } from '@/types/graph'
import { GraphNode } from './GraphNode'
import { GraphEdge } from './GraphEdge'
import { calculateNodePositions } from '@/utils/layoutAlgorithm'

interface NodeGraphProps {
  graph: Graph
  width?: number
  height?: number
  compact?: boolean
  nodeWidth?: number
  nodeHeight?: number
  layoutMode?: 'hierarchical' | 'radial' | 'force' | 'auto'
}

export function NodeGraph({ graph, width = 800, height = 600, compact = false, nodeWidth = 80, nodeHeight = 40, layoutMode = 'auto' }: NodeGraphProps) {
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

  const viewBox = useMemo(() => {
    if (positionedGraph.nodes.length === 0) {
      return `0 0 ${width} ${height}`
    }

    let minX = Infinity
    let minY = Infinity
    let maxX = -Infinity
    let maxY = -Infinity

    positionedGraph.nodes.forEach(node => {
      const x = node.x || 0
      const y = node.y || 0
      const nodeRadius = Math.min(nodeWidth, nodeHeight) / 2
      const labelSpace = 20
      minX = Math.min(minX, x - nodeRadius)
      minY = Math.min(minY, y - nodeRadius)
      maxX = Math.max(maxX, x + nodeRadius)
      maxY = Math.max(maxY, y + nodeRadius + labelSpace)
    })

    const padding = 50
    const viewWidth = maxX - minX + padding * 2
    const viewHeight = maxY - minY + padding * 2
    const centerX = (minX + maxX) / 2
    const centerY = (minY + maxY) / 2

    return `${centerX - viewWidth / 2} ${centerY - viewHeight / 2} ${viewWidth} ${viewHeight}`
  }, [positionedGraph.nodes, nodeWidth, nodeHeight])

  const nodeMap = useMemo(() => {
    const map = new Map()
    positionedGraph.nodes.forEach(node => {
      map.set(node.id, node)
    })
    return map
  }, [positionedGraph.nodes])

  const edgeCurveOffsets = useMemo(() => {
    const offsets = new Map<string, number>()
    
    // Check if this is a triangular pattern
    const isTriangular = positionedGraph.nodes.length === 3 && positionedGraph.edges.length === 3
    
    if (isTriangular) {
      // For triangular patterns, use straight lines only
      positionedGraph.edges.forEach(edge => {
        offsets.set(edge.id, 0)
      })
    } else {
      // Original curve logic for non-triangular graphs
      const edgePairs = new Map<string, number>()
      
      positionedGraph.edges.forEach((edge, index) => {
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
  }, [positionedGraph.edges, positionedGraph.nodes, nodeMap])


  return (
    <svg
      width={width}
      height={height}
      viewBox={viewBox}
      style={{
        border: '1px solid #e0e0e0',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9',
      }}
    >
      <g>
        {positionedGraph.edges.map(edge => {
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
            />
          )
        })}
      </g>
      <g>
        {positionedGraph.nodes.map(node => (
          <GraphNode 
            key={node.id} 
            node={node} 
            width={nodeWidth} 
            height={nodeHeight} 
          />
        ))}
      </g>
    </svg>
  )
}