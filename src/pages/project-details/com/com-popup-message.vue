<template>
  <!-- 普通弹窗 -->
  <uni-popup
    ref="popup"
    type="bottom"
    :is-mask-click="true"
    :safe-area="false"
    @change="(v) => emits('update:isshow', v.show)"
  >
    <view class="msgBox">
      <z-paging ref="pagingz" v-model="dataList" :auto="false" @query="getCommentList">
        <template #top>
          <view class="flex-row justify-between items-center msgBox_title">
            <view class="flex-row items-center">
              <tc-image width="32" height="32" mode="widthFix" src="!@/selectrepay/i_04.png" />
              <text class="text">捐赠留言</text>
            </view>
            <uni-icons @click="popup.close()" type="closeempty" size="26" color="#666"></uni-icons>
          </view>
        </template>
        <view class="msgBox_pz">
          <template v-for="item in dataList" :key="item.id">
            <view class="msgBox-item">
              <view class="msgBox-item-info">
                <tc-image
                  width="84"
                  height="84"
                  radius="50"
                  :src="item.headImageUrl || '!@/imgs/tx.png'"
                />
                <view class="msgBox-item-info-text">
                  <text class="msgBox-item-info-text-t1">{{ item.nickName }}</text>
                  <text class="msgBox-item-info-text-t2">捐赠￥{{ item.remark }}</text>
                </view>
              </view>
              <text class="msgBox-item-info-text-t3">{{ item.paymentTime }}</text>
            </view>
            <view class="msgBox-item-content">
              <view class="msgBox-item-content-inner">{{ item.message }}</view>
            </view>
          </template>
        </view>
      </z-paging>
    </view>
  </uni-popup>
</template>
<script setup>
import { ref, watch } from 'vue'
import { getProjectCommentList } from '@/api/index'

const emits = defineEmits(['update:isshow', 'close'])

const props = defineProps({
  isshow: {
    type: Boolean,
    default: false
  },
  infoId: {
    type: Object,
    default: () => {}
  }
})
const popup = ref(null)
watch(
  () => props.isshow,
  (v) => {
    if (popup.value) {
      if (v) {
        if (!dataList.value.length) {
          pagingz.value.reload()
        }
        popup.value.open()
      } else {
        popup.value.close()
      }
    }
  },
  {
    immediate: true
  }
)

// 上下拉组件
const pagingz = ref(null)
const dataList = ref([])
const getCommentList = async (pageIndex, pageSize) => {
  const p = {
    id: props.infoId,
    pageIndex,
    pageSize
  }
  const [err, res] = await getProjectCommentList(p)
  if (!err) {
    const { result } = res
    pagingz.value.complete(result.data || [])
  }
}
</script>
<style lang="scss" scoped>
.msgBox {
  position: relative;
  height: 80vh;
  padding-bottom: 80rpx;
  border-radius: 32rpx 32rpx 0 0;
  background: #fff;
  overflow-y: scroll;
  &_pz {
    padding: 0 40rpx;
    box-sizing: border-box;
  }
  &_title {
    padding: 32rpx 40rpx;
    .text {
      margin-left: 20rpx;
      line-height: 48rpx;
      font-size: 32rpx;
    }
  }

  &-item {
    margin-top: 60rpx;
    display: flex;
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
    &:nth-child(1) {
      margin-top: 20rpx;
    }

    &-info {
      display: flex;
      flex-direction: row;
      align-items: center;
      &-text {
        margin: 0 24rpx;
        display: flex;
        flex-direction: column;
        &-t1 {
          font-size: 28rpx;
          font-weight: 400;
          color: #333333;
        }
        &-t2 {
          margin-top: 16rpx;
          font-size: 22rpx;
          font-weight: 400;
          color: #225497;
        }
        &-t3 {
          font-size: 24rpx;
          font-weight: 400;
          color: #aaaaaa;
        }
      }
    }

    &-content {
      &-inner {
        padding: 24rpx 0;
        border-bottom: 2rpx solid #eee;

        font-size: 24rpx;
        font-weight: 400;
        color: #000;
        line-height: 40rpx;
      }
    }
  }
}
</style>
