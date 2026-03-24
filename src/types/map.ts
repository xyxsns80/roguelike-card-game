/**
 * 地图系统类型定义
 */

export type NodeType = 'enemy' | 'elite' | 'rest' | 'shop' | 'event' | 'boss' | 'start'
// 节点类型: 敌人 | 精英 | 休息 | 商店 | 事件 | Boss | 起点

export interface MapNode {
  id: string              // 节点ID
  type: NodeType          // 节点类型
  x: number               // X坐标
  y: number               // Y坐标
  connections: string[]   // 连接的节点ID列表
  isVisited: boolean      // 是否已访问
  isCurrent: boolean      // 是否当前节点
}

export interface MapFloor {
  nodes: MapNode[]        // 节点列表
  height: number          // 层高度
  width: number           // 层宽度
}

export interface MapData {
  floors: MapFloor[]      // 层数列表
  currentFloor: number    // 当前层数
  currentNode: string | null  // 当前节点ID
}
