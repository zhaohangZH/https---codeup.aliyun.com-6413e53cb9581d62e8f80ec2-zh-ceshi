<template>
  <bc-navbar
    title="问题指南"
    :type="4"
    :custom-style="{ backgroundColor: '#fff' }"
    :share="false"
  />
  <view class="help">
    <view class="help_box">
      <uni-collapse v-model="opVal" accordion @change="change">
        <uni-collapse-item
          v-for="(item, i) in helpList"
          :key="item.id"
          title-border="none"
          :border="false"
          :title="item.title"
          :class="
            (i === helpList.length - 1 ? 'help_lis' : '',
            Number(opVal || -1) === i ? 'help_li_val' : '')
          "
        >
          <view class="help_li">
            <mp-html :content="item.description" />
          </view>
        </uni-collapse-item>
      </uni-collapse>
    </view>
  </view>
</template>
<script setup>
import { getHelpCenterList } from '@/api/user'
import { onMounted, ref } from 'vue'
const helpList = ref([])
const getHelpList = async () => {
  const [err, res] = await getHelpCenterList({
    pageIndex: 1,
    pageSize: 100
  })
  if (!err) {
    const { result } = res
    helpList.value = result.data
  }
}
onMounted(() => getHelpList())
const opVal = ref('')
const change = (v) => {
  // console.log(Number(opVal.value))
  // console.log(Number(v))
}
</script>
<style lang="scss" scoped>
.help {
  padding: 32rpx 0 0;
  width: 100%;
  min-height: 100%;
  background: #fff;
  box-sizing: border-box;
  &_box {
    padding: 20rpx 40rpx;
    line-height: 48rpx;
    font-size: 26rpx;
  }
  .help_li {
    padding: 0 30rpx 36rpx;
  }
  .help_lis {
    ::v-deep {
      .uni-collapse-item-border {
        border: none;
      }
    }
  }
  .help_li_val {
    ::v-deep {
      .uni-collapse-item__title-box {
        padding: 12px 15px;
        height: auto;
        line-height: normal;
      }
      .uni-collapse-item__title-text {
        display: inline-flex;
        line-height: 50rpx;
        white-space: pre-wrap;
      }
    }
  }
  ::v-deep {
    .uni-collapse-item__title-text {
      width: 500rpx;
    }
  }
}
</style>
