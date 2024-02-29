<template>
  <view class="del-add">
    <bc-navbar
      title="订单详情"
      :type="4"
      :custom-style="{ backgroundColor: '#fff' }"
      :share="false"
    />
    <Item
      v-for="(item, index) in addressList"
      :key="item.id"
      :item-index="index"
      :item="item"
      @setadd="setAdd"
    ></Item>

    <tc-tabbar :z-index="98">
      <view class="flex-row justify-center items-center button" @click="bindClick()"
        >删除({{ delList.length }})</view
      >
    </tc-tabbar>
  </view>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import Item from './item.vue'
import { getUserAddressList, deleteUserAddress } from '@/api/user'

onMounted(() => {
  getAddressList()
})
const addressList = ref([])
const getAddressList = async () => {
  const p = { pageIndex: 1, pageSize: 30 }
  const [err, res] = await getUserAddressList(p)
  if (!err) {
    const { result } = res
    addressList.value = result.data
  }
}

const delList = ref([])
const setAdd = (id, i) => {
  const Oindex = delList.value.indexOf(id)
  if (Oindex > -1) {
    delList.value.splice(Oindex, 1)
  } else {
    delList.value.push(id)
  }

  addressList.value[i].isDel = !addressList.value[i].isDel
}

const bindClick = async () => {
  const ids = delList.value
  const [err, res] = await deleteUserAddress({ ids })
  if (!err) {
    getAddressList()
  }
}
</script>
<style lang="scss" scoped>
.del-add {
  padding: 0 40rpx;
}
.button {
  margin: 20rpx auto;
  width: calc(100% - 80rpx);
  line-height: 92rpx;
  font-size: 30rpx;
  color: #fff;

  border-radius: 20rpx;
  background: #c73333;
  box-sizing: border-box;
}
</style>
