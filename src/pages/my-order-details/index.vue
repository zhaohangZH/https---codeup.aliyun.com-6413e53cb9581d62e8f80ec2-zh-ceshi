<template>
  <bc-navbar
    title="订单详情"
    :type="4"
    :custom-style="{ backgroundColor: '#fff' }"
    :share="false"
  />
  <view class="flex-col order">
    <view v-if="payOrderDetails && payOrderDetails[0]" class="flex-col flex-auto group_3">
      <view class="flex-col section_5">
        <view class="flex-row justify-between order_1">
          <text class="order_1_time">订单时间：{{ detail.recDate }}</text>
          <text class="order_1_tag">{{ payOrderDetails[0].statusName }}</text>
        </view>
        <view class="flex-row items-center order_main">
          <view class="order_main_img"
            ><tc-image
              :src="payOrderDetails[0].imageUrl"
              radius="20"
              width="180"
              height="180"
              mode="widthFix"
          /></view>
          <view class="order_main_text">
            <text class="order_main_text_tit">{{ payOrderDetails[0].name }}</text>
            <text
              v-for="item in payOrderDetails[0].specList"
              :key="item.key"
              class="order_main_text_sub"
              >{{ item.key }}：{{ item.value }}</text
            >
            <text class="order_main_text_tag">{{ payOrderDetails[0].tag }}</text>
          </view>
        </view>
        <view
          v-if="orderExpress && orderExpress.nu"
          class="flex-row justify-between items-center section_6"
        >
          <view class="flex-row items-center space-x-8">
            <text class="font_5">{{ orderExpress.name || 名字 }}</text>
            <text class="font_5">{{ orderExpress.nu || nu }}</text>
          </view>
          <view class="flex-col justify-start items-center text-wrapper"
            ><text class="text_13" @click="setClip(orderExpress.nu)">复制</text></view
          >
        </view>
      </view>
      <view class="flex-col section_4" style="border-bottom: 2rpx solid #eee" v-if="detailAdd">
        <view class="flex-row items-center group_4">
          <tc-image width="28" height="28" src="!@/imgs/i_17.png" />
          <text class="font_1">收货信息</text>
        </view>
        <view class="flex-row space-x-6">
          <text class="font_2 text_2">{{ detailAdd.provinceName }}</text>
          <text class="font_2 text_2">{{ detailAdd.cityName }}</text>
          <text class="font_2">{{ detailAdd.areaName }}</text>
        </view>
        <view class="flex-row justify-between items-center" style="margin-top: 28rpx">
          <text class="self-start text_6 tc-line-2">{{ detailAdd.address }}</text>
          <uni-icons type="right" size="14" color="#ccc"></uni-icons>
        </view>
        <view class="flex-row space-x-20">
          <text class="font_2 text_2">{{ detailAdd.name }}</text>
          <text class="font_2">{{ detailAdd.mobile }}</text>
        </view>
      </view>
      <view class="flex-col section_4">
        <view class="flex-row items-center">
          <tc-image width="28" height="28" src="!@/imgs/i_17.png" />
          <text class="font_1">物流信息</text>
        </view>
        <view v-if="orderExpress && orderExpress.data.length" class="flex-col group_6">
          <view class="flex-row space-x-12">
            <view class="flex-col justify-start shrink-0 relative group_7">
              <view class="flex-col justify-start items-center relative group_8">
                <view class="section_7"></view>
                <view class="flex-row justify-center items-center pos">
                  <tc-image width="36" height="28" src="!@/order/i_10.png" />
                </view>
              </view>
            </view>
            <view class="flex-col flex-auto self-start">
              <template v-for="(item, i) in orderExpress.data" :key="i">
                <text class="font_4" v-if="i == 0">{{ item.context }}</text>
                <view class="font_6 text_16" v-else>
                  {{ item.context }}
                  <view class="section_8 pos_2"></view>
                </view>
                <text class="self-start font_3 text_15" v-if="i == 0">{{ item.time }}</text>
                <text class="self-start font_3 text_17" v-else>{{ item.time }}</text>
              </template>
            </view>
          </view>
        </view>
        <view v-else class="flex-col onte items-center" @click="qrGet">
          <tc-image
            v-if="detail.isReceive"
            width="190rpx"
            height="190rpx"
            src="!@/order/i_12.png"
          />
          <tc-image v-else width="330rpx" height="200rpx" src="!@/order/i_11.png" />
          <text v-if="detail.isReceive">{{
            detail.status == 2 ? '点击展示取货二维码领取回馈品' : '已现场领取回馈品！!'
          }}</text>
          <text v-else>暂无快递信息</text>
        </view>
      </view>
    </view>
  </view>
  <bc-qrcode-box
    class="qrcode-popup"
    :show="showQrcodePopup"
    :id="showQrcodeId"
    :type="showQrcodetype"
    @close="showQrcodePopup = false"
  />
</template>

<script setup>
import { ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { getPayOrderDetail, getPayOrderExpress } from '@/api/order'

const orderId = ref('')
onLoad((option) => {
  orderId.value = option.id
  geOrderDetail(option.id)
  getOrderExpress(option.id)
})

// 初始化数据
const detail = ref({})
const detailAdd = ref({})
const payOrderDetails = ref([])
const geOrderDetail = async (id) => {
  const [err, res] = await getPayOrderDetail({ id })
  if (!err) {
    const { result } = res
    detail.value = result
    detailAdd.value = result.userAddress
    payOrderDetails.value = result.payOrderDetails
  }
}

//显示二维码
const showQrcodePopup = ref(false)
const showQrcodetype = ref('')
const showQrcodeId = ref('')
const qrGet = () => {
  if (!detail.value.isReceive || detail.value.status != 2) return
  showQrcodePopup.value = true
  showQrcodetype.value = 10001
  showQrcodeId.value = orderId.value
}

// 快递100
const orderExpress = ref({})
const getOrderExpress = async (orderId) => {
  const [err, res] = await getPayOrderExpress({ orderId })
  if (!err) {
    const { result } = res
    orderExpress.value = result
  }
}
// 复制单号
const setClip = (string) => {
  uni.setClipboardData({
    data: string,
    success: function () {
      // console.log('success')
    }
  })
}
</script>

<style scoped lang="scss">
.order {
  background-color: #fff;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  &_1 {
    font-size: 26rpx;
    &_time {
      color: #aaa;
    }
    &_tag {
      color: #3d5b98;
    }
  }

  &_main {
    display: flex;
    margin-top: 48rpx;
    &_img {
      width: 180rpx;
      height: 180rpx;
      border-radius: 20rpx;
      overflow: hidden;
    }
    &_text {
      display: flex;
      flex-direction: column;
      flex: 1;
      margin-left: 40rpx;
      &_tit {
        font-family: TsangerYuMo-3;
        line-height: 32rpx;
        font-size: 32rpx;
        // font-weight: bold;
        color: #000;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      &_sub {
        margin-top: 28rpx;
        font-size: 28rpx;
        color: #666;
      }
      &_tag {
        margin-top: 32rpx;
        color: #004e97;
        font-family: OPPOSans;
        font-size: 26rpx;
        font-style: normal;
        font-weight: 400;
        line-height: 26rpx;
      }
    }
  }
  .group_3 {
    padding: 48rpx 40rpx;
    overflow-y: auto;
    .section_4 {
      padding: 60rpx 0 40rpx;

      .group_4 {
        padding: 0 2rpx;
      }
      .space-x-6 {
        margin-top: 40rpx;
        .text_2 {
          margin-right: 10rpx;
        }
        .text_3 {
          margin-right: 40rpx;
        }
        .text_5 {
          font-size: 24rpx;
          line-height: 30rpx;
        }
      }
      .text_6 {
        color: #333333;
        font-size: 32rpx;
        line-height: 48rpx;
      }
      .space-x-20 {
        margin-top: 28rpx;
        .text_7 {
          color: #999999;
          font-size: 24rpx;
          line-height: 30rpx;
        }
        .text_8 {
          color: #999999;
          font-size: 24rpx;
          line-height: 30rpx;
        }
      }
      .font_2 {
        font-size: 26rpx;
        line-height: 26rpx;
        color: #666666;
      }
      .group_6 {
        margin-top: 40rpx;
        .space-x-12 {
          & > view:not(:first-child),
          & > text:not(:first-child),
          & > image:not(:first-child) {
            margin-left: 24rpx;
          }
          .group_7 {
            width: 48rpx;
            .group_8 {
              padding-top: 24rpx;
              width: 48rpx;
              height: 100%;
              .section_7 {
                width: 2rpx;
                height: 100%;
                border-left: 2rpx dashed #eee;
              }
              .pos {
                position: absolute;
                left: 0;
                right: 0;
                top: 0;
                width: 48rpx;
                height: 48rpx;
                border-radius: 50px;
                background: #004e97;
              }
            }
          }
          .text_15 {
            margin-top: 16rpx;
          }
          .font_6 {
            font-size: 26rpx;
            line-height: 40rpx;
            color: #aaaaaa;
          }
          .text_16 {
            position: relative;
            margin-top: 36rpx;
            text-align: justify;
            .section_8 {
              background-color: #aaaaaa;
              border-radius: 5rpx;
              width: 10rpx;
              height: 10rpx;
            }
            .pos_2 {
              position: absolute;
              left: -52rpx;
              top: 7px;
            }
          }
          .text_17 {
            margin-top: 12rpx;
          }
        }
      }
    }
    .section_5 {
      .section_6 {
        padding: 20rpx 48rpx;
        background-color: #f6f6f6;
        border-radius: 50px;
        .space-x-8 {
          .font_5 {
            margin-right: 20rpx;
            font-size: 24rpx;
            line-height: 28rpx;
            color: #333333;
          }
        }
        .text-wrapper {
          padding: 8rpx 0;
          background-color: #ffffff;
          border-radius: 50px;
          width: 100rpx;
          border: solid 2rpx #eeeeee;

          .text_13 {
            color: #666666;
            font-size: 24rpx;
            line-height: 22rpx;

            font-family: OPPOSans;
            font-style: normal;
            font-weight: 400;
            line-height: 24px;
          }
        }
      }
    }
    .font_3 {
      font-size: 22rpx;
      line-height: 24rpx;
      color: #aaaaaa;
    }
    .font_1 {
      margin-left: 20rpx;
      font-size: 28rpx;
      line-height: 28rpx;
      color: #000;
    }
    .space-y-18 {
      & > view:not(:first-child),
      & > text:not(:first-child),
      & > image:not(:first-child) {
        margin-top: 36rpx;
      }
    }
    .font_4 {
      font-size: 26rpx;
      line-height: 40rpx;
      color: #000;
    }
  }
  .onte {
    margin-top: 80rpx;
    padding-bottom: 50rpx;
    color: #666;
    font-size: 26rpx;
    text {
      margin-top: 52rpx;
    }
  }
}
</style>
