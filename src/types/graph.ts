// ノードの形状タイプ
export type NodeShape = 'circle' | 'rectangle' | 'ellipse' | 'diamond' | 'hexagon'

// ノードのサイズ定義
export interface NodeSize {
  width: number
  height: number
}

// ノードのスタイル定義
export interface NodeStyle {
  backgroundColor?: string
  borderColor?: string
  borderWidth?: number
  textColor?: string
  fontSize?: number
  fontWeight?: 'normal' | 'bold' | 'light'
  opacity?: number
  shadow?: boolean
}

// ノードのメタデータ
export interface NodeMetadata {
  shape?: NodeShape
  size?: NodeSize
  style?: NodeStyle
  category?: string
  description?: string
  tags?: string[]
  data?: Record<string, unknown>
}

export interface Node {
  id: string
  label: string
  x?: number
  y?: number
  metadata?: NodeMetadata
}

// エッジの曲線タイプ
export type EdgeCurveType = 'straight' | 'curved' | 'step' | 'bezier'

// 矢印のスタイル
export type ArrowStyle = 'none' | 'arrow' | 'diamond' | 'circle' | 'square'

// エッジのスタイル定義
export interface EdgeStyle {
  strokeColor?: string
  strokeWidth?: number
  strokeDashArray?: string
  opacity?: number
  animated?: boolean
}

// エッジのメタデータ
export interface EdgeMetadata {
  curveType?: EdgeCurveType
  arrowStart?: ArrowStyle
  arrowEnd?: ArrowStyle
  style?: EdgeStyle
  label?: string
  weight?: number
  category?: string
  data?: Record<string, unknown>
}

export interface Edge {
  id: string
  source: string
  target: string
  metadata?: EdgeMetadata
}

// レイアウトアルゴリズムの設定
export interface LayoutConfig {
  algorithm: 'hierarchical' | 'radial' | 'force' | 'auto'
  spacing?: {
    node?: number
    level?: number
    edge?: number
  }
  direction?: 'top-bottom' | 'left-right' | 'bottom-top' | 'right-left'
  iterations?: number
  forceStrength?: number
}

// グラフ全体のメタデータ
export interface GraphMetadata {
  title?: string
  description?: string
  layout?: LayoutConfig
  theme?: {
    backgroundColor?: string
    gridVisible?: boolean
    gridColor?: string
  }
  viewport?: {
    centerX?: number
    centerY?: number
    scale?: number
  }
  version?: string
  createdAt?: Date
  updatedAt?: Date
}

export interface Graph {
  nodes: Node[]
  edges: Edge[]
  metadata?: GraphMetadata
}

export interface Position {
  x: number
  y: number
}

// 位置情報付きのノード（レイアウト計算後）
export interface PositionedNode extends Node {
  x: number
  y: number
}

// グラフのインタラクションハンドラー
export interface GraphInteractionHandlers {
  onNodeClick?: (node: Node) => void
  onNodeDrag?: (node: Node, position: Position) => void
  onZoom?: (scale: number) => void
  onPan?: (offset: Position) => void
}