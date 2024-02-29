<template>
  <tc-tabbar :placeholder="placeholder" :custom-style="customStyle" @init="(v) => emits('init', v)">
    <tc-tabbar-item
      v-for="item in list"
      :key="item.pagePath"
      :is-active="item.pagePath === currentPath"
      :is-hover="isHover"
      v-bind="item"
      style="flex: 1"
      @item-click="handleTabbarClick"
    ></tc-tabbar-item>
  </tc-tabbar>
</template>
<script setup>
import { getCurrentPage } from '@/utils/common.js'
import { onMounted, ref } from 'vue'
import getTabList from '@/business/bc-tabbar/tabbar-list'

// #ifndef MP-WEIXIN
uni.hideTabBar()
// #endif

const list = getTabList()
const props = defineProps({
  isHover: {
    type: Boolean,
    default: false
  },
  placeholder: {
    type: Boolean,
    default: true
  },
  customStyle: {
    type: Object,
    default: () => ({})
  }
})
const emits = defineEmits(['init'])
const handleTabbarClick = (url) => uni.switchTab({ url })

const currentPath = ref('')
onMounted(() => (currentPath.value = getCurrentPage().route || ''))
</script>
<style scoped lang="scss"></style>
