import { Graph } from '@/types/graph'

export const sampleGraph: Graph = {
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

export const complexGraph: Graph = {
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

export const collisionTestGraph: Graph = {
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

export const webArchitectureGraph: Graph = {
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

export const minimalGraph: Graph = {
  nodes: [
    { id: 'start', label: 'Start' },
    { id: 'end', label: 'End' },
  ],
  edges: [
    { id: 'link', source: 'start', target: 'end' },
  ],
}

export const linearChainGraph: Graph = {
  nodes: [
    { id: 'step1', label: 'Step 1' },
    { id: 'step2', label: 'Step 2' },
    { id: 'step3', label: 'Step 3' },
    { id: 'step4', label: 'Step 4' },
    { id: 'step5', label: 'Step 5' },
  ],
  edges: [
    { id: 'e1', source: 'step1', target: 'step2' },
    { id: 'e2', source: 'step2', target: 'step3' },
    { id: 'e3', source: 'step3', target: 'step4' },
    { id: 'e4', source: 'step4', target: 'step5' },
  ],
}

export const binaryTreeGraph: Graph = {
  nodes: [
    { id: 'root', label: 'Root' },
    { id: 'left', label: 'Left' },
    { id: 'right', label: 'Right' },
    { id: 'leftLeft', label: 'L-Left' },
    { id: 'leftRight', label: 'L-Right' },
    { id: 'rightLeft', label: 'R-Left' },
    { id: 'rightRight', label: 'R-Right' },
  ],
  edges: [
    { id: 'e1', source: 'root', target: 'left' },
    { id: 'e2', source: 'root', target: 'right' },
    { id: 'e3', source: 'left', target: 'leftLeft' },
    { id: 'e4', source: 'left', target: 'leftRight' },
    { id: 'e5', source: 'right', target: 'rightLeft' },
    { id: 'e6', source: 'right', target: 'rightRight' },
  ],
}

export const circularGraph: Graph = {
  nodes: [
    { id: 'moduleA', label: 'Module A' },
    { id: 'moduleB', label: 'Module B' },
    { id: 'moduleC', label: 'Module C' },
    { id: 'moduleD', label: 'Module D' },
  ],
  edges: [
    { id: 'e1', source: 'moduleA', target: 'moduleB' },
    { id: 'e2', source: 'moduleB', target: 'moduleC' },
    { id: 'e3', source: 'moduleC', target: 'moduleD' },
    { id: 'e4', source: 'moduleD', target: 'moduleA' },
  ],
}

export const starTopologyGraph: Graph = {
  nodes: [
    { id: 'hub', label: 'Hub' },
    { id: 'node1', label: 'Node 1' },
    { id: 'node2', label: 'Node 2' },
    { id: 'node3', label: 'Node 3' },
    { id: 'node4', label: 'Node 4' },
    { id: 'node5', label: 'Node 5' },
    { id: 'node6', label: 'Node 6' },
  ],
  edges: [
    { id: 'e1', source: 'hub', target: 'node1' },
    { id: 'e2', source: 'hub', target: 'node2' },
    { id: 'e3', source: 'hub', target: 'node3' },
    { id: 'e4', source: 'hub', target: 'node4' },
    { id: 'e5', source: 'hub', target: 'node5' },
    { id: 'e6', source: 'hub', target: 'node6' },
  ],
}

export const microservicesGraph: Graph = {
  nodes: [
    { id: 'apiGateway', label: 'API Gateway' },
    { id: 'authService', label: 'Auth Service' },
    { id: 'userService', label: 'User Service' },
    { id: 'orderService', label: 'Order Service' },
    { id: 'paymentService', label: 'Payment Service' },
    { id: 'notificationService', label: 'Notification' },
    { id: 'userDB', label: 'User DB' },
    { id: 'orderDB', label: 'Order DB' },
    { id: 'redis', label: 'Redis Cache' },
    { id: 'messageQueue', label: 'Message Queue' },
  ],
  edges: [
    { id: 'e1', source: 'apiGateway', target: 'authService' },
    { id: 'e2', source: 'apiGateway', target: 'userService' },
    { id: 'e3', source: 'apiGateway', target: 'orderService' },
    { id: 'e4', source: 'authService', target: 'redis' },
    { id: 'e5', source: 'userService', target: 'userDB' },
    { id: 'e6', source: 'orderService', target: 'orderDB' },
    { id: 'e7', source: 'orderService', target: 'paymentService' },
    { id: 'e8', source: 'paymentService', target: 'messageQueue' },
    { id: 'e9', source: 'messageQueue', target: 'notificationService' },
    { id: 'e10', source: 'orderService', target: 'messageQueue' },
  ],
}

export const dataPipelineGraph: Graph = {
  nodes: [
    { id: 'source1', label: 'API Source' },
    { id: 'source2', label: 'DB Source' },
    { id: 'source3', label: 'File Source' },
    { id: 'extract', label: 'Extract' },
    { id: 'validate', label: 'Validate' },
    { id: 'transform', label: 'Transform' },
    { id: 'aggregate', label: 'Aggregate' },
    { id: 'load', label: 'Load' },
    { id: 'warehouse', label: 'Data Warehouse' },
    { id: 'report', label: 'Reports' },
    { id: 'dashboard', label: 'Dashboard' },
  ],
  edges: [
    { id: 'e1', source: 'source1', target: 'extract' },
    { id: 'e2', source: 'source2', target: 'extract' },
    { id: 'e3', source: 'source3', target: 'extract' },
    { id: 'e4', source: 'extract', target: 'validate' },
    { id: 'e5', source: 'validate', target: 'transform' },
    { id: 'e6', source: 'transform', target: 'aggregate' },
    { id: 'e7', source: 'aggregate', target: 'load' },
    { id: 'e8', source: 'load', target: 'warehouse' },
    { id: 'e9', source: 'warehouse', target: 'report' },
    { id: 'e10', source: 'warehouse', target: 'dashboard' },
  ],
}

export const componentGraph: Graph = {
  nodes: [
    { id: 'app', label: 'App' },
    { id: 'layout', label: 'Layout' },
    { id: 'header', label: 'Header' },
    { id: 'sidebar', label: 'Sidebar' },
    { id: 'mainContent', label: 'MainContent' },
    { id: 'userProfile', label: 'UserProfile' },
    { id: 'navigation', label: 'Navigation' },
    { id: 'searchBar', label: 'SearchBar' },
    { id: 'themeToggle', label: 'ThemeToggle' },
    { id: 'footer', label: 'Footer' },
  ],
  edges: [
    { id: 'e1', source: 'app', target: 'layout' },
    { id: 'e2', source: 'layout', target: 'header' },
    { id: 'e3', source: 'layout', target: 'sidebar' },
    { id: 'e4', source: 'layout', target: 'mainContent' },
    { id: 'e5', source: 'layout', target: 'footer' },
    { id: 'e6', source: 'header', target: 'userProfile' },
    { id: 'e7', source: 'header', target: 'searchBar' },
    { id: 'e8', source: 'header', target: 'themeToggle' },
    { id: 'e9', source: 'sidebar', target: 'navigation' },
  ],
}