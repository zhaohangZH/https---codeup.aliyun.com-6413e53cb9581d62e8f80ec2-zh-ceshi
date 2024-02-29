<template>
  <z-paging
    ref="paging"
    v-model="recordList"
    empty-view-text="暂无信息~"
    @query="getPayWriteOffLists"
  >
    <template v-slot:top>
      <bc-navbar
        title="核销记录"
        :type="4"
        :custom-style="{ backgroundColor: '#fff' }"
        :share="false"
      />
      <!-- <view class="verification_record_title">
        <tc-image width="136rpx" height="30rpx" src="!@/write-off/icon_01.png"></tc-image>
      </view> -->
    </template>
    <view class="verification_record">
      <record-item v-for="item in recordList" :key="item.id" :item="item" />
    </view>
  </z-paging>
</template>
<script setup>
import { getPayWriteOffList } from '@/api/order'
import { ref } from 'vue'
import recordItem from './item.vue'
const recordList = ref([])
// 上下拉组件
const paging = ref(null)

const getPayWriteOffLists = async (pageIndex, pageSize) => {
  const [err, res] = await getPayWriteOffList({ pageIndex, pageSize })
  if (!err) {
    const { result } = res
    paging.value.complete(result.data || [])
  }
}
</script>
<style lang="scss" scoped>
.verification_record {
  padding: 0 32rpx 32rpx;
  &_title {
    margin: 32rpx 40rpx 0;
  }
}
</style>
