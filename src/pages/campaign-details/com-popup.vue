<template>
  <view class="com-box">
    <view style="padding: 40rpx 40rpx 0">
      <text class="com-title-t1 tc-line-3">{{ info.name }}</text>
      <view class="flex-row items-center com-box-address" @click="emits('openlocation')">
        <tc-image width="20" height="20" src="!@/imgs/i_14.png" />
        <text class="com-box-address-text">{{ info.address }}</text>
      </view>
    </view>
    <view style="margin-top: 40rpx">
      <view class="flex-row items-center" style="padding: 0 40rpx">
        <tc-image width="24" height="24" src="!@/imgs/i_27.png" />
        <text class="com-title-t2 tc-line-3">选择时间</text>
      </view>
      <scroll-view class="tab-list" scroll-x enable-passive bounces :show-scrollbar="false">
        <view
          v-for="item in selectActiveList"
          :key="item.id"
          class="tab-item"
          :class="[{ disabled: item.status === 2 }, { active: selectActiveID.includes(item.id) }]"
          @click="handleItemClick(item)"
        >
          <view class="tab-item-box">
            <view class="tab-item-content tc-line-1">{{ item.dateString }}</view>
            <view class="tab-item-content tc-line-1">{{ item.description }}</view>
          </view>
          <view v-if="item.status === 2" class="tab-item-jb">
            <tc-image width="36" height="120" src="!@/imgs/i_29.png" mode="widthFix" />
          </view>
        </view>
      </scroll-view>
      <view v-if="selectActiveDetail.id" style="margin-top: 40rpx">
        <view class="flex-row items-center" style="padding: 0 40rpx">
          <tc-image width="24" height="24" src="!@/imgs/i_28.png" />
          <text class="com-title-t2 tc-line-3">选择场次</text>
        </view>
        <view class="com-session">
          <view class="com-session-item com-session-item-0">
            <view>
              <text class="com-session-item-t1">{{ selectActiveDetail.dateString }}</text>
              <text class="com-session-item-t1">{{ selectActiveDetail.weekDay }}</text>
              <text class="com-session-item-t1">{{ selectActiveDetail.description }}</text>
            </view>
            <view class="com-session-item-t2">{{ selectActiveDetail.stockName }}</view>
            <view v-if="selectActiveDetail.status === 2" class="com-session-item-jb">
              <tc-image width="48" height="116" src="!@/imgs/i_29.png" mode="heightFix" />
            </view>
          </view>
        </view>
      </view>
      <view style="padding: 0 40rpx">
        <view class="com-footer">
          <view class="com-footer-cancel" @click="emits('close')">取消</view>
          <view
            class="com-footer-confirm"
            :class="[{ disabled: !selectActiveID.length }]"
            :hover-class="selectActiveID.length ? 'hover-class' : 'none'"
            @click="handlePay"
          >
            确认选择
          </view>
        </view>
      </view>
    </view>
    <view style="width: 100%" :style="{ height: safeAreaBottom + 'px' }"></view>
  </view>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import {
  getActivityChargeGrop,
  getActivityChargeGropDetail,
  activitySignUp
} from '@/api/activity.js'

const emits = defineEmits(['close', 'openlocation'])
const props = defineProps({
  info: {
    type: Object,
    default: () => {}
  }
})

const selectActiveList = ref([])
const selectActiveDetail = ref({})

const selectActiveID = reactive([])

const safeAreaBottom = ref(0)
onMounted(async () => {
  safeAreaBottom.value = uni.getSystemInfoSync().safeAreaInsets.bottom
  const [err, res] = await getActivityChargeGrop({ activityId: props.info.id })
  if (!err) {
    const { result = [] } = res
    selectActiveList.value = result
    if (!selectActiveID.length) {
      for (let i = 0, l = result.length; i < l; i++) {
        const item = result[i]
        // 设置默认选中项
        if (item.status !== 2) {
          selectActiveID[0] = item.id
          break
        }
      }
    }
    getActivityChargeDetail()
  }
})

const handleItemClick = (item) => {
  if (item.status === 2) return
  selectActiveID[0] = item.id
  getActivityChargeDetail()
}

const getActivityChargeDetail = async () => {
  const [id] = selectActiveID
  if (!id) return
  const [err, res] = await getActivityChargeGropDetail({ id })
  if (!err) {
    const { result = {} } = res
    selectActiveDetail.value = result
  }
}
// {
//   // let misses = true
//   // for (let i = 0, l = selectActiveID.length; i < l; i++) {
//   //   if (id === selectActiveID[i]) {
//   //     misses = false
//   //     selectActiveID.splice(i, 1)
//   //     break
//   //   }
//   // }
//   // if (misses && !selectActiveID.length) {
//   //   console.log('添加')
//   //   selectActiveID.push(id)
//   // }
// }

const handlePay = async () => {
  if (!selectActiveID.length) return
  const [err, res] = await activitySignUp({
    activityId: props.info.id,
    activityChargeId: selectActiveID[0]
  })
  if (!err) {
    const { result = '' } = res
    uni.navigateTo({ url: 'pages/campaign-form/index?id=' + result })
  }
}
</script>

<style lang="scss" scoped>
.com-box {
  background-color: #fff;
  border-radius: 40rpx 40rpx 0rpx 0rpx;
  overflow: hidden;
  &-address {
    padding: 24rpx 0 40rpx;
    color: #666;
    font-size: 22rpx;
    font-weight: 400;
    line-height: 24rpx;
    border-bottom: 2rpx solid #eee;
    &-text {
      margin-left: 16rpx;
    }
  }
}
.com-title-t1 {
  display: block;

  font-size: 32rpx;
  font-weight: 400;
  color: #333333;
  line-height: 48rpx;
  font-weight: 400;
}
.com-scroll {
  margin: 20rpx 0;
  height: 420rpx;

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  // align-items: center;
  justify-content: space-between;

  &-item {
    align-self: flex-start;
    overflow: hidden;
    position: relative;

    &.margin-top {
      margin-top: 48rpx;
    }

    &-content {
      width: 196rpx;
      height: 236rpx;
      background-color: #f9f9f9;
      border: 2rpx solid #f2f2f2;
      border-radius: 20rpx;

      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;

      &-t1 {
        font-size: 26rpx;
        font-weight: 400;
        color: #666666;
      }
      &-t2 {
        margin: 20rpx 0;
        font-size: 60rpx;
        font-weight: 700;
        color: #333333;
      }
      &-t3 {
        font-size: 26rpx;
        font-weight: 400;
        color: #3567cb;
      }
    }

    &-gap-left,
    &-gap-right {
      width: 36rpx;
      height: 36rpx;
      border: 2rpx solid #f2f2f2;
      border-radius: 40rpx;
      background-color: #fff;

      margin-top: -20rpx;
      position: absolute;
      top: 50%;
      z-index: 1;
    }

    &-gap-left {
      left: -20rpx;
    }
    &-gap-right {
      right: -20rpx;
    }

    $p: &;
    &.active {
      #{$p + -content} {
        background-color: #3e68bd;
        border-color: #93a8e3;
        &-t1,
        &-t2,
        &-t3 {
          color: #fff;
        }
      }
      #{$p + -gap-left},
      #{$p + -gap-right} {
        border-color: #93a8e3;
      }
    }
    &.disabled {
      #{$p + -content} {
        background-color: #f9f9f9;
        border-color: #f2f2f2;
        &-t1,
        &-t2,
        &-t3 {
          color: #ccc;
        }
      }
      #{$p + -gap-left},
      #{$p + -gap-right} {
        border-color: #f2f2f2;
      }
    }
  }

  &-seat {
    width: 200rpx;
    height: 0;
  }
}
.com-title-t2 {
  font-family: 'TsangerYuMo-3';
  display: block;
  margin-left: 16rpx;

  font-size: 28rpx;
  font-weight: 400;
  color: #333333;
  line-height: 52rpx;
}
.com-footer {
  padding: 40rpx 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &-cancel {
    padding: 28rpx 34rpx;
    font-size: 28rpx;
    font-weight: 400;
    color: #225497;
    line-height: 36rpx;
    width: 220rpx;
    text-align: center;

    border-radius: 20rpx;
    border: 1px solid #e4f1ff;
    background: #f8fbff;
    box-sizing: border-box;
  }
  &-confirm {
    margin-left: 20rpx;
    height: 96rpx;
    background: #225497;
    border-radius: 20rpx;

    display: flex;
    align-items: center;
    justify-content: center;
    flex: 1;

    font-size: 30rpx;
    font-weight: 400;
    color: #ffffff;
    line-height: 36rpx;

    &.disabled {
      background-image: linear-gradient(180deg, #f9f9f9, #f2f2f2);
      border-color: #f2f2f2;
      color: #aaaaaa;
    }
  }
}

.tab-list {
  padding: 0 40rpx;
  margin-top: 40rpx;
  white-space: nowrap;
  font-size: 0;
  overflow: hidden;
  .tab-gap-end {
    margin-left: 28rpx;
  }
  .tab-item {
    display: inline-flex;

    margin-right: 28rpx;
    width: 200rpx;
    height: 96rpx;
    box-sizing: border-box;
    background-color: #fff;
    border: 2rpx solid #eee;
    border-radius: 20rpx;

    font-weight: 400;
    color: #666;
    line-height: 36rpx;

    position: relative;
    overflow: hidden;
    &-box {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      width: 100%;
    }
    &.active {
      background-color: #fafcff;
      border-color: #3459b4;
      color: #3567cb;
    }

    &.disabled {
      padding-right: 20rpx;
      background-color: #f9f9f9;
      border-color: #f6faff;
      color: #aaa;
    }

    &-content {
      width: 100%;
      &:nth-child(1) {
        line-height: 24rpx;
        font-size: 24rpx;
      }
      &:nth-child(2) {
        margin-top: 12rpx;
        line-height: 20rpx;
        font-size: 20rpx;
      }
    }
    &-jb {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      width: 36rpx;
      height: 100rpx;
    }
  }
}
.com-session {
  &-item {
    display: inline-flex;
    vertical-align: top;
    margin-left: 28rpx;
    margin-top: 40rpx;

    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    width: 500rpx;
    height: 120rpx;
    padding: 0 40rpx;
    box-sizing: border-box;
    background-color: #ffffff;
    border: 2rpx solid #cccccc;
    border-radius: 24rpx;

    font-size: 24rpx;
    font-weight: 400;
    color: #333333;
    line-height: 36rpx;

    position: relative;
    overflow: hidden;

    &-jb {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      margin: auto;
      // width: 48rpx;
      height: 116rpx;
    }
    &-0 {
      background-color: #fafcff;
      border-color: #3459b4;
      color: #3567cb;
    }
    &-1 {
      background-color: #e6fbef;
      border-color: #25a258;
      color: #25a258;
    }
    &-2 {
      background-color: #eeeeee;
      border-color: #666666;
      color: #666666;
    }

    &-t1 {
      line-height: 24rpx;
      font-size: 24rpx;
      $p: &;
      & + #{$p} {
        margin-left: 12rpx;
      }
    }
    &-t2 {
      margin-top: 20rpx;
      line-height: 20rpx;
      font-size: 20rpx;
    }
  }
}
</style>
