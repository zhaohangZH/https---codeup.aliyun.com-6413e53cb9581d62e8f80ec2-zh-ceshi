<template>
  <page-meta page-style="width: 100%;height: 100vh;display: flex;flex-direction: column;" />
  <bc-navbar
    title="我的证书"
    :type="4"
    :custom-style="{ backgroundColor: '#fff' }"
    :share="false"
  />
  <view style="flex: 1; position: relative; margin-top: 40rpx">
    <z-paging
      ref="pagingRef"
      v-model="infoList"
      :safe-area-inset-bottom="true"
      :use-safe-area-placeholder="true"
      :fixed="false"
      :show-scrollbar="false"
      :paging-style="{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 1 }"
      :loading-more-title-custom-style="{ 'font-size': '22rpx' }"
      @query="queryList"
    >
      <view class="page-box">
        <view
          v-for="item in infoList"
          :key="item.id"
          class="item-box"
          hover-class="hover-class"
          @click="handleCertificateDetails(item.id)"
        >
          <tc-image width="100%" height="300rpx" mode="widthFix" :src="item.coverImage" />
          <view class="item-title">
            <text class="tc-line-1">{{ item.name }}</text>
          </view>
          <!-- <view class="item-sub-title">
            <text class="tc-line-1">{{ item.title }}</text>
          </view> -->
          <!-- <view class="item-line"></view> -->
          <view class="flex-row justify-between items-center item-tag">
            <text style="margin-right: 20rpx">证书编号:</text>
            <text class="flex-1 tc-line-1" style="color: #004e97; text-align: right">
              {{ item.code }}
            </text>
          </view>
        </view>
      </view>
    </z-paging>
  </view>
  <bc-certificate-popup
    :info="currentCertificateInfo"
    :show="showCertificate"
    @close="showCertificate = false"
  />
</template>
<script setup>
import { getUserCertificateList, getUserCertificateDetails } from '@/api/user'
import { ref } from 'vue'
const infoList = ref([])

const pagingRef = ref(null)
const queryList = async (pageNo, pageSize) => {
  const [err, res] = await getUserCertificateList({
    pageIndex: pageNo,
    pageSize: pageSize
  })
  if (!err) {
    const { result } = res

    pagingRef.value.complete(result.data || [])
  }
}

const showCertificate = ref(false)
const currentCertificateInfo = ref({})
let isLoad = false
const handleCertificateDetails = async (id) => {
  if (isLoad) return
  isLoad = true
  const [err, res] = await getUserCertificateDetails({ id })
  if (!err) {
    currentCertificateInfo.value = res.result || {}
    showCertificate.value = true
  }
  isLoad = false
}
</script>
<style lang="scss" scoped>
.page-box {
  padding: 0 40rpx 20rpx;

  display: grid;
  grid-template-columns: repeat(2, 1fr);
  row-gap: 30rpx;
  column-gap: 30rpx;
}
.item-box {
  padding-bottom: 30rpx;
  box-sizing: border-box;
}
.item-title {
  padding-top: 20rpx;
  line-height: 28rpx;
  font-size: 26rpx;
  font-weight: 700;
  color: #000;
}
.item-sub-title {
  padding: 12rpx;
  font-size: 22rpx;
  font-weight: 400;
  color: #aaaaaa;
}
.item-line {
  margin-top: 12rpx;
  height: 2rpx;
  background-color: #f6f6f6;
}
.item-tag {
  padding-top: 16rpx;

  display: flex;
  align-items: center;

  font-size: 20rpx;
  font-weight: 400;
  color: #aaa;
}
</style>
