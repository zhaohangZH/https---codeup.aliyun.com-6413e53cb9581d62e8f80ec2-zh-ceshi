<template>
  <view v-if="info.projectId" class="com">
    <view class="com-close" @click="emits('close')">
      <!-- <tc-image width="24" height="24" src="!@/icons/i31.png" /> -->
      <uni-icons type="closeempty" size="28" color="#AAAAAA"></uni-icons>
    </view>
    <scroll-view scroll-y style="max-height: 60vh; padding: 40rpx 0 20rpx">
      <view class="com-card">
        <view class="com-card-hd">
          <view style="flex-grow: 0">
            <tc-image width="120" height="120" radius="20" :src="selectGoodImage" />
          </view>
          <view class="com-card-hd-info">
            <!-- <view class="com-card-hd-info-t1 tc-line-1">{{ info.name }}</view> -->
            <view class="com-card-hd-info-t3">
              <text style="vertical-align: bottom; font-size: 28rpx">￥</text>
              <text>{{ selectItem }}</text>
            </view>
            <view class="com-card-hd-info-t2 tc-line-1">
              <!-- <tc-image width="22" height="18" src="!@/icons/i32.png" /> -->
              <text>捐款接收：{{ info.organizer }}</text>
            </view>
          </view>
        </view>
        <view class="com-card-bd">
          <view class="com-card-bd-list">
            <view
              v-for="(item, index) in info.data"
              :key="index"
              class="com-card-bd-item"
              :class="{ active: index === selectIndex }"
              hover-class="hover-class"
              @click=";(selectIndex = index), (inputValue = ''), (customValue = '')"
            >
              ￥{{ item.amount }}
            </view>
            <view class="com-card-bd-placeholder"></view>
          </view>
          <view class="com-card-bd-input" :class="{ active: info.data.length === selectIndex }">
            <view style="display: flex; flex-direction: row; align-items: center">
              <input
                placeholder="自定义金额"
                type="digit"
                placeholder-style="font-size: 28rpx;font-weight: 400;color: #ACC4E5;"
                confirm-type="done"
                class="com-card-bd-input-style"
                :value="inputValue"
                @focus="selectIndex = info.data.length"
                @input="handelCustomValueChange"
              />
            </view>
            <view
              class="flex-row items-center"
              style="padding: 30rpx 32rpx"
              @click="setRandomValue"
            >
              <tc-image width="28" height="28" src="!@/imgs/i_07.png" />
              <text
                style="
                  font-family: TsangerYuMo-3;
                  margin-left: 10rpx;
                  font-size: 28rpx;
                  font-weight: 400;
                  color: #225497;
                "
              >
                随缘
              </text>
            </view>
          </view>
          <view class="com-card-line"></view>

          <template v-if="giftLIst.length">
            <view
              class="flex-row items-center justify-between"
              style="margin-top: 60rpx; display: flex; align-items: center"
            >
              <view class="flex-row items-center">
                <tc-image width="32" height="32" src="!@/imgs/i_08.png" />
                <text class="com-card-bd-case-t1" style="margin-left: 20rpx">捐款回馈</text>
              </view>
              <text style="font-size: 24rpx; color: #e23434">每次捐赠仅回馈一件回馈品</text>
            </view>

            <view class="com-card-bd-case">
              <view
                class="com-card-bd-case-item"
                :class="{ active: giftIndex === giftLIst.length }"
                @click="giftIndex = giftLIst.length"
              >
                <view class="flex-col items-center">
                  <view style="flex-shrink: 0; display: flex">
                    <tc-image width="188" height="188" src="!@/imgs/i_11.png" mode="aspectFit" />
                  </view>
                  <text class="com-card-bd-case-t2">不需要回馈品</text>
                </view>
                <view v-show="giftIndex === giftLIst.length" class="com-card-bd-case-icon">
                  <tc-image src="!@/imgs/i_10.png" mode="aspectFit" width="92" height="92" />
                </view>
              </view>
              <view
                v-for="(gift, index) in giftLIst"
                :key="gift.id + '_' + index"
                class="com-card-bd-case-item"
                :class="{ active: giftIndex === index }"
                @click="giftIndex = index"
              >
                <view class="flex-col items-center">
                  <view style="flex-shrink: 0; display: flex">
                    <tc-image width="188" height="188" :src="gift.frontImage" mode="aspectFit" />
                  </view>
                  <text class="com-card-bd-case-t2 tc-line-1">
                    {{ gift.name }}
                  </text>
                </view>
                <view v-show="giftIndex === index" class="com-card-bd-case-icon">
                  <tc-image src="!@/imgs/i_10.png" mode="aspectFit" width="92" height="92" />
                </view>
              </view>
            </view>
          </template>
          <template v-if="info.isLove || !giftLIst[giftIndex]">
            <view style="margin-top: 60rpx; display: flex; align-items: center">
              <tc-image width="32" height="32" src="!@/imgs/i_09.png" />
              <text class="com-card-bd-case-t1" style="margin-left: 20rpx">爱心留言</text>
            </view>

            <view class="com-card-bd-case">
              <view class="com-card-bd-case-easy">
                <uni-easyinput
                  v-model="comment"
                  :input-border="false"
                  type="textarea"
                  placeholder="点击留下您对筹款项目的留言（可不填写）"
                ></uni-easyinput>
              </view>
            </view>
          </template>
        </view>
      </view>
    </scroll-view>
    <view class="com-foot">
      <view class="flex-row justify-between items-center">
        <bc-userinfo-btn
          v-if="anonymous"
          style="display: inline-block"
          @resolve="anonymous = false"
        >
          <view class="com-foot-radio" :class="{ active: anonymous }">
            <tc-image width="24" height="24" src="!@/imgs/i_06.png" />
            <text class="com-foot-radio-label">捐赠完成不展示身份信息</text>
          </view>
        </bc-userinfo-btn>
        <view v-else class="com-foot-radio" @click="anonymous = true">
          <view class="com-foot-radio-icon"></view>
          <text class="com-foot-radio-label">捐赠完成不展示身份信息</text>
        </view>
        <!-- <text v-if="giftLIst.length" style="font-size: 24rpx; color: #d22c2c"
          >单次捐赠只对应一份回馈品哦</text
        > -->
      </view>
      <view class="com-foot-btn" hover-class="hover-class" @click="handleCreateOrder">
        立即捐赠
      </view>
    </view>
    <view :style="[safeArea]"></view>
  </view>
</template>
<script setup>
import { debounce } from '@/utils/debounce.js'
import { ref, computed, watch, nextTick } from 'vue'
import Big from 'big.js'

const emits = defineEmits(['close', 'submit', 'popup'])
const props = defineProps({
  info: {
    type: Object,
    default: () => ({})
  },
  projectId: {
    type: String,
    default: ''
  },
  goodsId: {
    type: String,
    default: ''
  }
})
const safeArea = computed(() => ({ height: uni.getSystemInfoSync().safeAreaInsets.bottom + 'px' }))

const customValue = ref('')
const inputValue = ref('')

const selectIndex = ref(0)
const selectItem = computed(() => {
  return ((props.info.data || [])[selectIndex.value] || {}).amount || customValue.value || 0
})
const selectGoodImage = computed(() => {
  const giftInfo = giftLIst.value[giftIndex.value]
  return giftInfo ? giftInfo.frontImage : props.info.imageUrl
})

const handelCustomValueChange = ({ detail }) => {
  let value = detail.value
  if (isNaN(value) || value < 1) value = 1

  value = +(+value).toFixed(2)
  inputValue.value = value

  if (value > 999999) value = 999999
  nextTick(() => {
    inputValue.value = value
    customValue.value = value
  })
}

const setRandomValue = () => {
  selectIndex.value = (props.info.data || []).length
  let value = 1

  const { data = [] } = props.info
  let min = (data[0] || {}).amount || 1
  let max = min
  if (data.length === 1) {
    min = 1
  }

  // 转整数
  min = new Big(min).times(100).toNumber() //min * 100
  max = new Big(max).times(100).toNumber() //max * 100

  for (let i = 1, l = data.length; i < l; i++) {
    let { amount = 1 } = data[i]
    amount = new Big(amount).times(100).toNumber()
    if (min > amount) {
      min = amount
    }
    if (max < amount) {
      max = amount
    }
  }
  if (min > max) {
    let tmp = min
    min = max
    max = tmp
  }
  if (!(min % 100) && !(max % 100)) {
    min = new Big(min).div(100).toNumber()
    max = new Big(max).div(100).toNumber()
    value = Math.floor(Math.random() * (max - min) + min)
  } else {
    value = new Big(Math.floor(Math.random() * (max - min) + min)).div(100).toNumber()
  }
  inputValue.value = value
  customValue.value = value
}

/*debounce(
  () => {
    selectIndex.value = (props.info.data || []).length

    let n = selectIndex.value - 1
    let value = 1
    if (n > 0) {
      const min = Math.ceil(props.info.data[n].amount || 0)
      const max = Math.floor(props.info.data[0].amount || 1)
      value = Math.floor(Math.random() * (max - min + 1)) + min
    } else {
      value = (props.info.data || [])[n] || 1
    }
    inputValue.value = value
    customValue.value = value
  },
  300,
  {
    leading: true,
    trailing: false
  }
)*/

const giftLIst = ref([])
const giftIndex = ref(0)
const getGift = () => {
  let defaultSelected = null
  const list = []
  const { giveGoods = [] } = props.info
  for (let i = 0; i < giveGoods.length; i++) {
    const item = giveGoods[i]
    if (selectItem.value >= item.minAomunt || 0) {
      if (props.goodsId === item.id) {
        defaultSelected = { ...item }
      } else {
        list.push(item)
      }
    }
  }
  if (defaultSelected) {
    list.unshift(defaultSelected)
  }
  // let _giftIndex = 0
  // for (let i = 0; i < list.length; i++) {
  //   if (props.goodsId === list[i].id) {
  //     _giftIndex = i
  //     break
  //   }
  // }
  giftIndex.value = 0
  giftLIst.value = list
}
/*debounce(
  async () => {
    const [err, res] = await GetProjectGiveGoods({
      projectId: props.projectId,
      money: selectItem.value
    })
    if (!err) {
      giftIndex.value = 0
      giftLIst.value = res.result || []
    }
  },
  500,
  {
    leading: true,
    trailing: false
  }
)*/

const anonymous = ref(true)
// 爱心捐赠
const comment = ref('')

const handleCreateOrder = debounce(
  async () => {
    if (selectItem.value == 0) {
      uni.showToast('请选择金额')
      return
    }
    const prams = {
      projectId: props.projectId,
      amount: selectItem.value,
      comment: comment.value,
      isAnonymous: anonymous.value ? 1 : 0
    }
    const goodsId = giftLIst.value[giftIndex.value]
    if (goodsId) {
      prams.goodsId = goodsId.id
      emits('submit', prams)
    } else {
      if (giftLIst.value.length) {
        emits('popup', prams)
      } else {
        emits('submit', prams)
      }
    }
  },
  820,
  {
    leading: true,
    trailing: false
  }
)

watch(
  () => props.info.projectId,
  (v) => {
    if (!v) return

    let _selectIndex = 0
    const { giveGoods = [], data = [] } = props.info
    // 寻找默认选中回馈品
    let giftItem = {}
    for (let i = 0; i < giveGoods.length; i++) {
      const item = giveGoods[i]
      if (item.id === props.goodsId) {
        giftItem = item
        break
      }
    }
    for (let i = 0; i < data.length; i++) {
      if (data[i].amount === giftItem.minAomunt) {
        _selectIndex = i
        break
      }
    }
    selectIndex.value = _selectIndex
  },
  { immediate: true }
)
watch(
  () => selectItem.value,
  (v) => {
    if (v > 0) getGift()
  },
  { immediate: true }
)
</script>
<style lang="scss" scoped>
.com {
  position: relative;
  background-color: #ffffff;
  border-radius: 40rpx 40rpx 0rpx 0rpx;
  &-close {
    width: 104rpx;
    height: 104rpx;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 9;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  &-card {
    padding: 0 40rpx;
    box-sizing: border-box;
    &-hd {
      display: flex;
      flex-direction: row;
      &-info {
        margin-left: 32rpx;
        &-t1 {
          font-size: 30rpx;
          font-weight: 400;
          color: #333333;
        }
        &-t2 {
          margin-top: 28rpx;
          font-size: 24rpx;
          font-weight: 400;
          color: #666;
          display: flex;
          flex-direction: row;
          align-items: center;
        }
        &-t3 {
          display: flex;
          flex-direction: row;
          align-items: flex-end;

          font-size: 40rpx;
          font-weight: 500;
          color: #225497;
        }
      }
    }
    &-line {
      margin-top: 60rpx;
      height: 2rpx;
      background-color: #eee;
    }
    &-bd {
      &-list {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
      }
      &-item {
        margin-top: 60rpx;
        width: 202rpx;
        height: 84rpx;
        border: 2rpx solid #e4f1ff;
        border-radius: 50px;
        background: #f8fbff;

        font-size: 28rpx;
        font-weight: 400;
        color: #225497;

        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        &.active {
          background-color: #2265b3;
          border-color: #76b4fd;
          color: #fff;
        }
      }
      &-placeholder {
        width: 198rpx;
        height: 0;
      }
      &-input {
        margin-top: 32rpx;
        display: flex;
        align-items: center;
        justify-content: space-between;
        &-style {
          text-align: center;

          width: 480rpx;
          height: 84rpx;
          line-height: 84rpx;
          background-color: #f8fbff;
          border: 2rpx solid #e4f1ff;
          border-radius: 50px;

          font-size: 28rpx;
          font-weight: 400;
          color: #225497;
        }
        color: #aaaaaa;
        &.active {
          color: #3d5b98;
          .com-card-bd-input-style {
            background-color: #f4f8ff;
            border-color: #3d5b98;
          }
        }
      }
      &-case {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        align-items: center;
        justify-content: space-between;
        &-item {
          padding: 0 32rpx;
          margin-top: 40rpx;
          box-sizing: border-box;

          width: 312rpx;
          height: 312rpx;

          background: #ffffff;
          border: 4rpx solid #eeeeee;
          border-radius: 32rpx;

          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: center;

          position: relative;
          overflow: hidden;
          &.active {
            border-color: #225497;
            // .com-card-bd-case-t2 {
            //   color: #3d5b98;
            // }
          }
        }
        &-icon {
          position: absolute;
          bottom: 0;
          right: 0;
          z-index: 1;
        }
        &-t1 {
          font-size: 28rpx;
          font-weight: 400;
          color: #000;
        }
        &-t2 {
          margin-top: 12rpx;
          font-size: 22rpx;
          font-weight: 400;
          color: #333333;
        }
        &-easy {
          margin-top: 40rpx;
          padding: 10rpx 36rpx;
          width: 100%;
          box-sizing: border-box;
          line-height: 30rpx;
          font-size: 26rpx;
          border: 2rpx solid #eeeeee;
          border-radius: 12rpx;
        }
      }
    }
  }
  &-foot {
    padding: 20rpx 60rpx;
    font-size: 0;
    &-radio {
      padding: 20rpx 0 30rpx;
      display: inline-flex;
      flex-direction: row;
      align-items: center;
      &-icon {
        width: 20rpx;
        height: 20rpx;
        border: solid 2rpx #999999;
        background-color: #ffffff;
        border-radius: 12rpx;
      }
      &-label {
        margin-left: 12rpx;
        font-size: 24rpx;
        font-weight: 400;
        color: #666666;
      }
      &.active {
        .com-foot-radio-icon {
          border-color: transparent;
          background-color: transparent;
        }
        .com-foot-radio-label {
          color: #3d55c3;
        }
      }
    }
    &-btn {
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
    }
  }
}
</style>
