<template>
  <page-meta :page-style="pageStyle" />
  <bc-navbar :type="2" :share="false" :custom-style="{ backgroundColor: '#fff' }" />
  <view v-if="info.id" class="page-box">
    <view class="page-box-top">
      <tc-image width="100%" height="600" mode="widthFix" :src="info.imageUrl" />
      <view v-if="info.status === 3" class="flex-row justify-center items-center closed-mask">
        <tc-image width="160" height="160" src="!@/imgs/i_01.png" mode="widthFix" />
      </view>
    </view>
    <view class="page-list">
      <items
        v-for="item in info.products"
        :key="item.id"
        :info="{ status: info.status, id: info.id }"
        :item="item"
      />
    </view>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { items } from './item.vue'
import { onLoad } from '@dcloudio/uni-app'
import { getProjectDetail } from '@/api/index'
const pageStyle = `
padding-bottom: 24rpx;
padding-bottom: calc(24rpx + constant(safe-area-inset-bottom));
padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
`
let pageId = ''
onLoad((option) => (pageId = option.id))

const info = ref({})
onMounted(() => {
  ;(async () => {
    const [err, res] = await getProjectDetail({ id: pageId })
    if (!err) {
      const { result } = res
      info.value = result
    }
  })()
})

const gotoDetails = (item) => {
  if (info.value.status === 3 || item.sellout === 1) {
    return uni.showToast({ icon: 'none', title: '此回馈已结束' })
  }
  uni.navigateTo({ url: `pages/project-details/index?id=${pageId}&goodsId=${item.id}` })
}
</script>

<style lang="scss" scoped>
.page-box {
  text-align: center;
  &-top {
    position: relative;
    height: 320rpx;
    overflow: hidden;
  }
}
.page-list {
  padding: 40rpx 40rpx;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 30rpx;
  column-gap: 30rpx;
}
.closed-mask {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba($color: #000000, $alpha: 0.4);
}
</style>
