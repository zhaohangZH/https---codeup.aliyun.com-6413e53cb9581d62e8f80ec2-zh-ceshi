<template>
  <bc-navbar
    title="回馈选择"
    :type="4"
    :custom-style="{ backgroundColor: '#fff' }"
    :share="false"
  />
  <template v-if="orderInfo.id">
    <view class="flex-col page">
      <view class="flex-col flex-auto group_3">
        <uni-notice-bar
          v-if="topNotice"
          show-icon
          scrollable
          color="#2979FF"
          background-color="#EAF2FF"
          :text="topNotice"
        />
        <view class="flex-col group_4">
          <view class="flex-row relative section_4">
            <view class="flex-row">
              <tc-image width="180" height="180" radius="24" :src="frontImage" />
            </view>
            <view class="flex-col flex-auto justify-center repay_rig">
              <text class="self-start repay_rig_title tc-line-1">{{ orderInfo.name }}</text>
              <text class="self-start repay_rig_qr">确认回馈品</text>
              <view class="flex-row repay_rig_val">
                <template v-for="(v, i) in selectSpecList" :key="i">
                  <text v-if="v.length" class="tc-line-1">{{ v }}</text>
                </template>
              </view>
            </view>
          </view>
          <view class="flex-col group_5">
            <view class="flex-col group_6 space-y-16">
              <view style="background-color: #ffffff; padding: 0 40rpx; overflow: hidden">
                <view v-if="orderSpecList.length" class="flex-col section_6 space-y-23">
                  <view class="flex-col">
                    <view class="flex-row items-center space-x-6">
                      <tc-image width="28" height="28" src="!@/imgs/i_16.png" />
                      <text class="font_4">回馈品信息</text>
                    </view>
                  </view>
                  <view v-for="(item, index) in orderSpecList" :key="index" class="flex-col">
                    <text class="self-start font_7 text_12">{{ item.key }}</text>
                    <view class="option-list">
                      <view
                        v-for="v in item.value"
                        :key="v + '_' + selectSpecList.length"
                        class="flex-col justify-start items-center option-item"
                        :class="{
                          active: selectSpec[index].includes(v),
                          disabled: disabledList[index].includes(v)
                        }"
                        @click="handleSpecSelected(index, v)"
                      >
                        <!-- selectSpec[index][0] = v -->
                        <text class="option-item-text">{{ v }}</text>
                      </view>
                    </view>
                  </view>
                </view>
                <view v-if="isSchool === 1" class="additional-box">
                  <additional @additional="handleAdditionalChange" />
                </view>
              </view>
              <view
                v-if="userAddress"
                class="flex-col relative section_5"
                @click="isShowAddress = true"
              >
                <view class="flex-row items-center space-x-7">
                  <tc-image width="28" height="28" src="!@/imgs/i_17.png" />
                  <text class="font_4">收货地址</text>
                </view>
                <template v-if="userAddress.id">
                  <view class="flex-row addlist_sts">
                    <text class="addlist_sts_text">{{ userAddress.provinceName }}</text>
                    <text class="addlist_sts_text">{{ userAddress.cityName }}</text>
                    <text class="addlist_sts_text">{{ userAddress.areaName }}</text>
                  </view>
                  <view class="flex-row justify-between items-center addlist_details">
                    <text class="tc-line-2">{{ userAddress.address }}</text>
                    <uni-icons type="right" size="14" color="#ccc"></uni-icons>
                  </view>
                  <view class="flex-row addlist_user">
                    <text class="addlist_user_text">{{ userAddress.name }}</text>
                    <text class="addlist_user_text">{{ userAddress.mobile }}</text>
                  </view>
                </template>
                <view
                  v-else
                  class="flex-row justify-between items-center"
                  style="margin-top: 40rpx"
                >
                  <text class="font_1" style="margin-left: 8rpx"> 新增收货地址 </text>
                  <uni-icons type="right" size="14" color="#ccc"></uni-icons>
                </view>
                <bc-receive
                  v-if="deliverTypes.length"
                  :receive-types="deliverTypes"
                  @success-btn="(n) => (deliverType = n)"
                />
              </view>
              <view
                class="flex-col justify-start items-start text-wrapper_5"
                style="padding: 40rpx 40rpx"
              >
                <view class="flex-row items-center space-x-6" style="padding-bottom: 40rpx">
                  <tc-image width="28" height="28" src="!@/imgs/i_17.png" />
                  <text class="font_4">爱心留言</text>
                </view>
                <uni-easyinput
                  v-model="commentValue"
                  :input-border="false"
                  class="font_1 text_14"
                  type="textarea"
                  placeholder="点击留下您对筹款项目的留言（可不填写）"
                ></uni-easyinput>
              </view>
            </view>
          </view>
        </view>

        <tc-tabbar :z-index="97">
          <button class="repay-select-btn" @click="handleModifyPayOrder(2)">确认提交</button>
        </tc-tabbar>
      </view>
    </view>
    <unwanted
      v-model:isshow="isshow"
      :type="popupType"
      @submit-btn="handleModifyPayOrder"
    ></unwanted>
    <bc-address-list v-model:isshow="isShowAddress" @select-item="selectAddress"></bc-address-list>
  </template>
</template>

<script setup>
import unwanted from './components/unwanted.vue'
import additional from './components/additional.vue'
import { ref, computed, onMounted, reactive } from 'vue'
import { GetModifyPayOrderDetail, ModifyPayOrder } from '@/api/index'
import { onLoad } from '@dcloudio/uni-app'

let schoolIds = []
let pageId = ''
onLoad((option) => (pageId = option.id))

const orderInfo = ref({})
const selectSpec = ref([])
const disabledList = ref([])
const userAddress = ref(null)
const selectSpecList = computed(() => {
  let selectList = []
  for (let i = 0, l = selectSpec.value.length; i < l; i++) {
    selectList.push(...selectSpec.value[i])
  }
  return selectList
})

const currentFrontImage = ref('')
const frontImage = computed(() => {
  return currentFrontImage.value || orderInfo.value.frontImage
})

const isShowAddress = ref(false)
const selectAddress = (v) => (userAddress.value = v || {})
const orderSpecList = reactive([])

const topNotice = ref('') //顶部通告
const deliverTypes = ref([]) //发货方式列表
const deliverType = ref('') //发货方式

const isSchool = ref(0)
onMounted(async () => {
  const [err, res] = await GetModifyPayOrderDetail({ id: pageId })
  if (!err) {
    const { result } = res
    const payOrderDetails = (result.payOrderDetails || [])[0] || {}
    topNotice.value = result.notice
    deliverTypes.value = result.deliverTypes

    const { spec = [] } = payOrderDetails
    for (let i = 0; i < spec.length; i++) {
      orderSpecList.push(spec[i])
    }
    selectSpec.value = spec.map(() => [])
    disabledList.value = spec.map(() => [])

    orderInfo.value = payOrderDetails
    userAddress.value = result.userAddress || {}

    isSchool.value = result.isSchool
    handleSpecSelected(-1)
  }
})

// const switchVal = ref(true)
const isshow = ref(false)
const popupType = ref(1) //弹框类型:1跳过,2不需要赠品
const commentValue = ref('')
const handleModifyPayOrder = async (type) => {
  if (type === 1) {
    // 跳过
    isshow.value = false
    uni.navigateTo({ url: `pages/wait-donation/index?id=${pageId}` })
    return
  }
  const params = { orderId: pageId, deliverType: deliverType.value }
  if (!userAddress.value || !userAddress.value.id) {
    uni.showToast('请填写收货地址')
    return
  }
  params.userAddressId = userAddress.value.id

  const spec = []
  let passed = true
  let specKey = ''
  for (let i = 0, l = selectSpec.value.length; i < l; i++) {
    const item = selectSpec.value[i]
    specKey = ((orderInfo.value.spec || [])[i] || {}).key
    if (!item.length) {
      passed = false
      break
    }
    spec.push({
      key: specKey,
      value: item[0]
    })
  }
  if (deliverTypes.value.length && !deliverType.value) {
    uni.showToast('请选择领取方式')
    return
  }
  if (!passed) {
    uni.showToast('请选择' + specKey)
    return
  }
  if (isSchool.value === 1) {
    if (schoolIds.length < 2) {
      uni.showToast('请选择两个定制魔术贴')
      return
    }
    params.schoolIds = schoolIds
  }
  params.spec = spec

  if (commentValue.value) {
    params.comment = commentValue.value
  }
  if (type === 2) {
    // 提交
    const [err] = await ModifyPayOrder(params)
    if (!err) {
      uni.navigateTo({ url: `pages/wait-donation/index?id=${pageId}` })
      return
    }
  }
}

const handleSpecSelected = (currIndex, v) => {
  let errIndex = -1
  for (let i = 0; i < currIndex; i++) {
    const item = selectSpec.value[i]
    if (!item.length) {
      errIndex = i
      break
    }
  }
  if (errIndex >= 0) {
    return uni.showToast({ icon: 'none', title: '请先选择：' + orderSpecList[errIndex].key })
  }
  if (currIndex >= 0) {
    selectSpec.value[currIndex][0] = v
  }
  const preIndex = currIndex + 1

  let passed = true
  for (let n = preIndex, l = selectSpec.value.length; n < l; n++) {
    // passed = false
    selectSpec.value[n] = []
    disabledList.value[n] = []
  }
  if ((disabledList.value[currIndex] || []).includes(v)) {
    selectSpec.value[currIndex] = []
    return uni.showToast({ icon: 'none', title: '当前选择的回馈已结束' })
  }

  const specList = []
  let n = 0
  while ((selectSpec.value[n] || []).length) {
    const item = `${orderSpecList[n].key}:${selectSpec.value[n][0]}`
    specList.push(item)
    n++
  }
  let k = specList.join()

  const vList = []
  const products = orderInfo.value.products || []
  for (let n = 0, l = products.length; n < l; n++) {
    const spec = products[n].spec || ''
    if (spec.indexOf(k) < 0) continue
    const arr = spec.split(',').splice(preIndex)
    arr.map((item) => {
      const [k, v] = item.split(':')
      let kIndex = -1
      for (let i = 0, l = vList.length; i < l; i++) {
        if ((vList[i] || {}).key === k) {
          kIndex = i
          break
        }
      }
      if (kIndex < 0) {
        vList.push({ key: k, value: [v] })
      } else if (!vList[kIndex].value.includes(v)) {
        vList[kIndex].value.push(v)
      }
    })
  }
  orderSpecList.splice(preIndex, orderSpecList.length, ...vList)
  currentFrontImage.value = ''

  const { value: preSpecList = [], key: preSpecKey = '' } = orderSpecList[preIndex] || {}
  for (let i = 0, l = preSpecList.length; i < l; i++) {
    const fullPathList = k ? [k] : []
    const item = preSpecList[i]
    if (preIndex < orderSpecList.length - 1) {
      fullPathList.push(preSpecKey + ':' + item, '')
    } else {
      fullPathList.push(preSpecKey + ':' + item)
    }
    let disabled = true
    const fkey = fullPathList.join()
    for (let i = 0, l = products.length; i < l; i++) {
      const { spec, stock } = products[i] || {}
      if (spec.indexOf(fkey) < 0) continue
      if (stock > 0) {
        disabled = false
        break
      }
    }
    if (disabled) {
      disabledList.value[preIndex].push(item)
    }
  }

  // 切换缩略图
  if (passed) {
    const products = orderInfo.value.products || []
    for (let n = 0, l = products.length; n < l; n++) {
      const { spec = '', images } = products[n]
      if (spec.includes(k)) {
        currentFrontImage.value = images
        break
      }
    }
  }
}

const handleAdditionalChange = (arr) => {
  if (!arr.length) return
  schoolIds = arr.map((item) => item.id)
}
</script>

<style scoped lang="scss">
.page {
  padding-bottom: calc(env(safe-area-inset-bottom));
  background-color: #f6f6f6;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  .group_3 {
    overflow-y: auto;
    .group_4 {
      .section_4 {
        // margin: 32rpx 8rpx 0;
        padding: 40rpx 40rpx;
        background-color: #ffffff;
      }
      .group_5 {
        padding-top: 20rpx;
        .section_5 {
          padding: 40rpx 40rpx;
          background-color: #ffffff;
          .space-x-7 {
            & > view:not(:first-child),
            & > text:not(:first-child),
            & > image:not(:first-child) {
              margin-left: 14rpx;
            }
          }
        }
        .group_6 {
          .section_6 {
            // margin: 0 8rpx;
            padding: 32rpx 0 52rpx;
            .font_7 {
              font-size: 26rpx;
              line-height: 28rpx;
              color: #333333;
            }
            .text_10 {
              margin-top: 34rpx;
              font-size: 24rpx;
              line-height: 30rpx;
            }
            .group_7 {
              margin-top: 16rpx;
              .text-wrapper {
                padding: 12rpx 0;
                flex: 1 1 88rpx;
                background-color: #f7faff;
                border-radius: 12rpx;
                // height: 52rpx;
                border: solid 2rpx #3567cb;
                .text_11 {
                  color: #3567cb;
                }
              }
              .text-wrapper_2 {
                flex: 1 1 88rpx;
                padding: 12rpx 0;
                background-color: #f6f6f6;
                border-radius: 12rpx;
                // height: 52rpx;
              }
              .view {
                margin-right: 38rpx;
              }
            }
            .space-x-14 {
              & > view:not(:first-child),
              & > text:not(:first-child),
              & > image:not(:first-child) {
                margin-left: 28rpx;
              }
              .text-wrapper_3 {
                padding: 12rpx 32rpx;
                border-radius: 12rpx;
                // width: 108rpx;
                background-color: #f6f6f6;
                border: solid 2rpx #f6f6f6;
                color: #666666;
                // height: 52rpx;
                &.active {
                  background-color: #f7faff;
                  border-color: #3567cb;
                }
              }
              .text-wrapper_4 {
                padding: 12rpx 0;
                background-color: #f6f6f6;
                border-radius: 12rpx;
                width: 108rpx;
                // height: 52rpx;
              }
            }
            .text_12 {
              font-size: 24rpx;
              line-height: 30rpx;
            }
          }
          .space-y-23 {
            & > view:not(:first-child),
            & > text:not(:first-child),
            & > image:not(:first-child) {
              margin-top: 46rpx;
            }
          }
          .text-wrapper_5 {
            padding: 38rpx 40rpx;
            background-color: #ffffff;
            box-shadow: 0px 4rpx 12rpx 0px #0000000f;
            .text_14 {
              margin-left: 40rpx;
              color: #bbbbbb;
            }
          }
        }
        .space-y-16 {
          & > view:not(:first-child),
          & > text:not(:first-child),
          & > image:not(:first-child) {
            margin-top: 20rpx;
          }
        }
        .font_4 {
          font-size: 28rpx;
          line-height: 28rpx;
          color: #000;
          font-family: OPPOSans;
          font-style: normal;
          font-weight: 400;
        }
        .font_6 {
          font-size: 24rpx;
          line-height: 28rpx;
          font-weight: 500;
          color: #666666;
        }
      }
      .space-x-6 {
        & > view:not(:first-child),
        & > text:not(:first-child),
        & > image:not(:first-child) {
          margin-left: 12rpx;
        }
        .text_5 {
          font-size: 24rpx;
          line-height: 30rpx;
        }
        .text_6 {
          font-size: 24rpx;
          line-height: 30rpx;
        }
        .text_7 {
          font-size: 24rpx;
          line-height: 30rpx;
        }
      }
      .font_1 {
        font-size: 28rpx;
        line-height: 36rpx;
        color: #333333;
      }
      .font_5 {
        font-size: 24rpx;
        line-height: 28rpx;
        color: #666666;
      }
    }
  }
}

.repay_rig {
  margin-left: 40rpx;
  font-size: 28rpx;
  font-weight: 400;
  line-height: 28rpx; /* 100% */
  &_title {
    color: 0;
    font-size: 32rpx;
    line-height: 32rpx;
  }
  &_qr {
    margin-top: 32rpx;
    color: #666;
  }
  &_val {
    margin-top: 28rpx;
    color: #225497;
  }
}
.option-list {
  margin-left: -36rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  .option-item {
    margin-top: 32rpx;
    margin-bottom: 4rpx;
    margin-left: 36rpx;

    padding: 22rpx 30rpx;
    border-radius: 50px;
    // width: 108rpx;
    line-height: 26rpx;
    font-weight: 400;
    font-size: 26rpx;
    border: 2rpx solid #e4f1ff;
    background-color: #f8fbff;
    color: #666666;
    // height: 52rpx;
    &.active {
      border-color: #225497;
      background-color: #225497;
      color: #fff;
    }
    &.disabled {
      color: #aaa;
      border-color: #999;
      background-color: #fff;
    }
  }
}
.addlist {
  &_sts {
    margin-top: 48rpx;
    color: #666;
    font-family: OPPOSans;
    font-size: 26rpx;
    font-style: normal;
    font-weight: 400;
    line-height: 28rpx;
    &_text {
      margin-right: 10rpx;
    }
  }
  &_details {
    margin-top: 28rpx;
    line-height: 48rpx;
    color: #000;
    font-size: 32rpx;
  }
  &_user {
    margin-top: 28rpx;
    color: #666;
    font-family: OPPOSans;
    font-size: 26rpx;
    font-style: normal;
    font-weight: 400;
    line-height: 24rpx;
    &_text {
      margin-right: 40rpx;
    }
  }
}
.repay-select-btn {
  margin: 40rpx auto 0;
  width: calc(100% - 80rpx);
  line-height: 96rpx;
  color: #fff;
  font-size: 30rpx;
  background: #225497;
  border-radius: 20rpx;
}
.additional-box {
  margin-bottom: 8rpx;
}
</style>
