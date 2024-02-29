<template>
  <page-meta :page-style="'overflow:' + (showPopup ? 'hidden' : 'visible')"></page-meta>
  <bc-navbar
    title=""
    :type="2"
    :custom-style="{ backgroundColor: '#fff' }"
    :share="!!mixin$_shareInfo.shareAppMessage"
  />
  <view v-if="activeInfo.id" style="background: #fff">
    <view v-if="boothList.length" class="booth-content">
      <swiper v-if="boothList.length > 1" autoplay style="width: 100%; height: 100%">
        <swiper-item v-for="(item, index) in boothList" :key="index">
          <tc-booth :cover-image="item" />
        </swiper-item>
      </swiper>
      <tc-booth v-else :cover-image="boothList[0]" />
    </view>
    <!-- 北地大要求隐藏掉此区域
    <com-card-base-info :info="activeInfo" />
    -->
    <!-- title -->
    <view class="campaign-details-title">
      <text class="tc-line-3">{{ activeInfo.name }}</text>
    </view>
    <view class="flex-row items-center campaign-details-date">
      <view class="campaign-details-date-left">活动日期</view>
      <scroll-view
        class="flex-1 campaign-details-date-rig"
        scroll-x
        enable-passive
        bounces
        :show-scrollbar="false"
      >
        <view
          v-for="item in selectActiveList"
          :key="item.id"
          class="date-rig"
          :class="[{ disabled: item.status === 2 }]"
          @click="handleItemClick(item)"
        >
          <view class="date-rig-content tc-line-1">{{ item.dateString }}</view>
          <view class="date-rig-content tc-line-1">{{ item.statusName }}</view>
        </view>
      </scroll-view>
    </view>
    <view class="flex-row items-center campaign-details-date">
      <view class="campaign-details-date-left">活动地点</view>
      <view class="flex-row justify-between items-center flex-1 campaign-details-date-right">
        <view class="campaign-details-date-right-title">
          <view class="campaign-details-date-right-title-address">{{ activeInfo.address }}</view>
          <view class="campaign-details-date-right-title-map">{{ activeInfo.mapAddress }}</view>
        </view>
        <view @click="openLocation">
          <tc-image width="48" height="48" src="!@/imgs/i_14.png" />
        </view>
      </view>
    </view>
    <view class="line-b"></view>
    <view v-if="signNum.signCount" class="campaign-details-man">
      <view class="campaign-details-man-title">当前 {{ signNum.signCount }} 人报名</view>
      <view class="flex-row items-center campaign-details-man-box">
        <template v-for="(item, index) in signNum.users" :key="index">
          <view v-if="index < 8" class="campaign-details-man-item">
            <tc-image
              v-if="item.headImageUrl"
              width="80"
              height="80"
              mode="aspectFill"
              :src="item.headImageUrl"
            />
            <tc-image v-else width="80" height="80" mode="aspectFill" src="!@/imgs/tx.png" />
          </view>
        </template>
        <view v-if="signNum.users.length > 8" class="campaign-details-man-item">
          <tc-image width="80" height="80" mode="aspectFill" src="!@/imgs/no_tx.png"
        /></view>
      </view>
    </view>
    <view class="rich-text-style">
      <view class="rich-text-title">
        <tc-image width="30" height="32" src="!@/imgs/icon-logo-b.png" />
        <text class="rich-text-title-t1">报名须知</text>
      </view>
      <view style="margin-top: 44rpx">
        <mp-html :content="activeInfo.signUpContent" />
      </view>
    </view>
    <view class="rich-text-style" style="margin-bottom: 28rpx">
      <view class="rich-text-title">
        <tc-image width="30" height="32" src="!@/imgs/icon-logo-b.png" />
        <text class="rich-text-title-t1">活动介绍</text>
      </view>
      <view style="margin-top: 44rpx">
        <mp-html :content="activeInfo.content" />
      </view>
    </view>
    <tc-tabbar :z-index="5">
      <view v-if="activeBtn.status !== 2" class="sign-up-btn-box">
        <view v-if="activeBtn.status === 1" class="sign-up-btn disabled">
          距开始报名
          <tc-count-down
            v-model:diff-time="diffTime"
            format="DD天 HH:mm:ss"
            @countdown-end="getPageInfo"
          />
        </view>
        <template v-else-if="activeBtn.status === 3">
          <view
            v-if="activeBtn.publishResult === 1"
            class="sign-up-btn"
            @click="handleCampaignList"
          >
            查看报名结果
          </view>
          <view v-else class="sign-up-btn disabled">报名已结束</view>
        </template>
      </view>
      <view v-else class="sign-up-btn-box">
        <template v-if="activeBtn.signUpStatus === 0">
          <view v-if="userInfo.mobile" class="sign-up-btn" @click="popup && popup.open()">
            立即报名
          </view>
          <bc-phone-btn v-else @resolve="popup && popup.open()">
            <view class="sign-up-btn">立即报名</view>
          </bc-phone-btn>
        </template>
        <view v-else-if="activeBtn.signUpStatus === 1" class="sign-up-btn disabled">
          已参加报名
        </view>
        <view v-else-if="activeBtn.signUpStatus === 2" class="sign-up-btn disabled">
          报名已中签
        </view>
        <view v-else-if="activeBtn.signUpStatus === 3" class="sign-up-btn disabled">
          报名候补中
        </view>
      </view>
    </tc-tabbar>
    <uni-popup
      ref="popup"
      type="bottom"
      :safe-area="false"
      mask-background-color="rgba(0,0,0,0.8)"
      @change="popupChange"
    >
      <com-popup
        v-if="showPopup"
        :info="activeInfo"
        @openlocation="openLocation"
        @close="popup && popup.close()"
      />
    </uni-popup>
  </view>
</template>

<script>
export default {
  data() {
    return {
      mixin$_shareInfo: {
        shareAppMessage: null,
        shareTimeline: null
      }
    }
  }
}
</script>

<script setup>
import { ref, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'

import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/user'

/* 北地大要求隐藏掉此区域
import ComCardBaseInfo from './com-card-base-info.vue'
*/
import ComPopup from './com-popup.vue'

import { getActivityInfo, getActivityChargeGrop } from '@/api/activity.js'

import dayjs from 'dayjs'

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

const popup = ref(null)
const showPopup = ref(false)
const popupChange = ({ show }) => {
  if (show) {
    showPopup.value = true
  } else {
    setTimeout(() => {
      showPopup.value = false
    }, 320)
  }
}

let pageId = ''
onLoad((ops) => (pageId = ops.id))

const boothList = ref([])
const activeInfo = ref({})
const activeBtn = ref({})
const signNum = ref({})
const dateFormat = (t) => dayjs(t).format('YYYY-MM-DD')
let diffTime = ref(0)

const getPageInfo = async () => {
  const [err, res] = await getActivityInfo({ id: pageId })
  if (!err) {
    const { result = {}, currentDate } = res
    const {
      id = '',
      imageUrls = [],
      address = '',
      mapAddress = '',
      content = '',
      latitude = '',
      longitude = '',
      name = '',
      status = 0,
      startTime = '',
      actStartTime = '',
      endTime = '',
      actEndTime = '',
      executor = '',
      executorLogoUrl = '',
      signUpContent = '',
      timeDescription = '',
      signUpStatus = 0,
      publishResult = 0
    } = result

    boothList.value = imageUrls

    activeInfo.value = {
      id,
      name,
      content,
      address,
      mapAddress,
      latitude,
      longitude,
      startTime: dateFormat(startTime),
      endTime: dateFormat(endTime),
      actStartTime: dateFormat(actStartTime),
      actEndTime: dateFormat(actEndTime),
      executor,
      executorLogoUrl,
      signUpContent,
      timeDescription
    }

    activeBtn.value = {
      publishResult,
      currentDate,
      status,
      startTime,
      endTime,
      signUpStatus
    }

    signNum.value = {
      signCount: result.signCount,
      users: result.users
    }

    if (!currentDate || !startTime || status !== 1) return
    diffTime.value = dayjs(startTime).valueOf() - dayjs(currentDate).valueOf()
  }
}

// 日期选择
const selectActiveList = ref([])
const getActivityChargeGrops = async () => {
  const [err, res] = await getActivityChargeGrop({ activityId: pageId })
  if (!err) {
    const { result = [] } = res
    selectActiveList.value = result

    getPageInfo()
  }
}
const handleCampaignList = () => {
  if (pageId) {
    uni.navigateTo({ url: `pages/campaign-result-list/index?id=${pageId}` })
  }
}

const openLocation = () => {
  uni.openLocation({
    latitude: Number(activeInfo.value.latitude),
    longitude: Number(activeInfo.value.longitude),
    success: function () {
      console.log('success')
    },
    fail: function (res) {
      console.log(res)
    }
  })
}
onMounted(getActivityChargeGrops)
</script>

<style scoped lang="scss">
.booth-content {
  width: 750rpx;
  height: 750rpx;
  // background-color: #000;
  background-color: #ffffff;
  position: relative;
}
.campaign-details {
  &-title {
    padding: 48rpx 40rpx;

    display: flex;
    align-items: flex-end;

    color: #333;
    font-size: 40rpx;
    font-style: normal;
    font-weight: 400;
    line-height: 64rpx; /* 160% */
  }
  &-date {
    padding-left: 40rpx;
    margin-bottom: 60rpx;
    &-left {
      padding-right: 20rpx;
      width: 116rpx;
      color: #666;
      font-family: OPPOSans;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 400;
    }
    &-rig {
      white-space: nowrap;
      font-size: 0;
      overflow: hidden;

      .date-rig {
        display: inline-flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;

        margin-right: 28rpx;
        width: 200rpx;
        height: 96rpx;
        padding: 0 20rpx;
        box-sizing: border-box;
        background-color: #f8fbff;
        border: 2rpx solid #e4f1ff;
        border-radius: 20rpx;

        font-weight: 400;
        text-align: center;
        color: #225497;
        line-height: 36rpx;

        position: relative;

        &.disabled {
          background-color: #f6faff;
          border-color: #f6faff;
          color: #ccc;
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
      }
    }
    &-right {
      padding-right: 40rpx;
      &-title {
        font-family: OPPOSans;
        font-style: normal;
        font-weight: 400;
        &-address {
          color: #333;
          font-size: 30rpx;
          line-height: 32rpx;
        }
        &-map {
          margin-top: 16rpx;
          color: #666;
          font-size: 24rpx;
          line-height: 24rpx;
        }
      }
    }
  }
}
.line-b {
  margin: 0 40rpx;
  border-bottom: 2rpx solid #eeeeee;
}
.campaign-details-man {
  margin-top: 60rpx;
  padding: 0 40rpx;
  &-title {
    color: #333;
    font-size: 36rpx;
    font-weight: 400;
    line-height: 36rpx;
  }
  &-box {
    margin-top: 56rpx;
    margin-left: 27rpx;
  }
  &-item {
    position: relative;
    margin-left: -27rpx;
    width: 80rpx;
    height: 80rpx;
    border: 2px solid #fff;
    border-radius: 50%;
  }
}
.rich-text-style {
  padding: 0 40rpx 36rpx;
  position: relative;
  z-index: 3;
}
.rich-text-title {
  display: flex;
  align-items: center;
  margin-top: 72rpx;
  &-t1 {
    margin-left: 24rpx;

    font-size: 36rpx;
    font-weight: 700;
    color: #333333;
  }
}
.sign-up-btn {
  width: 670rpx;
  height: 96rpx;
  background: #225497;
  border-radius: 20rpx;

  display: flex;
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

  &-box {
    flex: 1;
    padding: 22rpx 0;

    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
