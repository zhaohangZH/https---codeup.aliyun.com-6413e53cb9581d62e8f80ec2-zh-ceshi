<template>
  <bc-navbar
    :title="shareDes.title"
    :type="4"
    :custom-style="{ backgroundColor: '#fff' }"
    :share="false"
  />
  <view class="my-policy">
    <view class="flex-row items-center my-policy_top">
      <view
        v-for="item in policyList"
        :key="item.id"
        class="flex-row justify-center flex-1 my-policy_top_btn"
        :class="{ active: opType == item.id }"
      >
        <view class="my-policy_top_btn_box" @click=";(opType = item.id), shareFun(item.details)">
          <text>{{ item.title }}</text>
          <view v-if="opType == item.id" class="my-policy_top_btn_bj">
            <tc-image src="!@/imgs/i_04.png" width="28" height="24" mode="widthFix" />
          </view>
        </view>
      </view>
    </view>
    <view class="my-policy_content">
      <rich-text :nodes="shareDes.description"></rich-text>
    </view>
    <view class="my-policy_content">
      <rich-text :nodes="shareDes.description"></rich-text>
    </view>
  </view>
</template>
<script setup>
import { getPrivacyPolicyList } from '@/api/user'
import { onMounted, ref } from 'vue'

const shareDes = ref('')
const shareFun = (item) => {
  shareDes.value = item[0]
}

const opType = ref(0)
const policyList = ref([])
const getpolicyList = async () => {
  const [err, res] = await getPrivacyPolicyList({
    pageIndex: 1,
    pageSize: 100
  })
  if (!err) {
    const { result } = res
    opType.value = result.data[0].id
    shareDes.value = result.data[0].details[0]
    policyList.value = result.data
  }
}
onMounted(() => getpolicyList())
</script>
<style lang="scss" scoped>
.my-policy {
  position: relative;
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);
  background: #fff;
  &_top {
    position: fixed;
    left: -40rpx;
    padding: 0 40rpx;
    width: 100%;
    background: #fff;
    &_btn {
      line-height: 116rpx;
      color: #666;
      font-size: 30rpx;
      font-style: normal;
      font-weight: 400;
      &_box {
        position: relative;
        padding: 0 20rpx;
        text {
          position: relative;
          z-index: 2;
        }
      }
      &_bj {
        position: absolute;
        right: 4rpx;
        bottom: 32rpx;
        z-index: 1;
      }
      &.active {
        color: #225497;
        font-size: 32rpx;
      }
    }
  }
  &_content {
    padding: 132rpx 40rpx 40rpx;
  }
}
</style>
