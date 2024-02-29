<template>
  <view class="my_donate">
    <z-paging ref="paging" v-model="listData" empty-view-text="您还没有捐款记录~" @query="getList">
      <template v-slot:top>
        <bc-navbar
          title="捐款明细"
          :type="4"
          :custom-style="{ backgroundColor: '#fff' }"
          :share="false"
        />
      </template>
      <donate-item v-for="item in listData" :key="item.id" :item="item" />
    </z-paging>
  </view>
</template>

<script setup>
import donateItem from './item.vue'
import { getDonationInformationList } from '@/api/user'
import { ref } from 'vue'

// 上下拉组件
const paging = ref(null)
const details = ref({})
const listData = ref([])
const getList = async (pageIndex, pageSize) => {
  const [err, res] = await getDonationInformationList({ pageIndex, pageSize })
  if (!err) {
    const { result } = res
    details.value = result
    paging.value.complete(result.data || [])
  }
}
</script>

<style scoped lang="scss">
.my_donate {
  background: #fff;
}
.more-load-box {
  height: 60rpx;

  display: flex;
  align-items: center;
  justify-content: center;

  font-size: 22rpx;
  font-weight: 400;
  color: #aaaaaa;
}
</style>
