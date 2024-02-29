<template>
  <view class="my_content_fun_service">
    <button
      v-for="item in list"
      :key="item.name"
      :open-type="item.img == 'fun_03' ? 'contact' : ''"
      class="my_content_fun_service_li"
      @click="emits('item-click', item)"
    >
      <tc-image
        class="my_content_fun_service_img"
        :src="item.imageUrl"
        width="80"
        height="80"
        mode="widthFix"
      />
      <text class="my_content_fun_service_text">{{ item.name }}</text>
    </button>
  </view>
</template>
<script setup>
import { getUserAchievementList } from '@/api/user'
import { ref } from 'vue'
import { onShow } from '@dcloudio/uni-app'
const emits = defineEmits(['honorVal', 'item-click'])

const list = ref([])

const getAchievementList = async () => {
  const [err, res] = await getUserAchievementList({ pageIndex: 1, pageSize: 6 })
  if (!err) {
    const { result } = res
    list.value = result.data
    emits('honorVal', result.achievementCount)
  }
}

const aboutFun = (str) => {
  if (str) {
    uni.navigateTo({
      url: '/pages/' + str + '/index'
    })
  } else {
    uni.showToast({ icon: 'none', title: '此功能暂不可用' })
  }
}
onShow(() => getAchievementList())
</script>
<style lang="scss" scoped>
// 服务功能
.my_content_fun_service {
  display: flex;
  flex-wrap: wrap;
  &_li {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    margin-top: 50rpx;
    margin-bottom: 20rpx;
    width: 33.33%;
    color: #666;
    font-size: 20rpx;
    border: none;
    background-color: #fff;
    border-radius: 0;
  }

  button::after {
    border: none;
  }
  &_text {
    margin-top: 24rpx;
    line-height: 20rpx;
  }
}
</style>
