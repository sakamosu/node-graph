import { NodeGraph } from '@/components/NodeGraph'
import { colors } from '@/utils/colors'
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
  gitWorkflowGraph,
  socialNetworkGraph,
  blockchainGraph,
  layeredArchitectureGraph,
  typescriptModuleDependencyGraph,
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
          color: colors.ui.text.primary,
        }}>
          Dependencies node graph
        </h1>
        <h2 style={{ 
          fontSize: '1.5rem', 
          marginBottom: '2rem',
          color: colors.ui.text.primary,
        }}>
          Simple Graph
        </h2>
        <NodeGraph graph={sampleGraph} />
        <div style={{ 
          marginTop: '1rem',
          textAlign: 'center',
          color: colors.ui.text.secondary,
        }}>
          <p>Display dependencies between X→Y, Y→Z, and X→Z</p>
        </div>
      </section>

      <section style={{ textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          marginBottom: '2rem',
          color: colors.ui.text.primary,
        }}>
          Complex Network
        </h2>
        <NodeGraph graph={complexGraph} compact={false} layoutMode="auto" />
        <div style={{ 
          marginTop: '1rem',
          textAlign: 'center',
          color: colors.ui.text.secondary,
        }}>
          <p>Complex interrelationships between 12 nodes</p>
        </div>
      </section>

      <section style={{ textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          marginBottom: '2rem',
          color: colors.ui.text.primary,
        }}>
          Branch Network
        </h2>
        <NodeGraph graph={collisionTestGraph} compact={false} />
        <div style={{ 
          marginTop: '1rem',
          textAlign: 'center',
          color: colors.ui.text.secondary,
        }}>
          <p>Connection patterns to multiple terminals branching from the core</p>
        </div>
      </section>

      <section style={{ textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          marginBottom: '2rem',
          color: colors.ui.text.primary,
        }}>
          Game Architecture
        </h2>
        <NodeGraph graph={webArchitectureGraph} compact={false} />
        <div style={{ 
          marginTop: '1rem',
          textAlign: 'center',
          color: colors.ui.text.secondary,
        }}>
          <p>Multiplayer game system with 22 nodes and 33 edges</p>
        </div>
      </section>

      <section style={{ textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          marginBottom: '2rem',
          color: colors.ui.text.primary,
        }}>
          Minimal Graph
        </h2>
        <NodeGraph graph={minimalGraph} />
        <div style={{ 
          marginTop: '1rem',
          textAlign: 'center',
          color: colors.ui.text.secondary,
        }}>
          <p>Simplest possible graph with just two connected nodes</p>
        </div>
      </section>

      <section style={{ textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          marginBottom: '2rem',
          color: colors.ui.text.primary,
        }}>
          Linear Chain
        </h2>
        <NodeGraph graph={linearChainGraph} />
        <div style={{ 
          marginTop: '1rem',
          textAlign: 'center',
          color: colors.ui.text.secondary,
        }}>
          <p>Sequential process flow from Step 1 to Step 5</p>
        </div>
      </section>

      <section style={{ textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          marginBottom: '2rem',
          color: colors.ui.text.primary,
        }}>
          Binary Tree
        </h2>
        <NodeGraph graph={binaryTreeGraph} />
        <div style={{ 
          marginTop: '1rem',
          textAlign: 'center',
          color: colors.ui.text.secondary,
        }}>
          <p>Hierarchical structure with binary branches</p>
        </div>
      </section>

      <section style={{ textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          marginBottom: '2rem',
          color: colors.ui.text.primary,
        }}>
          Circular Dependencies
        </h2>
        <NodeGraph graph={circularGraph} />
        <div style={{ 
          marginTop: '1rem',
          textAlign: 'center',
          color: colors.ui.text.secondary,
        }}>
          <p>Module dependencies with a circular reference</p>
        </div>
      </section>

      <section style={{ textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          marginBottom: '2rem',
          color: colors.ui.text.primary,
        }}>
          Star Topology
        </h2>
        <NodeGraph graph={starTopologyGraph} compact={false} />
        <div style={{ 
          marginTop: '1rem',
          textAlign: 'center',
          color: colors.ui.text.secondary,
        }}>
          <p>Central hub connected to multiple peripheral nodes</p>
        </div>
      </section>

      <section style={{ textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          marginBottom: '2rem',
          color: colors.ui.text.primary,
        }}>
          Microservices Architecture
        </h2>
        <NodeGraph graph={microservicesGraph} compact={false} />
        <div style={{ 
          marginTop: '1rem',
          textAlign: 'center',
          color: colors.ui.text.secondary,
        }}>
          <p>Service dependencies with databases and message queues</p>
        </div>
      </section>

      <section style={{ textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          marginBottom: '2rem',
          color: colors.ui.text.primary,
        }}>
          Data Pipeline
        </h2>
        <NodeGraph graph={dataPipelineGraph} compact={false} />
        <div style={{ 
          marginTop: '1rem',
          textAlign: 'center',
          color: colors.ui.text.secondary,
        }}>
          <p>ETL process from multiple sources to visualization</p>
        </div>
      </section>

      <section style={{ textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          marginBottom: '2rem',
          color: colors.ui.text.primary,
        }}>
          React Component Tree
        </h2>
        <NodeGraph graph={componentGraph} compact={false} />
        <div style={{ 
          marginTop: '1rem',
          textAlign: 'center',
          color: colors.ui.text.secondary,
        }}>
          <p>Component hierarchy in a React application</p>
        </div>
      </section>

      <section style={{ textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          marginBottom: '2rem',
          color: colors.ui.text.primary,
        }}>
          Git Workflow
        </h2>
        <NodeGraph graph={gitWorkflowGraph} compact={false} />
        <div style={{ 
          marginTop: '1rem',
          textAlign: 'center',
          color: colors.ui.text.secondary,
        }}>
          <p>Git branching strategy with feature and hotfix flows</p>
        </div>
      </section>

      <section style={{ textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          marginBottom: '2rem',
          color: colors.ui.text.primary,
        }}>
          Social Network
        </h2>
        <NodeGraph graph={socialNetworkGraph} compact={false} />
        <div style={{ 
          marginTop: '1rem',
          textAlign: 'center',
          color: colors.ui.text.secondary,
        }}>
          <p>Social connections between people with crosslinks</p>
        </div>
      </section>

      <section style={{ textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          marginBottom: '2rem',
          color: colors.ui.text.primary,
        }}>
          Blockchain Network
        </h2>
        <NodeGraph graph={blockchainGraph} compact={false} />
        <div style={{ 
          marginTop: '1rem',
          textAlign: 'center',
          color: colors.ui.text.secondary,
        }}>
          <p>Blockchain with validator consensus and transaction pool</p>
        </div>
      </section>

      <section style={{ textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          marginBottom: '2rem',
          color: colors.ui.text.primary,
        }}>
          Layered Architecture
        </h2>
        <NodeGraph graph={layeredArchitectureGraph} compact={false} />
        <div style={{ 
          marginTop: '1rem',
          textAlign: 'center',
          color: colors.ui.text.secondary,
        }}>
          <p>Multi-tier application architecture with layer separation</p>
        </div>
      </section>

      <section style={{ textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          marginBottom: '2rem',
          color: colors.ui.text.primary,
        }}>
          TypeScript Module Dependencies
        </h2>
        <NodeGraph graph={typescriptModuleDependencyGraph} nodeWidth={15} compact={false} />
        <div style={{ 
          marginTop: '1rem',
          textAlign: 'center',
          color: colors.ui.text.secondary,
        }}>
          <p>TypeScript project module import/export dependencies with 50+ nodes</p>
        </div>
      </section>
    </main>
  )
}
