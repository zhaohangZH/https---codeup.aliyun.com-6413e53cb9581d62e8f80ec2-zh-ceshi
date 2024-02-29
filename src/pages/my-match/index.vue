<template>
  <z-paging
    ref="paging"
    v-model="activityList"
    :show-scrollbar="false"
    empty-view-text="暂无信息~"
    @query="getGameUserLists"
  >
    <template v-slot:top>
      <bc-navbar
        title="我的比赛"
        :type="4"
        :custom-style="{ backgroundColor: '#fff' }"
        :share="false"
      />
    </template>
    <view class="my_match">
      <item v-for="item in activityList" :key="item.id" :item="item" />
    </view>
  </z-paging>
</template>
<script setup>
import { ref } from 'vue'
import item from './co-list'
import { getGameUserList } from '@/api/game'

const activityList = ref([])
const paging = ref(null)
const getGameUserLists = async (pageIndex, pageSize) => {
  const [err, res] = await getGameUserList({ pageIndex, pageSize })
  if (!err) {
    const { result } = res
    paging.value.complete(result.data || [])
  }
}
</script>
<style lang="scss" scoped>
.my_match {
  padding: 0 32rpx 32rpx;
}
</style>
