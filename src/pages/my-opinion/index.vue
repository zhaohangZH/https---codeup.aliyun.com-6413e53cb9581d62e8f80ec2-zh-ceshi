<template>
  <bc-navbar
    title="意见反馈"
    :type="4"
    :custom-style="{ backgroundColor: '#fff' }"
    :share="false"
  />
  <view class="flex-col page">
    <view class="flex-col flex-auto group_3 space-y-129">
      <view class="flex-col group_4">
        <view class="flex-col space-y-14">
          <view class="section_4">
            <uni-easyinput
              v-model="dataFeedback.contentBody"
              :inputBorder="false"
              :autoHeight="true"
              :rows="8"
              type="textarea"
              placeholderStyle="margin:0 0;font-size: 26rpx;line-height: 48rpx;"
              placeholder="请详细描述您的问题或建议，我们将及时跟进并解决。（建议添加相关问题截图）"
            />
          </view>
        </view>
        <view style="padding: 0 40rpx 48rpx; background: #fff">
          <view class="flex-col items-start section_3 space-y-20">
            <view class="flex-row items-center my-opinion-tit">
              <tc-image width="24" height="24" src="!@/imgs/i_13.png"></tc-image>
              <text class="font_2 text_4">上传凭证（最多4张）</text>
            </view>
            <view class="flex-row img_box">
              <view class="img_li" @click="upImg">
                <tc-image width="160" height="160" src="!@/user/i_04.png" mode="widthFix" />
              </view>
              <view class="img_li" v-for="(item, i) in dataFeedback.imageUrls" :key="item">
                <tc-image width="160" height="160" :src="item" mode="aspectFill" />
                <text class="img_li_gb" @click="deleteFun(i)">删除</text>
              </view>
            </view>
          </view>
        </view>
        <view class="self-start my-opinion-fh">我们希望听到您的声音并加以改进我们的服务</view>
        <view class="my-opinion_item flex-row items-center">
          <view class="my-opinion_item_left">联系电话</view>
          <uni-easyinput
            v-model="dataFeedback.contactAccount"
            :inputBorder="false"
            placeholderStyle="color:#aaa;font-size:28rpx"
            placeholder="请输入"
            :disabled="isDisabled"
          />
          <bc-phone-btn
            v-if="!isDisabled"
            :sync-user-info="false"
            @resolve="(mobile) => (dataFeedback.contactAccount = mobile)"
          >
            <view class="my-opinion-wechat-phone">微信授权</view>
          </bc-phone-btn>
        </view>
      </view>

      <tc-tabbar v-if="!isDisabled" :z-index="98">
        <view class="flex-col justify-start items-center button" @click="checkingFun"
          >提交信息</view
        >
      </tc-tabbar>
    </view>
  </view>
</template>

<script setup>
import { isMobile, isEmail } from '@/utils/regex'
import { ref } from 'vue'
import { submitUserFeedback } from '@/api/user'
import { uploadFile } from '@/api/index'

const deleteFun = (i) => {
  dataFeedback.value.imageUrls.splice(i, 1)
}

const dataFeedback = ref({
  contentBody: '',
  contactAccount: '',
  imageUrls: []
})

// 上传图片
const upImg = () => {
  if (dataFeedback.value.imageUrls.length > 3) {
    uni.showToast({ icon: 'none', title: '最多上传4张图片' })
    return
  }
  uni.chooseImage({
    count: 1,
    success: (res) => {
      uploadFileFun(res.tempFilePaths[0])
    }
  })
}

// 上传验证
const imobileReg = () => {
  if (isMobile(dataFeedback.value.contactAccount)) {
    return false
  } else if (isEmail(dataFeedback.value.contactAccount)) {
    return false
  } else {
    return true
  }
}

const checkingFun = () => {
  if (!dataFeedback.value.contentBody) {
    uni.showToast({ icon: 'none', title: '请输入问题或建议' })
    return
  } else if (!dataFeedback.value.contactAccount) {
    uni.showToast({ icon: 'none', title: '请填写联系方式' })
    return
  } else if (imobileReg()) {
    uni.showToast({ icon: 'none', title: '联系方式格式不正确，请重新填写' })
    return
  } else {
    submitFeedback()
  }
}

// 上传图片api
const uploadFileFun = async (url) => {
  const [err, res] = await uploadFile({}, { filePath: url, name: 'files' })
  if (!err) {
    const { result } = res
    dataFeedback.value.imageUrls.push(result)
  }
}

// 提交
const submitFeedback = async () => {
  const [err, res] = await submitUserFeedback(dataFeedback.value)
  if (!err) {
    const { result } = res
    dataFeedback.value = {
      contentBody: '',
      contactAccount: '',
      imageUrls: []
    }

    uni.navigateTo({
      url: '/pages/my-opinion/result'
    })
  }
}
</script>

<style scoped lang="scss">
.page {
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100%;
  .group_3 {
    overflow-y: auto;
    .group_4 {
      .section_3 {
        padding-top: 40rpx;
        border-top: 2rpx solid #eeeeee;

        .text_4 {
          color: #666666;
          font-size: 26rpx;
        }
        .img_box {
          flex-wrap: wrap;
          .img_li {
            position: relative;
            margin-top: 52rpx;
            margin-right: 32rpx;
            border-radius: 32rpx;
            overflow: hidden;
            &_gb {
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              line-height: 52rpx;
              text-align: center;
              font-size: 22rpx;
              color: #fff;
              background: rgba(#000, 0.4);
            }
          }
        }
      }
      .space-y-14 {
        background: #fff;
        .section_4 {
          padding: 40rpx 40rpx;

          .text_6 {
            color: #666666;
          }
          .pos {
            position: absolute;
            left: 40rpx;
            top: 50%;
            transform: translateY(-50%);
          }
          .pos_input {
            margin-left: 60rpx;
            font-size: 26rpx;
          }
          ::v-deep {
            .uni-easyinput__content-textarea {
              margin: 0;
            }
          }
        }
        .section_textarea {
          width: 100%;
          line-height: 48rpx;
          font-size: 28rpx;
        }
      }
      .font_2 {
        font-size: 28rpx;
        line-height: 32rpx;
      }
    }
  }
  .space-y-129 {
    & > view:not(:first-child),
    & > text:not(:first-child),
    & > image:not(:first-child) {
      margin-top: 258rpx;
    }
  }
}
.my-opinion {
  &-tit {
    color: #000;
    font-family: OPPOSans;
    font-size: 24rpx;
    font-style: normal;
    font-weight: 400;
    line-height: 32rpx;
    text {
      margin-left: 16rpx;
    }
  }
  &-fh {
    margin: 48rpx auto 40rpx;
    padding: 20rpx 0;
    width: calc(100% - 96rpx);
    text-align: center;
    border-radius: 50px;
    background: #eee;

    color: #aaa;
    font-size: 24rpx;
    line-height: 24rpx; /* 100% */
  }

  &_item {
    padding: 40rpx 48rpx 48rpx;
    color: #666666;
    font-size: 26rpx;
    background: #fff;
    &_left {
      width: 190rpx;
      font-size: 28rpx;
    }

    ::v-deep {
      .uni-easyinput__content-input {
        padding-left: 0 !important;
        padding-right: 20rpx !important;
        text-align: right;
      }
    }
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
</style>
