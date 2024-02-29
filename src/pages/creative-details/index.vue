<template>
  <page-meta :page-style="'overflow:' + (showPopup ? 'hidden' : 'visible')"></page-meta>
  <bc-navbar title="文创详情" :type="4" :custom-style="{ backgroundColor: '#fff' }" />
  <view v-if="pageLoaded" class="project-details">
    <com-booth :info="boothList" />
    <com-info :info="infoObj" />
    <com-image-text :info="projectContent" />
  </view>
</template>

<script setup>
import ComBooth from './com-booth.vue'
import ComInfo from './com-info.vue'
import ComImageText from './com-image-text.vue'
import { ref, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getGoodsCulturalInfo } from '@/api/goods'

let pageId = ref('')
onLoad((option) => {
  pageId.value = option.id
})

const showPopup = ref(false)

const pageLoaded = ref(false)
const boothList = ref([])
const infoObj = ref({})
const projectContent = ref('')

const getGoodsCulturalInfoFun = async () => {
  const [err, res] = await getGoodsCulturalInfo({ id: pageId.value })
  if (!err) {
    const { result } = res

    boothList.value = result.bannerUrls

    infoObj.value = {
      id: result.id,
      name: result.name,
      spec: result.spec
    }

    projectContent.value = result.description
    pageLoaded.value = true
  }
}

onMounted(() => {
  getGoodsCulturalInfoFun()
})
</script>

<style lang="scss" scoped>
.project-details {
  padding-bottom: 60rpx;
}
</style>
