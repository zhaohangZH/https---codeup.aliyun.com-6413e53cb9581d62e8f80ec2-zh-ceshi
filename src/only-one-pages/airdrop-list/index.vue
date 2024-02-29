<template>
  <page-meta
    page-style="background-color: #FDF5EF;padding-bottom: calc(constant(safe-area-inset-bottom) + 2rpx);padding-bottom: calc(env(safe-area-inset-bottom) + 2rpx);"
  />
  <bc-navbar :type="2" :share="false" :custom-style="{ backgroundColor: '#fff' }" />
  <tc-image width="750" height="360" src="!@/images/airdrop-list-top-img.png" />
  <view class="list-box">
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
      :default-page-size="20"
      @query="queryList"
    >
      <template v-if="infoList.length">
        <view class="table-head bgc-1">
          <view
            v-for="item in column"
            :key="item.key"
            class="th"
            :style="{
              ...(item.style || {}),
              ...(item.width ? { width: item.width } : { flex: 1 })
            }"
          >
            <view class="tc-line-1">{{ item.text }}</view>
          </view>
        </view>
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
      </template>
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
  </view>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { getProjectCollectionList } from '@/api/airdrop-list.js'

const column = reactive([
  {
    // width: '186rpx',
    text: '用户昵称',
    key: 'name'
  },
  {
    // width: '186rpx',
    text: '捐赠时间',
    key: 'recDate'
  },
  {
    // width: '186rpx',
    text: '空投藏品',
    key: 'goodsName'
  }
])
const infoList = ref([])
const pagingRef = ref(null)
const queryList = async (pageIndex, pageSize) => {
  const [err, res] = await getProjectCollectionList({
    pageIndex,
    pageSize
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
.list-box {
  padding: 32rpx;
  margin: -32rpx 32rpx 32rpx;
  background-color: #fff;
  border-radius: 24rpx;
  box-shadow: 0rpx 4rpx 8rpx 0rpx rgba(0, 0, 0, 0.04);
  position: relative;
  z-index: 9;
}
.table-head,
.table-body {
  /* padding: 0 0rpx; */
  display: flex;
  align-items: center;
  overflow: hidden;
  &.bgc-1 {
    background-color: #fdf8f1;
  }
  &.bgc-2 {
    background-color: #f9f9f9;
  }
}
.th,
.td {
  padding: 0 10rpx;
  box-sizing: border-box;
  font-size: 20rpx;
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
