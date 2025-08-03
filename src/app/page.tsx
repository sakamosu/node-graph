import { NodeGraph } from '@/components/NodeGraph'
import {
  sampleGraph,
  complexGraph,
  collisionTestGraph,
  webArchitectureGraph,
  minimalGraph,
  linearChainGraph,
  binaryTreeGraph,
  circularGraph,
  starTopologyGraph,
  microservicesGraph,
  dataPipelineGraph,
  componentGraph,
} from '@/data/sampleGraphs'

export default function Home() {

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
          Dependencies node graph
        </h1>
        <h2 style={{ 
          fontSize: '1.5rem', 
          marginBottom: '2rem',
          color: '#333',
        }}>
          Simple Graph
        </h2>
        <NodeGraph graph={sampleGraph} />
        <div style={{ 
          marginTop: '1rem',
          textAlign: 'center',
          color: '#666',
        }}>
          <p>Display dependencies between X→Y, Y→Z, and X→Z</p>
        </div>
      </section>

      <section style={{ textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          marginBottom: '2rem',
          color: '#333',
        }}>
          Complex Network
        </h2>
        <NodeGraph graph={complexGraph} compact={false} layoutMode="auto" />
        <div style={{ 
          marginTop: '1rem',
          textAlign: 'center',
          color: '#666',
        }}>
          <p>Complex interrelationships between 12 nodes</p>
        </div>
      </section>

      <section style={{ textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          marginBottom: '2rem',
          color: '#333',
        }}>
          Branch Network
        </h2>
        <NodeGraph graph={collisionTestGraph} compact={false} />
        <div style={{ 
          marginTop: '1rem',
          textAlign: 'center',
          color: '#666',
        }}>
          <p>Connection patterns to multiple terminals branching from the core</p>
        </div>
      </section>

      <section style={{ textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          marginBottom: '2rem',
          color: '#333',
        }}>
          Game Architecture
        </h2>
        <NodeGraph graph={webArchitectureGraph} compact={false} />
        <div style={{ 
          marginTop: '1rem',
          textAlign: 'center',
          color: '#666',
        }}>
          <p>Multiplayer game system with 22 nodes and 33 edges</p>
        </div>
      </section>

      <section style={{ textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          marginBottom: '2rem',
          color: '#333',
        }}>
          Minimal Graph
        </h2>
        <NodeGraph graph={minimalGraph} />
        <div style={{ 
          marginTop: '1rem',
          textAlign: 'center',
          color: '#666',
        }}>
          <p>Simplest possible graph with just two connected nodes</p>
        </div>
      </section>

      <section style={{ textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          marginBottom: '2rem',
          color: '#333',
        }}>
          Linear Chain
        </h2>
        <NodeGraph graph={linearChainGraph} />
        <div style={{ 
          marginTop: '1rem',
          textAlign: 'center',
          color: '#666',
        }}>
          <p>Sequential process flow from Step 1 to Step 5</p>
        </div>
      </section>

      <section style={{ textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          marginBottom: '2rem',
          color: '#333',
        }}>
          Binary Tree
        </h2>
        <NodeGraph graph={binaryTreeGraph} />
        <div style={{ 
          marginTop: '1rem',
          textAlign: 'center',
          color: '#666',
        }}>
          <p>Hierarchical structure with binary branches</p>
        </div>
      </section>

      <section style={{ textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          marginBottom: '2rem',
          color: '#333',
        }}>
          Circular Dependencies
        </h2>
        <NodeGraph graph={circularGraph} />
        <div style={{ 
          marginTop: '1rem',
          textAlign: 'center',
          color: '#666',
        }}>
          <p>Module dependencies with a circular reference</p>
        </div>
      </section>

      <section style={{ textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          marginBottom: '2rem',
          color: '#333',
        }}>
          Star Topology
        </h2>
        <NodeGraph graph={starTopologyGraph} compact={false} />
        <div style={{ 
          marginTop: '1rem',
          textAlign: 'center',
          color: '#666',
        }}>
          <p>Central hub connected to multiple peripheral nodes</p>
        </div>
      </section>

      <section style={{ textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          marginBottom: '2rem',
          color: '#333',
        }}>
          Microservices Architecture
        </h2>
        <NodeGraph graph={microservicesGraph} compact={false} />
        <div style={{ 
          marginTop: '1rem',
          textAlign: 'center',
          color: '#666',
        }}>
          <p>Service dependencies with databases and message queues</p>
        </div>
      </section>

      <section style={{ textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          marginBottom: '2rem',
          color: '#333',
        }}>
          Data Pipeline
        </h2>
        <NodeGraph graph={dataPipelineGraph} compact={false} />
        <div style={{ 
          marginTop: '1rem',
          textAlign: 'center',
          color: '#666',
        }}>
          <p>ETL process from multiple sources to visualization</p>
        </div>
      </section>

      <section style={{ textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          marginBottom: '2rem',
          color: '#333',
        }}>
          React Component Tree
        </h2>
        <NodeGraph graph={componentGraph} compact={false} />
        <div style={{ 
          marginTop: '1rem',
          textAlign: 'center',
          color: '#666',
        }}>
          <p>Component hierarchy in a React application</p>
        </div>
      </section>
    </main>
  )
}
