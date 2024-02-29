<template>
  <tc-tabbar :z-index="98">
    <view class="column-details_btnBox flex-row justify-center items-center">
      <view
        v-if="infoStatus.gameStatus == 1"
        class="column-details_btnBox_btn flex-row justify-center items-center"
        >距开始报名<tc-count-down
          v-model:diff-time="downTime"
          format="DD天 HH:mm:ss"
          @countdown-end="getPageInfo"
      /></view>
      <view
        v-else
        class="column-details_btnBox_btn flex-row justify-center items-center"
        :class="{ active: infoStatus.gameStatus == 2 }"
        @click="toGame"
        >{{ infoStatus.signUpStatus == 1 ? '已报名' : infoStatus.gameStatusName }}</view
      >
    </view>
  </tc-tabbar>
</template>
<script setup>
import dayjs from 'dayjs'
import { signUp } from '@/api/game'
import { ref } from 'vue'
const props = defineProps({
  infoStatus: {
    type: Object,
    define: () => {}
  }
  // 1:报名未开始 2:报名中 3：报名结束 4：比赛中 5：比赛结束
})

const emits = defineEmits(['countdown-end'])
const getPageInfo = () => emits('countdown-end')
const downTime = ref(0)
if (props.infoStatus.gameStatus == 1) {
  downTime.value =
    dayjs(props.infoStatus.signStartTime).valueOf() -
    dayjs(props.infoStatus.timeStamp).valueOf() * 1000
}
const toGame = async () => {
  if (props.infoStatus.gameStatus != 2 || props.infoStatus.signUpStatus == 1) return
  const [err, res] = await signUp({ id: props.infoStatus.id })
  if (!err) {
    console.log(res)
    uni.navigateTo({
      url: 'pages/column-from/index?id=' + props.infoStatus.id + '&recordId=' + res.result
    })
  }
}
</script>
<style lang="scss" scoped>
.column-details_btnBox {
  padding: 20rpx 0;
  width: 100%;
  background: #fff;
  &_btn {
    width: 630rpx;
    height: 96rpx;
    box-sizing: border-box;
    border-radius: 50px;
    border: #eeeeee 2rpx solid;
    font-size: 30rpx;
    font-weight: bold;
    color: #aaaaaa;
    background: #eeeeee;
    &.active {
      color: #fff;
      border: #9eb5ea 2rpx solid;
      background-image: linear-gradient(180deg, #5f8aff 0%, #3d55c3 100%);
    }
  }
}
</style>
