<template>
  <bc-navbar title="" :type="4" :custom-style="{ backgroundColor: '#fff' }" :share="false" />
  <view class="flex-col page">
    <view class="flex-col flex-auto group_3">
      <view class="flex-col justify-start items-center relative">
        <view class="group_3_img">
          <tc-booth :cover-image="goodsInfo.frontImage" mode="widthFix" />
        </view>
        <view class="group_4 pos">
          <tc-image width="100%" height="100%" src="!@/images/lighting-background.png" />
        </view>
      </view>
      <view class="flex-col justify-start relative group_5">
        <view class="flex-col section_5 space-y-25">
          <view class="flex-col items-start space-y-14">
            <text class="text_2">{{ goodsInfo.name }}</text>
            <text class="text_3">{{ goodsInfo.seriesName }}</text>
          </view>
          <view class="flex-col justify-center items-center space-y-15">{{
            goodsInfo.rarity
          }}</view>
          <view class="flex-col space-y-16">
            <view class="flex-row space-x-19">
              <view class="flex-col relative equal-division-item space-y-13">
                <view class="flex-row items-center space-x-6">
                  <tc-image
                    src="!@/collection/icon_08.png"
                    mode="widthFix"
                    width="18"
                    height="18"
                  />
                  <text class="font_1 text_4">藏品数量</text>
                </view>
                <view class="self-start">
                  <text class="font_2 text_6">{{ goodsInfo.stock }}</text>
                </view>
              </view>
              <view class="flex-col relative equal-division-item space-y-14">
                <view class="flex-row items-center space-x-6">
                  <tc-image
                    src="!@/collection/icon_09.png"
                    mode="widthFix"
                    width="22"
                    height="22"
                  />
                  <text class="font_1 text_4">藏品属性</text>
                </view>
                <view
                  v-for="item in goodsInfo.goodsAttributes"
                  :key="item.id"
                  class="flex-row items-center relative"
                >
                  <tc-image :src="item.iconUrl" mode="widthFix" width="36" height="36" />
                  <text class="font_7">{{ item.name }}</text>
                </view>
              </view>
            </view>
            <view class="flex-col">
              <view class="flex-col list space-y-16">
                <view class="flex-col list-item space-y-14">
                  <view class="flex-row items-center space-x-6">
                    <tc-image
                      src="!@/collection/icon_12.png"
                      mode="widthFix"
                      width="18"
                      height="16"
                    />
                    <text class="font_1 text_12">藏品介绍</text>
                  </view>
                  <!-- font_6 -->
                  <view>
                    <mp-html :content="goodsInfo.description" />
                  </view>
                </view>
                <view class="flex-col list-item space-y-14">
                  <view class="flex-row items-center space-x-6">
                    <tc-image
                      src="!@/collection/icon_13.png"
                      mode="widthFix"
                      width="18"
                      height="16"
                    />
                    <text class="font_1 text_12">权益介绍</text>
                  </view>
                  <view>
                    <mp-html :content="goodsInfo.equityDescription" />
                  </view>
                </view>
              </view>
              <view v-if="goodsInfo.goodsAuthor" class="flex-col section_6 space-y-20">
                <view class="flex-row items-center space-x-6">
                  <tc-image
                    src="!@/collection/icon_14.png"
                    mode="widthFix"
                    width="20"
                    height="20"
                  />
                  <text class="font_1 text_7">作品信息</text>
                </view>
                <view class="flex-row justify-between">
                  <text class="font_4">发行方</text>
                  <text class="font_3">{{ goodsInfo.goodsAuthor.companyName }}</text>
                </view>
                <view class="flex-row justify-between">
                  <text class="font_4">创作者</text>
                  <text class="font_3">{{ goodsInfo.goodsAuthor.name }}</text>
                </view>
                <view class="flex-row justify-between items-baseline">
                  <text class="font_4">发行时间</text>
                  <text class="font_5 text_15">{{ goodsInfo.goodsAuthor.releaseDate }}</text>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script setup>
import { getGoodsCulturalInfo } from '@/api/goods'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
onLoad((option) => {
  getGoodsInfo(option.id)
})

const goodsInfo = ref({})
const getGoodsInfo = async (id) => {
  const [err, res] = await getGoodsCulturalInfo({ id })
  if (!err) {
    const { result } = res
    goodsInfo.value = result
  }
}
</script>

<style scoped lang="scss">
.page {
  background-color: #f6f6f6;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  .group_3 {
    overflow-y: auto;
    .group_3_img {
      width: 750rpx;
      height: 750rpx;
      position: relative;
      z-index: 1;
    }
    .group_4 {
      border-image: linear-gradient(
          135deg,
          #e1e1e1 0%,
          #e1e1e1 -20.5%,
          #a5a5a5 120.5%,
          #a5a5a5 100%
        )
        12;
      width: 750rpx;
      height: 750rpx;
    }
    .pos {
      position: absolute;
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      z-index: 0;

      display: flex;
    }
    .group_5 {
      margin-top: -70rpx;
      padding-top: 30rpx;
      .section_5 {
        position: relative;
        padding: 56rpx 48rpx 104rpx;
        background-color: #f9f9f9;
        border-radius: 40rpx 40rpx 0px 0px;
        .space-y-14 {
          & > view:not(:first-child),
          & > text:not(:first-child),
          & > image:not(:first-child) {
            margin-top: 28rpx;
          }
          .text_2 {
            color: #333333;
            font-size: 40rpx;
            line-height: 50rpx;
          }
          .text_3 {
            color: #aaaaaa;
            font-size: 28rpx;
            line-height: 36rpx;
          }
        }
        .space-y-15 {
          position: absolute;
          top: -100rpx;
          right: 30rpx;
          width: 100rpx;
          height: 100rpx;
          font-weight: bold;
          color: #fff;
          font-size: 32rpx;
          border-radius: 50%;
          border: 10rpx solid #fff;
          box-shadow: 0 11rpx 11rpx #eee;
          background: linear-gradient(180deg, #41a9f2, #4d6ef0);
        }
        .space-y-16 {
          & > view:not(:first-child),
          & > text:not(:first-child),
          & > image:not(:first-child) {
            margin-top: 32rpx;
          }
          .space-x-19 {
            & > view:not(:first-child),
            & > text:not(:first-child),
            & > image:not(:first-child) {
              margin-left: 38rpx;
            }
            .equal-division-item {
              flex: 1 1 308rpx;
              padding: 32rpx 40rpx;
              background-color: #ffffff;
              box-shadow: 0px 8rpx 16rpx 0px #e7e7ea;
              border-radius: 20rpx;
              .font_2 {
                font-size: 32rpx;
                line-height: 44rpx;
                font-weight: 500;
              }
              .text_6 {
                color: #aaaaaa;
                line-height: 42rpx;
              }
              .pos_3 {
                position: absolute;
                left: 1rpx;
                top: 50%;
                transform: translateY(-50%);
              }
            }
            .space-y-13 {
              & > view:not(:first-child),
              & > text:not(:first-child),
              & > image:not(:first-child) {
                margin-top: 26rpx;
              }
            }
          }
          .section_6 {
            padding: 32rpx 40rpx;
            background-color: #ffffff;
            box-shadow: 0px 8rpx 16rpx 0px #e7e7ea;
            border-radius: 20rpx;
            .font_4 {
              font-size: 24rpx;
              line-height: 30rpx;
              color: #aaaaaa;
            }
            .font_5 {
              font-size: 24rpx;
              line-height: 34rpx;
              font-weight: 500;
              color: #333333;
            }
            .space-y-17 {
              & > view:not(:first-child),
              & > text:not(:first-child),
              & > image:not(:first-child) {
                margin-top: 34rpx;
              }
              .text_9 {
                width: 15em;
                font-size: 26rpx;
                text-align: right;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
              }
            }
            .text_15 {
              font-size: 26rpx;
            }
          }
          .space-y-18 {
            & > view:not(:first-child),
            & > text:not(:first-child),
            & > image:not(:first-child) {
              margin-top: 36rpx;
            }
          }
          .space-x-6 {
            & > view:not(:first-child),
            & > text:not(:first-child),
            & > image:not(:first-child) {
              margin-left: 12rpx;
            }
            .font_1 {
              font-size: 24rpx;
              line-height: 30rpx;
              color: #3d5b98;
            }
            .text_4 {
              font-size: 22rpx;
              line-height: 28rpx;
            }
            .text_7 {
              font-size: 22rpx;
              line-height: 28rpx;
            }
            .text_12 {
              font-size: 22rpx;
              line-height: 28rpx;
            }
          }
          .list {
            padding: 0 0 32rpx;
            .list-item {
              padding: 32rpx 40rpx 48rpx;
              background-color: #ffffff;
              box-shadow: 0px 8rpx 16rpx 0px #e7e7ea;
              border-radius: 20rpx;
              .font_6 {
                font-size: 24rpx;
                line-height: 44rpx;
                color: #333333;
              }
            }
          }
          .space-y-20 {
            & > view:not(:first-child),
            & > text:not(:first-child),
            & > image:not(:first-child) {
              margin-top: 40rpx;
            }
          }
          .font_3 {
            font-size: 24rpx;
            line-height: 30rpx;
            color: #333333;
          }
          .font_7 {
            margin-left: 16rpx;
            font-size: 26rpx;
            line-height: 30rpx;
            color: #333333;
          }
        }
      }
      .space-y-25 {
        & > view:not(:first-child),
        & > text:not(:first-child),
        & > image:not(:first-child) {
          margin-top: 50rpx;
        }
      }
    }
  }
}
</style>
