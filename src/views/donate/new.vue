<template>
  <z-paging
    ref="pagingz"
    v-model="newsList"
    :auto="false"
    empty-view-text="暂无信息~"
    @query="getNews"
  >
    <view class="flex-col page">
      <bc-new-item v-for="item in newsList" :key="item.id" :item="item" />
    </view>
  </z-paging>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import { getNewsList } from '@/api/news'

// 上下拉组件
const pagingz = ref(null)

const isDong = ref(false)
const props = defineProps({
  typeIndex: {
    type: [Number, String],
    default: 0
  },
  type: {
    type: [Number, String],
    default: 1
  }
})

watch(
  () => props.type,
  (v, o) => {
    if (props.typeIndex == v - 1 && !isDong.value) {
      pagingz.value.reload()
    }
  }
)
const newsList = ref([])
const getNews = async (pageIndex, pageSize) => {
  const [err, res] = await getNewsList({ pageIndex, pageSize })
  if (!err) {
    const { result } = res
    pagingz.value.complete(result.data || [])
    isDong.value = true
  }
}
</script>

<style scoped lang="scss">
.page {
  background-color: #fff;
  padding: 0 40rpx;
}
</style>
