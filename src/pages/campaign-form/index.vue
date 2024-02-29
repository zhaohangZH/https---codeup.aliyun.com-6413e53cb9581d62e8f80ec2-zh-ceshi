<template>
  <bc-navbar title="完善信息" :type="4" :custom-style="{ backgroundColor: '#fff' }" />
  <view class="collect-like">
    <scroll-view
      :scroll-top="scrollTop"
      scroll-y="true"
      style="height: 100%"
      :scroll-with-animation="true"
      class="scroll-Y"
      @scroll="scroll"
    >
      <view class="flex-row items-center justify-center collect-like_title">
        <tc-image width="40" height="40" src="!@/imgs/i_18.png" />
        <text>完善身份信息</text>
      </view>
      <view class="collect-like_forms">
        <view class="collect-like_forms_item flex-row items-center">
          <view class="collect-like_forms_item_left">您的姓名<text class="xx">*</text></view>
          <uni-easyinput
            v-model="baseFormData.realName"
            :inputBorder="false"
            :placeholderStyle="placeholderStyle"
            placeholder="请输入"
            :disabled="isDisabled"
          />
        </view>
        <view class="collect-like_forms_item flex-row items-center">
          <view class="collect-like_forms_item_left">国内/国外</view>
          <picker
            mode="selector"
            :range="countrys"
            range-key="text"
            :value="baseFormData.country"
            :disabled="isDisabled"
            @change="countryFun"
          >
            <view
              class="collect-like_forms_item_picker flex-row justify-end items-center"
              :class="{ active: !isDisabled }"
            >
              {{ baseFormData.country > -1 ? countrys[baseFormData.country].text : '请选择' }}
              <uni-icons class="i" type="forward" size="20" color="#ccc" />
            </view>
          </picker>
        </view>

        <!-- <view class="collect-like_forms_item flex-row items-center">
          <view class="collect-like_forms_item_left">身份证号</view>
          <uni-easyinput
            v-model="baseFormData.identityCard"
            :inputBorder="false"
            :placeholderStyle="placeholderStyle"
            placeholder="请输入"
            :disabled="isDisabled"
          />
        </view> -->
        <view class="collect-like_forms_item flex-row items-center">
          <view class="collect-like_forms_item_left">联系电话<text class="xx">*</text></view>
          <uni-easyinput
            v-model="baseFormData.mobile"
            :inputBorder="false"
            :placeholderStyle="placeholderStyle"
            placeholder="请输入"
            :disabled="isDisabled"
          />
          <bc-phone-btn
            v-if="!isDisabled"
            :sync-user-info="false"
            @resolve="(mobile) => (baseFormData.mobile = mobile)"
          >
            <view class="collect-like_forms_itemtex-wechat-phone">微信授权</view>
          </bc-phone-btn>
        </view>
        <view class="collect-like_forms_item flex-row items-center">
          <view class="collect-like_forms_item_left">联系邮箱<text class="xx">*</text></view>
          <uni-easyinput
            v-model="baseFormData.email"
            :inputBorder="false"
            :placeholderStyle="placeholderStyle"
            placeholder="请输入"
            :disabled="isDisabled"
          />
        </view>
        <view
          v-if="baseFormData.country == 1"
          class="collect-like_forms_item flex-col items-center"
        >
          <view class="collect-like_forms_item_left_textarea">所在地区</view>
          <uni-easyinput
            type="textarea"
            v-model="baseFormData.address"
            :inputBorder="false"
            :placeholderStyle="placeholderStyle"
            maxlength="50"
            placeholder="请输入详细地址"
          />
        </view>
        <view v-else class="collect-like_forms_item flex-row items-center">
          <view class="collect-like_forms_item_left">所在地区<text class="xx">*</text></view>
          <picker mode="region" @change="onchange" :range="items" :disabled="isDisabled">
            <view
              class="collect-like_forms_item_picker flex-row justify-end items-center"
              :class="{ active: !isDisabled && baseFormData.city }"
            >
              {{
                baseFormData.provinceName
                  ? baseFormData.provinceName + '-' + baseFormData.cityName
                  : '请选择所在地区'
              }}<uni-icons class="i" type="forward" size="20" color="#ccc" />
            </view>
          </picker>
        </view>
        <view class="collect-like_forms_item flex-row items-center">
          <view class="collect-like_forms_item_left">选择身份<text class="xx">*</text></view>
          <picker
            mode="selector"
            :range="identitys"
            range-key="text"
            :disabled="isDisabled"
            @change="identitysFun"
          >
            <view
              class="collect-like_forms_item_picker flex-row justify-end items-center"
              :class="{ active: !isDisabled && baseFormData.identity !== null }"
            >
              {{ baseFormData.identity !== null ? identitys[identityI].text : '请选择'
              }}<uni-icons class="i" type="forward" size="20" color="#ccc" />
            </view>
          </picker>
        </view>
      </view>
      <view
        v-if="baseFormData.identity && baseFormData.identity != 4"
        class="flex-row items-center justify-center collect-like_title"
      >
        <tc-image width="40" height="40" src="!@/imgs/i_26.png" />
        <text>完善校友信息</text>
      </view>
      <view v-if="baseFormData.identity && baseFormData.identity != 4" class="collect-like_forms">
        <view class="collect-like_forms_item flex-row items-center">
          <view class="collect-like_forms_item_left">{{
            baseFormData.identity == 3 ? '入职年份' : '入学年份'
          }}</view>
          <picker
            mode="date"
            fields="year"
            @change="(e) => (baseFormData.enrolYear = e.detail.value)"
            :disabled="isDisabled"
          >
            <view
              class="collect-like_forms_item_picker flex-row justify-end items-center"
              :class="{ active: !isDisabled && baseFormData.enrolYear }"
            >
              <text>
                {{ baseFormData.enrolYear || '请选择(选填)' }}
              </text>
              <uni-icons class="i" type="forward" size="20" color="#ccc" />
            </view>
          </picker>
        </view>
        <view
          v-if="baseFormData.identity == 3"
          class="collect-like_forms_item flex-row items-center"
        >
          <view class="collect-like_forms_item_left">所在部门</view>
          <lzy-picker-select
            class="collect-like_forms_item_picker flex-row justify-end items-center"
            :list="deps"
            node="text"
            :placeholder="baseFormData.id ? deps[depI].text : '请选择(选填)'"
            :isDisabled="isDisabled"
            @change="depsFun"
          ></lzy-picker-select>
        </view>
        <view
          v-if="baseFormData.identity == 1 || baseFormData.identity == 2"
          class="collect-like_forms_item flex-row items-center"
        >
          <view class="collect-like_forms_item_left">院校专业</view>
          <lzy-picker-select
            class="collect-like_forms_item_picker flex-row justify-end items-center"
            :list="specialitys"
            node="text"
            :placeholder="baseFormData.id ? specialitys[specialityI].text : '请选择(选填)'"
            :isDisabled="isDisabled"
            @change="specialitysFun"
          ></lzy-picker-select>
        </view>
        <view
          v-if="baseFormData.identity == 1 || baseFormData.identity == 2"
          class="collect-like_forms_item flex-row items-center"
        >
          <view class="collect-like_forms_item_left">学号</view>
          <uni-easyinput
            v-model="baseFormData.studentNo"
            :inputBorder="false"
            :placeholderStyle="placeholderStyle"
            :placeholder="isDisabled ? '无' : '请输入(选填)'"
            :disabled="isDisabled"
          />
        </view>
      </view>
      <tc-tabbar v-if="!isDisabled" :z-index="98">
        <view class="flex-col justify-start items-center button" @click="checkingFun"
          >提交信息</view
        >
      </tc-tabbar>
    </scroll-view>
  </view>
  <!-- @close="showPopup = false" -->
  <bc-campaign-popup
    :show="showPopup"
    :status="popupStatus"
    @close="() => ((showPopup = false), (popupStatus = 0))"
    @confirm="() => ((baseFormData.candidate = 1), checkingFun())"
  />
</template>
<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { ref, onMounted, nextTick } from 'vue'
import { isMobile, isIdCard } from '@/utils/regex'
import { signUpInfo } from '@/api/activity'
import { getData, add, getDrp } from '@/api/collect'
import { getBarHeight } from '@/utils/customtools'
const signUpRecordId = ref()
onLoad((option) => {
  signUpRecordId.value = option.id
})

const showPopup = ref(false)
const popupStatus = ref(0)
const baseFormData = ref({
  signUpRecordId: '',
  id: '', //主键
  realName: '', //姓名
  country: 0, //国内/国外
  // identityCard: '', //身份证号
  mobile: '', //手机号码
  email: '',
  province: '', //省份
  provinceName: '', //省份
  city: '', //城市
  cityName: '', //城市
  address: '', //详细地址
  identity: null, //身份
  enrolYear: '', //入学年份
  dep: null, //所在部门
  speciality: null, //所学专业
  studentNo: '', //学号
  candidate: 0
})
const isDisabled = ref(false)
onMounted(async () => {
  const [err, res] = await getData()
  if (!err) {
    if (res.result) {
      const { result } = res
      baseFormData.value = result
      setTimeout(() => {
        identityI.value = identitys.value.findIndex((item) => item.value == result.identity)
        if (result.speciality) {
          specialityI.value = specialitys.value.findIndex((item) => item.value == result.speciality)
        }
        if (result.dep) {
          depI.value = deps.value.findIndex((item) => item.value == result.dep)
        }
      }, 100)
      // isDisabled.value = true
    }
  }
  baseFormData.value.signUpRecordId = signUpRecordId.value
})

// const getDatas = async () => {
//   const [err, res] = await getData()
//   if (!err) {
//     baseFormData.value = res
//   }
// }

// 下拉列表
const countrys = [
  {
    text: '国内',
    value: 0
  },
  {
    text: '国外',
    value: 1
  }
]
const identitys = ref([]) //身份列表
const identityI = ref(0) //身份列表
const specialitys = ref([]) //所学专业
const specialityI = ref(0) //所学专业
const deps = ref([]) //所在部门
const depI = ref(0) //所在部门
const getDrps = async (id) => {
  const [err, res] = await getDrp({ id })
  if (!err) {
    return res.result
  }
}
Promise.all([getDrps(1), getDrps(2), getDrps(3)]).then((values) => {
  identitys.value = values[0]
  specialitys.value = values[1]
  deps.value = values[2]
})

//获取可视区域高度
const getClineHeight = () => {
  const res = uni.getSystemInfo({
    success: (res) => {
      goTop(res.windowHeight - uni.upx2px(80) - getBarHeight())
    }
  })
}

const scrollTop = ref(0)
const oldscrollTop = ref(0)
const scroll = (e) => {
  oldscrollTop.value = e.detail.scrollTop
}
const goTop = (num) => {
  // 解决view层不同步的问题
  scrollTop.value = oldscrollTop.value
  nextTick(() => {
    scrollTop.value = num
  })
}

const identitysFun = (e) => {
  baseFormData.value.identity = identitys.value[e.detail.value].value
  identityI.value = e.detail.value
  baseFormData.value.enrolYear = ''
  baseFormData.value.speciality = null
  baseFormData.value.dep = null
  getClineHeight()
}

// 切换国内外
const countryFun = (e) => {
  baseFormData.value.country = e.detail.value
  if (e.detail.value == true) {
    baseFormData.value.province = ''
    baseFormData.value.city = ''
    baseFormData.value.provinceName = ''
    baseFormData.value.cityName = ''
  } else {
    baseFormData.value.address = ''
  }
}
const specialitysFun = (v) => {
  baseFormData.value.speciality = v.value
}
const depsFun = (v) => {
  baseFormData.value.dep = v.value
}
// input样式
const placeholderStyle = ref('color:#aaa;font-size:28rpx')
//地址
const timetext = ref('请选择所在地区')
const onchange = (e) => {
  const code = e.detail.code
  const value = e.detail.value
  timetext.value = e.detail.value[0] + '-' + e.detail.value[1]
  baseFormData.value.province = code[0]
  baseFormData.value.city = code[1]
  baseFormData.value.provinceName = value[0]
  baseFormData.value.cityName = value[1]
}

const checkingFun = () => {
  popupStatus.value = 0
  showPopup.value = true
  submitFeedback()
  return
  if (!baseFormData.value.realName) {
    uni.showToast({ icon: 'none', title: '姓名不能为空' })
    return
  }
  if (!baseFormData.value.mobile) {
    uni.showToast({ icon: 'none', title: '手机号不能为空' })
    return
  }
  if (!baseFormData.value.email) {
    uni.showToast({ icon: 'none', title: '邮箱不能为空' })
    return
  }
  // 国内外
  if (baseFormData.value.country == 1) {
    if (!baseFormData.value.address) {
      uni.showToast({ icon: 'none', title: '所在地区不能为空' })
      return
    }
  } else {
    if (!isMobile(baseFormData.value.mobile)) {
      uni.showToast({ icon: 'none', title: '手机号码格式不正确，请重新填写' })
      return
    }
    if (!baseFormData.value.city) {
      uni.showToast({ icon: 'none', title: '所在地区不能为空' })
      return
    }
  }
  if (!baseFormData.value.identity) {
    uni.showToast({ icon: 'none', title: '请选择身份' })
    return
  }
  // 学生，校友
  // if (baseFormData.value.identity == 1 || baseFormData.value.identity == 2) {
  //   if (!baseFormData.value.enrolYear) {
  //     uni.showToast({ icon: 'none', title: '请选择入学年份' })
  //     return
  //   }
  //   if (!baseFormData.value.speciality) {
  //     uni.showToast({ icon: 'none', title: '请选择院校专业' })
  //     return
  //   }
  // }
  // //职工
  // if (baseFormData.value.identity == 3) {
  //   if (!baseFormData.value.enrolYear) {
  //     uni.showToast({ icon: 'none', title: '请选择入职年份' })
  //     return
  //   }
  //   if (!baseFormData.value.dep) {
  //     uni.showToast({ icon: 'none', title: '请选择所在部门' })
  //     return
  //   }
  // }

  // if (!baseFormData.value.studentNo) {
  //   uni.showToast({ icon: 'none', title: '请填写学号' })
  //   return
  // }
  popupStatus.value = 0
  showPopup.value = true
  submitFeedback()
}

const submitFeedback = async () => {
  const [err, res] = await signUpInfo(baseFormData.value)
  if (err) return (showPopup.value = false)
  const { id, message } = res.result
  setTimeout(() => {
    if (message) {
      popupStatus.value = 1
    } else if (id) {
      showPopup.value = false
      console.log(123)
      nextTick(() => {
        uni.navigateTo({ url: 'pages/campaign-result/index?id=' + id })
      })
    }
  }, 1800)
}
</script>

<style lang="scss" scoped>
.collect-like {
  padding-bottom: 40rpx;
  min-height: calc(100vh - 180rpx);
  box-sizing: border-box;
  background: #fff;
  &_title {
    padding: 20rpx 0;
    margin: 40rpx 48rpx 10rpx;
    // width: calc(100% - 48rpx);
    font-size: 28rpx;
    color: #004e97;
    border-radius: 24rpx;
    background: #f9f9f9;
    text {
      margin-left: 20rpx;
    }
  }
  &_forms {
    padding: 0 48rpx;
    background: #fff;
    &_itemtex {
      padding: 30rpx 0;
      border-bottom: 1px solid #f9f9f9;
      &-wechat-phone {
        padding: 0 24rpx;
        height: 60rpx;
        border-radius: 50px;
        background-color: #f8fbff;
        border: 2rpx solid #e4f1ff;
        display: flex;
        align-items: center;
        justify-content: center;

        font-size: 24rpx;
        font-weight: 400;
        color: #666666;
      }
    }
    &_item {
      padding: 30rpx 0;
      color: #666666;
      font-size: 26rpx;
      border-bottom: 1px solid #f9f9f9;
      &_left {
        width: 190rpx;
        font-size: 28rpx;
        .xx {
          margin-left: 12rpx;
          color: #225497;
          font-size: 32rpx;
        }

        &_textarea {
          width: 100%;
          font-size: 28rpx;
          margin-bottom: 20rpx;
        }
      }

      &_picker {
        width: calc(100vw - 320rpx);
        padding-left: 10px;
        line-height: 36px;
        font-size: 28rpx;
        color: #aaa;
        &.active {
          color: #333333;
        }
        .i {
          margin-left: 30rpx;
        }
      }
      .img_box {
        flex-wrap: wrap;
        padding-bottom: 20rpx;
        .img_li {
          position: relative;
          margin-top: 40rpx;
          margin-right: 40rpx;
          &_gb {
            position: absolute;
            top: -11rpx;
            right: -7px;
            width: 40rpx;
            line-height: 40rpx;
            text-align: center;
            font-size: 30rpx;
            border-radius: 50px;
            background: #e1e1e1;
          }
        }
      }
      ::v-deep {
        .uni-easyinput__content-input {
          padding-left: 0 !important;
          padding-right: 20rpx !important;
          text-align: right;
        }
        .is-disabled {
          color: #aaa !important;
          background-color: #fff !important;
        }
      }
    }
  }

  ::v-deep {
    .uniui-clear:before {
      color: #d84545 !important;
    }
  }
  .button {
    margin: 20rpx auto;
    width: calc(100% - 64rpx);

    line-height: 96rpx;
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
</style>
