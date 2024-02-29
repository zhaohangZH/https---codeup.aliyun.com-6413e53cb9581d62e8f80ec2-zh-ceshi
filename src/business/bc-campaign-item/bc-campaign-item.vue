<template>
  <view v-if="info.id" class="info">
    <view class="info-body">
      <tc-image width="180" height="180" radius="20" :src="info.frontImage" />
      <view class="written-words">
        <text class="written-words-t1 tc-line-2">
          {{ info.name }}
        </text>
        <view class="flex-row items-center written-words-t2">
          <tc-image width="28" height="28" src="!@/imgs/i_27.png" />
          <text style="margin-left: 16rpx">{{ info.currentTime }}</text>
        </view>
      </view>
    </view>
    <view class="info-btn-box">
      <view class="flex-row justify-center items-center info-btn info-btn-1">
        <!--status 0:未出行 1:已出行 -->
        <template v-if="info.status === 1">
          <tc-image width="28" height="28" src="!@/imgs/i_31.png" />
          <text class="info-btn-t2" style="margin-left: 12rpx">活动已完成</text>
        </template>

        <template v-else-if="info.signUpStatus === 1">
          <tc-image width="28" height="28" src="!@/imgs/i_31.png" />
          <text class="info-btn-t1" style="margin-left: 12rpx">活动报名成功</text>
        </template>

        <template v-else-if="info.signUpStatus === 3">
          <tc-image width="28" height="28" src="!@/imgs/i_31.png" />
          <text class="info-btn-t3" style="margin-left: 12rpx">活动候补中</text>
        </template>

        <template v-else-if="info.signUpStatus === 4">
          <tc-image width="28" height="28" src="!@/imgs/i_31.png" />
          <text class="info-btn-t4" style="margin-left: 12rpx">活动候补成功</text>
        </template>

        <template v-else-if="info.signUpStatus === 5">
          <tc-image width="28" height="28" src="!@/imgs/i_31.png" />
          <text class="info-btn-t5" style="margin-left: 12rpx">活动已签到</text>
        </template>
      </view>
      <view class="flex-row justify-between items-center info-btn info-btn-2">
        <!--signUpStatus 1:报名成功 2：报名中签 3：报名后补 -->
        <text class="info-btn-t">
          {{ info.signUpStatus === 3 ? '候补号码' : '场次号码' }}
        </text>
        <text :class="'info-btn-t' + info.signUpStatus" style="margin-left: 20rpx">
          {{ info.signNum }}
        </text>
      </view>
    </view>
  </view>
</template>

<script setup>
const props = defineProps({
  info: {
    type: Object,
    default: () => {}
  }
})
</script>

<style lang="scss" scoped>
.info {
  &-body {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 48rpx 0;
  }
  &-btn {
    height: 72rpx;
    background-color: #f9f9f9;
    border-radius: 50px;

    font-size: 24rpx;
    font-weight: 400;
    font-family: TsangerYuMo-3;
    box-sizing: border-box;

    &-box {
      margin-top: 26rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    &-1 {
      width: 376rpx;
    }

    &-2 {
      width: 274rpx;
      padding: 0 48rpx;
    }

    &-t {
      font-size: 24rpx;
      color: #666;
    }
    &-t1,
    &-t5 {
      color: #3d5b98;
    }
    &-t2 {
      color: #225497;
    }
    &-t3,
    &-t4 {
      color: #225497;
    }
  }
  .written-words {
    margin-left: 40rpx;
    height: 152rpx;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &-t1 {
      font-size: 32rpx;
      //font-weight: 600;
      color: #333333;
    }
    &-t2 {
      /* margin-top: 28rpx; */
      font-size: 28rpx;
      font-weight: 500;
      color: #666666;
    }
  }
}
</style>
