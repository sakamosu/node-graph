import { NodeGraph } from '@/components/NodeGraph'
import { Graph } from '@/types/graph'

export default function Home() {
  const sampleGraph: Graph = {
    nodes: [
      { id: 'node-A', label: 'A' },
      { id: 'node-B', label: 'B' },
      { id: 'node-C', label: 'C' },
      { id: 'node-D', label: 'D' },
    ],
    edges: [
      { id: 'edge-1', source: 'node-A', target: 'node-B' },
      { id: 'edge-2', source: 'node-B', target: 'node-C' },
      { id: 'edge-4', source: 'node-A', target: 'node-D' },
      { id: 'edge-5', source: 'node-C', target: 'node-D' },
    ],
  }

  const complexGraph: Graph = {
    nodes: [
      { id: '1:1a', label: '1:1a' },
      { id: '1:1b', label: '1:1b' },
      { id: '1:2', label: '1:2' },
      { id: '1:2a', label: '1:2a' },
      { id: '1:2b', label: '1:2b' },
      { id: '1:3a', label: '1:3a' },
      { id: '1:3b', label: '1:3b' },
      { id: '1:3c', label: '1:3c' },
      { id: 'node-A', label: 'A' },
      { id: 'node-B', label: 'B' },
      { id: 'node-C', label: 'C' },
      { id: 'node-D', label: 'D' },
    ],
    edges: [
      { id: 'e1', source: '1:1a', target: '1:1b' },
      { id: 'e2', source: '1:1b', target: '1:2' },
      { id: 'e3', source: '1:2', target: '1:2a' },
      { id: 'e4', source: '1:2', target: '1:2b' },
      { id: 'e5', source: '1:3a', target: '1:3b' },
      { id: 'e6', source: '1:3a', target: '1:3c' },
      { id: 'edge-1', source: 'node-A', target: 'node-B' },
      { id: 'edge-2', source: 'node-B', target: 'node-C' },
      { id: 'edge-4', source: 'node-A', target: 'node-D' },
      { id: 'edge-5', source: 'node-C', target: 'node-D' },
      { id: 'edge-6', source: '1:2', target: 'node-D' },
      { id: 'edge-7', source: '1:1b', target: 'node-B' },
      { id: 'edge-8', source: '1:3a', target: 'node-D' },
      { id: 'edge-9', source: '1:1a', target: 'node-B' },

    ],
  }

  return (
    <main style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      padding: '2rem',
      gap: '3rem',
    }}>
      <section style={{ textAlign: 'center' }}>
        <h1 style={{ 
          fontSize: '2rem', 
          marginBottom: '2rem',
          color: '#333',
        }}>
          依存関係ノードグラフ - シンプルな例
        </h1>
        <NodeGraph graph={sampleGraph} />
        <div style={{ 
          marginTop: '1rem',
          textAlign: 'center',
          color: '#666',
        }}>
          <p>A → B, B → C, A → C の依存関係を表示</p>
        </div>
      </section>

      <section style={{ textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          marginBottom: '2rem',
          color: '#333',
        }}>
          複雑なグラフの例
        </h2>
        <NodeGraph graph={complexGraph} />
        <div style={{ 
          marginTop: '1rem',
          textAlign: 'center',
          color: '#666',
        }}>
          <p>図のような複雑な依存関係でも自動調整されます</p>
        </div>
      </section>
    </main>
  )
}