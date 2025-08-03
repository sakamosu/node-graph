import { NodeGraph } from '@/components/NodeGraph'
import { Graph } from '@/types/graph'

export default function Home() {
  const sampleGraph: Graph = {
    nodes: [
      { id: 'node-X', label: 'X' },
      { id: 'node-Y', label: 'Y' },
      { id: 'node-Z', label: 'Z' },
    ],
    edges: [
      { id: 'edge-1', source: 'node-X', target: 'node-Y' },
      { id: 'edge-2', source: 'node-Y', target: 'node-Z' },
      { id: 'edge-3', source: 'node-X', target: 'node-Z' },
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
      { id: 'core', label: 'Core' },
      { id: 'branch1', label: 'Branch1' },
      { id: 'branch2', label: 'Branch2' },
      { id: 'branch3', label: 'Branch3' },
      { id: 'branch4', label: 'Branch4' },
      { id: 'terminal1', label: 'Terminal1' },
      { id: 'terminal2', label: 'Terminal2' },
      { id: 'terminal3', label: 'Terminal3' },
      { id: 'terminal4', label: 'Terminal4' },
    ],
    edges: [
      { id: 'e1', source: 'core', target: 'branch1' },
      { id: 'e2', source: 'core', target: 'branch2' },
      { id: 'e3', source: 'core', target: 'branch3' },
      { id: 'e4', source: 'core', target: 'branch4' },
      { id: 'e5', source: 'branch1', target: 'terminal1' },
      { id: 'e6', source: 'branch2', target: 'terminal2' },
      { id: 'e7', source: 'branch3', target: 'terminal3' },
      { id: 'e8', source: 'branch4', target: 'terminal4' },
      { id: 'e9', source: 'branch1', target: 'terminal2' },
      { id: 'e10', source: 'branch3', target: 'terminal1' },
    ],
  }

  // Game architecture graph - multiplayer game system
  const webArchitectureGraph: Graph = {
    nodes: [
      { id: 'players', label: 'Players' },
      { id: 'gameClient', label: 'Game Client' },
      { id: 'matchmaking', label: 'Matchmaking' },
      { id: 'gameServer1', label: 'Game Server A' },
      { id: 'gameServer2', label: 'Game Server B' },
      { id: 'gameServer3', label: 'Game Server C' },
      { id: 'gameLogic', label: 'Game Logic' },
      { id: 'playerAuth', label: 'Player Auth' },
      { id: 'profileService', label: 'Profile Service' },
      { id: 'inventoryService', label: 'Inventory Service' },
      { id: 'scoreService', label: 'Score Service' },
      { id: 'chatService', label: 'Chat Service' },
      { id: 'eventService', label: 'Event Service' },
      { id: 'memCache', label: 'Memory Cache' },
      { id: 'gameDB', label: 'Game DB' },
      { id: 'playerDB1', label: 'Player DB 1' },
      { id: 'playerDB2', label: 'Player DB 2' },
      { id: 'eventQueue', label: 'Event Queue' },
      { id: 'aiEngine', label: 'AI Engine' },
      { id: 'assetStorage', label: 'Asset Storage' },
      { id: 'telemetry', label: 'Telemetry' },
      { id: 'diagnostics', label: 'Diagnostics' },
    ],
    edges: [
      { id: 'e1', source: 'players', target: 'gameClient' },
      { id: 'e2', source: 'gameClient', target: 'matchmaking' },
      { id: 'e3', source: 'matchmaking', target: 'gameServer1' },
      { id: 'e4', source: 'matchmaking', target: 'gameServer2' },
      { id: 'e5', source: 'matchmaking', target: 'gameServer3' },
      { id: 'e6', source: 'gameServer1', target: 'gameLogic' },
      { id: 'e7', source: 'gameServer2', target: 'gameLogic' },
      { id: 'e8', source: 'gameServer3', target: 'gameLogic' },
      { id: 'e9', source: 'gameLogic', target: 'playerAuth' },
      { id: 'e10', source: 'gameLogic', target: 'profileService' },
      { id: 'e11', source: 'gameLogic', target: 'inventoryService' },
      { id: 'e12', source: 'gameLogic', target: 'scoreService' },
      { id: 'e13', source: 'gameLogic', target: 'chatService' },
      { id: 'e14', source: 'playerAuth', target: 'memCache' },
      { id: 'e15', source: 'profileService', target: 'gameDB' },
      { id: 'e16', source: 'profileService', target: 'playerDB1' },
      { id: 'e17', source: 'scoreService', target: 'gameDB' },
      { id: 'e18', source: 'scoreService', target: 'eventQueue' },
      { id: 'e19', source: 'inventoryService', target: 'gameDB' },
      { id: 'e20', source: 'inventoryService', target: 'eventService' },
      { id: 'e21', source: 'chatService', target: 'gameDB' },
      { id: 'e22', source: 'chatService', target: 'playerDB2' },
      { id: 'e23', source: 'eventService', target: 'eventQueue' },
      { id: 'e24', source: 'eventQueue', target: 'telemetry' },
      { id: 'e25', source: 'profileService', target: 'aiEngine' },
      { id: 'e26', source: 'scoreService', target: 'aiEngine' },
      { id: 'e27', source: 'profileService', target: 'assetStorage' },
      { id: 'e28', source: 'inventoryService', target: 'assetStorage' },
      { id: 'e29', source: 'gameServer1', target: 'diagnostics' },
      { id: 'e30', source: 'gameServer2', target: 'diagnostics' },
      { id: 'e31', source: 'gameServer3', target: 'diagnostics' },
      { id: 'e32', source: 'gameDB', target: 'playerDB1' },
      { id: 'e33', source: 'gameDB', target: 'playerDB2' },
    ],
  }

  // Recipe ingredient dependency graph - cooking system
  const packageDependencyGraph: Graph = {
    nodes: [
      { id: 'pasta', label: 'Pasta' },
      { id: 'tomatoes', label: 'Tomatoes' },
      { id: 'basil', label: 'Basil' },
      { id: 'garlic', label: 'Garlic' },
      { id: 'olive_oil', label: 'Olive Oil' },
      { id: 'cheese', label: 'Cheese' },
      { id: 'onion', label: 'Onion' },
      { id: 'herbs', label: 'Herbs' },
      { id: 'sauce', label: 'Sauce' },
      { id: 'cream', label: 'Cream' },
      { id: 'mushrooms', label: 'Mushrooms' },
      { id: 'wine', label: 'Wine' },
      { id: 'butter', label: 'Butter' },
      { id: 'pepper', label: 'Pepper' },
      { id: 'salt', label: 'Salt' },
      { id: 'parsley', label: 'Parsley' },
      { id: 'lemon', label: 'Lemon' },
      { id: 'chicken', label: 'Chicken' },
      { id: 'broth', label: 'Broth' },
      { id: 'spinach', label: 'Spinach' },
      { id: 'ricotta', label: 'Ricotta' },
      { id: 'mozzarella', label: 'Mozzarella' },
      { id: 'oregano', label: 'Oregano' },
      { id: 'flour', label: 'Flour' },
      { id: 'eggs', label: 'Eggs' },
    ],
    edges: [
      { id: 'e1', source: 'pasta', target: 'tomatoes' },
      { id: 'e2', source: 'pasta', target: 'garlic' },
      { id: 'e3', source: 'pasta', target: 'olive_oil' },
      { id: 'e4', source: 'pasta', target: 'herbs' },
      { id: 'e5', source: 'pasta', target: 'basil' },
      { id: 'e6', source: 'pasta', target: 'cheese' },
      { id: 'e7', source: 'pasta', target: 'sauce' },
      { id: 'e8', source: 'tomatoes', target: 'basil' },
      { id: 'e9', source: 'garlic', target: 'tomatoes' },
      { id: 'e10', source: 'garlic', target: 'olive_oil' },
      { id: 'e11', source: 'garlic', target: 'onion' },
      { id: 'e12', source: 'olive_oil', target: 'onion' },
      { id: 'e13', source: 'pasta', target: 'herbs' },
      { id: 'e14', source: 'pasta', target: 'parsley' },
      { id: 'e15', source: 'herbs', target: 'oregano' },
      { id: 'e16', source: 'cheese', target: 'tomatoes' },
      { id: 'e17', source: 'mozzarella', target: 'tomatoes' },
      { id: 'e18', source: 'mozzarella', target: 'ricotta' },
      { id: 'e19', source: 'sauce', target: 'flour' },
      { id: 'e20', source: 'sauce', target: 'tomatoes' },
      { id: 'e21', source: 'pasta', target: 'chicken' },
      { id: 'e22', source: 'pasta', target: 'spinach' },
      { id: 'e23', source: 'chicken', target: 'broth' },
      { id: 'e24', source: 'broth', target: 'tomatoes' },
      { id: 'e25', source: 'pasta', target: 'butter' },
      { id: 'e26', source: 'butter', target: 'pepper' },
      { id: 'e27', source: 'butter', target: 'salt' },
      { id: 'e28', source: 'pasta', target: 'mushrooms' },
      { id: 'e29', source: 'pasta', target: 'wine' },
      { id: 'e30', source: 'wine', target: 'basil' },
    ],
  }

  // Music band ecosystem with collaborations
  const organizationGraph: Graph = {
    nodes: [
      { id: 'producer', label: 'Producer' },
      { id: 'songwriter', label: 'Songwriter' },
      { id: 'vocalist', label: 'Vocalist' },
      { id: 'guitarist', label: 'Guitarist' },
      { id: 'bassist', label: 'Bassist' },
      { id: 'drummer', label: 'Drummer' },
      { id: 'keyboardist', label: 'Keyboardist' },
      { id: 'mixer', label: 'Mixer' },
      { id: 'mastering', label: 'Mastering' },
      { id: 'studio', label: 'Studio' },
      { id: 'engineer', label: 'Engineer' },
      { id: 'arranger', label: 'Arranger' },
      { id: 'backup1', label: 'Backup Singer 1' },
      { id: 'backup2', label: 'Backup Singer 2' },
      { id: 'violinist', label: 'Violinist' },
      { id: 'cellist', label: 'Cellist' },
      { id: 'trumpeter', label: 'Trumpeter' },
      { id: 'saxophonist', label: 'Saxophonist' },
      { id: 'manager', label: 'Manager' },
      { id: 'promoter', label: 'Promoter' },
      { id: 'distributor', label: 'Distributor' },
      { id: 'photographer', label: 'Photographer' },
      { id: 'videographer', label: 'Videographer' },
      { id: 'choreographer', label: 'Choreographer' },
      { id: 'stylist', label: 'Stylist' },
      { id: 'roadie1', label: 'Roadie 1' },
      { id: 'roadie2', label: 'Roadie 2' },
      { id: 'fanclub', label: 'Fan Club' },
    ],
    edges: [
      // Core production
      { id: 'h1', source: 'producer', target: 'songwriter' },
      { id: 'h2', source: 'producer', target: 'vocalist' },
      { id: 'h3', source: 'producer', target: 'guitarist' },
      { id: 'h4', source: 'songwriter', target: 'bassist' },
      { id: 'h5', source: 'songwriter', target: 'drummer' },
      { id: 'h6', source: 'guitarist', target: 'keyboardist' },
      { id: 'h7', source: 'bassist', target: 'mixer' },
      { id: 'h8', source: 'bassist', target: 'mastering' },
      { id: 'h9', source: 'drummer', target: 'studio' },
      { id: 'h10', source: 'drummer', target: 'engineer' },
      { id: 'h11', source: 'keyboardist', target: 'arranger' },
      { id: 'h12', source: 'keyboardist', target: 'backup1' },
      { id: 'h13', source: 'arranger', target: 'backup2' },
      { id: 'h14', source: 'bassist', target: 'violinist' },
      { id: 'h15', source: 'bassist', target: 'cellist' },
      { id: 'h16', source: 'guitarist', target: 'trumpeter' },
      { id: 'h17', source: 'vocalist', target: 'saxophonist' },
      { id: 'h18', source: 'producer', target: 'manager' },
      { id: 'h19', source: 'mixer', target: 'promoter' },
      { id: 'h20', source: 'mixer', target: 'distributor' },
      { id: 'h21', source: 'mastering', target: 'photographer' },
      { id: 'h22', source: 'mastering', target: 'videographer' },
      { id: 'h23', source: 'studio', target: 'choreographer' },
      { id: 'h24', source: 'engineer', target: 'stylist' },
      { id: 'h25', source: 'engineer', target: 'roadie1' },
      { id: 'h26', source: 'arranger', target: 'roadie2' },
      { id: 'h27', source: 'arranger', target: 'fanclub' },
      // Collaborations
      { id: 'c1', source: 'backup1', target: 'mixer' },
      { id: 'c2', source: 'backup1', target: 'mastering' },
      { id: 'c3', source: 'backup2', target: 'mixer' },
      { id: 'c4', source: 'backup2', target: 'mastering' },
      { id: 'c5', source: 'violinist', target: 'mixer' },
      { id: 'c6', source: 'cellist', target: 'mixer' },
      { id: 'c7', source: 'cellist', target: 'mastering' },
      { id: 'c8', source: 'studio', target: 'mastering' },
      { id: 'c9', source: 'promoter', target: 'backup1' },
      { id: 'c10', source: 'distributor', target: 'backup2' },
      { id: 'c11', source: 'photographer', target: 'arranger' },
      { id: 'c12', source: 'videographer', target: 'bassist' },
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
          <p>Display dependencies between X→Y, Y→Z, and X→Z</p>
        </div>
      </section>

      <section style={{ textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          marginBottom: '2rem',
          color: '#333',
        }}>
          ギリシャ文字ネットワーク
        </h2>
        <NodeGraph graph={complexGraph} compact={false} layoutMode="auto" />
        <div style={{ 
          marginTop: '1rem',
          textAlign: 'center',
          color: '#666',
        }}>
          <p>12ノードのギリシャ文字による複雑な相互関係</p>
        </div>
      </section>

      <section style={{ textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          marginBottom: '2rem',
          color: '#333',
        }}>
          ブランチネットワーク
        </h2>
        <NodeGraph graph={collisionTestGraph} compact={false} />
        <div style={{ 
          marginTop: '1rem',
          textAlign: 'center',
          color: '#666',
        }}>
          <p>コアから分岐する複数のターミナルへの接続パターン</p>
        </div>
      </section>

      <section style={{ textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          marginBottom: '2rem',
          color: '#333',
        }}>
          ゲームアーキテクチャ
        </h2>
        <NodeGraph graph={webArchitectureGraph} compact={false} />
        <div style={{ 
          marginTop: '1rem',
          textAlign: 'center',
          color: '#666',
        }}>
          <p>22ノード、33エッジのマルチプレイヤーゲームシステム</p>
        </div>
      </section>

      <section style={{ textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          marginBottom: '2rem',
          color: '#333',
        }}>
          料理レシピ依存関係
        </h2>
        <NodeGraph graph={packageDependencyGraph} compact={false} nodeWidth={30} layoutMode="auto"/>
        <div style={{ 
          marginTop: '1rem',
          textAlign: 'center',
          color: '#666',
        }}>
          <p>25ノード、30エッジのパスタ料理における食材の相互関係</p>
        </div>
      </section>

      <section style={{ textAlign: 'center' }}>
        <h2 style={{ 
          fontSize: '1.5rem', 
          marginBottom: '2rem',
          color: '#333',
        }}>
          音楽バンドエコシステム
        </h2>
        <NodeGraph graph={organizationGraph} compact={false} nodeWidth={30} layoutMode="radial"/>
        <div style={{ 
          marginTop: '1rem',
          textAlign: 'center',
          color: '#666',
        }}>
          <p>28ノード、39エッジの音楽制作における協力関係</p>
        </div>
      </section>
    </main>
  )
}
