<template>
  <tc-navbar v-if="!fromType" :custom-style="{ backgroundColor: '#fff' }">
    <view class="navbar">
      <view class="title" @click="goBack">
        <view class="title-icon">
          <uni-icons type="back" size="27" color="#666"></uni-icons>
        </view>
        <view class="title-text">
          <text class="tc-line-1">{{ isshows ? (addInfo.id ? '编辑' : '添加') : '' }}收货地址</text>
        </view>
      </view>
    </view>
  </tc-navbar>
  <view class="flex-col page">
    <view class="flex-col flex-auto group_3">
      <view v-if="addressList.length > 0" class="flex-col list space-y-14">
        <view class="flex-row items-center justify-center addlist_title">
          <tc-image width="40" height="40" src="!@/imgs/i_18.png" />
          <text>默认收货地址</text>
        </view>
        <Item
          :item="addressList[0]"
          @setAdd="setAdd"
          @selectItem="selectItem"
          :fromType="fromType"
        ></Item>
      </view>
      <view v-if="addressList.length > 1" class="flex-col list space-y-14">
        <view class="flex-row items-center justify-center addlist_title">
          <tc-image width="40" height="40" src="!@/imgs/i_18.png" />
          <text>备用收货地址</text>
        </view>
        <!-- <uni-swipe-action>
          <uni-swipe-action-item
            v-for="(item, index) in addressList"
            :key="item.id"
            :right-options="options2"
            :show="isOpened"
            :auto-close="false"
            @click="bindClick(item, index)"
          > -->
        <template v-for="(item, index) in addressList" :key="item.id">
          <Item
            v-if="index > 0"
            :item="item"
            @setAdd="setAdd"
            @selectItem="selectItem"
            :fromType="fromType"
          ></Item>
        </template>
        <!-- </uni-swipe-action-item>
        </uni-swipe-action> -->
      </view>
      <tc-tabbar :z-index="98">
        <view class="flex-row justify-center items-center button wx" @click="addFun">
          <tc-image width="40" height="40" src="!@/imgs/i_24.png" /><text>微信导入</text></view
        >
        <view class="flex-row justify-center items-center button" @click="setAdd(0)">手动添加</view>
      </tc-tabbar>
    </view>
  </view>
  <view v-if="!fromType" class="flex-row justify-center items-center delBtn" @click="delBtnFun">
    <tc-image width="36" height="48" src="!@/user/i_07.png"></tc-image>
  </view>
  <bc-address
    v-model:isshow="isshows"
    v-model:addInfo="addInfo"
    @successBtn="successBtn"
  ></bc-address>
  <z-paging-empty-view
    v-if="!addressList || !addressList.length"
    :empty-view-fixed="false"
    empty-view-text="暂无收货地址"
  />
</template>

<script setup>
import { ref } from 'vue'
import Item from './components/item.vue'
import { getUserAddressList, deleteUserAddress, addUserAddress } from '@/api/user'
import { onShow } from '@dcloudio/uni-app'

const goBack = () => {
  if (isshows.value) {
    isshows.value = false
  } else {
    uni.navigateBack({ delta: 1 })
  }
}

const emits = defineEmits(['selectItem'])

const props = defineProps({
  fromType: {
    type: [Number, String],
    default: 0
  }
})

const addressList = ref([])
const getAddressList = async () => {
  const p = { pageIndex: 1, pageSize: 30 }
  const [err, res] = await getUserAddressList(p)
  if (!err) {
    const { result } = res
    addressList.value = result.data || []
  }
}

onShow(() => {
  getAddressList()
})

const addInfo = ref({})
const isshows = ref(false)
const setAdd = (items) => {
  if (!items) {
    uni.navigateTo({
      url: '/pages/add-addres/add-addres'
    })
  } else {
    uni.navigateTo({
      url: '/pages/add-addres/add-addres?addInfo=' + JSON.stringify(items)
    })
    // addInfo.value = items ? items : {}
    // isshows.value = true
  }
}

const successBtn = (val) => {
  getAddressList()
}

// 删除按钮
const delBtnFun = () => {
  uni.navigateTo({
    url: '/pages/addres-del/index'
  })
}

// 删除
const isOpened = ref('none')
const options2 = ref([
  {
    text: '删除',
    style: {
      color: '#fff',
      backgroundColor: '#d84545'
    }
  }
])
// const bindClick = async (e, i) => {
//   const [err, res] = await deleteUserAddress({ id: e.id })
//   if (!err) {
//     addressList.value.splice(i, 1)
//   }
// }

// 获取系统收货地址
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
const addFun = () => {
  uni.authorize({
    scope: 'scope.address',
    success() {
      uni.chooseAddress({
        success(res) {
          console.log(res)
          baseFormData.value.name = res.userName
          baseFormData.value.mobile = res.telNumber
          baseFormData.value.provinceName = res.provinceName
          baseFormData.value.cityName = res.cityName
          baseFormData.value.areaName = res.countyName
          baseFormData.value.address = res.detailInfo
          baseFormData.value.isDefault = 1
          addAddress()
        }
      })
    }
  })
}

// 添加收货地址
const addAddress = async () => {
  const [err, res] = await addUserAddress(baseFormData.value)
  if (!err) {
    getAddressList()
  }
}

// 选择收货地址
const selectItem = (item) => {
  emits('selectItem', item)
}
defineExpose({ getAddressList })
</script>

<style lang="scss" scoped>
.navbar {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .title {
    display: flex;
    flex-direction: row;
    align-items: center;

    &-icon {
      height: 38px;
      padding-right: 4px;
      display: flex;
      flex-direction: row;
      align-items: center;
    }
    &-text {
      font-family: TsangerYuMo-3;
      height: 30px;
      line-height: 30px;
      overflow: hidden;
      flex: 1;
      display: flex;
      flex-direction: row;
      align-items: center;
      font-size: 17px;
      font-weight: 400;
      color: #000000;
    }
  }
}
.page {
  padding-bottom: 250rpx;
  // background-color: #f6f6f6;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  // height: 100%;
  .group_3 {
    position: relative;
    overflow-y: auto;
    .list {
      padding: 20rpx 40rpx 0;
      background-color: #ffffff;
    }

    .addlist_title {
      padding: 20rpx 0;
      font-size: 28rpx;
      color: #004e97;
      border-radius: 24rpx;
      background: #f9f9f9;
      text {
        margin-left: 20rpx;
      }
    }
    .space-y-14 {
      & > view:not(:first-child),
      & > text:not(:first-child),
      & > image:not(:first-child) {
        margin-top: 28rpx;
      }
    }

    .button {
      margin: 20rpx auto;
      width: 320rpx;
      line-height: 92rpx;
      font-size: 30rpx;
      color: #fff;

      border-radius: 20rpx;
      background: #225497;
      border: 2rpx solid #225497;
      box-sizing: border-box;
      &.wx {
        color: #28854d;
        background: #eefbf5;
        border-color: #8dbfa7;
        border-radius: 20rpx;
      }
      text {
        margin-left: 12rpx;
      }
    }
    .font_2 {
      font-size: 28rpx;
      line-height: 36rpx;
      color: #333333;
    }
  }
}
.delBtn {
  position: fixed;
  right: 32rpx;
  bottom: 25%;
  width: 96rpx;
  height: 96rpx;
  border-radius: 50%;
  border: 4rpx solid #dc5555;
  opacity: 0.7;
  background: #ffeaea;
  z-index: 99;
}
</style>
