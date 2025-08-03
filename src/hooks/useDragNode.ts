import { useState, useCallback, useRef } from 'react'
import { Node, Position } from '@/types/graph'

interface UseDragNodeProps {
  onNodeDrag?: (node: Node, position: Position) => void
}

export function useDragNode({ onNodeDrag }: UseDragNodeProps) {
  const [draggingNode, setDraggingNode] = useState<Node | null>(null)
  const [dragOffset, setDragOffset] = useState<Position>({ x: 0, y: 0 })
  const svgRef = useRef<SVGSVGElement>(null)

  const handleMouseDown = useCallback((e: React.MouseEvent, node: Node) => {
    e.preventDefault()
    e.stopPropagation()
    
    const svg = svgRef.current
    if (!svg) return

    const pt = svg.createSVGPoint()
    pt.x = e.clientX
    pt.y = e.clientY
    const svgP = pt.matrixTransform(svg.getScreenCTM()?.inverse())

    setDragOffset({
      x: svgP.x - (node.x || 0),
      y: svgP.y - (node.y || 0)
    })
    setDraggingNode(node)
  }, [])

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!draggingNode || !svgRef.current) return

    const svg = svgRef.current
    const pt = svg.createSVGPoint()
    pt.x = e.clientX
    pt.y = e.clientY
    const svgP = pt.matrixTransform(svg.getScreenCTM()?.inverse())

    const newPosition: Position = {
      x: svgP.x - dragOffset.x,
      y: svgP.y - dragOffset.y
    }

    onNodeDrag?.(draggingNode, newPosition)
  }, [draggingNode, dragOffset, onNodeDrag])

  const handleMouseUp = useCallback(() => {
    setDraggingNode(null)
  }, [])

  return {
    svgRef,
    draggingNode,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp
  }
}