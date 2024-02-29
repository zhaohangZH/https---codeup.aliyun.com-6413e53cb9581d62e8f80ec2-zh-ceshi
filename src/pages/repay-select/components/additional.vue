<template>
  <view class="horizontal-divider" style="margin-bottom: 30rpx"></view>
  <view class="additional-title" style="margin-bottom: 8rpx">请选择两个定制魔术贴</view>
  <view class="additional-option" hover-class="hover-class" @click="handleSelectSchool(0)">
    <view v-if="schoolSelectedList[0]" style="color: #333">
      {{ schoolSelectedList[0]['name'] }}
    </view>
    <view v-else>点击选择第1枚魔术贴</view>
    <tc-image width="14" height="24" src="!@/selectrepay/d92db1f7b5ca4688a5bd70899324716d.png" />
  </view>
  <view class="horizontal-divider"></view>
  <view class="additional-option" hover-class="hover-class" @click="handleSelectSchool(1)">
    <view v-if="schoolSelectedList[1]" style="color: #333">
      {{ schoolSelectedList[1]['name'] }}
    </view>
    <view v-else>点击选择第2枚魔术贴</view>
    <tc-image width="14" height="24" src="!@/selectrepay/d92db1f7b5ca4688a5bd70899324716d.png" />
  </view>
  <page-container
    :show="showPopups"
    :round="true"
    @afterleave="
      ;(showPopups = false), (showPopupsContent = false), (selected = {}), (keyword = '')
    "
  >
    <template v-if="showPopupsContent">
      <view class="container-title">
        <view
          class="container-title-btn cancel-btn"
          hover-class="hover-class"
          @click="showPopups = false"
        >
          取消
        </view>
        <view class="container-title-box">
          <view class="tc-line-1">点击选择魔术贴</view>
        </view>
        <view
          class="container-title-btn confirm-btn"
          hover-class="hover-class"
          @click="handleConfirmEvent"
        >
          确认
        </view>
      </view>
      <view style="padding: 10rpx 30rpx">
        <tc-search
          shape="square"
          height="80"
          :clearabled="true"
          :show-action="false"
          :value="keyword"
          placeholder="按名称搜索培养单位对应的魔术贴"
          @clear="schoolList = [...schoolCompleteList]"
          @change="handleSearchChange"
          @search="handleSearchEvent"
        />
      </view>
      <view v-if="selected.id" style="padding: 30rpx 30rpx 10rpx; color: #333; font-size: 26rpx">
        已选择：{{ selected.name }}
      </view>
      <scroll-view
        :scroll-y="true"
        :scroll-with-animation="true"
        :show-scrollbar="false"
        class="scroll-view"
      >
        <view class="scroll-view-box">
          <view
            v-for="item in schoolList"
            :key="item.id"
            class="scroll-view-item-box"
            @click="handleSelectedId(item)"
          >
            <view class="scroll-view-item" :class="{ active: selected.id === item.id }">
              <tc-image
                width="100%"
                height="100%"
                mode="aspectFit"
                :lazy-load="true"
                :src="item.imgUrl"
              />
            </view>
          </view>
        </view>
      </scroll-view>
      <tc-tabbar :border="false" />
    </template>
  </page-container>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { getSchool } from '@/api/activity.js'

const keyword = ref('')
const schoolList = ref([])
const selected = ref({})
const showPopups = ref(false)
const showPopupsContent = ref(false)
const currentIndex = ref(0)
const schoolSelectedList = ref([])
let schoolCompleteList = []

const emits = defineEmits(['additional'])
const handleSearchChange = (e) => {
  keyword.value = e
}
const handleSearchEvent = (e) => {
  if (!e) return
  selected.value = {}
  const arr = schoolCompleteList.filter((item) => item.name.includes(e))
  schoolList.value = arr
}
const handleSelectedId = (item) => {
  const selectedObj = selected.value
  if (selectedObj.id === item.id) {
    selected.value = {}
  } else {
    selected.value = item
  }
}
const handleConfirmEvent = () => {
  if (!selected.value.id) return uni.showToast('请选择魔术贴')
  const list = schoolSelectedList.value
  list[currentIndex.value] = selected.value
  schoolSelectedList.value = list
  showPopups.value = false
  emits('additional', list)
}
const handleSelectSchool = (n) => {
  currentIndex.value = n
  showPopups.value = true
  showPopupsContent.value = true
  schoolList.value = [...schoolCompleteList]
}
onMounted(async () => {
  const [err, res] = await getSchool({ type: 1 })
  if (!err) {
    schoolCompleteList = res.result || []
    schoolList.value = res.result || []
  }
})
</script>

<style lang="scss" scoped>
.horizontal-divider {
  width: 100%;
  height: 2rpx;
  background-color: #f9f9f9;
}
.additional-title {
  font-size: 24rpx;
  font-weight: 400;
  color: #666666;
  line-height: 36rpx;
}
.additional-option {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 39rpx 0;
  font-size: 26rpx;
  font-weight: 400;
  color: #aaaaaa;
  line-height: 36rpx;
}

.container-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  &-btn {
    font-size: 28rpx;
    padding: 30rpx 39rpx;
  }
  &-box {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #333;
  }
  .cancel-btn {
    color: #ccc;
  }
  .confirm-btn {
    color: #3d55c3;
  }
}
.scroll-view {
  height: 60vh;
  &-box {
    padding: 10rpx 20rpx;
    display: flex;
    flex-direction: row;
    align-items: center;
    flex-wrap: wrap;
  }
  &-item-box {
    flex-shrink: 0;
    height: 0;
    width: 25%;
    padding-bottom: 25%;
    position: relative;
  }
  &-item {
    position: absolute;
    left: 10rpx;
    right: 10rpx;
    top: 10rpx;
    bottom: 10rpx;
    z-index: 1;
    border-radius: 8rpx;
    &.active {
      &::before,
      &::after {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: 2;
      }
      &::before {
        border-radius: 8rpx;
        background: transparent
          url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJYAAACWCAMAAAAL34HQAAAAjVBMVEUAAAAaOIAaN3/////8/f3p7PMiPoQfPIP6+vwkQIXm6fHHzuAmQobL0uKksMygrMo8VZM5UpHh5e7Dy961v9abqMiYpcZjd6g2T4/AyNy9xdq6w9iwutOos89qfaxmeqpQZp7j5/DP1eSUosTx8vfc4OvO1OOAkblCWpYuSIvR1+WMm7+JmL1ccKQpRIjbZd8PAAAAAnRSTlMAgJsrThgAAAJ7SURBVHjazM4BAQAAAIKg9P/obsgClsSKcEFYbGGxhcUWFltYbGGxhcUWFltYbGGxhcUWFltYbGGxhcUWFltYbGGxhcUWFltYbGGxhcUWFltYbGGxhcUWFltYbGGxhcUWFltYbGGxhcUWFltYbGGxhcUWFltYbGGxhcUWFltYbGGxhcUWFltYbGGxhcUWFltYbGGxhcUWFltYbGGxhcUWFltYbGGxhcUWFltYbGGxhcUWFltYbGGxhcUWFltYbL2ZetlpIwqiKKq7iyZtHAMhDXaI45j3m///PCQESNdloF1dks+enskanYIiq6DIKiiyCoqsgiKroMgqKLIKiqwCgqwBqsODq/ZycjPCtU3Vw4691izdtEXVP3uvdS4FlVmzS52EyuyGOg2VTajbkmrf6i6p01BZS52Gyo6o01DZPnUaKrsNsHJVB+Y7YSUJVcdqCqq/P1hNU0W26vZx3h0/DVWRq3qe22tXS9Z13FdFquru6OO1Fz1Vp2tVZKoY20c7iyEqMlVTM+eKqUhU0Vnl+l+NJ+b785mKRBWNOVdQRaKK1pzrS9Uun5aoojHnCqpIVNGZc00BuDDf769UJKqY2hpXSEWiCsbmaqcRFcNU/uW9qwuoyFTBbI0roiKuirvGTuXKVcHs7HvViAxWgZgrriJbBb/OhqtIUDnX3mAVIVXcNemnIk/lXXEVAVXcNflJz/JU3hVXkaPyHXrXdX8VWSrvagaoCKhirvNNVCSqvCusIlPlXVEViSrf7P5NNR+xWakq3+K0affmSzYtRZWfpgpNFZoqNFVoqtBUoalCU4WmCk0Vmio0VWiq0FShqUJThaYKTRWaKjRVvACiBWhxVfVhhQAAAABJRU5ErkJggg==)
          no-repeat 100% 100%/40% auto;
      }
      &::after {
        border-radius: 8rpx;
        box-shadow: inset 0 0 0 4rpx rgba(#142f72, 1);
      }
    }
  }
}
.custom-search-bar-style {
  :deep(.uni-searchbar) {
    padding: 0;
  }
}
</style>
