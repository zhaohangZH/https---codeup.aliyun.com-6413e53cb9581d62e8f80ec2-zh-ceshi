<template>
  <view v-if="info.sellout === 1 || info.status !== 2" class="com-card">
    <view v-if="info.sellout === 1" class="com-card-btn disabled">回馈品发放完毕</view>

    <view v-else-if="info.status === 1" class="com-card-btn disabled">
      距开始捐赠
      <tc-count-down
        v-model:diff-time="diffTime"
        format="DD天 HH:mm:ss"
        @countdown-end="emits('reload')"
      />
    </view>
    <view v-else-if="info.status === 3" class="com-card-btn disabled">捐赠已结束</view>
  </view>
  <view v-else-if="userInfo" class="com-card">
    <!-- <view class="com-card-text">
      <tc-image width="40" height="40" src="!@/icons/i30.png" />
      <text class="com-card-text-t1">捐赠证书</text>
    </view> -->
    <view
      v-if="userInfo.mobile"
      class="com-card-btn"
      hover-class="hover-class"
      @click="emits('submit')"
    >
      立即捐赠
    </view>
    <bc-phone-btn v-else style="flex: 1" @resolve="emits('submit')">
      <view class="com-card-btn" hover-class="hover-class">立即捐赠</view>
    </bc-phone-btn>
  </view>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/user'
import dayjs from 'dayjs'

const props = defineProps({
  info: {
    type: Object,
    default: () => ({})
  }
})

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

const emits = defineEmits(['submit', 'reload'])

let diffTime = ref(0)
const handlePageInit = () => {
  const { currentDate = 0, startTime = 0 } = props.info
  if (!currentDate || !startTime || props.info.status !== 1) return
  diffTime.value = dayjs(startTime).valueOf() - dayjs(currentDate).valueOf()
}
onMounted(handlePageInit)
</script>

<style lang="scss" scoped>
.com-card {
  padding: 20rpx 40rpx;
  display: flex;
  align-items: center;
  // justify-content: space-between;
  justify-content: center;
  &-text {
    display: flex;
    flex-direction: row;
    align-items: center;
    &-t1 {
      margin-left: 20rpx;
      font-size: 28rpx;
      font-weight: 400;
      color: #333333;
    }
  }
  &-btn {
    width: 100%;
    height: 96rpx;
    border-radius: 20rpx;
    background: #225497;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    font-size: 30rpx;
    font-weight: 400;
    color: #ffffff;

    &.disabled {
      color: #999;
      border-color: #efefef;
      background: #efefef;
    }
  }
}
</style>
