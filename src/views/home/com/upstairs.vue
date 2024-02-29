<template>
  <view v-if="bannerList.length" class="booth-content">
    <swiper
      v-if="bannerList.length > 1"
      style="width: 100%; height: 100%"
      :current="swiperCurrent"
      :circular="swiperCircular"
      :prop="colorObject"
      :change:prop="wxs.wxsHandleInit"
      :snap-to-edge="true"
      @transition="wxs.wxsScroll"
      @animationfinish="wxs.wxsChange"
    >
      <swiper-item v-for="item in bannerList" :key="item.id">
        <tc-booth :cover-image="item.backImg" />
      </swiper-item>
    </swiper>
    <tc-booth v-else :cover-image="bannerList[0]" />
    <view v-if="bannerList.length > 1" class="com-bd-current"
      >{{ current + 1 }}/{{ bannerList.length }}</view
    >
  </view>
</template>
<script module="wxs" lang="wxs" src="./wxs-scroll.wxs"></script>
<script setup>
import { ref, watch, reactive } from 'vue'
const props = defineProps({
  datelist: {
    type: Array,
    default: () => []
  }
})

watch(
  () => props.datelist,
  (v) => {
    if (v.length) {
      setSwiper()
    }
  }
)
console.log(props.datelist)

const current = ref(0)
const bindchange = (e, ownerInstance) => {
  console.log(ownerInstance)
  // @change="bindchange"

  // current.value = e.detail.current
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

const setSwiper = () => {
  const list = props.datelist || []

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
      buttonUrl: item.buttonUrl
    })
    // 顶部标题栏相关颜色数据
    logoArea.push({
      logoBgColor: item.logoBgColor || 'rgba(255,255,255,0)',
      logoColor: item.logoColor || 'rgba(255,255,255,0)',
      statusColor: item.statusColor || 'black'
    })
    // 底部tabbar相关颜色数据
    // tabbarArea.push({
    //   tabBgColor: item.tabBgColor || 'rgba(255,255,255,0)',
    //   tabs: [...item.tabs]
    // })
  }

  bannerList.value = bList

  // 是否衔接动画
  colorObject.swiperCircular = swiperCircular.value
  // 默认当前索引
  colorObject.swiperCurrent = swiperCurrent.value
  // 顶部navbar数据
  colorObject.logoArea = logoArea
  // 底部tabbar数据
  // colorObject.tabbarArea = tabbarArea

  handleStatusColor(swiperCurrent.value)
}
</script>
<style lang="scss" scoped>
.booth-content {
  height: calc(100vh - 50px);
}
.com-bd-current {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 60rpx;
  margin: auto;
  width: 80rpx;
  line-height: 44rpx;
  color: #fff;
  font-size: 20rpx;
  text-align: center;
  border-radius: 50px;
  background: rgba($color: #000000, $alpha: 0.2);
}
</style>
