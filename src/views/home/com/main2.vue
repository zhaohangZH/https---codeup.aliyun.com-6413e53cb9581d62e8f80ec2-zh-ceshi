<template>
  <view v-if="datelist.length" class="h_box">
    <view class="flex-row justify-between items-center h_box_title">
      <tc-image width="216" height="60" src="!@/imgs/h_t_02.png" mode="widthFix" />
      <view
        @click="switchTab"
        hover-class="hover-class"
        class="flex-row items-center h_box_title_rig"
      >
        <tc-image width="30" height="32" src="!@/imgs/icon-logo.png" mode="widthFix" />
        <text class="h_box_title_rig_t">全部活动</text>
        <uni-icons type="right" size="12" color="#CCDCEA"></uni-icons>
      </view>
    </view>
    <scroll-view :show-scrollbar="false" :enable-flex="true" :scroll-x="true" class="h_box_content">
      <view
        v-for="item in datelist"
        :key="item.id"
        class="flex-row-inline h_box_content_item"
        hover-class="hover-class"
        @click="goDetail(item.id)"
      >
        <tc-image width="600" height="800" :src="item.coverImage" mode="widthFix" />
        <view class="flex-col h_box_content_item_text">
          <text class="h_box_content_item_text_tit">{{ item.name }}</text>
          <text class="h_box_content_item_text_tits">{{ item.title }}</text>
        </view>
      </view>
    </scroll-view>
  </view>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { getActivityList } from '@/api/activity'
import { useDonateStore } from '@/store/donate'

const datelist = ref([])
onMounted(async () => {
  const [err, res] = await getActivityList({ pageIndex: 1, pageSize: 3 })
  if (!err) {
    datelist.value = res.result.data || []
  }
})

const switchTab = () => {
  useDonateStore().setActiveTab(0)
  uni.switchTab({ url: 'views/donate/index' })
}
const goDetail = (id) => {
  uni.navigateTo({ url: 'pages/campaign-details/index?id=' + id })
}
</script>
<style lang="scss" scoped>
.h_box {
  margin-top: 112rpx;
  &_title {
    padding: 0 40rpx;
  }
  &_content {
    margin-top: 60rpx;
    padding-right: 40rpx;
    padding-bottom: 12rpx;
    /*出现横向滚动条*/
    white-space: nowrap;
    overflow-x: scroll;
    &_item {
      position: relative;
      margin-left: 40rpx;
      width: 480rpx;
      height: 640rpx;
      border-radius: 40rpx;
      box-shadow: 0 4rpx 20rpx 0 rgba(0, 0, 0, 0.1);
      overflow: hidden;
      &_text {
        position: absolute;
        left: 0;
        bottom: 0;
        padding: 32rpx 40rpx;
        width: 100%;
        height: 144rpx;
        box-sizing: border-box;
        background: #fff;
        &_tit {
          font-size: 28rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        &_tits {
          margin-top: 10rpx;
          font-size: 22rpx;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
}
</style>
