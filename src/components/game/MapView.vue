<template>
  <div class="map-view min-h-screen bg-gradient-to-b from-slate-900 to-slate-950 p-4 overflow-y-auto">
    <!-- Header -->
    <div class="text-center mb-4">
      <h1 class="text-2xl font-bold text-slate-100">地图</h1>
      <p class="text-slate-400 text-sm">第 {{ gameStore.floor }} 层,共 {{ mapData.floors.length }} 层</p>
    </div>

    <!-- Map Container -->
    <div class="map-container max-w-2xl mx-auto">
      <svg
        :viewBox="`0 0 ${mapWidth} ${mapHeight}`"
        class="w-full h-auto"
        style="min-height: 400px; max-height: 600px;"
      >
        <!-- Draw connection lines first (so they're behind nodes) -->
        <g v-for="(floor, floorIndex) in mapData.floors" :key="`floor-${floorIndex}`">
          <template v-for="node in floor.nodes" :key="node.id">
            <line
              v-for="connectionId in node.connections"
              :key="`line-${node.id}-${connectionId}`"
              :x1="getNodeX(node, floorIndex)"
              :y1="getNodeY(node, floorIndex)"
              :x2="getConnectedNodeX(connectionId, floorIndex)"
              :y2="getConnectedNodeY(connectionId, floorIndex)"
              :stroke="isConnectionActive(node.id, connectionId) ? '#fbbf24' : '#475569'"
              stroke-width="2"
              stroke-dasharray="5,5"
            />
          </template>
        </g>

        <!-- Draw nodes -->
        <g v-for="(floor, floorIndex) in mapData.floors" :key="floorIndex">
          <g
            v-for="node in floor.nodes"
            :key="node.id"
            @click="selectNode(node)"
            class="map-node cursor-pointer"
            :class="{
              'opacity-100': canSelectNode(node) || node.isCurrent || node.isVisited,
              'opacity-40': !canSelectNode(node) && !node.isCurrent && !node.isVisited,
              'cursor-not-allowed': !canSelectNode(node) && !node.isCurrent
            }"
          >
            <!-- Node circle -->
            <circle
              :cx="getNodeX(node, floorIndex)"
              :cy="getNodeY(node, floorIndex)"
              :r="isNodeAvailable(node) ? 24 : 20"
              :fill="getNodeColor(node.type)"
              :stroke="getNodeStroke(node)"
              stroke-width="3"
              class="transition-all duration-200"
              :class="{
                'hover:scale-110': canSelectNode(node),
                'animate-pulse': node.isCurrent
              }"
            />

            <!-- Node icon -->
            <text
              :x="getNodeX(node, floorIndex)"
              :y="getNodeY(node, floorIndex)"
              text-anchor="middle"
              dominant-baseline="middle"
              :font-size="isNodeAvailable(node) ? 20 : 16"
              fill="white"
              class="pointer-events-none"
            >
              {{ getNodeIcon(node.type) }}
            </text>

            <!-- Visited indicator -->
            <circle
              v-if="node.isVisited && !node.isCurrent"
              :cx="getNodeX(node, floorIndex) + 12"
              :cy="getNodeY(node, floorIndex) - 12"
              r="6"
              fill="#10b981"
              class="pointer-events-none"
            />
            <text
              v-if="node.isVisited && !node.isCurrent"
              :x="getNodeX(node, floorIndex) + 12"
              :y="getNodeY(node, floorIndex) - 12"
              text-anchor="middle"
              dominant-baseline="middle"
              :font-size="10"
              fill="white"
              class="pointer-events-none"
            >
              ✓
            </text>

            <!-- Current node indicator -->
            <circle
              v-if="node.isCurrent"
              :cx="getNodeX(node, floorIndex)"
              :cy="getNodeY(node, floorIndex)"
              r="28"
              fill="none"
              stroke="#fbbf24"
              stroke-width="2"
              class="animate-ping pointer-events-none"
            />
          </g>
        </g>
      </svg>
    </div>

    <!-- Node type legend -->
    <div class="mt-6 max-w-2xl mx-auto">
      <h3 class="text-sm font-semibold text-slate-300 mb-2">节点类型</h3>
      <div class="grid grid-cols-3 gap-2 text-xs">
        <div class="flex items-center gap-2 text-slate-300">
          <span class="text-lg">⚔️</span>
          <span>敌人</span>
        </div>
        <div class="flex items-center gap-2 text-slate-300">
          <span class="text-lg">💀</span>
          <span>精英</span>
        </div>
        <div class="flex items-center gap-2 text-slate-300">
          <span class="text-lg">🏕️</span>
          <span>休息</span>
        </div>
        <div class="flex items-center gap-2 text-slate-300">
          <span class="text-lg">🛒</span>
          <span>商店</span>
        </div>
        <div class="flex items-center gap-2 text-slate-300">
          <span class="text-lg">❓</span>
          <span>事件</span>
        </div>
        <div class="flex items-center gap-2 text-slate-300">
          <span class="text-lg">👹</span>
          <span>Boss</span>
        </div>
      </div>
    </div>

    <!-- Current node info -->
    <div v-if="currentNode" class="mt-4 max-w-2xl mx-auto bg-slate-800 rounded-lg p-4 border border-slate-700">
      <div class="flex justify-between items-center">
        <div>
          <h3 class="text-lg font-semibold text-slate-100">{{ getNodeTypeName(currentNode.type) }}</h3>
          <p class="text-sm text-slate-400">{{ getNodeDescription(currentNode.type) }}</p>
        </div>
        <div class="text-4xl">{{ getNodeIcon(currentNode.type) }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useGameStore } from '@/stores/game'
import { generateMap, advanceMap, getAvailableNodes } from '@/utils/mapGenerator'
import type { MapNode } from '@/types/map'

const gameStore = useGameStore()

// Map data - in a real app this would be in the store
const mapData = computed(() => {
  // For now, generate a simple map. In production, this would be stored in the game state
  if (!gameStore.mapData) {
    return generateMap()
  }
  return gameStore.mapData
})

const currentNode = computed(() => {
  if (!mapData.value.currentNode) return null
  for (const floor of mapData.value.floors) {
    const node = floor.nodes.find(n => n.id === mapData.value.currentNode)
    if (node) return node
  }
  return null
})

// Map dimensions
const mapWidth = computed(() => {
  const maxWidth = Math.max(...mapData.value.floors.map(f => f.width))
  return maxWidth * 80 + 100
})

const mapHeight = computed(() => {
  return mapData.value.floors.length * 70 + 100
})

// Node positioning
function getNodeX(node: MapNode, floorIndex: number): number {
  const floor = mapData.value.floors[floorIndex]
  const baseX = 50
  const spacing = 80
  const offset = (mapWidth.value - floor.width * spacing) / 2
  return baseX + offset + node.x * spacing
}

function getNodeY(_node: MapNode, floorIndex: number): number {
  const baseY = 50
  const spacing = 70
  return baseY + floorIndex * spacing
}

function getConnectedNodeX(connectionId: string, floorIndex: number): number {
  const nextFloor = mapData.value.floors[floorIndex + 1]
  if (!nextFloor) return 0

  const node = nextFloor.nodes.find(n => n.id === connectionId)
  if (!node) return 0

  return getNodeX(node, floorIndex + 1)
}

function getConnectedNodeY(connectionId: string, floorIndex: number): number {
  const nextFloor = mapData.value.floors[floorIndex + 1]
  if (!nextFloor) return 0

  const node = nextFloor.nodes.find(n => n.id === connectionId)
  if (!node) return 0

  return getNodeY(node, floorIndex + 1)
}

// Node helpers
function canSelectNode(node: MapNode): boolean {
  const availableNodes = getAvailableNodes(mapData.value)
  return availableNodes.some(n => n.id === node.id)
}

function isNodeAvailable(node: MapNode): boolean {
  return canSelectNode(node) || node.isCurrent
}

function isConnectionActive(nodeId: string, connectionId: string): boolean {
  return mapData.value.currentNode === nodeId && canSelectNode({ id: connectionId } as MapNode)
}

function getNodeColor(type: string): string {
  const colors: Record<string, string> = {
    start: '#3b82f6',
    enemy: '#ef4444',
    elite: '#a855f7',
    rest: '#22c55e',
    shop: '#f59e0b',
    event: '#ec4899',
    boss: '#dc2626'
  }
  return colors[type] || '#6b7280'
}

function getNodeStroke(node: MapNode): string {
  if (node.isCurrent) return '#fbbf24'
  if (node.isVisited) return '#10b981'
  return '#374151'
}

function getNodeIcon(type: string): string {
  const icons: Record<string, string> = {
    start: '🏁',
    enemy: '⚔️',
    elite: '💀',
    rest: '🏕️',
    shop: '🛒',
    event: '❓',
    boss: '👹'
  }
  return icons[type] || '❓'
}

function getNodeTypeName(type: string): string {
  const names: Record<string, string> = {
    start: '起点',
    enemy: '敌人遭遇',
    elite: '精英敌人',
    rest: '休息点',
    shop: '商店',
    event: '神秘事件',
    boss: 'Boss 战'
  }
  return names[type] || '未知'
}

function getNodeDescription(type: string): string {
  const descriptions: Record<string, string> = {
    start: '你的旅程开始',
    enemy: '与敌人战斗',
    elite: '挑战精英敌人',
    rest: '休息并恢复',
    shop: '购买卡牌和物品',
    event: '一个神秘事件',
    boss: '面对层 Boss'
  }
  return descriptions[type] || ''
}

function selectNode(node: MapNode) {
  if (!canSelectNode(node)) return

  // Update map data
  const newMapData = advanceMap(mapData.value, node.id)
  gameStore.setMapData(newMapData)

  // Trigger the appropriate encounter
  gameStore.onNodeSelect(node.type)
}
</script>

<style scoped>
.map-node:hover circle {
  filter: brightness(1.1);
}

@keyframes ping {
  75%, 100% {
    transform: scale(2);
    opacity: 0;
  }
}

.animate-ping {
  animation: ping 1s cubic-bezier(0, 0, 0.2, 1) infinite;
}
</style>
