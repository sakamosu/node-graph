import { useState, useCallback, useRef } from 'react'
import { Position } from '@/types/graph'

interface UseZoomPanProps {
  onZoom?: (scale: number) => void
  onPan?: (offset: Position) => void
  minZoom?: number
  maxZoom?: number
}

export function useZoomPan({ 
  onZoom, 
  onPan, 
  minZoom = 0.1, 
  maxZoom = 5 
}: UseZoomPanProps) {
  const [scale, setScale] = useState(1)
  const [offset, setOffset] = useState<Position>({ x: 0, y: 0 })
  const [isPanning, setIsPanning] = useState(false)
  const [panStart, setPanStart] = useState<Position>({ x: 0, y: 0 })
  const svgRef = useRef<SVGSVGElement>(null)


  // パン開始（通常のドラッグで動作）
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if (e.button === 0) {
      e.preventDefault()
      setIsPanning(true)
      setPanStart({ x: e.clientX - offset.x, y: e.clientY - offset.y })
    }
  }, [offset])

  // パン中
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPanning) return

    const newOffset = {
      x: e.clientX - panStart.x,
      y: e.clientY - panStart.y
    }

    setOffset(newOffset)
    onPan?.(newOffset)
  }, [isPanning, panStart, onPan])

  // パン終了
  const handleMouseUp = useCallback(() => {
    setIsPanning(false)
  }, [])

  // ズームリセット
  const resetZoom = useCallback(() => {
    setScale(1)
    setOffset({ x: 0, y: 0 })
    onZoom?.(1)
    onPan?.({ x: 0, y: 0 })
  }, [onZoom, onPan])

  // ズームイン
  const zoomIn = useCallback(() => {
    const newScale = Math.min(maxZoom, scale * 1.2)
    setScale(newScale)
    onZoom?.(newScale)
  }, [scale, maxZoom, onZoom])

  // ズームアウト
  const zoomOut = useCallback(() => {
    const newScale = Math.max(minZoom, scale * 0.8)
    setScale(newScale)
    onZoom?.(newScale)
  }, [scale, minZoom, onZoom])


  // 変換文字列を生成
  const getTransform = () => {
    return `translate(${offset.x}, ${offset.y}) scale(${scale})`
  }

  return {
    svgRef,
    scale,
    offset,
    isPanning,
    handleMouseDown,
    handleMouseMove,
    handleMouseUp,
    resetZoom,
    zoomIn,
    zoomOut,
    getTransform
  }
}