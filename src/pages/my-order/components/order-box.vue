<template>
  <view class="my_order">
    <z-paging
      ref="pagingz"
      v-model="orderList"
      :auto="false"
      empty-view-text="您还没有订单~"
      @query="getOrderList"
      :empty-view-style="{ 'margin-top': '-500rpx' }"
    >
      <z-paging-cell>
        <view class="my_order_box">
          <orderItem v-for="item in orderList" @qrShow="qrShow" :item="item" :key="item.id" />
        </view>
      </z-paging-cell>
    </z-paging>
  </view>
</template>
<script setup>
import orderItem from './order-item'
import { getPayOrderList } from '@/api/order'
import { ref, onMounted, watch } from 'vue'
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
  if (props.typeIndex == 0) {
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
// 列表
const orderList = ref([])
const getOrderList = async (pageIndex, pageSize) => {
  const [err, res] = await getPayOrderList({
    pageIndex,
    pageSize,
    state: props.type
  })
  if (!err) {
    const { result } = res
    pagingz.value.complete(result.data || [])
    isDong.value = true
  } else {
    pagingz.value.complete([])
  }
}

const emits = defineEmits(['qrShow'])
const qrShow = (orderId) => {
  emits('qrShow', orderId)
}
</script>
<style lang="scss" scoped>
.my_order {
  margin-top: 60rpx;
  background: #fff;
  &_box {
    padding: 48rpx 0;
  }
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
