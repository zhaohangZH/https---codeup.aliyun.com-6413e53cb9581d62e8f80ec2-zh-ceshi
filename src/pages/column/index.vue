<template>
  <view class="column">
    <template v-slot:top>
      <bc-navbar :type="2" :custom-style="{ backgroundColor: '#fff' }" :share="false" />
    </template>
    <co-info :info="info" />
    <co-box :valId="valId" :tabs="info.tabs" style="flex: 1; background: #fff" />
  </view>
</template>
<script setup>
import { getSpecialColumnInfo } from '@/api/specialColumn.js'
import coInfo from './co-info.vue'
import coBox from './co-box.vue'
import { onMounted, ref } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
const valId = ref('')
onLoad((op) => {
  valId.value = op.id
})
const info = ref(null)
onMounted(async () => {
  const [err, res] = await getSpecialColumnInfo({ id: valId.value })
  if (!err) {
    const { result } = res
    info.value = result
  }
})
</script>
<style lang="scss" scoped>
.column {
  display: flex;
  flex-direction: column;
  height: 100vh;
  overflow: hidden;
  background: #f6f6f6;
}
</style>
