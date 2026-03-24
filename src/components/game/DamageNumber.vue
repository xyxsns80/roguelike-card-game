<template>
  <Transition name="float-up">
    <div
      v-if="show"
      :class="['damage-number absolute font-bold text-2xl pointer-events-none', damageClass]"
      :style="{ left: `${x}px`, top: `${y}px` }"
    >
      {{ displayText }}
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'

const props = defineProps<{
  value: number
  type: 'damage' | 'block' | 'heal'
  x: number
  y: number
}>()

const show = ref(false)

const damageClass = computed(() => {
  switch (props.type) {
    case 'damage':
      return 'text-red-500 text-shadow-red'
    case 'block':
      return 'text-blue-400 text-shadow-blue'
    case 'heal':
      return 'text-green-500 text-shadow-green'
    default:
      return 'text-white'
  }
})

const displayText = computed(() => {
  if (props.type === 'block') {
    return `+${props.value} 🛡️`
  } else if (props.type === 'heal') {
    return `+${props.value} ❤️`
  } else {
    return `-${props.value}`
  }
})

onMounted(() => {
  show.value = true
  setTimeout(() => {
    show.value = false
  }, 1000)
})
</script>

<style scoped>
.damage-number {
  animation: floatUp 1s ease-out forwards;
  z-index: 100;
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
}

.text-shadow-red {
  text-shadow: 2px 2px 4px rgba(220, 38, 38, 0.8), 0 0 10px rgba(220, 38, 38, 0.5);
}

.text-shadow-blue {
  text-shadow: 2px 2px 4px rgba(96, 165, 250, 0.8), 0 0 10px rgba(96, 165, 250, 0.5);
}

.text-shadow-green {
  text-shadow: 2px 2px 4px rgba(34, 197, 94, 0.8), 0 0 10px rgba(34, 197, 94, 0.5);
}

@keyframes floatUp {
  0% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
  100% {
    opacity: 0;
    transform: translateY(-60px) scale(1.2);
  }
}

.float-up-enter-active,
.float-up-leave-active {
  transition: all 1s ease;
}

.float-up-enter-from,
.float-up-leave-to {
  opacity: 0;
  transform: translateY(-60px);
}
</style>
