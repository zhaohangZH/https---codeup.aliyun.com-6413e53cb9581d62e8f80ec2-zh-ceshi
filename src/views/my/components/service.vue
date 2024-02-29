<template>
  <view class="my_content_fun_service">
    <button
      v-for="item in list"
      :key="item.name"
      :open-type="item.img == 'fun_01' ? 'contact' : ''"
      class="my_content_fun_service_li"
      hover-class="hover-class"
      @click="aboutFun(item.url)"
    >
      <tc-image
        class="my_content_fun_service_img"
        :src="'!@/user/' + item.img + '.png'"
        width="60"
        height="60"
        mode="widthFix"
      />
      <text class="my_content_fun_service_text">{{ item.name }}</text>
    </button>
  </view>
</template>
<script setup>
const list = [
  {
    name: '联系客服',
    img: 'fun_01'
  },
  {
    name: '意见反馈',
    url: 'my-opinion',
    img: 'fun_02'
  },
  {
    name: '收货地址',
    url: 'my-address',
    img: 'fun_03'
  },
  {
    name: '捐赠发票',
    url: 'my-invoice',
    img: 'fun_04'
  },
  {
    name: '关于我们',
    url: 'my-about',
    img: 'fun_05'
  },
  {
    name: '隐私政策',
    url: 'my-policy',
    img: 'fun_06'
  },
  {
    name: '问题指南',
    url: 'my-help',
    img: 'fun_07'
  }

  // {
  //   name: '我的报名',
  //   url: 'my-campaign',
  //   img: 'fun_09'
  // },
  // {
  //   name: '我的比赛',
  //   url: 'my-match',
  //   img: 'fun_10'
  // },
  // {
  //   name: '个人资料',
  //   url: 'my-info',
  //   img: 'fun_06'
  // },
  // {
  //   name: '安全设置',
  //   url: 'set-up',
  //   img: 'fun_08'
  // }
]
const aboutFun = (str) => {
  if (str) {
    uni.navigateTo({
      url: '/pages/' + str + '/index'
    })
  } else {
    uni.showToast({ icon: 'none', title: '此功能暂不可用' })
  }
}
</script>
<style lang="scss" scoped>
// 服务功能
.my_content_fun_service {
  margin-top: 52rpx;
  &_li {
    display: inline-flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-bottom: 60rpx;
    width: 25%;
    color: #666;
    font-size: 22rpx;
    border: none;
    background-color: transparent;
    border-radius: 0;
  }

  button::after {
    border: none;
  }
  &_text {
    margin-top: 28rpx;
    line-height: 22rpx;

    font-family: OPPOSans;
    font-style: normal;
    font-weight: 400;
  }
}
</style>
