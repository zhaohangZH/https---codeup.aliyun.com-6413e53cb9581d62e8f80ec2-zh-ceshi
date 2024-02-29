<template>
  <bc-navbar
    :type="payStatus === 6 ? 2 : 3"
    :custom-style="{ backgroundColor: '#fff' }"
    :share="false"
  />
  <template v-if="payStatus">
    <!-- 1-加载中 -->
    <view v-if="payStatus === 1" class="status-booth">
      <view style="display: flex">
        <tc-image width="150" height="150" src="!@/imgs/i_01.gif" />
      </view>
      <text class="status-booth-text">捐赠确认中，请及时前往中银公益完成捐赠</text>
    </view>
    <!-- 2-成功 -->
    <view v-else-if="payStatus === 2" class="status-booth">
      <tc-image
        v-if="payOrderResult.isReceive"
        width="324rpx"
        height="324rpx"
        :src="payOrderResult.qrCodeUrl"
      />
      <view
        v-else
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          width: 150rpx;
          height: 150rpx;
        "
      >
        <!-- isReceive当场领取 -->
        <tc-image width="100" height="100" src="!@/imgs/i_21.png" />
      </view>
      <text class="status-booth-text">{{
        payOrderResult.isReceive
          ? '捐赠完成，请前往活动处领取回馈品！'
          : '捐赠完成，感谢您为公益的付出！'
      }}</text>
    </view>
    <!-- 6-失败 -->
    <view v-else-if="payStatus === 6" class="status-booth">
      <view
        style="
          display: flex;
          align-items: center;
          justify-content: center;
          width: 150rpx;
          height: 150rpx;
        "
      >
        <tc-image width="100" height="100" src="!@/imgs/i_22.png" />
      </view>
      <text class="status-booth-text">捐赠失败，请返回重新操作</text>
    </view>

    <view v-if="payOrderDetails.id" class="card-info">
      <view class="flex-row items-center">
        <tc-image width="28" height="28" src="!@/imgs/i_16.png" />
        <text style="margin-left: 20rpx">回馈品信息</text>
      </view>
      <view class="card-info-bd">
        <view>
          <tc-image width="180" height="180" :src="payOrderDetails.imageUrl" />
        </view>
        <view class="card-info-bd-details">
          <text class="card-info-bd-details-t1 tc-line-2">{{ payOrderDetails.name }}</text>
          <text class="card-info-bd-details-t2">已选择</text>
          <text class="card-info-bd-details-t3 tc-line-1">{{ payOrderDetails.spec }}</text>
        </view>
      </view>
    </view>

    <tc-tabbar customStyle="background:rgba(0,0,0,0)" :border="false">
      <view class="page-foot">
        <!-- 1-加载中 -->
        <view
          v-if="payStatus === 1"
          class="page-foot-btn"
          hover-class="hover-class"
          @click="jumpMiniProgram"
        >
          前往中银公益
        </view>
        <!-- 2-成功 -->
        <view
          v-else-if="payStatus === 2"
          class="page-foot-btn"
          hover-class="hover-class"
          @click="goHome"
        >
          返回首页
        </view>
        <!-- 6-失败 -->
        <view
          v-else-if="payStatus === 6"
          class="page-foot-btn"
          hover-class="hover-class"
          @click="goBack"
        >
          重新捐赠
        </view>
      </view>
    </tc-tabbar>
  </template>
</template>

<script setup>
import { debounce } from '@/utils/debounce.js'
import { onLoad, onUnload } from '@dcloudio/uni-app'
import { ref, onMounted, onBeforeUnmount } from 'vue'
import { checkOrder, goToMiniProgram } from '@/api/index.js'
import { getPayOrderDetail } from '@/api/order.js'

let timer = 0
let pageId = ''
onLoad((option) => {
  pageId = option.id
  timer = 1
})

const payStatus = ref(0)
const getCardInfo = async () => {
  const [err, res] = await checkOrder({ orderId: pageId })
  if (!err) {
    const { payStatus: status = 0 } = res.result || {}
    payStatus.value = status
    if (status === 1 && timer) {
      timer = setTimeout(getCardInfo, 3000)
    }
  }
}

const payOrderResult = ref({})
const payOrderDetails = ref({})
const getPayOrder = async () => {
  const [err, res] = await getPayOrderDetail({ id: pageId })
  if (!err) {
    const { result } = res
    payOrderResult.value = result
    payOrderDetails.value = (result.payOrderDetails || [])[0] || {}
  }
}

let toMiniProgramParams = {}
const getToMiniProgram = async () => {
  const [err, res] = await goToMiniProgram({ orderId: pageId })
  if (!err) {
    const { result } = res
    toMiniProgramParams = {
      appId: result.appId,
      path: result.path,
      envVersion: result.envVersion
    }
    jumpMiniProgram()
  }
}
const jumpMiniProgram = () => {
  // #ifdef MP-WEIXIN
  if (uni.canIUse('openEmbeddedMiniProgram')) {
    uni.openEmbeddedMiniProgram({ ...toMiniProgramParams, complete: () => {} })
  } else {
    uni.navigateToMiniProgram({ ...toMiniProgramParams, complete: () => {} })
  }
  // #endif
}
const goBack = debounce(() => uni.navigateBack({ delta: 1 }), 800, {
  leading: true,
  trailing: false
})
const goHome = debounce(() => uni.switchTab({ url: 'views/home/index' }), 800, {
  leading: true,
  trailing: false
})

onMounted(() => {
  getCardInfo()
  getPayOrder()
  getToMiniProgram()
})
onBeforeUnmount(() => {
  clearTimeout(timer)
  timer = 0
})
onUnload(() => {
  clearTimeout(timer)
  timer = 0
})
</script>

<style scoped lang="scss">
.status-booth {
  padding: 80rpx 40rpx;
  background-color: #ffffff;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  &-text {
    margin-top: 70rpx;
    font-size: 28rpx;
    font-weight: 400;
    color: #333333;
  }
}
.card-info {
  margin: 20rpx 0;
  padding: 40rpx;
  background-color: #ffffff;
  &-bd {
    margin-top: 56rpx;

    display: flex;
    flex-direction: row;

    &-details {
      margin-left: 40rpx;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      font-size: 28rpx;
      font-weight: 400;

      &-t1 {
        font-size: 32rpx;
        font-family: TsangerYuMo-3;
        color: #000;
      }
      &-t2 {
        color: #666;
      }
      &-t3 {
        color: #225497;
      }
    }
  }
}
.page-foot {
  padding: 20rpx 40rpx;
  width: 100%;
  &-btn {
    width: 100%;
    height: 96rpx;
    background: #225497;
    border-radius: 20rpx;

    font-size: 30rpx;
    font-weight: 400;
    color: #ffffff;

    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
