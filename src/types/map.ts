/**
 * Map system types
 */

export type NodeType = 'enemy' | 'elite' | 'rest' | 'shop' | 'event' | 'boss' | 'start'

export interface MapNode {
  id: string
  type: NodeType
  x: number
  y: number
  connections: string[] // IDs of connected nodes
  isVisited: boolean
  isCurrent: boolean
}

export interface MapFloor {
  nodes: MapNode[]
  height: number
  width: number
}

export interface MapData {
  floors: MapFloor[]
  currentFloor: number
  currentNode: string | null
}
