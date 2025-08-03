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

export const gitWorkflowGraph: Graph = {
  nodes: [
    { id: 'main', label: 'main' },
    { id: 'develop', label: 'develop' },
    { id: 'feature1', label: 'feature/auth' },
    { id: 'feature2', label: 'feature/ui' },
    { id: 'hotfix', label: 'hotfix/bug' },
    { id: 'release', label: 'release/v1.0' },
    { id: 'staging', label: 'staging' },
  ],
  edges: [
    { id: 'e1', source: 'main', target: 'develop' },
    { id: 'e2', source: 'develop', target: 'feature1' },
    { id: 'e3', source: 'develop', target: 'feature2' },
    { id: 'e4', source: 'feature1', target: 'develop' },
    { id: 'e5', source: 'feature2', target: 'develop' },
    { id: 'e6', source: 'develop', target: 'release' },
    { id: 'e7', source: 'release', target: 'main' },
    { id: 'e8', source: 'main', target: 'hotfix' },
    { id: 'e9', source: 'hotfix', target: 'main' },
    { id: 'e10', source: 'release', target: 'staging' },
  ],
}

export const socialNetworkGraph: Graph = {
  nodes: [
    { id: 'alice', label: 'Alice' },
    { id: 'bob', label: 'Bob' },
    { id: 'charlie', label: 'Charlie' },
    { id: 'diana', label: 'Diana' },
    { id: 'eve', label: 'Eve' },
    { id: 'frank', label: 'Frank' },
    { id: 'grace', label: 'Grace' },
    { id: 'henry', label: 'Henry' },
  ],
  edges: [
    { id: 'e1', source: 'alice', target: 'bob' },
    { id: 'e2', source: 'alice', target: 'charlie' },
    { id: 'e3', source: 'bob', target: 'diana' },
    { id: 'e4', source: 'charlie', target: 'eve' },
    { id: 'e5', source: 'diana', target: 'frank' },
    { id: 'e6', source: 'eve', target: 'grace' },
    { id: 'e7', source: 'frank', target: 'henry' },
    { id: 'e8', source: 'grace', target: 'alice' },
    { id: 'e9', source: 'bob', target: 'eve' },
    { id: 'e10', source: 'charlie', target: 'frank' },
    { id: 'e11', source: 'diana', target: 'grace' },
  ],
}

export const blockchainGraph: Graph = {
  nodes: [
    { id: 'genesis', label: 'Genesis Block' },
    { id: 'block1', label: 'Block 1' },
    { id: 'block2', label: 'Block 2' },
    { id: 'block3', label: 'Block 3' },
    { id: 'block4', label: 'Block 4' },
    { id: 'txPool', label: 'Transaction Pool' },
    { id: 'validator1', label: 'Validator 1' },
    { id: 'validator2', label: 'Validator 2' },
    { id: 'validator3', label: 'Validator 3' },
  ],
  edges: [
    { id: 'e1', source: 'genesis', target: 'block1' },
    { id: 'e2', source: 'block1', target: 'block2' },
    { id: 'e3', source: 'block2', target: 'block3' },
    { id: 'e4', source: 'block3', target: 'block4' },
    { id: 'e5', source: 'txPool', target: 'validator1' },
    { id: 'e6', source: 'txPool', target: 'validator2' },
    { id: 'e7', source: 'txPool', target: 'validator3' },
    { id: 'e8', source: 'validator1', target: 'block4' },
    { id: 'e9', source: 'validator2', target: 'block4' },
    { id: 'e10', source: 'validator3', target: 'block4' },
  ],
}

export const layeredArchitectureGraph: Graph = {
  nodes: [
    { id: 'presentation', label: 'Presentation Layer' },
    { id: 'business', label: 'Business Layer' },
    { id: 'persistence', label: 'Persistence Layer' },
    { id: 'database', label: 'Database Layer' },
    { id: 'controller', label: 'Controller' },
    { id: 'service', label: 'Service' },
    { id: 'repository', label: 'Repository' },
    { id: 'entity', label: 'Entity' },
    { id: 'dto', label: 'DTO' },
    { id: 'dao', label: 'DAO' },
  ],
  edges: [
    { id: 'e1', source: 'presentation', target: 'business' },
    { id: 'e2', source: 'business', target: 'persistence' },
    { id: 'e3', source: 'persistence', target: 'database' },
    { id: 'e4', source: 'presentation', target: 'controller' },
    { id: 'e5', source: 'controller', target: 'dto' },
    { id: 'e6', source: 'business', target: 'service' },
    { id: 'e7', source: 'service', target: 'entity' },
    { id: 'e8', source: 'persistence', target: 'repository' },
    { id: 'e9', source: 'repository', target: 'dao' },
    { id: 'e10', source: 'dao', target: 'database' },
  ],
}

export const typescriptModuleDependencyGraph: Graph = {
  nodes: [
    // Core utilities and types
    { id: 'src/types/index.ts', label: 'types/index' },
    { id: 'src/types/user.ts', label: 'types/user' },
    { id: 'src/types/api.ts', label: 'types/api' },
    { id: 'src/types/common.ts', label: 'types/common' },
    { id: 'src/utils/logger.ts', label: 'utils/logger' },
    { id: 'src/utils/config.ts', label: 'utils/config' },
    { id: 'src/utils/validation.ts', label: 'utils/validation' },
    { id: 'src/utils/helpers.ts', label: 'utils/helpers' },
    { id: 'src/utils/constants.ts', label: 'utils/constants' },
    { id: 'src/utils/error.ts', label: 'utils/error' },
    
    // Database layer
    { id: 'src/database/connection.ts', label: 'database/connection' },
    { id: 'src/database/models/user.ts', label: 'models/user' },
    { id: 'src/database/models/post.ts', label: 'models/post' },
    { id: 'src/database/models/comment.ts', label: 'models/comment' },
    { id: 'src/database/models/index.ts', label: 'models/index' },
    { id: 'src/database/migrations/001_initial.ts', label: 'migrations/001' },
    { id: 'src/database/migrations/002_posts.ts', label: 'migrations/002' },
    { id: 'src/database/migrations/index.ts', label: 'migrations/index' },
    
    // Repository layer
    { id: 'src/repositories/base.ts', label: 'repositories/base' },
    { id: 'src/repositories/user.ts', label: 'repositories/user' },
    { id: 'src/repositories/post.ts', label: 'repositories/post' },
    { id: 'src/repositories/comment.ts', label: 'repositories/comment' },
    { id: 'src/repositories/index.ts', label: 'repositories/index' },
    
    // Service layer
    { id: 'src/services/auth.ts', label: 'services/auth' },
    { id: 'src/services/user.ts', label: 'services/user' },
    { id: 'src/services/post.ts', label: 'services/post' },
    { id: 'src/services/comment.ts', label: 'services/comment' },
    { id: 'src/services/notification.ts', label: 'services/notification' },
    { id: 'src/services/email.ts', label: 'services/email' },
    { id: 'src/services/cache.ts', label: 'services/cache' },
    { id: 'src/services/search.ts', label: 'services/search' },
    { id: 'src/services/index.ts', label: 'services/index' },
    
    // API controllers
    { id: 'src/controllers/auth.ts', label: 'controllers/auth' },
    { id: 'src/controllers/user.ts', label: 'controllers/user' },
    { id: 'src/controllers/post.ts', label: 'controllers/post' },
    { id: 'src/controllers/comment.ts', label: 'controllers/comment' },
    { id: 'src/controllers/admin.ts', label: 'controllers/admin' },
    { id: 'src/controllers/index.ts', label: 'controllers/index' },
    
    // Middleware
    { id: 'src/middleware/auth.ts', label: 'middleware/auth' },
    { id: 'src/middleware/validation.ts', label: 'middleware/validation' },
    { id: 'src/middleware/logging.ts', label: 'middleware/logging' },
    { id: 'src/middleware/error.ts', label: 'middleware/error' },
    { id: 'src/middleware/rate-limit.ts', label: 'middleware/rate-limit' },
    { id: 'src/middleware/cors.ts', label: 'middleware/cors' },
    { id: 'src/middleware/index.ts', label: 'middleware/index' },
    
    // Routes
    { id: 'src/routes/auth.ts', label: 'routes/auth' },
    { id: 'src/routes/user.ts', label: 'routes/user' },
    { id: 'src/routes/post.ts', label: 'routes/post' },
    { id: 'src/routes/admin.ts', label: 'routes/admin' },
    { id: 'src/routes/index.ts', label: 'routes/index' },
    
    // Application entry points
    { id: 'src/app.ts', label: 'app' },
    { id: 'src/server.ts', label: 'server' },
    { id: 'src/index.ts', label: 'index' },
  ],
  edges: [
    // Type dependencies
    { id: 'e1', source: 'src/types/index.ts', target: 'src/types/user.ts' },
    { id: 'e2', source: 'src/types/index.ts', target: 'src/types/api.ts' },
    { id: 'e3', source: 'src/types/index.ts', target: 'src/types/common.ts' },
    { id: 'e4', source: 'src/types/user.ts', target: 'src/types/common.ts' },
    { id: 'e5', source: 'src/types/api.ts', target: 'src/types/common.ts' },
    
    // Utility dependencies
    { id: 'e6', source: 'src/utils/logger.ts', target: 'src/utils/config.ts' },
    { id: 'e7', source: 'src/utils/validation.ts', target: 'src/types/common.ts' },
    { id: 'e8', source: 'src/utils/error.ts', target: 'src/utils/logger.ts' },
    { id: 'e9', source: 'src/utils/helpers.ts', target: 'src/utils/constants.ts' },
    
    // Database dependencies
    { id: 'e10', source: 'src/database/connection.ts', target: 'src/utils/config.ts' },
    { id: 'e11', source: 'src/database/connection.ts', target: 'src/utils/logger.ts' },
    { id: 'e12', source: 'src/database/models/user.ts', target: 'src/types/user.ts' },
    { id: 'e13', source: 'src/database/models/user.ts', target: 'src/database/connection.ts' },
    { id: 'e14', source: 'src/database/models/post.ts', target: 'src/types/common.ts' },
    { id: 'e15', source: 'src/database/models/post.ts', target: 'src/database/connection.ts' },
    { id: 'e16', source: 'src/database/models/post.ts', target: 'src/database/models/user.ts' },
    { id: 'e17', source: 'src/database/models/comment.ts', target: 'src/database/models/user.ts' },
    { id: 'e18', source: 'src/database/models/comment.ts', target: 'src/database/models/post.ts' },
    { id: 'e19', source: 'src/database/models/index.ts', target: 'src/database/models/user.ts' },
    { id: 'e20', source: 'src/database/models/index.ts', target: 'src/database/models/post.ts' },
    { id: 'e21', source: 'src/database/models/index.ts', target: 'src/database/models/comment.ts' },
    
    // Migration dependencies
    { id: 'e22', source: 'src/database/migrations/001_initial.ts', target: 'src/database/connection.ts' },
    { id: 'e23', source: 'src/database/migrations/002_posts.ts', target: 'src/database/connection.ts' },
    { id: 'e24', source: 'src/database/migrations/index.ts', target: 'src/database/migrations/001_initial.ts' },
    { id: 'e25', source: 'src/database/migrations/index.ts', target: 'src/database/migrations/002_posts.ts' },
    
    // Repository dependencies
    { id: 'e26', source: 'src/repositories/base.ts', target: 'src/database/connection.ts' },
    { id: 'e27', source: 'src/repositories/base.ts', target: 'src/utils/logger.ts' },
    { id: 'e28', source: 'src/repositories/user.ts', target: 'src/repositories/base.ts' },
    { id: 'e29', source: 'src/repositories/user.ts', target: 'src/database/models/user.ts' },
    { id: 'e30', source: 'src/repositories/post.ts', target: 'src/repositories/base.ts' },
    { id: 'e31', source: 'src/repositories/post.ts', target: 'src/database/models/post.ts' },
    { id: 'e32', source: 'src/repositories/comment.ts', target: 'src/repositories/base.ts' },
    { id: 'e33', source: 'src/repositories/comment.ts', target: 'src/database/models/comment.ts' },
    { id: 'e34', source: 'src/repositories/index.ts', target: 'src/repositories/user.ts' },
    { id: 'e35', source: 'src/repositories/index.ts', target: 'src/repositories/post.ts' },
    { id: 'e36', source: 'src/repositories/index.ts', target: 'src/repositories/comment.ts' },
    
    // Service dependencies
    { id: 'e37', source: 'src/services/auth.ts', target: 'src/repositories/user.ts' },
    { id: 'e38', source: 'src/services/auth.ts', target: 'src/utils/validation.ts' },
    { id: 'e39', source: 'src/services/auth.ts', target: 'src/utils/error.ts' },
    { id: 'e40', source: 'src/services/user.ts', target: 'src/repositories/user.ts' },
    { id: 'e41', source: 'src/services/user.ts', target: 'src/services/cache.ts' },
    { id: 'e42', source: 'src/services/post.ts', target: 'src/repositories/post.ts' },
    { id: 'e43', source: 'src/services/post.ts', target: 'src/services/search.ts' },
    { id: 'e44', source: 'src/services/comment.ts', target: 'src/repositories/comment.ts' },
    { id: 'e45', source: 'src/services/comment.ts', target: 'src/services/notification.ts' },
    { id: 'e46', source: 'src/services/notification.ts', target: 'src/services/email.ts' },
    { id: 'e47', source: 'src/services/email.ts', target: 'src/utils/config.ts' },
    { id: 'e48', source: 'src/services/cache.ts', target: 'src/utils/config.ts' },
    { id: 'e49', source: 'src/services/search.ts', target: 'src/utils/config.ts' },
    { id: 'e50', source: 'src/services/index.ts', target: 'src/services/auth.ts' },
    { id: 'e51', source: 'src/services/index.ts', target: 'src/services/user.ts' },
    { id: 'e52', source: 'src/services/index.ts', target: 'src/services/post.ts' },
    { id: 'e53', source: 'src/services/index.ts', target: 'src/services/comment.ts' },
    
    // Controller dependencies
    { id: 'e54', source: 'src/controllers/auth.ts', target: 'src/services/auth.ts' },
    { id: 'e55', source: 'src/controllers/auth.ts', target: 'src/types/api.ts' },
    { id: 'e56', source: 'src/controllers/user.ts', target: 'src/services/user.ts' },
    { id: 'e57', source: 'src/controllers/user.ts', target: 'src/types/api.ts' },
    { id: 'e58', source: 'src/controllers/post.ts', target: 'src/services/post.ts' },
    { id: 'e59', source: 'src/controllers/post.ts', target: 'src/types/api.ts' },
    { id: 'e60', source: 'src/controllers/comment.ts', target: 'src/services/comment.ts' },
    { id: 'e61', source: 'src/controllers/admin.ts', target: 'src/services/user.ts' },
    { id: 'e62', source: 'src/controllers/admin.ts', target: 'src/services/post.ts' },
    { id: 'e63', source: 'src/controllers/index.ts', target: 'src/controllers/auth.ts' },
    { id: 'e64', source: 'src/controllers/index.ts', target: 'src/controllers/user.ts' },
    { id: 'e65', source: 'src/controllers/index.ts', target: 'src/controllers/post.ts' },
    { id: 'e66', source: 'src/controllers/index.ts', target: 'src/controllers/comment.ts' },
    { id: 'e67', source: 'src/controllers/index.ts', target: 'src/controllers/admin.ts' },
    
    // Middleware dependencies
    { id: 'e68', source: 'src/middleware/auth.ts', target: 'src/services/auth.ts' },
    { id: 'e69', source: 'src/middleware/auth.ts', target: 'src/utils/error.ts' },
    { id: 'e70', source: 'src/middleware/validation.ts', target: 'src/utils/validation.ts' },
    { id: 'e71', source: 'src/middleware/logging.ts', target: 'src/utils/logger.ts' },
    { id: 'e72', source: 'src/middleware/error.ts', target: 'src/utils/error.ts' },
    { id: 'e73', source: 'src/middleware/error.ts', target: 'src/utils/logger.ts' },
    { id: 'e74', source: 'src/middleware/rate-limit.ts', target: 'src/utils/config.ts' },
    { id: 'e75', source: 'src/middleware/cors.ts', target: 'src/utils/config.ts' },
    { id: 'e76', source: 'src/middleware/index.ts', target: 'src/middleware/auth.ts' },
    { id: 'e77', source: 'src/middleware/index.ts', target: 'src/middleware/validation.ts' },
    { id: 'e78', source: 'src/middleware/index.ts', target: 'src/middleware/logging.ts' },
    { id: 'e79', source: 'src/middleware/index.ts', target: 'src/middleware/error.ts' },
    { id: 'e80', source: 'src/middleware/index.ts', target: 'src/middleware/rate-limit.ts' },
    { id: 'e81', source: 'src/middleware/index.ts', target: 'src/middleware/cors.ts' },
    
    // Route dependencies
    { id: 'e82', source: 'src/routes/auth.ts', target: 'src/controllers/auth.ts' },
    { id: 'e83', source: 'src/routes/auth.ts', target: 'src/middleware/validation.ts' },
    { id: 'e84', source: 'src/routes/user.ts', target: 'src/controllers/user.ts' },
    { id: 'e85', source: 'src/routes/user.ts', target: 'src/middleware/auth.ts' },
    { id: 'e86', source: 'src/routes/post.ts', target: 'src/controllers/post.ts' },
    { id: 'e87', source: 'src/routes/post.ts', target: 'src/middleware/auth.ts' },
    { id: 'e88', source: 'src/routes/admin.ts', target: 'src/controllers/admin.ts' },
    { id: 'e89', source: 'src/routes/admin.ts', target: 'src/middleware/auth.ts' },
    { id: 'e90', source: 'src/routes/index.ts', target: 'src/routes/auth.ts' },
    { id: 'e91', source: 'src/routes/index.ts', target: 'src/routes/user.ts' },
    { id: 'e92', source: 'src/routes/index.ts', target: 'src/routes/post.ts' },
    { id: 'e93', source: 'src/routes/index.ts', target: 'src/routes/admin.ts' },
    
    // Application dependencies
    { id: 'e94', source: 'src/app.ts', target: 'src/routes/index.ts' },
    { id: 'e95', source: 'src/app.ts', target: 'src/middleware/index.ts' },
    { id: 'e96', source: 'src/app.ts', target: 'src/database/connection.ts' },
    { id: 'e97', source: 'src/app.ts', target: 'src/utils/config.ts' },
    { id: 'e98', source: 'src/server.ts', target: 'src/app.ts' },
    { id: 'e99', source: 'src/server.ts', target: 'src/utils/logger.ts' },
    { id: 'e100', source: 'src/index.ts', target: 'src/server.ts' },
  ],
}