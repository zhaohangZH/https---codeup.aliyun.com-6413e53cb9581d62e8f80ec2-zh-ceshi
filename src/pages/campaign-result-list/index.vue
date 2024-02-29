<template>
  <page-meta
    page-style="width: 100%;height: 100vh;display: flex;flex-direction: column;background-color: #F6F6F6;"
  />
  <bc-navbar
    title="报名结果"
    :type="4"
    :custom-style="{ backgroundColor: '#fff' }"
    :share="false"
  />
  <view v-if="infoList.length" style="flex: 1; position: relative">
    <z-paging-swiper
      :fixed="false"
      :safe-area-inset-bottom="true"
      :swiper-style="{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 1 }"
    >
      <template #top>
        <scroll-view
          class="tab-list"
          :scroll-left="scrollToLeft"
          scroll-x
          enable-passive
          bounces
          scroll-with-animation
          :show-scrollbar="false"
        >
          <view class="tab-gap-start"></view>
          <view
            v-for="(item, index) in infoList"
            :key="item.id"
            class="tab-item"
            :class="[scrollItemPrefix + index, { active: selectActiveID.includes(item.id) }]"
            @click="() => (swiperIndex = index)"
          >
            <view class="tab-item-content tc-line-1">{{ item.dateString }}</view>
            <view class="tab-item-content tc-line-1">{{ item.description }}</view>
          </view>
          <view class="tab-gap-end"></view>
        </scroll-view>
      </template>
      <swiper
        style="height: 100%"
        :current="swiperIndex"
        @animationfinish="(e) => updateActiveId(e.detail.current)"
      >
        <swiper-item v-for="item in infoList" :key="item.id">
          <scroll-view
            :scroll-y="true"
            :enhanced="true"
            :show-scrollbar="false"
            style="height: 100%"
          >
            <view class="list-box">
              <view class="list-item">
                <view class="list-item-title">报名成功名单公示</view>
                <cam-table
                  v-if="activeLoadList.includes(item.id)"
                  :column="column"
                  :item-id="item.id"
                  :item-type="1"
                />
              </view>
              <!-- <view class="list-item">
                <view class="list-item-title">活动候补名单公示</view>
                <cam-table
                  v-if="activeLoadList.includes(item.id)"
                  :column="column"
                  :item-id="item.id"
                  :item-type="2"
                />
              </view> -->
            </view>
          </scroll-view>
        </swiper-item>
      </swiper>
    </z-paging-swiper>
  </view>
</template>

<script setup>
import { ref, reactive, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getActivityChargeGrop } from '@/api/activity.js'
import CamTable from './components/table.vue'

const column = [
  {
    width: '130rpx',
    text: '编号',
    key: 'signNum'
  },
  {
    width: '130rpx',
    text: '姓名',
    key: 'name'
  },
  {
    text: '培养单位',
    key: 'description'
  }
]

const scrollItemPrefix = 'js-tab-item-'
let pageId = ''
let scrollWidth = 0
onLoad((ops) => (pageId = ops.id))

const scrollToLeft = ref(0)
const infoList = ref([])
const selectActiveID = reactive([])
const activeLoadList = reactive([])
onMounted(async () => {
  if (!pageId) return
  const [err, res] = await getActivityChargeGrop({ activityId: pageId })
  if (!err) {
    const { result = [] } = res
    infoList.value = result
    if (result.length) {
      setTimeout(() => {
        uni
          .createSelectorQuery()
          .select('.tab-list')
          .boundingClientRect((rect) => {
            if (rect) {
              scrollWidth = rect.width
              updateActiveId(0)
            }
          })
          .exec()
      }, 20)
    }
  }
})

const swiperIndex = ref(-1)
const updateActiveId = async (current) => {
  // if (swiperIndex.value === current) return
  const { id } = infoList.value[current]
  selectActiveID[0] = id
  if (!activeLoadList.includes(id)) {
    activeLoadList.push(id)
  }
  swiperIndex.value = current
  const res = await (() => {
    return new Promise((resolve) => {
      uni
        .createSelectorQuery()
        .select('.tab-list')
        .scrollOffset((res) => {
          resolve(res)
        })
        .exec()
    })
  })()
  uni
    .createSelectorQuery()
    .select('.' + scrollItemPrefix + current)
    .boundingClientRect((rect) => {
      if (rect) {
        scrollToLeft.value = res.scrollLeft + rect.left + rect.width / 2 - scrollWidth / 2
      }
    })
    .exec()
}
</script>

<style scoped lang="scss">
.tab-list {
  padding: 28rpx 0;
  white-space: nowrap;
  font-size: 0;
  overflow: hidden;
  .tab-gap-start,
  .tab-gap-end {
    display: inline-flex;
    width: 12rpx;
    height: 104rpx;
    vertical-align: top;
  }
  .tab-gap-end {
    margin-left: 28rpx;
  }
  .tab-item {
    display: inline-flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    vertical-align: top;
    margin-left: 28rpx;
    width: 168rpx;
    height: 104rpx;
    padding: 14rpx 20rpx;
    box-sizing: border-box;
    background-color: #ffffff;
    border: 2rpx solid #cccccc;
    border-radius: 16rpx;

    font-size: 24rpx;
    font-weight: 400;
    text-align: center;
    color: #333333;
    line-height: 36rpx;

    &.active {
      background-color: #fafcff;
      border-color: #3459b4;
      color: #3567cb;
    }

    &-content {
      width: 100%;
      overflow: hidden;
    }
  }
}

.list-box {
  padding: 0 40rpx 40rpx;
  padding-bottom: calc(constant(safe-area-inset-bottom) + 40rpx);
  padding-bottom: calc(env(safe-area-inset-bottom) + 40rpx);
}
.list-item {
  padding: 20rpx 40rpx;
  background-color: #ffffff;
  border-radius: 20rpx;
  box-shadow: 0rpx 4rpx 12rpx 0rpx rgba(0, 0, 0, 0.06);
  & + .list-item {
    margin-top: 24rpx;
  }
  &-title {
    font-family: TsangerYuMo-3;
    font-size: 28rpx;
    font-weight: 400;
    color: #333333;
    line-height: 56rpx;
    margin-bottom: 20rpx;
  }
}
</style>
