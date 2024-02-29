<template>
  <bc-navbar
    title="捐赠结果"
    :type="4"
    :custom-style="{ backgroundColor: '#fff' }"
    :share="false"
  />
  <view class="flex-col page">
    <view class="flex-col flex-auto group_3 space-y-232">
      <view class="flex-col group_4 space-y-30">
        <view class="flex-col items-center section_3 space-y-36">
          <tc-image width="150" height="150" src="!@/selectrepay/icon_01.png" />
          <text class="font_1 text_2">捐赠完成，感谢您为公益的付出！</text>
        </view>
        <view class="flex-col group_5 space-y-12">
          <view class="self-start">
            <tc-image width="188" height="36" src="!@/selectrepay/icon_02.png" />
          </view>
          <view class="flex-row items-center section_4 space-x-16">
            <tc-image
              width="180"
              height="180"
              :style="'borderRadius:25rpx'"
              src="!@/selectrepay/953e909ae5c862df5beb46d98189d8af.png"
            />
            <view class="flex-col flex-auto space-y-13">
              <text class="self-start font_2 text_3">北地大定制羽绒服</text>
              <text class="self-start font_1 text_4">已选择</text>
              <view class="flex-row space-x-6">
                <text class="font_1">黑色</text>
                <text class="font_1">M码（120-130kg）</text>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="flex-col justify-start items-center section_5">
        <view class="flex-col justify-start items-center button"
          ><text class="font_2 text_5">返回首页</text></view
        >
      </view>
    </view>
  </view>
</template>
<script setup></script>
<style scoped lang="scss">
.page {
  background-color: #f6f6f6;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  .group_3 {
    padding-top: 32rpx;
    overflow-y: auto;
    .group_4 {
      padding: 0 32rpx;
      .section_3 {
        padding: 92rpx 0;
        background-color: #ffffff;
        box-shadow: 0px 4rpx 12rpx 0px #0000000f;
        border-radius: 20rpx;
        .text_2 {
          color: #333333;
          font-size: 28rpx;
          line-height: 36rpx;
        }
      }
      .space-y-36 {
        & > view:not(:first-child),
        & > text:not(:first-child),
        & > image:not(:first-child) {
          margin-top: 72rpx;
        }
      }
      .group_5 {
        padding: 0 8rpx;
        .section_4 {
          padding: 20rpx;
          background-color: #ffffff;
          box-shadow: 0px 8rpx 16rpx 0px #e7e7ea;
          border-radius: 28rpx;
          .image_9 {
            border-radius: 24rpx;
            width: 180rpx;
            height: 180rpx;
          }
          .space-y-13 {
            & > view:not(:first-child),
            & > text:not(:first-child),
            & > image:not(:first-child) {
              margin-top: 26rpx;
            }
            .text_3 {
              color: #333333;
            }
            .text_4 {
              color: #aaaaaa;
            }
            .space-x-6 {
              & > view:not(:first-child),
              & > text:not(:first-child),
              & > image:not(:first-child) {
                margin-left: 12rpx;
              }
            }
          }
        }
        .space-x-16 {
          & > view:not(:first-child),
          & > text:not(:first-child),
          & > image:not(:first-child) {
            margin-left: 32rpx;
          }
        }
      }
      .space-y-12 {
        & > view:not(:first-child),
        & > text:not(:first-child),
        & > image:not(:first-child) {
          margin-top: 24rpx;
        }
      }
      .font_1 {
        font-size: 26rpx;
        line-height: 32rpx;
        color: #666666;
      }
    }
    .space-y-30 {
      & > view:not(:first-child),
      & > text:not(:first-child),
      & > image:not(:first-child) {
        margin-top: 60rpx;
      }
    }
    .section_5 {
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      padding: 22rpx 0;
      background-color: #ffffffe6;
      .button {
        padding: 28rpx 0;
        background-image: linear-gradient(180deg, #5f8aff 0%, #3d55c3 100%);
        border-radius: 48rpx;
        width: 630rpx;
        border: solid 2rpx #9eb5ea;
        .text_5 {
          color: #ffffff;
        }
      }
    }
    .font_2 {
      font-size: 30rpx;
      line-height: 38rpx;
    }
  }
  .space-y-232 {
    & > view:not(:first-child),
    & > text:not(:first-child),
    & > image:not(:first-child) {
      margin-top: 464rpx;
    }
  }
}
</style>
