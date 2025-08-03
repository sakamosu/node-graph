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
}

export function NodeGraph({ graph, width = 800, height = 600 }: NodeGraphProps) {
  const positionedGraph = useMemo(() => {
    return calculateNodePositions(graph)
  }, [graph])

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
      minX = Math.min(minX, x - 40)
      minY = Math.min(minY, y - 20)
      maxX = Math.max(maxX, x + 40)
      maxY = Math.max(maxY, y + 20)
    })

    const padding = 50
    const viewWidth = maxX - minX + padding * 2
    const viewHeight = maxY - minY + padding * 2
    const centerX = (minX + maxX) / 2
    const centerY = (minY + maxY) / 2

    return `${centerX - viewWidth / 2} ${centerY - viewHeight / 2} ${viewWidth} ${viewHeight}`
  }, [positionedGraph.nodes])

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

  const edgeDistribution = useMemo(() => {
    const fromSourceCount = new Map<string, number>()
    const toTargetCount = new Map<string, number>()
    const fromSourceIndexes = new Map<string, Map<string, number>>()
    const toTargetIndexes = new Map<string, Map<string, number>>()
    
    // Check if this is a triangular pattern
    const isTriangular = positionedGraph.nodes.length === 3 && positionedGraph.edges.length === 3
    
    if (isTriangular) {
      // For triangular patterns, don't distribute edges - use center attachment
      positionedGraph.edges.forEach(edge => {
        fromSourceCount.set(edge.source, 1)
        toTargetCount.set(edge.target, 1)
        
        if (!fromSourceIndexes.has(edge.source)) {
          fromSourceIndexes.set(edge.source, new Map())
        }
        fromSourceIndexes.get(edge.source)!.set(edge.id, 0)
        
        if (!toTargetIndexes.has(edge.target)) {
          toTargetIndexes.set(edge.target, new Map())
        }
        toTargetIndexes.get(edge.target)!.set(edge.id, 0)
      })
    } else {
      // Original distribution logic for non-triangular graphs
      // Count edges from each source and to each target
      positionedGraph.edges.forEach(edge => {
        fromSourceCount.set(edge.source, (fromSourceCount.get(edge.source) || 0) + 1)
        toTargetCount.set(edge.target, (toTargetCount.get(edge.target) || 0) + 1)
      })
      
      // Assign indexes for each edge
      positionedGraph.edges.forEach((edge, globalIndex) => {
        // Index for edges from the same source
        if (!fromSourceIndexes.has(edge.source)) {
          fromSourceIndexes.set(edge.source, new Map())
        }
        const sourceEdgeIndex = fromSourceIndexes.get(edge.source)!.size
        fromSourceIndexes.get(edge.source)!.set(edge.id, sourceEdgeIndex)
        
        // Index for edges to the same target
        if (!toTargetIndexes.has(edge.target)) {
          toTargetIndexes.set(edge.target, new Map())
        }
        const targetEdgeIndex = toTargetIndexes.get(edge.target)!.size
        toTargetIndexes.get(edge.target)!.set(edge.id, targetEdgeIndex)
      })
    }
    
    return { fromSourceCount, toTargetCount, fromSourceIndexes, toTargetIndexes }
  }, [positionedGraph.edges, positionedGraph.nodes])

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
              nodeWidth={80}
              nodeHeight={40}
              curveOffset={edgeCurveOffsets.get(edge.id) || 0}
            />
          )
        })}
      </g>
      <g>
        {positionedGraph.nodes.map(node => (
          <GraphNode key={node.id} node={node} />
        ))}
      </g>
    </svg>
  )
}