<template>
  <view class="table-head bgc-1">
    <view
      v-for="item in column"
      :key="item.key"
      class="th"
      :style="{ ...(item.style || {}), ...(item.width ? { width: item.width } : { flex: 1 }) }"
    >
      <view class="tc-line-1">{{ item.text }}</view>
    </view>
  </view>
  <z-paging
    ref="pagingRef"
    v-model="infoList"
    :use-page-scroll="true"
    :fixed="false"
    :show-scrollbar="false"
    :scrollable="false"
    :auto-full-height="false"
    :refresher-enabled="false"
    :to-bottom-loading-more-enabled="false"
    :paging-style="{ 'min-height': '0' }"
    :loading-more-custom-style="{ height: '54rpx', 'padding-top': '20rpx' }"
    :loading-more-title-custom-style="{ color: '#3567CB', 'font-size': '20rpx' }"
    :loading-more-loading-icon-custom-style="{
      width: '28rpx',
      height: '28rpx',
      animation: 'none',
      'margin-right': '10rpx'
    }"
    @query="queryList"
  >
    <view
      v-for="(item, index) in infoList"
      :key="index"
      class="table-body"
      :class="index % 2 ? 'bgc-2' : ''"
    >
      <view
        v-for="col in column"
        :key="col.key + '_' + index"
        class="td"
        :style="{ ...(col.style || {}), ...(col.width ? { width: col.width } : { flex: 1 }) }"
      >
        <view class="tc-line-1">{{ item[col.key] || '' }}</view>
      </view>
    </view>
    <template #loadingMoreDefault>
      <view class="loading-more" @click="pagingRef.doLoadMore('click')">
        <text style="margin-right: 10rpx">查看更多</text>
        <tc-image width="16" height="16" src="!@/icons/i28.png" />
      </view>
    </template>
    <template #loadingMoreNoMore>
      <view class="loading-more no-more">没有更多数据</view>
    </template>
  </z-paging>
</template>

<script setup>
import { ref } from 'vue'
import { getActivityResultList } from '@/api/activity.js'

const props = defineProps({
  itemId: {
    type: String,
    default: ''
  },
  itemType: {
    type: Number,
    default: 0
  },
  column: {
    type: Array,
    default: () => []
  }
})
const infoList = ref([])
const pagingRef = ref(null)
const queryList = async (pageIndex, pageSize) => {
  const [err, res] = await getActivityResultList({
    pageIndex,
    pageSize,
    id: props.itemId,
    type: props.itemType
  })
  if (!err) {
    const { result = {} } = res
    pagingRef.value.complete(result.data || [])
  } else {
    pagingRef.value.complete(false)
  }
}
</script>

<style lang="scss" scoped>
.table-head,
.table-body {
  padding: 0 40rpx;
  display: flex;
  align-items: center;
  overflow: hidden;
  &.bgc-1 {
    background-color: #f6f7fc;
  }
  &.bgc-2 {
    background-color: #f9f9f9;
  }
}
.th,
.td {
  padding: 0 10rpx;
  box-sizing: border-box;
  font-size: 22rpx;
  font-weight: 400;
  color: #333333;
  line-height: 56rpx;
}
.th {
  font-family: TsangerYuMo-3;
}

.loading-more {
  display: flex;
  align-items: center;
  justify-content: center;
  padding-top: 20rpx;
  height: 54rpx;
  font-size: 20rpx;
  box-sizing: border-box;
  color: #3567cb;
  &.no-more {
    color: #aaa;
  }
}
</style>
