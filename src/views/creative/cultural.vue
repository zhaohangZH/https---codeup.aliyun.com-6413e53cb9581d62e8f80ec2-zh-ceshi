<template>
  <z-paging
    ref="pagingz"
    v-model="dataList"
    :auto="false"
    :paging-style="{ 'background-color': '#f9f9f9' }"
    empty-view-text="暂无数据~"
    @query="getDataList"
  >
    <view v-for="item in dataList" :key="item.id" class="cultural">
      <view class="cultural_title">
        <tc-image :src="item.iconUrl" width="100%" height="48rpx" mode="widthFix" />
      </view>
      <view class="cultural-list">
        <culturalTtem v-for="it in item.goodsCulturals" :key="it.id" :item="it"> </culturalTtem>
      </view>
    </view>
  </z-paging>
</template>
<script setup>
import culturalTtem from './cultural-item.vue'
import { ref, onMounted, watch } from 'vue'
import { getGoodsCulturalAllList } from '@/api/goods'
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

onMounted(() => {
  pagingz.value.reload()
})

watch(
  () => props.type,
  (v, o) => {
    if (props.typeIndex == v - 1 && !isDong.value) {
      pagingz.value.reload()
    }
  }
)
// 列表
const dataList = ref([])
const getDataList = async (pageIndex, pageSize) => {
  const [err, res] = await getGoodsCulturalAllList({
    type: 0,
    pageIndex,
    pageSize
  })
  if (!err) {
    const { result } = res
    pagingz.value.complete(result.data || [])
    isDong.value = true
  } else {
    pagingz.value.complete([])
  }
}
</script>
<style lang="scss" scoped>
.cultural {
  padding: 48rpx 40rpx 0;
  &_title {
  }
  &-list {
    padding: 40rpx 0;
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    row-gap: 30rpx;
    column-gap: 30rpx;
  }
}
</style>
