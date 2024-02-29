<template>
  <!-- 普通弹窗 -->
  <uni-popup
    ref="popup"
    type="bottom"
    @change="(v) => emits('update:isshow', v.show)"
    :is-mask-click="true"
    :safe-area="false"
  >
    <view class="addressBox">
      <view class="addressBox_tit">
        <text class="addressBox_tit_name">{{ addInfo.id ? '编辑' : '添加' }}收货地址</text>
        <text class="addressBox_tit_qx" @click="popup.close()">×</text>
      </view>
      <view class="addressBox_forms">
        <view class="addressBox_forms_item">
          <view class="addressBox_forms_item_left">收货人</view>
          <uni-easyinput
            v-model="baseFormData.name"
            :inputBorder="false"
            :placeholderStyle="placeholderStyle"
            maxlength="10"
            placeholder="请输入"
          />
        </view>
        <view class="addressBox_forms_item">
          <view class="addressBox_forms_item_left">手机号</view>
          <uni-easyinput
            v-model="baseFormData.mobile"
            :inputBorder="false"
            :placeholderStyle="placeholderStyle"
            placeholder="请输入"
          />
          <bc-phone-btn
            :sync-user-info="false"
            @resolve="(mobile) => (baseFormData.mobile = mobile)"
          >
            <view class="addressBox_forms_itemtex-wechat-phone" style="margin-left: 24rpx"
              >微信授权</view
            >
          </bc-phone-btn>
        </view>
        <view class="addressBox_forms_item">
          <view class="addressBox_forms_item_left">所在地区</view>
          <picker mode="region" @change="onchange" :range="items">
            <view class="addressBox_picker" :class="{ active: timetext != '请选择' }">
              {{ timetext }}　<uni-icons type="right" size="14" color="#ccc"></uni-icons>
            </view>
          </picker>
        </view>
        <view class="addressBox_forms_itemtex">
          <view class="addressBox_forms_itemtex_left">详细地址</view><br />
          <uni-easyinput
            type="textarea"
            v-model="baseFormData.address"
            :inputBorder="false"
            :placeholderStyle="placeholderStyle"
            maxlength="50"
            placeholder="请输入详细地址"
          />
        </view>
      </view>
      <view class="addressBox_switch"
        ><text>设置为默认地址</text>
        <switch
          :checked="baseFormData.isDefault"
          @change="switch1Change"
          color="#3567CB"
          style="transform: scale(0.7, 0.7)"
        ></switch>
      </view>

      <tc-tabbar :z-index="5">
        <button class="addressBox_btn" @click="submit">保存信息</button>
      </tc-tabbar>
    </view>
  </uni-popup>
</template>
<script setup>
import { isMobile } from '@/utils/regex'
import { ref, watch } from 'vue'
import { addUserAddress } from '@/api/user'

const emits = defineEmits(['update:isshow', 'successBtn'])

const props = defineProps({
  isshow: {
    type: Boolean,
    default: false
  },
  addInfo: {
    type: Object,
    default: () => {}
  }
})
const popup = ref(null)

// input样式
const placeholderStyle = ref('color:#aaa;font-size:28rpx;text-align: right;')

const items = ref([0, 0, 0])
const timetext = ref('请选择')
function onchange(e) {
  const code = e.detail.code
  const value = e.detail.value
  timetext.value = e.detail.value[0] + '-' + e.detail.value[1] + '-' + e.detail.value[2]
  baseFormData.value.province = code[0]
  baseFormData.value.city = code[1]
  baseFormData.value.area = code[2]
  baseFormData.value.provinceName = value[0]
  baseFormData.value.cityName = value[1]
  baseFormData.value.areaName = value[2]
}

const baseFormData = ref({
  id: '',
  name: '',
  mobile: '',
  province: '',
  city: '',
  area: '',
  address: '',
  isDefault: 1
})
const switch1Change = (v) => {
  baseFormData.value.isDefault = v.detail.value ? 1 : 0
}
// 提交
const submit = () => {
  if (!baseFormData.value.name) {
    uni.showToast({ icon: 'none', title: '收货人不能为空' })
    return
  } else if (!baseFormData.value.mobile) {
    uni.showToast({ icon: 'none', title: '手机号不能为空' })
    return
  } else if (!isMobile(baseFormData.value.mobile)) {
    uni.showToast({ icon: 'none', title: '手机号码格式不正确，请重新填写' })
    return
  } else if (!baseFormData.value.area) {
    uni.showToast({ icon: 'none', title: '所在地区不能为空' })
    return
  } else if (!baseFormData.value.address) {
    uni.showToast({ icon: 'none', title: '详细地址不能为空' })
    return
  } else {
    addAddress()
  }
}
const addAddress = async () => {
  const [err, res] = await addUserAddress(baseFormData.value)
  if (!err) {
    emits('successBtn', 1)
    popup.value.close()
  }
}
watch(
  () => props.isshow,
  (v) => {
    if (popup.value) {
      if (v) {
        if (props.addInfo.id) {
          baseFormData.value = props.addInfo
          items.value = [props.addInfo.province, props.addInfo.city, props.addInfo.area]
          timetext.value =
            props.addInfo.provinceName + '-' + props.addInfo.cityName + '-' + props.addInfo.areaName
        } else {
          items.value = [0, 0, 0]
          timetext.value = '请选择'
          baseFormData.value = {
            id: '',
            name: '',
            mobile: '',
            province: '',
            city: '',
            area: '',
            address: '',
            isDefault: 1
          }
        }

        popup.value.open()
      } else {
        popup.value.close()
      }
    }
  },
  {
    immediate: true
  }
)
</script>
<style lang="scss" scoped>
.addressBox {
  position: relative;
  padding: 120rpx 0 80rpx;
  height: 90vh;
  border-radius: 32rpx 32rpx 0 0;
  box-sizing: border-box;
  background: #fff;
  overflow-y: scroll;
  &_tit {
    position: fixed;
    top: 0;
    left: 40rpx;
    width: calc(100% - 80rpx);
    display: flex;
    justify-content: space-between;
    padding: 40rpx 0 20rpx;
    margin-bottom: 22rpx;
    box-sizing: border-box;
    z-index: 999;
    &_name {
      text-align: center;
    }
    &_qx {
      position: absolute;
      top: 10px;
      right: 0;
      font-size: 50rpx;
    }
  }
  &_forms {
    padding: 0 40rpx;
    &_item {
      display: flex;
      align-items: center;
      padding: 30rpx 0;
      border-bottom: 1px solid #f9f9f9;
      &_left {
        width: 190rpx;
        color: #666666;
        font-size: 28rpx;
      }
    }
    &_itemtex {
      padding: 30rpx 0;
      border-bottom: 1px solid #f9f9f9;
      &_left {
        margin-bottom: 40rpx;
        width: 100%;
        color: #666666;
        font-size: 30rpx;
        line-height: 60rpx;
      }
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
  }
  &_picker {
    width: calc(100vw - 290rpx);
    padding-left: 10px;
    line-height: 36px;
    font-size: 28rpx;
    color: #aaa;
    text-align: right;
    align-content: center;
    &.active {
      color: #666;
    }
  }
  &_switch {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 40rpx 40rpx;
    margin-bottom: 60rpx;
    font-size: 30rpx;
    line-height: 60rpx;
    color: #666666;
    border-top: 2rpx solid #f6f6f6;
    border-radius: 32rpx;
    background: #fff;
    &_zujian {
      width: 64rpx;
      height: 36rpx;
      border-radius: 10rpx;

      background: #e2eaf5;
      .active {
        background: #004e97;
      }
    }
  }
  &_btn {
    margin: 0 auto;
    width: calc(100% - 80rpx);
    line-height: 96rpx;
    color: #fff;
    font-size: 30rpx;
    background: #225497;
    border-radius: 20rpx;
  }
}
::v-deep {
  .uni-forms-item .is-required {
    display: none !important;
  }
  input {
    text-align: right !important;
  }
}
</style>
