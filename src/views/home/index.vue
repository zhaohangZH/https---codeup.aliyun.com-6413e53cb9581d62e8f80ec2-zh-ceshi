<template>
  <bc-navbar
    class="jsNavbarInstanceRoot"
    :type="1"
    :share="false"
    :placeholder="false"
    :custom-style="[{ boxShadow: 'none', zIndex: '999' }]"
  >
    <template #img><bc-logo class="jsLogoInstanceRoot" :color="topColor" /></template>
  </bc-navbar>
  <scroll-refresh-floor
    @open="myChange(0)"
    @close="myChange(1)"
    :safeBottom="62"
    :refreshBackgroundColor="bannerList[current].color"
  >
    <template #floor>
      <view v-if="bannerList.length" class="booth-content">
        <swiper
          v-if="bannerList.length > 1"
          style="width: 100%; height: 100%"
          :snap-to-edge="true"
          :current="swiperCurrent"
          :circular="swiperCircular"
          :prop="colorObject"
          :change:prop="wxs.wxsHandleInit"
          @change="bindchange"
          @transition="wxs.wxsScroll"
          @animationfinish="wxs.wxsChange"
        >
          <swiper-item v-for="item in bannerList" :key="item.id" @click.stop="swiperClick(banner)">
            <tc-booth :cover-image="item.backImg" :defaultStyle="{ backgroundColor: item.color }" />
          </swiper-item>
        </swiper>
        <tc-booth
          v-else
          :cover-image="bannerList[0]"
          :defaultStyle="{ backgroundColor: bannerList[0].color }"
        />
        <view v-if="bannerList.length > 1" class="flex-row items-center com-bd-current">
          <view
            v-for="i in bannerList.length"
            :key="i"
            class="com-bd-current_item"
            :class="{ active: i == current + 1 }"
          ></view>
        </view>
      </view>
    </template>
    <!-- <template #floorstyle>
      <view class="floorstyle">
        <tc-image width="100%" height="50" src="!@/imgs/home_upstairs.png" mode="widthFix" />
      </view>
    </template> -->
    <view class="floorstyle">
      <tc-image width="100%" height="50" src="!@/imgs/home-top.png" mode="widthFix" />
    </view>
    <view class="home">
      <main1 />
      <main2 />
      <main3 />
    </view>
  </scroll-refresh-floor>
  <bc-tabbar :z-index="998" />
</template>
<script module="wxs" lang="wxs" src="./com/wxs-scroll.wxs"></script>
<script setup>
import main1 from './com/main1.vue'
import main2 from './com/main2.vue'
import main3 from './com/main3.vue'
import { ref, computed, onMounted, reactive } from 'vue'
import { getTabList } from '@/api/home.js'

const swiperList = ref([])

const topColor = ref('rgba(0, 0, 0, 1)')
const jsLogoInstanceRoot = ref()
const myChange = (isoff) => {
  topColor.value = '#004E97' + (isoff ? '!important' : '')
  uni.setNavigationBarColor({
    backgroundColor: 'rgba(255,255,255,0)',
    frontColor: '#000000',
    animation: { duration: 260, timingFunc: 'easeInOut' }
  })
}

// 轮播图
const swiperCurrent = ref(0)
const swiperCircular = ref(true)
const bannerList = ref([])
const colorObject = reactive({})
const handleStatusColor = (n) => {
  const v = ((colorObject.logoArea || [])[n] || {}).statusColor
  const frontColor = { white: '#ffffff', black: '#000000' }[v] || '#000000'
  uni.setNavigationBarColor({
    backgroundColor: 'rgba(255,255,255,0)',
    frontColor,
    animation: { duration: 260, timingFunc: 'easeInOut' }
  })
}

const current = ref(0)
const bindchange = (e) => {
  current.value = e.detail.current
}

const swiperClick = (item) => {
  if (!item.url) return
  uni.navigateTo({ url: item.url })
}
onMounted(async () => {
  let [err, res] = await getTabList()
  if (!err) {
    // swiperList.value = res.result

    const list = res.result || []

    const bList = []
    const logoArea = []
    // const tabbarArea = []
    for (let i = 0; i < list.length; i++) {
      const item = list[i]
      // banner相关数据
      bList.push({
        id: item.id,
        url: item.url,
        img: item.img,
        backImg: item.backImg,
        buttonImg: item.buttonImg,
        buttonUrl: item.buttonUrl,
        color: item.backColor
      })
      // 顶部标题栏相关颜色数据
      logoArea.push({
        logoBgColor: item.logoBgColor || 'rgba(255,255,255,0)',
        logoColor: item.logoColor || 'rgba(255,255,255,0)',
        statusColor: item.statusColor || 'black'
      })
    }

    bannerList.value = bList
    // 是否衔接动画
    colorObject.swiperCircular = swiperCircular.value
    // 默认当前索引
    colorObject.swiperCurrent = swiperCurrent.value
    // 顶部navbar数据
    colorObject.logoArea = logoArea

    handleStatusColor(swiperCurrent.value)
  }
})
defineExpose({
  setStatusColor: ({ current }) => handleStatusColor(current)
})
</script>
<style lang="scss">
.home {
  background: #fff;
}
.booth-content {
  height: calc(100vh - 62px);
  height: calc(100vh - 62px - constant(safe-area-inset-bottom));
  height: calc(100vh - 62px - env(safe-area-inset-bottom));
}
.com-bd-current {
  position: absolute;
  right: 48rpx;
  bottom: 100rpx;
  bottom: calc(100rpx + constant(safe-area-inset-bottom));
  bottom: calc(100rpx + env(safe-area-inset-bottom));
  margin: auto;
  color: #fff;
  text-align: center;
  &_item {
    margin: 0 4rpx;
    width: 8rpx;
    height: 8rpx;
    border-radius: 50px;
    background: #fff;
    opacity: 0.4;
  }
  .active {
    width: 40rpx;
    opacity: 1;
  }
}
.h_box {
  &_title {
    &_rig {
      color: #225497;
      font-size: 20rpx;
      font-style: normal;
      font-weight: 400;
      &_t {
        margin: 0 12rpx;
        line-height: 32rpx;
      }
    }
  }
}
.floorstyle {
  // margin-bottom: -60px;
  height: 100px;
  border-radius: 74rpx 74rpx 0 0;
  background: #fff;
}
</style>
