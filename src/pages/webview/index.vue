<template>
  <web-view v-if="isLoadPage === 1" :src="url" @message="handleMessage"></web-view>
</template>

<script setup>
import { isUrl } from '@/utils/regex'
import { ref, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

const isLoadPage = ref(0)
const url = ref('')

let webviewURL = ''
onLoad((option) => {
  webviewURL = decodeURIComponent(option.url)
})
onMounted(() => {
  if (isUrl(webviewURL)) {
    url.value = webviewURL
    isLoadPage.value = 1
  } else {
    isLoadPage.value = 2
  }
})
const handleMessage = (event) => {
  // console.log(event)
}
</script>

<style lang="scss" scoped></style>
