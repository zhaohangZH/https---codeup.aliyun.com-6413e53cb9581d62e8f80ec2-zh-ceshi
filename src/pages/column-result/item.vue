<template>
  <view v-if="info.id" class="info">
    <view class="info-body">
      <tc-image width="180" height="180" radius="12" :src="info.coverImage" />
      <view class="written-words">
        <text class="written-words-t1 tc-line-2">
          {{ info.name }}
        </text>
        <text class="written-words-t2 tc-line-1">{{ info.startTime }}</text>
      </view>
    </view>
    <!-- <view class="info-btn-box">
      <view class="info-btn info-btn-1">
        <template v-if="info.status === 1">
          <tc-image width="20rpx" height="20rpx" src="!@/my/my_icon0003.png" />
          <text class="info-btn-t2" style="margin-left: 16rpx">比赛已完成</text>
        </template>

        <template v-else-if="info.signUpStatus === 1">
          <tc-image width="20rpx" height="20rpx" src="!@/my/my_icon0001.png" />
          <text class="info-btn-t1" style="margin-left: 16rpx">比赛报名成功</text>
        </template>

        <template v-else-if="info.signUpStatus === 3">
          <tc-image width="20rpx" height="20rpx" src="!@/my/my_icon0002.png" />
          <text class="info-btn-t3" style="margin-left: 16rpx">比赛候补中</text>
        </template>

        <template v-else-if="info.signUpStatus === 4">
          <tc-image width="20rpx" height="20rpx" src="!@/my/my_icon0002.png" />
          <text class="info-btn-t4" style="margin-left: 16rpx">比赛候补成功</text>
        </template>

        <template v-else-if="info.signUpStatus === 5">
          <tc-image width="20rpx" height="20rpx" src="!@/my/my_icon0001.png" />
          <text class="info-btn-t5" style="margin-left: 16rpx">比赛已签到</text>
        </template>
      </view>
      <view class="info-btn info-btn-2">
        <text class="info-btn-t">
          {{ info.signUpStatus === 3 ? '候补号码' : '场次号码' }}
        </text>
        <text :class="'info-btn-t' + info.signUpStatus" style="margin-left: 20rpx">
          {{ info.signNum }}
        </text>
      </view>
    </view> -->
  </view>
</template>

<script setup>
// status 0:未出行 1:已出行
// signUpStatus 1:报名成功 2：报名中签 3：报名后补
const props = defineProps({
  info: {
    type: Object,
    default: () => {}
  }
})
</script>

<style lang="scss" scoped>
.info {
  padding: 32rpx;

  background-color: #ffffff;
  border-radius: 28rpx;
  box-shadow: 0rpx 8rpx 16rpx 0rpx #e7e7ea;

  &-body {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  &-btn {
    &-box {
      margin-top: 26rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    height: 72rpx;
    background-color: #f9f9f9;
    border: 2rpx solid #f6f6f6;
    border-radius: 12rpx;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 24rpx;
    font-weight: 400;
    font-family: TsangerYuMo-3;

    &-1 {
      width: 370rpx;
    }

    &-2 {
      width: 230rpx;
    }

    &-t {
      font-size: 20rpx;
      color: #999999;
    }
    &-t1,
    &-t5 {
      color: #3d5b98;
    }
    &-t2 {
      color: #aaaaaa;
    }
    &-t3,
    &-t4 {
      color: #309a65;
    }
  }
  .written-words {
    margin-left: 32rpx;
    height: 152rpx;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    &-t1 {
      font-size: 30rpx;
      //font-weight: 600;
      color: #333333;
    }
    &-t2 {
      /* margin-top: 28rpx; */
      font-size: 26rpx;
      font-weight: 500;
      color: #666666;
    }
  }
}
</style>
