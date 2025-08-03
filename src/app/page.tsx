import { NodeGraph } from '@/components/NodeGraph'
import { Graph } from '@/types/graph'

export default function Home() {
  const sampleGraph: Graph = {
    nodes: [
      { id: 'node-A', label: 'A' },
      { id: 'node-B', label: 'B' },
      { id: 'node-C', label: 'C' },
    ],
    edges: [
      { id: 'edge-1', source: 'node-A', target: 'node-B' },
      { id: 'edge-2', source: 'node-B', target: 'node-C' },
      { id: 'edge-4', source: 'node-A', target: 'node-C' },
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

  // Collision test graph - dense layout that will trigger collision avoidance
  const collisionTestGraph: Graph = {
    nodes: [
      { id: 'root', label: 'Root' },
      { id: 'child1', label: 'Child1' },
      { id: 'child2', label: 'Child2' },
      { id: 'child3', label: 'Child3' },
      { id: 'child4', label: 'Child4' },
      { id: 'child5', label: 'Child5' },
      { id: 'leaf1', label: 'Leaf1' },
      { id: 'leaf2', label: 'Leaf2' },
      { id: 'leaf3', label: 'Leaf3' },
    ],
    edges: [
      { id: 'e1', source: 'root', target: 'child1' },
      { id: 'e2', source: 'root', target: 'child2' },
      { id: 'e3', source: 'root', target: 'child3' },
      { id: 'e4', source: 'root', target: 'child4' },
      { id: 'e5', source: 'root', target: 'child5' },
      { id: 'e6', source: 'child1', target: 'leaf1' },
      { id: 'e7', source: 'child2', target: 'leaf1' },
      { id: 'e8', source: 'child3', target: 'leaf2' },
      { id: 'e9', source: 'child4', target: 'leaf2' },
      { id: 'e10', source: 'child5', target: 'leaf3' },
    ],
  }

  // Web application architecture graph - realistic complex system
  const webArchitectureGraph: Graph = {
    nodes: [
      { id: 'users', label: 'Users' },
      { id: 'cdn', label: 'CDN' },
      { id: 'loadBalancer', label: 'Load Balancer' },
      { id: 'webServer1', label: 'Web Server 1' },
      { id: 'webServer2', label: 'Web Server 2' },
      { id: 'webServer3', label: 'Web Server 3' },
      { id: 'apiGateway', label: 'API Gateway' },
      { id: 'authService', label: 'Auth Service' },
      { id: 'userService', label: 'User Service' },
      { id: 'orderService', label: 'Order Service' },
      { id: 'paymentService', label: 'Payment Service' },
      { id: 'inventoryService', label: 'Inventory Service' },
      { id: 'notificationService', label: 'Notification Service' },
      { id: 'redis', label: 'Redis Cache' },
      { id: 'primaryDB', label: 'Primary DB' },
      { id: 'readReplica1', label: 'Read Replica 1' },
      { id: 'readReplica2', label: 'Read Replica 2' },
      { id: 'messageQueue', label: 'Message Queue' },
      { id: 'searchEngine', label: 'Search Engine' },
      { id: 'fileStorage', label: 'File Storage' },
      { id: 'analytics', label: 'Analytics' },
      { id: 'monitoring', label: 'Monitoring' },
    ],
    edges: [
      { id: 'e1', source: 'users', target: 'cdn' },
      { id: 'e2', source: 'cdn', target: 'loadBalancer' },
      { id: 'e3', source: 'loadBalancer', target: 'webServer1' },
      { id: 'e4', source: 'loadBalancer', target: 'webServer2' },
      { id: 'e5', source: 'loadBalancer', target: 'webServer3' },
      { id: 'e6', source: 'webServer1', target: 'apiGateway' },
      { id: 'e7', source: 'webServer2', target: 'apiGateway' },
      { id: 'e8', source: 'webServer3', target: 'apiGateway' },
      { id: 'e9', source: 'apiGateway', target: 'authService' },
      { id: 'e10', source: 'apiGateway', target: 'userService' },
      { id: 'e11', source: 'apiGateway', target: 'orderService' },
      { id: 'e12', source: 'apiGateway', target: 'paymentService' },
      { id: 'e13', source: 'apiGateway', target: 'inventoryService' },
      { id: 'e14', source: 'authService', target: 'redis' },
      { id: 'e15', source: 'userService', target: 'primaryDB' },
      { id: 'e16', source: 'userService', target: 'readReplica1' },
      { id: 'e17', source: 'orderService', target: 'primaryDB' },
      { id: 'e18', source: 'orderService', target: 'messageQueue' },
      { id: 'e19', source: 'paymentService', target: 'primaryDB' },
      { id: 'e20', source: 'paymentService', target: 'notificationService' },
      { id: 'e21', source: 'inventoryService', target: 'primaryDB' },
      { id: 'e22', source: 'inventoryService', target: 'readReplica2' },
      { id: 'e23', source: 'notificationService', target: 'messageQueue' },
      { id: 'e24', source: 'messageQueue', target: 'analytics' },
      { id: 'e25', source: 'userService', target: 'searchEngine' },
      { id: 'e26', source: 'orderService', target: 'searchEngine' },
      { id: 'e27', source: 'userService', target: 'fileStorage' },
      { id: 'e28', source: 'inventoryService', target: 'fileStorage' },
      { id: 'e29', source: 'webServer1', target: 'monitoring' },
      { id: 'e30', source: 'webServer2', target: 'monitoring' },
      { id: 'e31', source: 'webServer3', target: 'monitoring' },
      { id: 'e32', source: 'primaryDB', target: 'readReplica1' },
      { id: 'e33', source: 'primaryDB', target: 'readReplica2' },
    ],
  }

  // Complex dependency graph - npm package dependencies simulation
  const packageDependencyGraph: Graph = {
    nodes: [
      { id: 'myApp', label: 'My App' },
      { id: 'react', label: 'React' },
      { id: 'reactDom', label: 'React-DOM' },
      { id: 'nextjs', label: 'Next.js' },
      { id: 'typescript', label: 'TypeScript' },
      { id: 'webpack', label: 'Webpack' },
      { id: 'babel', label: 'Babel' },
      { id: 'eslint', label: 'ESLint' },
      { id: 'prettier', label: 'Prettier' },
      { id: 'lodash', label: 'Lodash' },
      { id: 'axios', label: 'Axios' },
      { id: 'moment', label: 'Moment.js' },
      { id: 'express', label: 'Express' },
      { id: 'cors', label: 'CORS' },
      { id: 'helmet', label: 'Helmet' },
      { id: 'mongoose', label: 'Mongoose' },
      { id: 'redis', label: 'Redis Client' },
      { id: 'jest', label: 'Jest' },
      { id: 'testingLibrary', label: 'Testing Library' },
      { id: 'cypress', label: 'Cypress' },
      { id: 'styled-components', label: 'Styled Components' },
      { id: 'materialUI', label: 'Material-UI' },
      { id: 'emotion', label: 'Emotion' },
      { id: 'graphql', label: 'GraphQL' },
      { id: 'apollo', label: 'Apollo Client' },
    ],
    edges: [
      { id: 'e1', source: 'myApp', target: 'react' },
      { id: 'e2', source: 'myApp', target: 'nextjs' },
      { id: 'e3', source: 'myApp', target: 'typescript' },
      { id: 'e4', source: 'myApp', target: 'axios' },
      { id: 'e5', source: 'myApp', target: 'lodash' },
      { id: 'e6', source: 'myApp', target: 'styled-components' },
      { id: 'e7', source: 'myApp', target: 'apollo' },
      { id: 'e8', source: 'react', target: 'reactDom' },
      { id: 'e9', source: 'nextjs', target: 'react' },
      { id: 'e10', source: 'nextjs', target: 'webpack' },
      { id: 'e11', source: 'nextjs', target: 'babel' },
      { id: 'e12', source: 'webpack', target: 'babel' },
      { id: 'e13', source: 'myApp', target: 'eslint' },
      { id: 'e14', source: 'myApp', target: 'prettier' },
      { id: 'e15', source: 'eslint', target: 'typescript' },
      { id: 'e16', source: 'styled-components', target: 'react' },
      { id: 'e17', source: 'materialUI', target: 'react' },
      { id: 'e18', source: 'materialUI', target: 'emotion' },
      { id: 'e19', source: 'apollo', target: 'graphql' },
      { id: 'e20', source: 'apollo', target: 'react' },
      { id: 'e21', source: 'myApp', target: 'jest' },
      { id: 'e22', source: 'myApp', target: 'cypress' },
      { id: 'e23', source: 'jest', target: 'testingLibrary' },
      { id: 'e24', source: 'testingLibrary', target: 'react' },
      { id: 'e25', source: 'myApp', target: 'express' },
      { id: 'e26', source: 'express', target: 'cors' },
      { id: 'e27', source: 'express', target: 'helmet' },
      { id: 'e28', source: 'myApp', target: 'mongoose' },
      { id: 'e29', source: 'myApp', target: 'redis' },
      { id: 'e30', source: 'moment', target: 'lodash' },
    ],
  }

  // Organization hierarchy with cross-department dependencies
  const organizationGraph: Graph = {
    nodes: [
      { id: 'ceo', label: 'CEO' },
      { id: 'cto', label: 'CTO' },
      { id: 'cfo', label: 'CFO' },
      { id: 'cmo', label: 'CMO' },
      { id: 'vp-eng', label: 'VP Engineering' },
      { id: 'vp-product', label: 'VP Product' },
      { id: 'vp-sales', label: 'VP Sales' },
      { id: 'frontend-lead', label: 'Frontend Lead' },
      { id: 'backend-lead', label: 'Backend Lead' },
      { id: 'devops-lead', label: 'DevOps Lead' },
      { id: 'qa-lead', label: 'QA Lead' },
      { id: 'product-manager1', label: 'Product Manager 1' },
      { id: 'product-manager2', label: 'Product Manager 2' },
      { id: 'ux-lead', label: 'UX Lead' },
      { id: 'sales-manager1', label: 'Sales Manager 1' },
      { id: 'sales-manager2', label: 'Sales Manager 2' },
      { id: 'marketing-manager', label: 'Marketing Manager' },
      { id: 'finance-manager', label: 'Finance Manager' },
      { id: 'hr-manager', label: 'HR Manager' },
      { id: 'frontend-dev1', label: 'Frontend Dev 1' },
      { id: 'frontend-dev2', label: 'Frontend Dev 2' },
      { id: 'backend-dev1', label: 'Backend Dev 1' },
      { id: 'backend-dev2', label: 'Backend Dev 2' },
      { id: 'devops-eng1', label: 'DevOps Eng 1' },
      { id: 'qa-eng1', label: 'QA Eng 1' },
      { id: 'qa-eng2', label: 'QA Eng 2' },
      { id: 'designer1', label: 'Designer 1' },
      { id: 'designer2', label: 'Designer 2' },
    ],
    edges: [
      // Hierarchy
      { id: 'h1', source: 'ceo', target: 'cto' },
      { id: 'h2', source: 'ceo', target: 'cfo' },
      { id: 'h3', source: 'ceo', target: 'cmo' },
      { id: 'h4', source: 'cto', target: 'vp-eng' },
      { id: 'h5', source: 'cto', target: 'vp-product' },
      { id: 'h6', source: 'cmo', target: 'vp-sales' },
      { id: 'h7', source: 'vp-eng', target: 'frontend-lead' },
      { id: 'h8', source: 'vp-eng', target: 'backend-lead' },
      { id: 'h9', source: 'vp-eng', target: 'devops-lead' },
      { id: 'h10', source: 'vp-eng', target: 'qa-lead' },
      { id: 'h11', source: 'vp-product', target: 'product-manager1' },
      { id: 'h12', source: 'vp-product', target: 'product-manager2' },
      { id: 'h13', source: 'vp-product', target: 'ux-lead' },
      { id: 'h14', source: 'vp-sales', target: 'sales-manager1' },
      { id: 'h15', source: 'vp-sales', target: 'sales-manager2' },
      { id: 'h16', source: 'cmo', target: 'marketing-manager' },
      { id: 'h17', source: 'cfo', target: 'finance-manager' },
      { id: 'h18', source: 'ceo', target: 'hr-manager' },
      { id: 'h19', source: 'frontend-lead', target: 'frontend-dev1' },
      { id: 'h20', source: 'frontend-lead', target: 'frontend-dev2' },
      { id: 'h21', source: 'backend-lead', target: 'backend-dev1' },
      { id: 'h22', source: 'backend-lead', target: 'backend-dev2' },
      { id: 'h23', source: 'devops-lead', target: 'devops-eng1' },
      { id: 'h24', source: 'qa-lead', target: 'qa-eng1' },
      { id: 'h25', source: 'qa-lead', target: 'qa-eng2' },
      { id: 'h26', source: 'ux-lead', target: 'designer1' },
      { id: 'h27', source: 'ux-lead', target: 'designer2' },
      // Cross-functional dependencies
      { id: 'c1', source: 'product-manager1', target: 'frontend-lead' },
      { id: 'c2', source: 'product-manager1', target: 'backend-lead' },
      { id: 'c3', source: 'product-manager2', target: 'frontend-lead' },
      { id: 'c4', source: 'product-manager2', target: 'backend-lead' },
      { id: 'c5', source: 'ux-lead', target: 'frontend-lead' },
      { id: 'c6', source: 'qa-lead', target: 'frontend-lead' },
      { id: 'c7', source: 'qa-lead', target: 'backend-lead' },
      { id: 'c8', source: 'devops-lead', target: 'backend-lead' },
      { id: 'c9', source: 'sales-manager1', target: 'product-manager1' },
      { id: 'c10', source: 'sales-manager2', target: 'product-manager2' },
      { id: 'c11', source: 'marketing-manager', target: 'ux-lead' },
      { id: 'c12', source: 'finance-manager', target: 'vp-sales' },
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
          <p>Display dependencies between A→B, B→C, and A→C</p>
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
        <NodeGraph graph={complexGraph} compact={false} />
        <div style={{ 
          marginTop: '1rem',
          textAlign: 'center',
          color: '#666',
        }}>
          <p>図のような複雑な依存関係でも自動調整されます</p>
        </div>
      </section>

      <section style={{ textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          marginBottom: '2rem',
          color: '#333',
        }}>
          衝突回避テスト - 密集レイアウト
        </h2>
        <NodeGraph graph={collisionTestGraph} compact={true} />
        <div style={{ 
          marginTop: '1rem',
          textAlign: 'center',
          color: '#666',
        }}>
          <p>多数のノードが同階層に配置される場合の衝突回避機能をテスト</p>
        </div>
      </section>

      <section style={{ textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          marginBottom: '2rem',
          color: '#333',
        }}>
          ウェブアプリケーション アーキテクチャ
        </h2>
        <NodeGraph graph={webArchitectureGraph} compact={true} />
        <div style={{ 
          marginTop: '1rem',
          textAlign: 'center',
          color: '#666',
        }}>
          <p>22ノード、33エッジの複雑なマイクロサービス アーキテクチャ</p>
        </div>
      </section>

      <section style={{ textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          marginBottom: '2rem',
          color: '#333',
        }}>
          npm Package dependencies
        </h2>
        <NodeGraph graph={packageDependencyGraph} compact={true} />
        <div style={{ 
          marginTop: '1rem',
          textAlign: 'center',
          color: '#666',
        }}>
          <p>25ノード、30エッジのモダンフロントエンド開発依存関係</p>
        </div>
      </section>

      <section style={{ textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          marginBottom: '2rem',
          color: '#333',
        }}>
          組織階層 + 横断的依存関係
        </h2>
        <NodeGraph graph={organizationGraph} compact={true} />
        <div style={{ 
          marginTop: '1rem',
          textAlign: 'center',
          color: '#666',
        }}>
          <p>28ノード、39エッジの企業組織構造（階層 + クロスファンクショナル）</p>
        </div>
      </section>
    </main>
  )
}
