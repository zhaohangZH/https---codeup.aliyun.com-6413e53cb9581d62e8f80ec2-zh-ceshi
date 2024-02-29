<template>
  <view
    class="column-details"
    :style="{ 'padding-bottom': gameInfo.gameStatus < 5 ? '' : '60rpx' }"
  >
    <bc-navbar
      title=""
      :type="2"
      :custom-style="{ backgroundColor: '#fff' }"
      :share="!!mixin$_shareInfo.shareAppMessage"
    />
    <!-- 轮播图 -->
    <com-booth :info="gameInfo.banners" />
    <!-- 详情介绍 -->
    <com-info :info="comInfos" />
    <template v-if="gameInfo.gameStatus < 5">
      <!-- 比赛组别 -->
      <com-brief :info="comBriefs" />
      <!-- 团队要求 -->
      <com-html :type="1" :info="gameInfo.teamAskDescription" :name="'团队要求'" icon="icon_10" />
      <!-- 参赛流程 -->
      <com-html :type="2" :info="gameInfo.flowDescription" :title="gameInfo.flowTitle" />
      <!-- 奖项设置 -->
      <com-html :type="3" :info="gameInfo.prizeDescription" :title="gameInfo.prizeTitle" />
      <!-- 赛事详情 -->
      <com-html :type="1" :info="gameInfo.description" :name="'赛事详情'" icon="icon_04" />
      <!-- 按钮 -->
      <com-btn :infoStatus="comStatus" @countdown-end="getGameInfos()" />
    </template>
    <com-html
      :type="1"
      v-else
      :info="gameInfo.resultDescription"
      :name="'评选结果'"
      icon="icon_04"
    />
  </view>
</template>
<script>
export default {
  data() {
    return {
      mixin$_shareInfo: {
        shareAppMessage: null,
        shareTimeline: null
      }
    }
  }
}
</script>
<script setup>
import { getGameInfo } from '@/api/game'
import { ref } from 'vue'
import comBooth from './com-booth'
import comInfo from './com-info'
import comBrief from './com-brief'
import comHtml from './com-html'
import comBtn from './com-btn'
import { onLoad } from '@dcloudio/uni-app'
const gameId = ref('')
onLoad((op) => {
  gameId.value = op.id
  getGameInfos()
})

const gameInfo = ref({})
const comInfos = ref({})
const comBriefs = ref({})
const comStatus = ref({})
const getGameInfos = async () => {
  const [err, res] = await getGameInfo({ id: gameId.value })
  if (!err) {
    const { result } = res
    gameInfo.value = result
    // 详情介绍
    const { name, signStartTime, signEndTime, organizerCompanyName, undertakeCompanyNames } = result
    comInfos.value = {
      name,
      signStartTime,
      signEndTime,
      organizerCompanyName,
      undertakeCompanyNames
    }
    // 比赛组别
    const { teamDescription, scope, gameFileModels } = result
    comBriefs.value = { teamDescription, scope, gameFileModels }
    // 按钮

    const { id, gameStatus, gameStatusName, signUpStatus } = result
    comStatus.value = {
      id,
      gameStatus,
      gameStatusName,
      signUpStatus,
      signStartTime,
      timeStamp: res.timeStamp
    }
  }
}
</script>
<style lang="scss" scoped>
.column-details {
  background: #f6f6f6;
}
</style>
