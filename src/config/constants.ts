export const GRAPH_CONSTANTS = {
  node: {
    defaultWidth: 120,
    defaultHeight: 60,
    radiusRatio: 0.7, // ノード半径の計算比率
    labelSpacing: 20, // ラベルとノードの間隔（px）
    fontSize: 14,
    padding: {
      horizontal: 16,
      vertical: 8,
    },
  },
  edge: {
    strokeWidth: 2,
    arrowSize: 10,
    curveOffset: 50, // 曲線エッジのオフセット
  },
  layout: {
    canvasPadding: 50, // キャンバスの余白（px）
    hierarchical: {
      levelHeight: 100, // 階層間の高さ（px）
      nodeSpacing: 50, // 同一階層内のノード間隔（px）
    },
    radial: {
      radiusIncrement: 100, // 放射状レイアウトの半径増分（px）
      minAngleSpacing: 0.3, // 最小角度間隔（ラジアン）
    },
    forceDirected: {
      iterations: 100, // シミュレーション反復回数
      repulsionForce: 1000, // 反発力の係数
      attractionForce: 0.1, // 引力の係数
      damping: 0.9, // 減衰係数
      minDistance: 50, // 最小ノード間距離（px）
    },
  },
  animation: {
    duration: 300, // アニメーション時間（ms）
  },
} as const;