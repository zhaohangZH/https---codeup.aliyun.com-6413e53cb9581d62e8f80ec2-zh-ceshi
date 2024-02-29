<template>
  <view class="addressBox">
    <bc-navbar
      :title="(addInfo ? '编辑' : '添加') + '收货地址'"
      :type="4"
      :custom-style="{ backgroundColor: '#fff' }"
      :share="false"
    />
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
        <bc-phone-btn :sync-user-info="false" @resolve="(mobile) => (baseFormData.mobile = mobile)">
          <view class="addressBox_forms_itemtex-wechat-phone">微信授权</view>
        </bc-phone-btn>
      </view>
      <view class="addressBox_forms_item">
        <view class="addressBox_forms_item_left">所在地区</view>
        <picker mode="region" @change="onchange" :range="items">
          <view class="addressBox_picker" :class="{ active: timetext != '请选择' }">
            {{ timetext }} <uni-icons type="right" size="14" color="#ccc"></uni-icons>
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
      ><text>设置为默认地址</text
      ><switch
        :checked="baseFormData.isDefault"
        @change="switch1Change"
        color="#004E97"
        style="transform: scale(0.7, 0.7)"
      ></switch
    ></view>
    <tc-tabbar :z-index="98">
      <view class="flex-col justify-start items-center addressBox_btn" @click="submit"
        >保存地址</view
      >
    </tc-tabbar>
  </view>
</template>
<script setup>
import { onLoad } from '@dcloudio/uni-app'
import { isMobile } from '@/utils/regex'
import { ref, watch } from 'vue'
import { addUserAddress } from '@/api/user'
const addInfo = ref(null)
onLoad((ops) => {
  if (ops.addInfo) {
    addInfo.value = JSON.parse(ops.addInfo)
    baseFormData.value = addInfo.value
    timetext.value = `${addInfo.value.provinceName}-${addInfo.value.cityName}-${addInfo.value.areaName}`
  }
})
// input样式
const placeholderStyle = ref('color:#aaa;font-size:28rpx')

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
    uni.navigateBack({ delta: 1 })
  }
}
</script>
<style lang="scss" scoped>
.addressBox {
  position: relative;
  // padding-top: 120rpx;
  height: 100vh;
  box-sizing: border-box;
  background: #f6f6f6;
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
    background: #f6f6f6;
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
    padding: 20rpx 40rpx 0;
    background: #fff;
    &_item {
      display: flex;
      align-items: center;
      padding: 40rpx 0;
      border-bottom: 1px solid #f6f6f6;
      &_left {
        width: 190rpx;
        color: #666666;
        font-size: 30rpx;
        line-height: 40rpx;
      }
    }
    &_itemtex {
      padding: 40rpx 0;
      border-bottom: 1px solid #f6f6f6;
      &_left {
        margin-bottom: 40rpx;
        width: 100%;
        color: #666666;
        font-size: 30rpx;
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
    width: calc(100vw - 300rpx);
    padding-left: 10px;
    line-height: 36px;
    font-size: 28rpx;
    color: #aaaaaa;
    text-align: right;
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
    background: #fff;
  }
  &_btn {
    margin: 20rpx auto;
    width: calc(100% - 80rpx);
    line-height: 96rpx;
    font-size: 30rpx;
    color: #fff;
    border-radius: 20rpx;
    background: #225497;
  }
  ::v-deep {
    .uni-forms-item .is-required {
      display: none !important;
    }
    input {
      text-align: right !important;
    }
  }
}
</style>
