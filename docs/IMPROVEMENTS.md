# Node Graph 改善提案書

このドキュメントは、Node Graphアプリケーションのコードベース分析に基づく改善提案をまとめたものです。

## 目次

1. [構造的な改善点](#1-構造的な改善点)
2. [パフォーマンスの改善点](#2-パフォーマンスの改善点)
3. [保守性の改善点](#3-保守性の改善点)
4. [機能面の改善点](#4-機能面の改善点)
5. [コードの重複と最適化](#5-コードの重複と最適化)
6. [テストとドキュメンテーション](#6-テストとドキュメンテーション)
7. [具体的な改善提案](#7-具体的な改善提案)

## 1. 構造的な改善点

### 状態管理の分散

現状の問題点：
- ホバー状態が`NodeGraph`コンポーネント内でのみ管理されている
- グラフの選択状態が`page.tsx`にハードコーディングされている
- レイアウトモードの切り替えUIが存在しない

改善案：
- Context APIまたはZustandなどの状態管理ライブラリの導入
- グラフ選択とレイアウトモードのグローバル状態管理
- 設定パネルコンポーネントの追加

## 2. パフォーマンスの改善点

## 3. 保守性の改善点

### マジックナンバーの多用

現状の問題点：
```typescript
const baseRadius = Math.min(nodeWidth, nodeHeight) / 2 * 0.7  // 0.7の意味が不明
const labelSpace = 20  // 20pxの根拠が不明
const padding = 50  // 50pxの根拠が不明
```

改善案：
```typescript
// config/constants.ts
export const GRAPH_CONSTANTS = {
  NODE: {
    RADIUS_RATIO: 0.7,  // ノード半径の計算比率
    LABEL_SPACING: 20,  // ラベルとノードの間隔
  },
  LAYOUT: {
    CANVAS_PADDING: 50,  // キャンバスの余白
  }
}
```

### エラーハンドリングの欠如

現状の問題点：
- ノードやエッジが見つからない場合の処理が不十分
- 無効なグラフ構造（循環参照など）のチェックがない

改善案：
- グラフ検証ユーティリティの追加
- エラーバウンダリの実装
- ユーザーへのエラー通知機能

## 4. 機能面の改善点

### インタラクティブ性

欠けている機能：
- ノードのドラッグ＆ドロップ
- ズーム・パン機能
- ノードクリック時のイベントハンドリング

実装提案：
```typescript
interface GraphInteractionHandlers {
  onNodeClick?: (node: Node) => void
  onNodeDrag?: (node: Node, position: Position) => void
  onZoom?: (scale: number) => void
  onPan?: (offset: Position) => void
}
```

### カスタマイズ性

現状の制限：
- ノードの形状が円のみ
- エッジのスタイルが限定的
- カラーテーマのカスタマイズができない

改善案：
- ノード形状の拡張（四角、ダイヤモンド、カスタムSVG）
- エッジスタイルの拡張（点線、太さ、アニメーション）
- テーマシステムの実装

### アクセシビリティ

現状の問題点：
- キーボードナビゲーションがない
- スクリーンリーダー対応が不十分
- `aria-label`などの属性が不足

改善案：
```typescript
// アクセシビリティ属性の追加
<g
  role="img"
  aria-label={`Node: ${node.label}`}
  tabIndex={0}
  onKeyDown={handleKeyNavigation}
>
```

## 5. コードの重複と最適化

### レイアウトアルゴリズムの重複

現状の問題点：
- 同じパターンのコードが複数箇所に存在
- DRY原則に違反

改善案：
- 共通処理のユーティリティ関数化
- 高階関数による抽象化
- ストラテジーパターンの適用

### SVG要素の非効率な描画

現状の問題点：
- アニメーション要素が常にレンダリングされている
- 透明な要素も描画されている

改善案：
- 条件付きレンダリング
- React.Fragmentの活用
- 仮想化の導入（大規模グラフ対応）

## 6. テストとドキュメンテーション

### テストの欠如

必要なテスト：
- ユニットテスト（レイアウトアルゴリズム、ユーティリティ関数）
- インテグレーションテスト（コンポーネント間の連携）
- E2Eテスト（ユーザーインタラクション）
- パフォーマンステスト（大規模グラフ）

実装提案：
```json
// package.jsonに追加
{
  "scripts": {
    "test": "jest",
    "test:e2e": "cypress run",
    "test:perf": "lighthouse"
  }
}
```

### ドキュメンテーションの不足

必要なドキュメント：
- APIリファレンス
- 使用例とサンプルコード
- コントリビューションガイド
- アーキテクチャ説明書

JSDocの追加例：
```typescript
/**
 * グラフのノード位置を計算する
 * @param graph - 入力グラフデータ
 * @param options - レイアウトオプション
 * @returns 位置情報を含むグラフデータ
 */
export function calculateNodePositions(
  graph: Graph,
  options: LayoutOptions
): Graph {
  // ...
}
```

## 7. 具体的な改善提案

### カスタムフックの導入

```typescript
// hooks/useGraphInteraction.ts
export const useGraphInteraction = (initialGraph: Graph) => {
  const [hoveredNode, setHoveredNode] = useState<string | null>(null)
  const [selectedNodes, setSelectedNodes] = useState<Set<string>>(new Set())
  const [draggedNode, setDraggedNode] = useState<string | null>(null)
  
  // インタラクションハンドラー
  const handleNodeHover = useCallback((nodeId: string | null) => {
    setHoveredNode(nodeId)
  }, [])
  
  return {
    hoveredNode,
    selectedNodes,
    draggedNode,
    handleNodeHover,
    // その他のハンドラー
  }
}

// hooks/useGraphLayout.ts
export const useGraphLayout = (graph: Graph, options: LayoutOptions) => {
  const positionedGraph = useMemo(() => {
    return calculateNodePositions(graph, options)
  }, [graph, options])
  
  const viewBox = useMemo(() => {
    return calculateViewBox(positionedGraph.nodes)
  }, [positionedGraph.nodes])
  
  return {
    positionedGraph,
    viewBox,
  }
}
```

### コンポーネントの分割

```typescript
// components/GraphViewBox.tsx
export const GraphViewBox: React.FC<GraphViewBoxProps> = ({ nodes, padding }) => {
  // viewBox計算専用のコンポーネント
}

// components/GraphInteractionLayer.tsx
export const GraphInteractionLayer: React.FC<GraphInteractionLayerProps> = ({ 
  onNodeClick,
  onNodeDrag,
  onZoom,
  onPan 
}) => {
  // インタラクション処理専用のレイヤー
}

// components/GraphRenderer.tsx
export const GraphRenderer: React.FC<GraphRendererProps> = ({ 
  nodes,
  edges,
  nodeComponent,
  edgeComponent 
}) => {
  // 純粋な描画処理
}
```

### 設定の外部化

```typescript
// config/graphConfig.ts
export const GRAPH_CONFIG = {
  node: {
    defaultRadius: 0.7,
    hoverScale: 1.3,
    labelOffset: 16,
    transitionDuration: '0.3s',
  },
  edge: {
    arrowSize: 0.5,
    curveControlDistance: 0.4,
    strokeWidth: {
      normal: 1,
      dimmed: 0.5,
      highlighted: 2,
    },
  },
  layout: {
    padding: 50,
    horizontalSpacing: 150,
    verticalSpacing: 100,
    compactModeRatio: 0.7,
  },
  animation: {
    dotCount: 4,
    dotDuration: '2.5s',
    dotDelay: 0.625,
  },
}
```

### パフォーマンス最適化

```typescript
// components/OptimizedGraphNode.tsx
export const OptimizedGraphNode = React.memo<GraphNodeProps>(({ 
  node,
  ...props 
}) => {
  return <GraphNode node={node} {...props} />
}, (prevProps, nextProps) => {
  // カスタム比較関数で不要な再レンダリングを防ぐ
  return (
    prevProps.node.x === nextProps.node.x &&
    prevProps.node.y === nextProps.node.y &&
    prevProps.isHighlighted === nextProps.isHighlighted &&
    prevProps.isHovered === nextProps.isHovered &&
    prevProps.isDimmed === nextProps.isDimmed
  )
})

// workers/layoutWorker.ts
// Web Workerでレイアウト計算を並列化
self.addEventListener('message', (event) => {
  const { graph, options } = event.data
  const result = calculateNodePositions(graph, options)
  self.postMessage(result)
})
```

## まとめ

これらの改善を段階的に実装することで、Node Graphアプリケーションは以下の点で向上します：

1. **コードの品質**: より保守性が高く、拡張しやすい構造
2. **パフォーマンス**: 大規模グラフでも高速に動作
3. **ユーザビリティ**: より直感的で使いやすいインターフェース
4. **アクセシビリティ**: すべてのユーザーが利用可能
5. **開発体験**: テストとドキュメントによる開発効率の向上

優先度の高い改善から着手し、継続的にアプリケーションを改善していくことを推奨します。
