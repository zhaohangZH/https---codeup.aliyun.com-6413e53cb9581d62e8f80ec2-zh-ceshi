<template>
  <bc-navbar
    title="关于我们"
    :type="4"
    :custom-style="{ backgroundColor: '#fff' }"
    :share="false"
  />
  <view class="about">
    <view class="aboutBox">
      <mp-html :content="nodes" space="nbsp" />
    </view>
    <view class="flex-row items-center about_li_top">
      <tc-image width="30" height="32" src="!@/imgs/icon-logo-b.png" mode="widthFix" />
      <text>捐赠途径</text>
    </view>
    <view v-for="(item, index) in li" :key="index" class="about_li">
      <view class="flex-row justify-between items-center">
        <text class="about_li_title">{{ item.title }}</text>
        <text class="about_li_btn" @click="setClip(item)">复制</text>
      </view>
      <view v-if="item.sk" class="about_li_sk">
        {{ item.sk }}
      </view>
      <view v-for="(it, i) in item.li" :key="i" class="flex-row justify-between about_lis">
        <text class="about_lis_n">{{ it.name }}</text>
        <text class="about_lis_v">{{ it.value }}</text>
      </view>
    </view>
  </view>
</template>
<script setup>
import { getAboutUs } from '@/api/user'
import { onMounted, ref } from 'vue'
import { getCompanyInfo } from '@/api/index.js'

const nodes = ref('')

const getCompanyInfos = async () => {
  let [err, res] = await getCompanyInfo()
  if (!err) {
    li.value = res.result.companyBanks
  }
}
const li = ref([
  {
    title: '银行转账',
    sk: '北京中国地质大学教育基金会现有人民币币种的帐户',
    li: [
      { name: '名称：', value: '北京中国地质大学教育基金会' },
      {
        name: '银行：',
        value: '中国农业银行北京海淀东区支行地质大学分理处'
      }
    ]
  },
  {
    title: '邮局汇款',
    sk: '',
    li: [
      { name: '地址：', value: '北京市海淀区学院路29号北京中国地质大学教育基金会' },
      {
        name: '邮编：',
        value: '100083'
      },
      { name: '收款人：', value: '北京中国地质大学教育基金会（请在附言中注明捐赠用途）' }
    ]
  },
  {
    title: '捐物',
    sk: '',
    li: [
      { name: '地址：', value: '北京市海淀区学院路29号中国地质大学（北京）综合办公楼333' },
      {
        name: '邮编：',
        value: '100083'
      },
      { name: '电话：', value: '（010）82321854' },
      { name: '联系人：', value: '白老师' },
      { name: 'E-mail：', value: 'xyh@cugb.edu.cn' }
    ]
  }
])

const getAbout = async () => {
  const [err, res] = await getAboutUs()
  if (!err) {
    const { result } = res
    nodes.value = result.aboutUs.description
  }
}

const setClip = (item) => {
  let lis = ''
  for (let i = 0; i < item.li.length; i++) {
    const ele = item.li[i]
    lis += ele.name + ele.value + '，'
  }
  const string = `${item.title}，${lis}`
  uni.setClipboardData({
    data: string,
    success: function () {
      // console.log('success')
    }
  })
}

onMounted(() => {
  getAbout()
  // getCompanyInfos()
})
</script>
<style lang="scss" scoped>
.about {
  padding: 40rpx 40rpx;
  background: #fff;
  &_li {
    margin-top: 40rpx;
    padding: 44rpx 48rpx;
    color: #666;
    border-radius: 32rpx;
    background: #f9f9f9;
    &_top {
      padding-top: 60rpx;
      margin-bottom: 8rpx;
      text {
        margin-left: 24rpx;
        color: #333;
        font-size: 36rpx;
        font-weight: 400;
      }
    }
    &_title {
      color: #225497;
      font-family: OPPOSans;
      font-size: 32rpx;
      font-style: normal;
      font-weight: 400;
      line-height: 32rpx;
    }
    &_btn {
      display: flex;
      width: 100rpx;
      height: 48rpx;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      font-size: 24rpx;
      border-radius: 24rpx;
      border: 1px solid #eee;
      background: #fff;
    }
    &_sk {
      margin-top: 40rpx;
      color: #aaa;
      font-family: OPPOSans;
      font-size: 24rpx;
      font-style: normal;
      font-weight: 400;
      line-height: 28rpx;
    }
    &s {
      margin-top: 32rpx;
      font-size: 26rpx;
      line-height: 44rpx;
      &_n {
        width: 120rpx;
      }
      &_v {
        width: 440rpx;
        color: #333;
      }
    }
  }
  .aboutBox {
  }
}
</style>
