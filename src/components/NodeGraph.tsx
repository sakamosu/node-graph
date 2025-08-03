'use client'

import React, { useMemo, useState, useCallback } from 'react'
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
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null)

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
  }, [positionedGraph.nodes, nodeWidth, nodeHeight, width, height])

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
      
      positionedGraph.edges.forEach((edge) => {
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

  // ホバー時のハイライト対象を計算
  const highlightTargets = useMemo(() => {
    if (!hoveredNodeId) return { nodes: new Set<string>(), edges: new Set<string>() }

    const highlightedNodes = new Set<string>([hoveredNodeId])
    const highlightedEdges = new Set<string>()

    positionedGraph.edges.forEach(edge => {
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
  }, [hoveredNodeId, positionedGraph.edges])

  const handleNodeHover = useCallback((nodeId: string | null) => {
    setHoveredNodeId(nodeId)
  }, [])

  const labelOffsets = useMemo(() => {
    const offsets = new Map<string, number>()
    
    // ノードをy座標でグループ化
    const nodeGroups = new Map<number, Array<{ id: string, x: number }>>()
    
    positionedGraph.nodes.forEach(node => {
      const y = Math.round((node.y || 0) / 10) * 10 // 10px単位でグループ化
      if (!nodeGroups.has(y)) {
        nodeGroups.set(y, [])
      }
      nodeGroups.get(y)!.push({ id: node.id, x: node.x || 0 })
    })
    
    // 各グループ内でラベルの重複を避ける
    nodeGroups.forEach(nodesInGroup => {
      if (nodesInGroup.length <= 1) return
      
      // x座標でソート
      nodesInGroup.sort((a, b) => a.x - b.x)
      
      // 隣接ノード間の距離をチェック
      for (let i = 0; i < nodesInGroup.length - 1; i++) {
        const current = nodesInGroup[i]
        const next = nodesInGroup[i + 1]
        const distance = Math.abs(next.x - current.x)
        
        // ノード間距離が小さい場合、ラベルオフセットを適用
        if (distance < 80) { // ラベル重複の閾値
          const offsetAmount = 15
          offsets.set(current.id, i % 2 === 0 ? 0 : offsetAmount)
          offsets.set(next.id, (i + 1) % 2 === 0 ? 0 : offsetAmount)
        }
      }
    })
    
    return offsets
  }, [positionedGraph.nodes])


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
              isHighlighted={highlightTargets.edges.has(edge.id)}
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
            labelOffset={labelOffsets.get(node.id) || 0}
            isHighlighted={highlightTargets.nodes.has(node.id)}
            onHover={handleNodeHover}
          />
        ))}
      </g>
    </svg>
  )
}