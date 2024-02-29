<template>
  <view style="flex: 1; position: relative">
    <z-paging ref="pagingz" v-model="infoList" :auto="false" @query="queryList">
      <view class="campaign">
        <Items v-for="item in infoList" :key="item.id" :info="item" />
      </view>
    </z-paging>
  </view>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue'
import Items from './campaign-item.vue'
import { getActivityList } from '@/api/activity.js'

const infoList = ref([])
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
  if (props.type == 1) {
    pagingz.value.reload()
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
const queryList = async (pageIndex, pageSize) => {
  const [err, res] = await getActivityList({ pageIndex, pageSize })
  if (!err) {
    const { result } = res
    pagingz.value.complete(result.data || [])
    isDong.value = true
  }
}
</script>

<style scoped lang="scss">
.campaign {
  padding: 0 40rpx;
  background-color: #ffffff;
  :last-of-type {
    border: none;
  }
}
</style>
