<template>
  <async-pag-player :src="coverImage" style="width: 100%; height: 100%" />
</template>

<script setup>
// 异步加载分包内的组件
import AsyncPagPlayer from '../../async-pag-files/components/async-pag-player/async-pag-player.vue'
const props = defineProps({
  coverImage: {
    type: String,
    default: ''
  }
})
</script>

<script>
export default {
  options: {
    virtualHost: true
  }
}
</script>

<style scoped lang="scss"></style>
