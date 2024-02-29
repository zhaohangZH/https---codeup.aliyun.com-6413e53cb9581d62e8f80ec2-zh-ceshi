<template>
  <view class="donate_item" hover-class="hover-class" @click.stop="goDetails(item)">
    <template v-if="item.status === 3">
      <view style="height: 284rpx; overflow: hidden">
        <tc-image width="100%" height="284" :src="item.imageUrl" mode="widthFix" />
        <view class="flex-row justify-center items-center donate_item_contentNo">
          <tc-image width="160" height="160" src="!@/imgs/i_01.png" mode="widthFix" />
        </view>
      </view>
    </template>
    <template v-else>
      <tc-image width="100%" height="auto" :src="item.imageUrl" mode="widthFix" />
      <view class="donate_item_content">
        <scroll-view
          :show-scrollbar="false"
          :enable-flex="true"
          :scroll-x="true"
          class="donate_item_content_listBox"
        >
          <view
            v-for="it in item.products"
            :key="it.id"
            class="flex-col-inline justify-center items-center donate_item_content_list"
            hover-class="hover-class"
            @click.stop="gotoDetails(item, it)"
          >
            <tc-image width="120" height="120" :src="it.frontImage" mode="widthFix" />
            <view class="text">{{ it.name }}</view>
          </view>
        </scroll-view>
        <view class="flex-row justify-center items-center donate_item_content_tag">
          <tc-image width="28" height="28" src="!@/imgs/i_02.png" mode="widthFix" />
          <template v-for="(tag, n) in item.tags" :key="n">
            <text v-if="n" class="com-bd-card-tags-line"></text>
            <text class="com-bd-card-tags-item" :class="{ light: !n }">
              {{ tag }}
            </text>
          </template>
        </view>
      </view>
    </template>
  </view>
</template>
<script setup>
const props = defineProps({
  item: {
    type: Object,
    default: () => {}
  }
})
const goDetails = (item) => {
  if (item.status == 3) {
    uni.showToast({ icon: 'none', title: '活动结束' })
    return
  }
  if (item.isFeedback) {
    uni.navigateTo({ url: `pages/project/index?id=${item.id}` })
  } else {
    uni.navigateTo({ url: `pages/project-details/index?id=${item.id}` })
  }
}

const gotoDetails = (it, item) => {
  if (it.status === 3 || item.sellout === 1) {
    return uni.showToast({ icon: 'none', title: '此回馈已结束' })
  }
  uni.navigateTo({ url: `pages/project-details/index?id=${it.id}&goodsId=${item.id}` })
}
</script>
<style lang="scss" scoped>
.donate_item {
  position: relative;
  margin-bottom: 40rpx;
  border-radius: 40rpx;
  overflow: hidden;
  &_content {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    &_listBox {
      /*出现横向滚动条*/
      white-space: nowrap;
      overflow-x: auto;
    }
    &_list {
      margin-left: 32rpx;
      padding: 28rpx 20rpx;
      width: 220rpx;
      height: 220rpx;
      font-size: 20rpx;
      border-radius: 40rpx;
      background: #fff;
      box-sizing: border-box;
      .text {
        margin-top: 24rpx;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
      }
      &:last-of-type {
        margin-right: 32rpx;
      }
    }
    &_tag {
      height: 96rpx;
      color: #fff;
      font-size: 22rpx;
      background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0.4) 100%);
      text {
        margin-left: 20rpx;
      }
    }
  }
  &_contentNo {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    background: rgba($color: #000000, $alpha: 0.4);
  }
}
</style>
