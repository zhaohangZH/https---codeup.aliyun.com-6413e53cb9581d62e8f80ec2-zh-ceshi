<template>
  <z-paging
    ref="paging"
    v-model="moreList"
    empty-view-text="暂无照片展示~"
    :default-page-size="21"
    @query="geMoreList"
  >
    <template v-slot:top>
      <bc-navbar
        :type="4"
        title="照片展示"
        :custom-style="{ backgroundColor: '#fff' }"
        :share="false"
    /></template>
    <view class="co_photo">
      <view
        v-for="(item, index) in moreList"
        :key="item.id"
        class="co_photo_img"
        @click="topImg(index)"
      >
        <tc-image width="100%" height="200rpx" mode="aspectFill" :src="item.smallFilePath" />
      </view>
    </view>
  </z-paging>
</template>
<script setup>
import { ref } from 'vue'
import { getSpecialColumnMoreList } from '@/api/specialColumn.js'
import { onLoad } from '@dcloudio/uni-app'
const Id = ref('')
onLoad((op) => {
  Id.value = op.id
})

// 获取图片列表
const paging = ref(null)
const moreList = ref([])
const filePathList = ref([]) //浏览图片列表
const geMoreList = async (pageIndex, pageSize) => {
  const [err, res] = await getSpecialColumnMoreList({
    pageIndex,
    pageSize,
    groupId: Id.value
  })
  if (!err) {
    const { result } = res
    paging.value.complete(result.data || [])
    // 浏览图片列表
    if (pageIndex == 1) {
      filePathList.value = []
    }
    result.data.map((item) => {
      filePathList.value.push(item.filePath)
    })
  }
}

// 浏览模式
const topImg = (i) => {
  uni.previewImage({
    current: i,
    urls: filePathList.value
  })
}
</script>
<style lang="scss" scoped>
.co_photo {
  padding: 0 10rpx 32rpx;
  font-size: 0;
  &_img {
    display: inline-block;
    margin-bottom: 10rpx;
    padding-right: 12rpx;
    width: 33.333%;
    box-sizing: border-box;
    &:nth-child(3n) {
      padding-right: 0;
    }
  }
}
</style>
