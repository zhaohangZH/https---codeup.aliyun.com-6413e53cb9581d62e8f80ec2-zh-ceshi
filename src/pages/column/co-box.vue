<template>
  <view class="column_box">
    <view class="column_box_op flex-row items-center">
      <view
        v-for="item in tabs"
        :key="item.id"
        class="column_box_ops"
        :class="{ active: typeOp == Number(item.id) }"
        @click="chengeType(Number(item.id))"
        >{{ item.name }}</view
      >
    </view>
    <view class="column_box_main">
      <z-paging
        ref="paging"
        v-model="activityList"
        :fixed="false"
        :show-scrollbar="false"
        :paging-style="{ position: 'absolute', top: 0, bottom: 0, left: 0, right: 0, zIndex: 1 }"
        empty-view-text="暂无信息~"
        @query="getAllList"
      >
        <template v-if="typeOp == 1">
          <co-box-list v-for="item in activityList" :key="item.id" :item="item" />
        </template>
        <template v-if="typeOp == 2">
          <co-box-list1 v-for="item in activityList" :key="item.id" :item="item" />
        </template>
        <template v-if="typeOp == 3">
          <co-box-list2
            v-for="(item, index) in activityList"
            :key="item.id"
            :item="item"
            @click="topImg(index)"
          />
        </template>
      </z-paging>
    </view>
  </view>
</template>
<script setup>
import { ref } from 'vue'
import coBoxList from './co-box-list0.vue'
import coBoxList1 from './co-box-list1.vue'
import coBoxList2 from './co-box-list2.vue'
import {
  getGameGroupList,
  getActivityGroupList,
  getGameGroupFilesList
} from '@/api/specialColumn.js'
const props = defineProps({
  valId: { type: String, default: '' },
  tabs: { type: Array, default: () => [] }
})
// 切换
const typeOp = ref(Number(props.tabs[0].id))
const chengeType = (val) => {
  if (typeOp.value == val) return
  activityList.value = []
  typeOp.value = val
  paging.value.reload()
}
// 上下拉组件
const paging = ref(null)
const activityList = ref([])
const getAllList = async (pageIndex, pageSize) => {
  const [err, res] =
    typeOp.value == 1
      ? await getGameGroupList({ pageIndex, pageSize, specialColumnId: props.valId })
      : typeOp.value == 2
      ? await getActivityGroupList({ pageIndex, pageSize, specialColumnId: props.valId })
      : await getGameGroupFilesList({
          pageIndex,
          pageSize,
          specialColumnId: props.valId,
          businessType: 0
        })
  if (!err) {
    const { result } = res
    paging.value.complete(result.data || [])
  }
}
</script>
<style lang="scss" scoped>
.column_box {
  margin-top: -90rpx;
  padding: 44rpx 32rpx 0;
  display: flex;
  flex-direction: column;
  height: 100%;
  border-top-left-radius: 32rpx;
  border-top-right-radius: 32rpx;
  overflow: hidden;
  background: #fff;
  &_op {
    margin-left: 16rpx;
    margin-bottom: 24rpx;
    font-size: 30rpx;
    color: #aaa;
    font-weight: bold;
    .active {
      color: #40549c;
    }
    &s {
      position: relative;
      margin-right: 96rpx;
      &::after {
        content: '';
        position: absolute;
        top: 0;
        bottom: 0;
        right: -48rpx;
        margin: auto;
        width: 2rpx;
        height: 20rpx;
        background: #eeeeee;
      }
      &:last-of-type {
        &::after {
          display: none;
        }
      }
    }
  }
  &_main {
    position: relative;
    // height: calc(100vh - 680rpx);
    // height: 100%;
    flex: 1;
    box-sizing: border-box;
    background: #fff;
  }
}
</style>
