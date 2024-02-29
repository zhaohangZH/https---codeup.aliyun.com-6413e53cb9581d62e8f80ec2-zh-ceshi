<template>
  <rich-text :nodes="nodes"></rich-text>
</template>

<script setup>
import { computed } from 'vue'
import parseHtml from '@/utils/html-parser'

const props = defineProps({
  html: {
    type: String,
    default: ''
  }
})

const nodes = computed(() => parseHtml(props.html))
</script>

<style lang="scss" scoped></style>
