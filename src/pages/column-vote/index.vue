<template>
  <view class="column-vote">
    <!-- 轮播图 -->
    <z-paging ref="paging" v-model="gameList" empty-view-text="暂无信息~" @query="getGameSignLists">
      <template v-slot:top>
        <bc-navbar
          title=""
          :type="2"
          :custom-style="{ backgroundColor: '#fff' }"
          :share="!!mixin$_shareInfo.shareAppMessage"
        />
      </template>
      <tc-image width="750rpx" height="360rpx" :src="gameObj.coverImage" />
      <view class="column-vote_box">
        <view class="column-vote_box_title">{{ gameObj.name }}</view>
        <view class="column-vote_box_ftitle flex-row justify-between items-center">
          <view class="column-vote_box_ftitle_l flex-row items-center">
            <tc-image width="33rpx" height="33rpx" src="!@/column/icon_07.png" />
            <text>{{ gameObj.title }}</text>
          </view>
          <view class="column-vote_box_ftitle_r">活动截止至 {{ gameObj.endTime }}</view>
        </view>
        <item
          v-for="(item, index) in gameList"
          :key="item.id"
          :item="item"
          :index="index"
          @addNum="setAddNum"
        />
      </view>
    </z-paging>
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
import { getGameSignList } from '@/api/game'
import { ref } from 'vue'
import item from './item'
import { onLoad } from '@dcloudio/uni-app'
const gameId = ref('')
onLoad((op) => {
  gameId.value = op.id
})

const paging = ref(null)
const gameObj = ref({})
const gameList = ref([])
const getGameSignLists = async (pageIndex, pageSize) => {
  const [err, res] = await getGameSignList({ gameId: gameId.value, pageIndex, pageSize })
  if (!err) {
    const { result } = res
    const { coverImage, name, title, endTime } = result
    gameObj.value = { coverImage, name, title, endTime }
    paging.value.complete(result.data || [])
  }
}

// 点赞
const setAddNum = (i) => {
  gameList.value[i].popularityNum++
}
</script>
<style lang="scss" scoped>
.column-vote {
  padding-bottom: 60rpx;
  height: calc(100vh);
  background: #f6f6f6;
  &_box {
    margin: 24rpx;
    padding: 28rpx 40rpx;
    background-color: #ffffff;
    border-radius: 20rpx;
    box-shadow: 0rpx 4rpx 12rpx 0rpx rgba(0, 0, 0, 0.06);
    &_title {
      line-height: 48rpx;
      font-size: 32rpx;
    }
    &_ftitle {
      margin-top: 38rpx;
      margin-bottom: 58rpx;
      &_l {
        font-size: 28rpx;
        text {
          margin-left: 20rpx;
        }
      }
      &_r {
        line-height: 28rpx;
        color: #3567cb;
        font-size: 20rpx;
      }
    }
  }
}
</style>
