<template>
  <bc-navbar
    :title="type == 1 ? '项目详情' : '新闻详情'"
    :type="4"
    :custom-style="{ backgroundColor: '#fff' }"
    :share="false"
  />
  <view class="flex-col page" :class="{ type1: type == 1 }">
    <view class="flex-col flex-auto group_2">
      <template v-if="type == 2">
        <text class="text_2">{{ newsDetails.title }}</text>
        <view class="flex-row justify-between items-center group_3">
          <view class="flex-col justify-start text-wrapper"
            ><text class="font_1 text_4">{{ newsDetails.typeName }}</text></view
          >
          <text class="text_3">{{ newsDetails.recDate }}</text>
        </view>
        <text class="self-start text_5" v-if="newsDetails.source"
          >来源：{{ newsDetails.source }}</text
        >
      </template>
      <view class="flex-col group_4 space-y-25">
        <mp-html :content="newsDetails.contentBody" />
      </view>
      <view v-if="type == 2" class="divider"></view>
      <view
        v-if="type == 2"
        class="flex-row justify-center items-center button"
        :class="{ active: isClick }"
        @click="addVoteNum"
      >
        <tc-image width="34" height="28" mode="widthFix" src="!@/imgs/i_15.png" />
        <text class="self-start text_7">{{ newsDetails.voteNum }}+</text>
        <text class="text_8">点个赞！</text>
      </view>
    </view>
  </view>
</template>

<script setup>
import { getNewsDetail, newsFollow } from '@/api/news'
import { getCompanyDetail } from '@/api/company'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
const type = ref(1)
const detailId = ref('')
onLoad((option) => {
  type.value = option.type
  detailId.value = option.id
  getDetail(option.id)
})
const newsDetails = ref({})
const isClick = ref(true)
const getDetail = async (id) => {
  const [err, res] = type.value == 1 ? await getCompanyDetail({ id }) : await getNewsDetail({ id })
  if (!err) {
    const { result } = res
    newsDetails.value = result
    isClick.value = result.isVote
  }
}
const addVoteNum = async () => {
  if (!isClick.value) return
  const [err, res] = await newsFollow({ id: detailId.value })
  if (!err) {
    const { result } = res
    isClick.value = !isClick.value
    newsDetails.value.voteNum = result
  }
}
</script>

<style scoped lang="scss">
.page {
  background-color: #ffffff;
  &.type1 {
    padding: 32rpx 32rpx;
  }
  .group_2 {
    padding: 42rpx 40rpx;
    overflow-y: auto;
    .text_2 {
      color: #333333;
      font-size: 38rpx;
      line-height: 64rpx;
      text-align: justify;
    }
    .group_3 {
      margin-top: 48rpx;
      .text-wrapper {
        padding-top: 6rpx;
        background-color: #f0f4ff;
        border-radius: 4rpx;
        height: 40rpx;
        .text_4 {
          margin: 0 12rpx;
          color: #3567cb;
        }
      }
      .text_3 {
        color: #aaaaaa;
        font-size: 28rpx;
        line-height: 36rpx;
      }
    }
    .text_5 {
      margin-top: 36rpx;
      margin-bottom: 42rpx;
      color: #999999;
      font-size: 28rpx;
      line-height: 36rpx;
    }
    .group_4 {
      color: #333333;
    }
    .space-y-25 {
      & > view:not(:first-child),
      & > text:not(:first-child),
      & > image:not(:first-child) {
        margin-top: 50rpx;
      }
    }
    .divider {
      margin-top: 84rpx;
      background-color: #eeeeee;
      height: 2rpx;
    }
    .button {
      margin: 62rpx auto 0;
      padding: 22rpx 40rpx;
      background-color: #f8fbff;
      border-radius: 50px;
      width: 240rpx;
      height: 88rpx;
      border: solid 2rpx #e4f1ff;
      box-sizing: border-box;
      .text_7 {
        color: #225497;

        font-size: 16rpx;
        font-weight: 500;
      }
      .text_8 {
        font-size: 26rpx;
        color: #225497;
        line-height: 28rpx;
      }
      &.active {
        filter: grayscale(100%);
        -webkit-filter: grayscale(100%); /* Chrome, Safari, Opera */
      }
    }
    .font_1 {
      font-size: 24rpx;
      line-height: 30rpx;
    }
  }
}
</style>
