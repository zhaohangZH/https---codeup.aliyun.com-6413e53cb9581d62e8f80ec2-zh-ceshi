<template>
  <page-meta page-style="width: 100%;height: 100vh;display: flex;flex-direction: column;" />
  <bc-navbar
    title="我的报名"
    :type="4"
    :custom-style="{ backgroundColor: '#fff' }"
    :share="false"
  />
  <view style="flex: 1; position: relative">
    <z-paging
      ref="pagingRef"
      v-model="infoList"
      :fixed="false"
      :show-scrollbar="false"
      :loading-more-title-custom-style="{ 'font-size': '22rpx' }"
      :paging-style="{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 1 }"
      @query="queryList"
    >
      <template #top>
        <view v-if="infoList.length" style="padding: 24rpx 32rpx">
          <com-campaign-head :normal-count="normalCount" :await-count="awaitCount" />
        </view>
      </template>
      <view v-if="infoList.length" class="info-box">
        <view
          v-for="(item, index) in infoList"
          :key="item.id"
          :style="{ 'margin-top': index ? '24rpx' : '0' }"
        >
          <bc-campaign-item :info="item" />
        </view>
      </view>
    </z-paging>
  </view>
</template>
<script setup>
import { ref } from 'vue'
import { getUserActivityList } from '@/api/activity.js'

import ComCampaignHead from './com-campaign-head.vue'

const infoList = ref([])
const pagingRef = ref(null)
const awaitCount = ref(0)
const normalCount = ref(0)

const queryList = async (pageIndex, pageSize) => {
  const [err, res] = await getUserActivityList({ pageIndex, pageSize, status: 0 })
  if (!err) {
    const { data = [], candidateCount = 0, normalCount: _normalCount = 0 } = res.result || {}
    awaitCount.value = candidateCount
    normalCount.value = _normalCount

    pagingRef.value.complete(data || [])
  }
}

const getActivityStatus = (signUpStatus) => {
  return signUpStatus === 1 ? '报名' : signUpStatus === 3 ? '候补' : ''
}
</script>
<style scoped lang="scss">
.info-box {
  padding-left: 32rpx;
  padding-right: 32rpx;
  overflow: hidden;
  padding-bottom: 32rpx;
  padding-bottom: calc(constant(safe-area-inset-bottom) + 32rpx);
  padding-bottom: calc(env(safe-area-inset-bottom) + 32rpx);
}
</style>
