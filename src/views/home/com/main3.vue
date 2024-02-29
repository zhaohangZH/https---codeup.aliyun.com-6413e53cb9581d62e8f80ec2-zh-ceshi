<template>
  <view v-if="datelist.length" class="h_box">
    <view class="flex-row justify-between items-center h_box_title">
      <tc-image width="216" height="60" src="!@/imgs/h_t_03.png" mode="widthFix" />
      <view
        @click="switchTab"
        class="flex-row items-center h_box_title_rig"
        hover-class="hover-class"
      >
        <tc-image width="30" height="32" src="!@/imgs/icon-logo.png" mode="widthFix" />
        <text class="h_box_title_rig_t">全部咨询</text>
        <uni-icons type="right" size="12" color="#CCDCEA"></uni-icons>
      </view>
    </view>
    <view class="h_box_content">
      <bc-new-item v-for="item in datelist" :key="item.id" :item="item" />
    </view>
  </view>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { getNewsList } from '@/api/news'
import { useDonateStore } from '@/store/donate'

const datelist = ref([])
onMounted(async () => {
  const [err, res] = await getNewsList({ pageIndex: 1, pageSize: 5 })
  if (!err) {
    datelist.value = res.result.data || []
  }
})

const switchTab = () => {
  useDonateStore().setActiveTab(1)
  uni.switchTab({ url: 'views/donate/index' })
}
</script>
<style lang="scss" scoped>
.h_box {
  margin-top: 100rpx;
  padding: 0 40rpx;
  &_content {
    margin-top: 24rpx;
  }
}
</style>
