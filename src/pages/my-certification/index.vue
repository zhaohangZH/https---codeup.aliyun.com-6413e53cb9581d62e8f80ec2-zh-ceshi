<template>
  <view class="flex-col page">
    <bc-navbar
      title="实名认证"
      :type="4"
      :custom-style="{ backgroundColor: '#fff' }"
      :share="false"
    />
    <view class="bg">
      <tc-image width="100%" height="100%" mode="widthFix" src="!@/user/sm_bj.png" />
    </view>
    <view class="flex-col flex-auto section_4">
      <view class="flex-col items-start group_3 space-y-12">
        <text class="text_2">{{ userInfo.identityCard ? '已' : '未' }}实名认证</text>
        <text class="font_1 text_3">提升账号安全，保障合法权益</text>
      </view>
      <view class="flex-col group_4 space-y-16">
        <view class="flex-col section_5">
          <view class="flex-row items-center section_6 space-x-9">
            <tc-image width="32" height="32" src="!@/user/i_05.png" />
            <text class="font_3">使用有效身份证件信息认证</text>
          </view>
          <view class="flex-row items-center group_5">
            <text class="font_2 width_1">姓名</text>
            <uni-easyinput
              v-model="realName"
              :disabled="userInfo.identityCard"
              :inputBorder="false"
              :styles="{ disableColor: '#fff' }"
              placeholder="请输入姓名"
            ></uni-easyinput>
          </view>
          <view class="divider"></view>
          <view class="flex-row justify-between items-center relative group_6">
            <text class="font_2 width_1">证件类型</text>
            <uni-data-select
              class="font_2 pos_select"
              v-model="posType"
              :localdata="range"
            ></uni-data-select>
            <!-- <text class="font_2">居民身份证</text> -->
            <view class="pos_2">
              <tc-image class="image_9" width="32" height="32" src="!@/user/i_06.png" />
            </view>
          </view>
          <view class="divider"></view>
          <view class="flex-row items-center group_7">
            <text class="font_2 width_1">证件号码</text>
            <uni-easyinput
              type="idcard"
              :disabled="userInfo.identityCard"
              v-model="identityNo"
              :inputBorder="false"
              :styles="{ disableColor: '#fff' }"
              placeholder="请输入证件号码"
            ></uni-easyinput>
          </view>
          <view
            class="flex-col justify-start items-center self-center button"
            v-if="!userInfo.identityCard"
            @click="checkingFun"
          >
            <text class="font_2 text_5">提交信息</text>
          </view>
        </view>
        <view v-show="isshow" class="flex-col justify-start text-wrapper">
          <text class="text_6">
            为满足相关法律法规政策及相关主管部门的要求，我们需要收集您的姓名、身份证件号码、有关身份证明材料，以证实您的个人身份。
          </text>
        </view>
      </view>
      <view class="flex-row justify-center items-center group_8 space-x-6" @click="isshow = true">
        <uni-icons type="info" size="16" color="rgba(255,255,255,0.6)"></uni-icons>
        <text class="font_1 text_7">为什么要绑定</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { isIdCard } from '@/utils/regex'
import { ref } from 'vue'
import { realNameCertification } from '@/api/user'
import { storeToRefs } from 'pinia'
import { useUserStore } from '@/store/user'
// userInfo
const userStore = useUserStore()
// 用户信息
const { userInfo } = storeToRefs(userStore)

const isshow = ref(false)

const posType = ref(0)
const range = [{ value: 0, text: '居民身份证' }]
const realName = ref(userInfo.value.realName)
const identityNo = ref(userInfo.value.identityCard)
const checkingFun = () => {
  if (!realName.value) {
    uni.showToast({ icon: 'none', title: '请输入姓名' })
    return
  } else if (!identityNo.value) {
    uni.showToast({ icon: 'none', title: '请输入身份证号' })
    return
  } else if (!isIdCard(identityNo.value)) {
    uni.showToast({ icon: 'none', title: '身份证号格式不正确，请重新填写' })
    return
  } else {
    certificationResult()
  }
}
const certificationResult = async () => {
  const p = { realName: realName.value, identityNo: identityNo.value }
  const [err, res] = await realNameCertification(p)
  if (!err) {
    userInfo.value.realName = realName.value
    userInfo.value.identityCard = identityNo.value
    userInfo.value.isIdentity = true
    useUserStore().setUserInfo(userInfo.value)
    uni.navigateTo({
      url: 'pages/my-certification-result/index'
    })
  }
}
</script>

<style scoped lang="scss">
.page {
  background-color: #085dc0;
  width: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  height: 100vh;
  position: relative;
  .bg {
    position: absolute;
    top: 130rpx;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 0;
    // overflow: hidden;
  }
  .section_4 {
    padding: 68rpx 48rpx 68rpx;
    overflow-y: auto;
    position: relative;
    box-sizing: border-box;
    z-index: 1;
    .group_3 {
      padding: 0 12rpx;
      .text_2 {
        color: #ffffff;
        font-size: 40rpx;
        line-height: 50rpx;
      }
      .text_3 {
        color: #ffffff;
      }
    }
    .space-y-12 {
      & > view:not(:first-child),
      & > text:not(:first-child),
      & > image:not(:first-child) {
        margin-top: 24rpx;
      }
    }
    .group_4 {
      margin-top: 56rpx;
      .section_5 {
        padding-bottom: 52rpx;
        background-color: #ffffff;
        .section_6 {
          padding: 36rpx 42rpx;
          background-color: #eff5ff;
          border-radius: 20rpx 20rpx 0px 0px;
        }
        .space-x-9 {
          & > view:not(:first-child),
          & > text:not(:first-child),
          & > image:not(:first-child) {
            margin-left: 18rpx;
          }
        }
        .group_5 {
          padding: 48rpx 48rpx 40rpx;
        }
        .font_2 {
          font-size: 28rpx;
          line-height: 36rpx;
          color: #333333;
        }
        .font_3 {
          color: #004e97;
          font-size: 28rpx;
          line-height: 28rpx; /* 100% */
        }
        .width_1 {
          width: 130rpx;
        }
        .divider {
          margin: 0 40rpx;
          background-color: #f9f9f9;
          height: 2rpx;
        }
        .group_6 {
          display: flex;
          padding: 40rpx 48rpx;
          .pos {
            position: absolute;
            left: 48rpx;
            top: 50%;
            transform: translateY(-50%);
          }
          .pos_2 {
            position: absolute;
            right: 66rpx;
            top: 50%;
            transform: translateY(-50%);
          }
          .pos_select {
            margin-left: 70rpx;
            flex: 1;
            -webkit-appearance: none;

            -moz-appearance: none;

            appearance: none; /*去掉下拉箭头*/
            &::v-deep {
              .uni-stat__select {
                cursor: none;
              }
              .uni-select {
                border: none !important;
              }
              .uni-icons {
                display: none;
              }
              .uni-select__input-text {
                font-size: 28rpx;
              }
            }
          }
        }
        .group_7 {
          padding: 42rpx 48rpx 40rpx;
        }
        .button {
          margin-top: 20rpx;
          padding: 32rpx 0;
          background-color: #3a70b7;
          border-radius: 20rpx;
          width: 558rpx;
          border: solid 2rpx #5e8ac4;
          .text_5 {
            color: #ffffff;
          }
        }
      }
      .text-wrapper {
        padding: 28rpx 0 38rpx;
        background-color: #0000001a;
        border-radius: 20rpx;
        .text_6 {
          margin: 0 36rpx;
          color: #ffffff;
          font-size: 24rpx;
          line-height: 40rpx;
          text-align: justify;
        }
      }
    }
    .space-y-16 {
      & > view:not(:first-child),
      & > text:not(:first-child),
      & > image:not(:first-child) {
        margin-top: 32rpx;
      }
    }
    .group_8 {
      margin-top: 46rpx;
      .text_7 {
        color: #ffffff99;
      }
    }
    .space-x-6 {
      & > view:not(:first-child),
      & > text:not(:first-child),
      & > image:not(:first-child) {
        margin-left: 12rpx;
      }
    }
    .font_1 {
      font-size: 24rpx;
      line-height: 30rpx;
    }
  }
  ::v-deep {
    .uni-easyinput {
      margin-left: 70rpx;
    }
    .uni-easyinput__content-input {
      font-size: 28rpx !important;
    }
  }
}
</style>
