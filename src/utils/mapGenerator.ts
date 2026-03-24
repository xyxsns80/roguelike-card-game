/**
 * Procedural map generation for roguelike progression
 */

import type { MapData, MapFloor, MapNode, NodeType } from '@/types/map'

const FLOOR_COUNT = 15
const NODES_PER_FLOOR = [1, 3, 3, 3, 4, 3, 3, 4, 3, 3, 4, 3, 3, 3, 1]

// Node type probabilities by floor
function getRandomNodeType(floor: number): NodeType {
  const isBossFloor = floor === FLOOR_COUNT - 1
  const isEliteFloor = floor === 7 || floor === 12

  if (isBossFloor) return 'boss'
  if (isEliteFloor) return Math.random() < 0.5 ? 'elite' : 'rest'
  if (floor === 0) return 'start'

  const rand = Math.random()
  if (rand < 0.6) return 'enemy'
  if (rand < 0.75) return 'rest'
  if (rand < 0.85) return 'elite'
  if (rand < 0.95) return 'shop'
  return 'event'
}

function createNode(id: string, floor: number, x: number, y: number, type: NodeType): MapNode {
  return {
    id,
    type,
    x,
    y,
    connections: [],
    isVisited: floor === 0,
    isCurrent: floor === 0 && x === 0
  }
}

function generateFloor(floorIndex: number, prevFloor?: MapFloor): MapFloor {
  const nodeCount = NODES_PER_FLOOR[floorIndex] || 3
  const nodes: MapNode[] = []
  const height = 1
  const width = nodeCount

  // Create nodes for this floor
  for (let i = 0; i < nodeCount; i++) {
    const nodeId = `floor_${floorIndex}_node_${i}`
    const nodeType = getRandomNodeType(floorIndex)
    const node = createNode(nodeId, floorIndex, i, 0, nodeType)
    nodes.push(node)
  }

  // Connect to previous floor
  if (prevFloor) {
    const prevNodes = prevFloor.nodes

    nodes.forEach((node, nodeIndex) => {
      // Each node connects to 1-2 nodes from previous floor
      const connectionCount = nodeIndex === 0 ? 1 : 2
      const connectedPrevNodes: string[] = []

      for (let i = 0; i < connectionCount && prevNodes.length > 0; i++) {
        // Find a previous node that hasn't been connected yet
        const availablePrevNodes = prevNodes.filter(pn => !connectedPrevNodes.includes(pn.id))
        if (availablePrevNodes.length === 0) break

        const randomPrev = availablePrevNodes[Math.floor(Math.random() * availablePrevNodes.length)]
        node.connections.push(randomPrev.id)
        connectedPrevNodes.push(randomPrev.id)

        // Add reverse connection
        randomPrev.connections.push(node.id)
      }
    })
  }

  return { nodes, height, width }
}

export function generateMap(): MapData {
  const floors: MapFloor[] = []
  let currentFloor = 0
  let currentNode: string | null = 'floor_0_node_0'

  // Generate floors
  for (let i = 0; i < FLOOR_COUNT; i++) {
    const floor = generateFloor(i, floors[i - 1])
    floors.push(floor)
  }

  return {
    floors,
    currentFloor,
    currentNode
  }
}

export function advanceMap(mapData: MapData, targetNodeId: string): MapData {
  const newMap = { ...mapData }
  const currentFloor = newMap.floors[newMap.currentFloor]

  // Mark previous node as visited and not current
  if (newMap.currentNode) {
    const prevNode = currentFloor.nodes.find(n => n.id === newMap.currentNode)
    if (prevNode) {
      prevNode.isCurrent = false
      prevNode.isVisited = true
    }
  }

  // Find target node and update current position
  for (let i = newMap.currentFloor; i < newMap.floors.length; i++) {
    const floor = newMap.floors[i]
    const targetNode = floor.nodes.find(n => n.id === targetNodeId)

    if (targetNode) {
      targetNode.isCurrent = true
      newMap.currentNode = targetNodeId
      newMap.currentFloor = i
      break
    }
  }

  return newMap
}

export function getAvailableNodes(mapData: MapData): MapNode[] {
  const currentFloor = mapData.floors[mapData.currentFloor]
  const currentNode = currentFloor.nodes.find(n => n.id === mapData.currentNode)

  if (!currentNode) return []

  // Find connected nodes on the next floor
  const nextFloorIndex = mapData.currentFloor + 1
  if (nextFloorIndex >= mapData.floors.length) return []

  const nextFloor = mapData.floors[nextFloorIndex]
  return nextFloor.nodes.filter(n => currentNode.connections.includes(n.id))
}
