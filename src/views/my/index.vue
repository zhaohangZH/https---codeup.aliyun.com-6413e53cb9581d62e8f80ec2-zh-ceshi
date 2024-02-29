<template>
  <view class="my_content">
    <tc-image class="my_content_bj" width="100%" src="!@/user/my_bj.png" mode="widthFix" />
    <myTop :userInfo="userInfo" :honors="honors"></myTop>
    <!-- 订单 -->
    <order :userCounts="userCounts"></order>
    <!-- 证书 -->
    <jingang :userCounts="userCounts"></jingang>
    <!-- 我的捐赠 -->
    <donate :userCounts="userCounts"></donate>
    <!-- 我的成就 -->
    <!-- <honor @honorVal="(v) => (honors = v)" @item-click="userAchievementDetails"></honor> -->
    <!-- 常用功能 -->
    <view class="my_content_fun">
      <view class="my_content_fun_top">
        <tc-image src="!@/imgs/icon-logo-b.png" width="30" height="32" mode="widthFix" />
        <text>常用功能</text>
      </view>
      <service></service>
    </view>
  </view>
  <bc-tabbar />
  <bc-certificate-popup
    :info="currentCertificateInfo"
    :show="showCertificate"
    @close="showCertificate = false"
  />
</template>

<script setup>
import { ref } from 'vue'
import myTop from './components/top.vue'
import jingang from './components/jingang.vue'
import order from './components/order.vue'
import donate from './components/donate.vue'
import honor from './components/honor.vue'
import service from './components/service.vue'

import { getUserStatisticsCount, getUserAchievementDetails } from '@/api/user'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/user'
import { onShow } from '@dcloudio/uni-app'

// userInfo
const userStore = useUserStore()
// 用户信息
const { userInfo } = storeToRefs(userStore)

// 获取各数量数据
const userCounts = ref({})
const getCount = async () => {
  const [err, res] = await getUserStatisticsCount()
  if (!err) {
    const { result } = res
    userCounts.value = result
  }
}
// 我的成就
const honors = ref(0)
onShow(() => getCount())

const showCertificate = ref(false)
const currentCertificateInfo = ref({})
let isLoad = false
const userAchievementDetails = async (item) => {
  if (isLoad || item.isOn > 1) return
  isLoad = true
  const [err, res] = await getUserAchievementDetails({ id: item.id })
  if (!err) {
    const { result } = res
    showCertificate.value = true
    currentCertificateInfo.value = result
  }
  isLoad = false
}
</script>

<style lang="scss" scoped>
.my_content {
  padding-top: 248rpx;
  padding-bottom: 50rpx;
  // background: linear-gradient(to bottom left, #e4efff, #fff, #e4efff, #fff);
  box-sizing: border-box;
  ::v-deep {
    > .tc-image {
      position: fixed;
      top: 0;
      left: 0;
      z-index: -1;
    }
  }
  &_fun {
    margin-top: 60rpx;
    padding: 0 48rpx;
    &_top {
      display: flex;
      align-items: center;
      text {
        margin-left: 20rpx;
        font-size: 32rpx;
        // font-weight: bold;
      }
    }
  }
}
</style>
