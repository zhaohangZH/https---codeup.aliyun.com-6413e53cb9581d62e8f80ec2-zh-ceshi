<template>
  <z-paging
    ref="pagingz"
    v-model="dataList"
    :auto="false"
    empty-view-text="暂无数据~"
    @query="getDataList"
  >
    <view v-for="(item, index) in dataList" :key="item.id" class="cultural">
      <view class="cultural_title">
        <tc-image :src="item.iconUrl" width="100%" height="48rpx" mode="heightFix" />
      </view>
      <view class="cultural-list">
        <raiseItem v-for="it in item.companyGroups" :key="it.id" :item="it"> </raiseItem>
        <view
          v-if="item.companyGroups.length > 5 && !item.ishide"
          class="flex-row justify-center items-center cultural-list-load"
          @click="getCompanyLists(index)"
        >
          <text>查看更多项目</text>
          <tc-image width="20" height="20" mode="heightFix" src="!@/imgs/i_23.png" />
        </view>
      </view>
    </view>
    <template #loadingMoreNoMore />
  </z-paging>
</template>
<script setup>
import raiseItem from './raise-item.vue'
import { ref, watch } from 'vue'
import { getCompanyGroupList, getCompanyList } from '@/api/company'
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
// 列表
const dataList = ref([])
const getDataList = async (pageIndex, pageSize) => {
  const [err, res] = await getCompanyGroupList({
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

// 二级加载更多
const getCompanyLists = async (i) => {
  const obj = dataList.value[i]
  const pageIndex = Math.floor((obj.companyGroups.length - 6) / 10) + 1
  const p = {
    pageIndex,
    pageSize: 10,
    unCompanyIds: obj.companyIds,
    companyCategoryId: obj.id
  }
  const [err, res] = await getCompanyList(p)
  if (!err) {
    const { result } = res
    if (result.totalPage == pageIndex) {
      dataList.value[i].ishide = 1
    }
    dataList.value[i].companyGroups.push(...result.data)
  }
}
</script>
<style lang="scss" scoped>
.cultural {
  padding: 48rpx 40rpx 0;
  background-color: #fff;
  &_title {
    margin-bottom: 20rpx;
  }
  &-list {
    &-load {
      padding-top: 48rpx;
      padding-bottom: 42rpx;
      line-height: 24rpx;
      font-size: 24rpx;
      color: #004e97;
      text {
        margin-right: 12rpx;
      }
    }
    // &:last-of-type {
    //   border: none;
    // }
  }
}
</style>
