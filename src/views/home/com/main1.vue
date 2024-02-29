<template>
  <view v-if="datelist.length" class="h_box">
    <view class="flex-row justify-between items-center h_box_title">
      <tc-image width="216" height="60" src="!@/imgs/h_t_01.png" mode="widthFix" />
      <navigator
        url="/pages/donate/index"
        class="flex-row items-center h_box_title_rig"
        hover-class="hover-class"
      >
        <tc-image width="30" height="32" src="!@/imgs/icon-logo.png" mode="widthFix" />
        <text class="h_box_title_rig_t">全部捐赠</text>
        <uni-icons type="right" size="12" color="#CCDCEA"></uni-icons>
      </navigator>
    </view>
    <view class="h_box_main">
      <bc-donate-item v-for="item in datelist" :key="item.id" :item="item" />
    </view>
  </view>
</template>
<script setup>
import { onMounted, ref } from 'vue'
import { getTopProjectList } from '@/api/index'
const datelist = ref([])
onMounted(async () => {
  const [err, res] = await getTopProjectList({ top: 3 })
  if (!err) {
    datelist.value = res.result.data || []
  }
})
</script>
<style lang="scss" scoped>
.h_box {
  padding: 60rpx 40rpx 0;
  &_main {
    margin-top: 48rpx;
    color: #333;
  }
}
</style>
