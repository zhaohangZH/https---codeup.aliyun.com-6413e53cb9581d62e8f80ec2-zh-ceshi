<template>
  <z-paging
    ref="paging"
    v-model="datelist"
    empty-view-text="暂无数据~"
    @query="getSmallProjectLists"
  >
    <template v-slot:top>
      <bc-navbar :type="4" title="公益捐赠" :share="false" :placeholder="true"> </bc-navbar>
    </template>
    <view class="donate">
      <bc-donate-item v-for="item in datelist" :key="item.id" :item="item" />
    </view>
  </z-paging>
</template>
<script setup>
import { ref } from 'vue'
import { getSmallProjectList } from '@/api/index'
const datelist = ref([])
const paging = ref('')
const getSmallProjectLists = async (pageIndex, pageSize) => {
  const [err, res] = await getSmallProjectList({
    pageIndex,
    pageSize
  })
  if (!err) {
    paging.value.complete(res.result.data || [])
  }
}
</script>
<style lang="scss" scoped>
.donate {
  margin-top: 48rpx;
  padding: 0 40rpx;
  color: #333;
}
</style>
