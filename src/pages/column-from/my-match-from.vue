<template>
  <view class="column-from-box">
    <bc-navbar title="" :type="4" :custom-style="{ backgroundColor: '#fff' }" :share="false" />
    <view class="column-from from-bottom">
      <view class="column-from_title flex-row items-center justify-between">
        <view class="flex-row items-center">
          <tc-image width="28rpx" height="28rpx" src="!@/column/icon_06.png" />
          <text class="margin-left-16">文件上传</text>
        </view>
        <view class="column-from_title_right flex-row items-center" @click="popup.open()"
          ><tc-image width="20" height="20" src="!@/column/icon_11.png" /><text
            >上传指引</text
          ></view
        >
      </view>
      <view class="column-from_file flex-row items-center" @click="getFile(index)">
        <view class="column-from_file_img flex-row justify-center items-center"
          ><tc-image
            :src="'!@/icons/' + fileIconFun(filePath.path) + '.png'"
            width="50"
            height="64"
            mode="widthFix"
        /></view>
        <view v-if="filePath.path" class="column-from_file_text flex-col"
          >{{ filePath.name }}
        </view>
        <view v-else class="column-from_file_text flex-col">
          <view class="column-from_file_text_top">比赛资料上传</view>
          <view class="column-from_file_text_bot">点击上传比赛资料</view>
        </view>
        <view
          v-if="filePath.path"
          class="column-from_file_close flex-row items-center justify-center"
          @click.prevent="fileClose"
          >×</view
        >
      </view>
    </view>
    <tc-tabbar :z-index="98">
      <view class="flex-col justify-start items-center column-from_btn">
        <view class="flex-col justify-start items-center button" @click="submit"
          ><text class="text_8">提交信息</text></view
        >
      </view>
    </tc-tabbar>
  </view>
  <!-- 普通弹窗 -->
  <uni-popup ref="popup" type="bottom" :is-mask-click="true">
    <view class="column-from_popup flex-col">
      <view class="column-from_popup_tit">
        <text class="column-from_popup_tit_name">上传指引</text>
        <text class="column-from_popup_tit_qx" @click="popup.close()">×</text>
      </view>
      <view class="column-from_popup_main">
        <tc-image
          width="100%"
          height="auto"
          mode="widthFix"
          :show-menu-by-longpress="true"
          src="!@/hint/upload.jpg" /></view></view
  ></uni-popup>
</template>
<script setup>
import { uploadUserGameFile } from '@/api/game'
import { uploadFileDic } from '@/api/index'
import { shareFile, fileIconFun } from '@/utils/shareFun'
import { onLoad } from '@dcloudio/uni-app'
import { ref } from 'vue'
onLoad((option) => {
  gameId.value = option.id
})

const gameId = ref('')
const filePath = ref({})
// 上传文件
const getFile = (i) => {
  if (filePath.value.name) return
  wx.chooseMessageFile({
    count: 1,
    type: 'file',
    success(res) {
      // tempFilePath可以作为img标签的src属性显示图片
      // if (res.tempFiles[0].name.indexOf(fileModels.value[i].names) == -1) {
      //   uni.showToast({
      //     icon: 'none',
      //     title: `请上传${fileModels.value[i].names}文件`,
      //     duration: 4000
      //   })
      //   return
      // }
      uploadFileFun(res.tempFiles[0], i)
    }
  })
}

// 上传图片api
const uploadFileFun = async (file, i) => {
  const [err, res] = await uploadFileDic(
    {},
    { filePath: file.path, name: 'files', params: { cusname: file.name } }
  )
  if (!err) {
    const { result } = res
    filePath.value = { ...result }
  }
}

// 删除文件
const fileClose = () => {
  // filePaths.value.splice(i, 1)
  filePath.value = {}
}

// 提交api
const submit = async () => {
  const [err, res] = await uploadUserGameFile({
    signUpRecordId: gameId.value,
    filePaths: [filePath.value]
  })
  if (!err) {
    const { result } = res
    uni.navigateTo({
      url: 'pages/column-result/index?id=' + gameId.value
    })
  }
}

// 下载指引
const popup = ref(null)
</script>
<style lang="scss" scoped>
.column-from-box {
  padding-bottom: 160rpx;
}
.column-from {
  margin: 24rpx;
  padding: 36rpx 40rpx;
  color: #333;
  background-color: #ffffff;
  border-radius: 20rpx;
  font-size: 28rpx;
  box-shadow: 0rpx 4rpx 12rpx 0rpx rgba(0, 0, 0, 0.06);
  &_title {
    padding-bottom: 32rpx;
    font-size: 28rpx;
    border-bottom: 2rpx solid #f6f6f6;
    .margin-left-16 {
      margin-left: 16rpx;
    }
    &_right {
      padding: 0 16rpx;
      line-height: 40rpx;
      font-size: 18rpx;
      color: #3567cb;
      border-radius: 50px;
      background: #edf2ff;
      text {
        margin-left: 6rpx;
      }
    }
  }

  &_file {
    margin-top: 36rpx;
    padding: 32rpx 32rpx;
    background: #f9f9f9;
    border-radius: 24rpx;
    &_img {
      width: 104rpx;
      height: 104rpx;
      border-radius: 24rpx;
      background: #ededed;
    }
    &_text {
      flex: 1;
      margin-left: 32rpx;
      line-height: 36rpx;
      font-size: 20rpx;
      /*多行溢出隐藏*/
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
      overflow: hidden;
      font-weight: bold;
      &_top {
        /*多行溢出隐藏*/
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
      }
      &_bot {
        font-weight: normal;
      }
    }
    &_close {
      width: 80rpx;
      height: 80rpx;
      font-size: 50rpx;
    }
  }
}
.column-from_btn {
  width: 100%;
  padding: 22rpx 0;
  background-color: #ffffffe6;
  z-index: 99;
  .button {
    padding: 28rpx 0;
    background-image: linear-gradient(180deg, #5f8aff 0%, #3d55c3 100%);
    border-radius: 48rpx;
    width: 630rpx;
    border: solid 2rpx #9eb5ea;
    .text_8 {
      color: #ffffff;
      font-size: 30rpx;
      line-height: 38rpx;
    }
  }
}
.column-from_popup {
  padding: 24rpx;
  height: 80vh;
  border-radius: 20rpx;
  background-color: #fff;
  &_tit {
    width: calc(100% - 20rpx);
    display: flex;
    justify-content: space-between;
    padding: 20rpx 0;
    box-sizing: border-box;
    &_name {
      text-align: center;
    }
    &_qx {
      font-size: 50rpx;
    }
  }
  &_main {
    overflow-x: scroll;
  }
}
</style>
