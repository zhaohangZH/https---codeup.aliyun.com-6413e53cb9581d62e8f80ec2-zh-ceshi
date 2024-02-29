<template>
  <view style="position: relative; z-index: 999">
    <uni-popup
      ref="popup"
      type="center"
      :safe-area="false"
      :is-mask-click="false"
      mask-background-color="rgba(0,0,0,1)"
    >
      <template v-if="show">
        <tc-navbar :placeholder="false" :custom-style="{ backgroundColor: 'rgba(255,255,255,0)' }">
          <view class="back-box" @click="emits('close')">
            <tc-image width="8px" height="15px" src="!@/icons/i59.png" />
          </view>
        </tc-navbar>
        <scroll-view
          v-if="info.id"
          scroll-y
          enable-passive
          enhanced
          :bounces="false"
          :show-scrollbar="false"
          style="
            width: 100vw;
            height: 100vh;
            box-sizing: border-box;
            padding-bottom: 30rpx;
            padding-bottom: calc(30rpx + constant(safe-area-inset-bottom));
            padding-bottom: calc(30rpx + env(safe-area-inset-bottom));
          "
        >
          <view class="pop_bj">
            <tc-image width="100%" height="100%" src="!@/user/zs_bj.png" />
          </view>
          <view class="booth-box">
            <view class="booth-bg">
              <tc-booth
                :cover-image="info.coverImage"
                :default-style="{
                  width: '550rpx',
                  height: '550rpx',
                  position: 'absolute',
                  left: '100rpx',
                  bottom: 0,
                  zIndex: 9,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }"
                :gltf-style="{
                  width: '750rpx',
                  height: '750rpx',
                  left: 0
                }"
              />
            </view>

            <!-- <view class="booth-content">
              <tc-booth :cover-image="info.coverImage" />
            </view> -->
          </view>
          <view class="booth-title-box">
            <view class="booth-title-text">
              <text class="tc-line-1">{{ info.name }}</text>
              <view class="booth-title-text-img">
                <tc-image width="148" height="76" mode="" src="!@/user/i_08.png" />
              </view>
            </view>
          </view>
          <view class="content-box">
            <mp-html :content="info.description" />
          </view>
          <view v-if="info.code" class="booth-title-tag tc-line-1">
            <text class="booth-title-tag-text">证书编号： {{ info.code }}</text>
          </view>

          <tc-tabbar :z-index="98" customStyle="background:rgba(0,0,0,0)" :border="false">
            <view class="close-btn-box">
              <view class="close-btn" @click="emits('close')">返回</view>
            </view>
          </tc-tabbar>
        </scroll-view>
      </template>
    </uni-popup>
  </view>
</template>
<script setup>
import { ref, watch, onMounted, nextTick } from 'vue'

const emits = defineEmits(['close'])
const props = defineProps({
  show: {
    type: Boolean,
    default: () => false
  },
  info: {
    type: Object,
    default: () => ({})
  }
})
const popup = ref(null)
const popupEvent = (show) => {
  if (!popup.value) return
  if (show) {
    popup.value.open()
    uni.setNavigationBarColor({ backgroundColor: '#000000', frontColor: '#ffffff' })
  } else {
    popup.value.close()
    uni.setNavigationBarColor({ backgroundColor: '#ffffff', frontColor: '#000000' })
  }
}
watch(
  () => props.show,
  (v) => popupEvent(v)
)
onMounted(() => {
  nextTick(() => {
    popupEvent(props.show)
  })
})
</script>
<style lang="scss" scoped>
.pop_bj {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  opacity: 0.6;
}
.back-box {
  width: 40px;
  height: 100%;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}
.booth-box {
  position: relative;
  z-index: 10;
  .booth-bg {
    width: 750rpx;
    height: 790rpx;
  }
  // .booth-content {
  //   width: 550rpx;
  //   height: 550rpx;

  //   position: absolute;
  //   left: 100rpx;
  //   bottom: 0;
  //   z-index: 9;

  //   display: flex;
  //   align-items: center;
  //   justify-content: center;
  // }
}
.booth-title-box {
  margin-top: 60rpx;
  padding: 0 50rpx;
  text-align: center;
}
.booth-title-text {
  display: inline-block;
  padding: 0 24rpx;
  height: 68rpx;
  position: relative;
  z-index: 10;
  line-height: 48rpx;
  font-size: 48rpx;
  font-weight: 400;
  color: #ffffff;
  text-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);

  &::after {
    content: '';
    position: absolute;
    left: 0;
    bottom: 12rpx;
    width: 100%;
    height: 20rpx;
    background: #004e97;
    z-index: -2;
  }
  &-img {
    position: absolute;
    right: 0;
    top: 0;
    z-index: -1;
  }
}

.booth-title-tag {
  text-align: center;
  &-text {
    display: inline-block;
    padding: 16rpx 30rpx;
    margin: 0 auto;
    line-height: 48rpx;
    box-sizing: border-box;
    position: relative;
    font-size: 22rpx;
    line-height: 24rpx;
    color: #fff;
    border-radius: 50px;
    border: 2px solid rgba(77, 136, 192, 0.4);
    background: rgba(0, 78, 151, 0.4);
    text-align: center;
  }
}
.content-box {
  padding: 80rpx 68rpx 100rpx;
  font-size: 28rpx;
  font-weight: 400;
  color: #fff;
  line-height: 48rpx;
  position: relative;
  z-index: 10;
}
.close-btn-box {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  position: relative;
  width: 100%;
  z-index: 10;
  .close-btn {
    margin-top: 40rpx;
    width: 600rpx;
    height: 96rpx;
    border: 2rpx solid #fff;
    border-radius: 20rpx;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;

    font-size: 30rpx;
    font-weight: 400;
    color: #fff;
  }
}
</style>
