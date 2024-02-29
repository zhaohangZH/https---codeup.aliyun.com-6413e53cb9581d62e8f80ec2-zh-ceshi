<template>
  <page-meta :page-style="pageStyle" />
  <bc-navbar :type="2" :share="false" :custom-style="{ backgroundColor: '#fff' }" />

  <bc-tabs ref="ctmTab" v-bind="orderType" :current="ani" @change="setType"></bc-tabs>
  <cultural :info="info" :type="ani + 1"></cultural>
  <z-paging-empty-view
    :empty-view-style="{ 'margin-top': '300rpx' }"
    :empty-view-fixed="false"
    v-if="!info || !info.length"
  />
</template>

<script setup>
import cultural from './cultural.vue'
import { ref, onMounted } from 'vue'
import { getGoodsCulturalList } from '@/api/goods'
import { attrObj } from '@/business/bc-tabs-round/config.js'
const pageStyle = `
padding-bottom: 24rpx;
padding-bottom: calc(24rpx + constant(safe-area-inset-bottom));
padding-bottom: calc(24rpx + env(safe-area-inset-bottom));
`
const ctmTab = ref(null)
// 类型
const orderType = {
  list: [
    {
      value: 1,
      name: '实体文创',
      activeIcon: '!@/icons/i75.png',
      iconStyle: {
        display: 'flex',
        marginRight: '8rpx',
        width: '28rpx',
        height: '28rpx',
        'z-index': 99
      }
    },
    {
      value: 2,
      name: '数字文创',
      activeIcon: '!@/icons/i76.png',
      iconStyle: {
        display: 'flex',
        marginRight: '8rpx',
        width: '28rpx',
        height: '28rpx',
        'z-index': 99
      }
    }
  ],
  'bar-width': 320,
  ...attrObj
}
const ani = ref(0)
const setType = (i) => {
  if (ani.value == i) return
  ani.value = i
  getGoodsCulturalListFun()
}
onMounted(() => {
  getGoodsCulturalListFun()
})
const info = ref(null)
const getGoodsCulturalListFun = async () => {
  const [err, res] = await getGoodsCulturalList({ type: ani.value + 1, pageIndex: 1, pageSize: 20 })
  if (!err) {
    const { result } = res
    info.value = result.data
  }
}
</script>

<style lang="scss" scoped></style>
