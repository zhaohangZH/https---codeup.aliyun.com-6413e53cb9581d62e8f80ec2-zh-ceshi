<template>{{ countDownStr }}</template>

<script setup>
import { ref, watch, onUnmounted } from 'vue'
import { getFormatTime } from '@/utils/time-format'

const props = defineProps({
  format: {
    type: String,
    default: 'YYYY-MM-DD HH:mm:ss'
  },
  diffTime: {
    type: [Number, String],
    default: 0
  }
})
const emits = defineEmits(['update:diff-time', 'countdown-end'])

const countDownStr = ref('')
const handleCountdown = (v) => {
  countDownStr.value = getFormatTime(v, 'DD天 HH:mm:ss')
  const t1 = new Date().getTime()
  timer = setTimeout(() => {
    const t2 = new Date().getTime()
    let n = v - (t2 - t1)

    if (n <= 0) {
      emits('countdown-end')
    }
    n = n <= 0 ? 0 : n
    emits('update:diff-time', n)
  }, 1000)
}

let timer = 0
watch(
  () => props.diffTime,
  (v) => {
    clearTimeout(timer)
    if (v > 0) {
      handleCountdown(v)
    }
  },
  {
    immediate: true
  }
)

onUnmounted(() => clearTimeout(timer))

// defineExpose
</script>

<script>
export default {
  options: {
    virtualHost: true
  }
}
</script>

<style scoped lang="scss"></style>
