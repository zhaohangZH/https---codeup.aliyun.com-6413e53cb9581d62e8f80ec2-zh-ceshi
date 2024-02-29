<template>
  <view class="column-from-box">
    <bc-navbar title="" :type="4" :custom-style="{ backgroundColor: '#fff' }" :share="false" />
    <view class="column-from">
      <view class="column-from_title flex-row items-center">
        <tc-image width="28rpx" height="28rpx" src="!@/column/icon_05.png" />
        <text class="margin-left-16">团队资料</text>
      </view>
      <view class="column-from_from">
        <uni-forms
          ref="baseForm"
          :modelValue="form"
          :rules="rules"
          label-width="210rpx"
          :border="true"
        >
          <uni-forms-item name="projectName" label="项目名称">
            <!-- placeholder="请输入项目名称" -->
            <uni-easyinput
              v-model="form.projectName"
              :placeholderStyle="placeholderStyle"
              placeholder="请输入"
              :inputBorder="false"
              :clearable="false"
            />
          </uni-forms-item>
          <uni-forms-item name="gameTypeId" label="赛道类型">
            <!-- placeholder="请选择赛道类型" -->
            <picker
              mode="selector"
              :value="form.gameTypeId"
              :range="gameTypes"
              range-key="text"
              placeholder="请选择"
              @change="handleTypeSubmit"
            >
              <view class="column-from_from_picker flex-row items-center"
                ><text :class="{ activeA: form.gameTypeId == '' }">{{
                  form.gameTypeId == '' ? '请选择' : gameTypes[gameVal].text
                }}</text
                ><tc-image width="14rpx" height="24rpx" src="!@/policy/left.png"
              /></view>
            </picker>
          </uni-forms-item>
          <uni-forms-item name="jneiWai" label="京区/京外">
            <picker
              mode="selector"
              :value="form.jneiWai"
              :range="jingTypes"
              range-key="text"
              placeholder="请选择"
              @change="handleOut"
            >
              <view class="column-from_from_picker flex-row items-center"
                ><text :class="{ activeA: form.jneiWai == '' }">{{
                  form.jneiWai == '' ? '请选择' : jingTypes[jingVal].text
                }}</text
                ><tc-image width="14rpx" height="24rpx" src="!@/policy/left.png"
              /></view>
            </picker>
          </uni-forms-item>
          <uni-forms-item name="name" label="队长姓名">
            <!-- placeholder="请输入队长姓名" -->
            <uni-easyinput
              v-model="form.name"
              :placeholderStyle="placeholderStyle"
              placeholder="请输入"
              :inputBorder="false"
              :clearable="false"
            />
          </uni-forms-item>
          <uni-forms-item name="mobile" label="队长电话">
            <view class="column-from_from_item">
              <!-- placeholder="请输入队长电话" -->
              <uni-easyinput
                type="number"
                v-model="form.mobile"
                placeholder="请输入"
                :placeholderStyle="placeholderStyle"
                :inputBorder="false"
                :clearable="false"
              />
              <bc-phone-btn :sync-user-info="false" @resolve="(mobile) => (form.mobile = mobile)">
                <view class="column-from_from_item-wechat-phone">微信授权</view>
              </bc-phone-btn>
            </view>
          </uni-forms-item>
          <uni-forms-item name="teacherName" label="指导教师" label-position="top">
            <!-- placeholder="请输入指导教师" -->
            <uni-easyinput
              v-model="form.teacherName"
              placeholder="请输入"
              :placeholderStyle="placeholderStyle"
              :inputBorder="false"
              :clearable="false"
            />
          </uni-forms-item>
          <uni-forms-item name="teacherDuties" label="教师职务">
            <uni-easyinput
              v-model="form.teacherDuties"
              placeholder="请输入"
              :placeholderStyle="placeholderStyle"
              :inputBorder="false"
              :clearable="false"
            />
          </uni-forms-item>
          <uni-forms-item name="teacherMobile" label="教师电话">
            <!-- placeholder="请输入教师电话" -->
            <uni-easyinput
              type="number"
              v-model="form.teacherMobile"
              placeholder="请输入"
              :placeholderStyle="placeholderStyle"
              :inputBorder="false"
              :clearable="false"
            />
          </uni-forms-item>
          <uni-forms-item name="supportingNnit" label="依托单位">
            <lzy-picker-select
              style="width: 100%; font-size: 15px"
              :list="schoolList"
              node="text"
              placeholder="请选择"
              @change="changeFun"
            ></lzy-picker-select>
          </uni-forms-item>
          <view v-if="oneId == form.supportingNnit" class="column-from_from_textarea">
            <view class="column-from_from_textarea_left">其他（依托单位未检索到时填写）</view><br />
            <uni-easyinput
              type="textarea"
              v-model="form.description"
              :inputBorder="false"
              placeholder="请补充填写依托单位名称"
              :placeholderStyle="placeholderStyle"
            ></uni-easyinput>
          </view>
        </uni-forms>
      </view>
    </view>
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
      <view
        v-for="(item, index) in form.filePaths"
        :key="item"
        class="column-from_file flex-row items-center"
        @click="getFile(index)"
      >
        <view class="column-from_file_img flex-row justify-center items-center"
          ><tc-image
            :src="'!@/icons/' + fileIconFun(item.path) + '.png'"
            width="50"
            height="64"
            mode="widthFix"
        /></view>
        <view v-if="item.path" class="column-from_file_text flex-col">{{ item.name }} </view>
        <view v-else class="column-from_file_text flex-col">
          <view class="column-from_file_text_top">点击上传</view>
          <view class="column-from_file_text_bot">{{ fileModels[index].names }}</view>
        </view>
        <view
          v-if="item.path"
          class="column-from_file_close flex-row items-center justify-center"
          @click.prevent="fileClose(index)"
          >×</view
        >
      </view>
      <!-- <view class="column-from_file flex-row items-center" @click="getFile">
        <view class="column-from_file_img flex-row justify-center items-center"> + </view>
        <view class="column-from_file_text flex-col">
          <view class="column-from_file_text_top">报名表上传</view>
          <view class="column-from_file_text_bot">点击上传参赛报名表</view>
        </view>
      </view> -->
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
          src="!@/hint/upload.jpg" /></view
    ></view>
  </uni-popup>
</template>
<script setup>
import { getDrp, getGameFileModel, signUpInfo, uploadFileDic } from '@/api/game'
import { isMobile } from '@/utils/regex'
import { shareFile, fileIconFun } from '@/utils/shareFun'
import { onLoad, onReady } from '@dcloudio/uni-app'
import { ref } from 'vue'
onLoad((option) => {
  form.value.gameId = option.id
  form.value.signUpRecordId = option.recordId
  getGameFileModels(option.id)
})

const placeholderStyle = ref('color:#aaa;font-size:26rpx')

const form = ref({
  gameId: '',
  projectName: '',
  name: '',
  mobile: '',
  supportingNnit: '',
  signNum: '',
  signUpStatus: 0,
  status: true,
  recDate: '1',
  teacherName: '',
  teacherMobile: '',
  gameTypeId: '',
  description: '',
  jneiWai: '',
  teacherDuties: '',
  signUpRecordId: '',
  filePaths: []
})
const gameTypes = ref([])
const gameVal = ref('')
const jingTypes = ref([])
const jingVal = ref('')
const fileModels = ref([])
const oneId = ref('') //依托单位其他选项
const schoolList = ref([]) //依托单位
const getDrps = async (id) => {
  const [err, res] = await getDrp({ id })
  if (!err) {
    return res.result
  }
}

// 上传文件规则
const getGameFileModels = async (id) => {
  const [err, res] = await getGameFileModel({ id })
  if (!err) {
    res.result.map((item) => {
      form.value.filePaths.push({ name: '', path: '' })
      fileModels.value.push({ name: item.fileName.split('.', 1)[0], names: item.fileName })
    })
  }
}
Promise.all([getDrps(1), getDrps(3), getDrps(4)]).then((values) => {
  gameTypes.value = values[0]
  jingTypes.value = values[1]
  schoolList.value = values[2]
  oneId.value = values[2][0].value
})

const handleTypeSubmit = (e) => {
  gameVal.value = e.detail.value
  form.value.gameTypeId = gameTypes.value[e.detail.value].value
}
const handleOut = (e) => {
  jingVal.value = e.detail.value
  form.value.jneiWai = jingTypes.value[e.detail.value].value
}

const changeFun = (v) => {
  form.value.supportingNnit = v.value
  form.value.description = ''
}

const rules = ref({
  supportingNnit: {
    rules: [
      {
        required: true,
        errorMessage: '请选择依托单位'
      }
    ]
  },
  description: {
    rules: [
      {
        required: oneId.value == form.value.supportingNnit,
        errorMessage: '请输入依托单位'
      }
    ]
  },
  projectName: {
    rules: [
      {
        required: true,
        errorMessage: '请输入项目名称'
      }
    ]
  },
  gameTypeId: {
    rules: [
      {
        required: true,
        errorMessage: '请选择赛道类型'
      }
    ]
  },
  jneiWai: {
    rules: [
      {
        required: true,
        errorMessage: '请选择京区/京外'
      }
    ]
  },
  name: {
    rules: [
      {
        required: true,
        errorMessage: '请输入队长姓名'
      }
    ]
  },
  mobile: {
    rules: [
      {
        required: true,
        errorMessage: '请输入队长电话'
      },
      {
        validateFunction: function (rule, value, data, callback) {
          if (!isMobile(value)) {
            callback('手机号码格式不正确，请重新填写')
          }
          return true
        }
      }
    ]
  },
  teacherDuties: {
    rules: [
      {
        required: true,
        errorMessage: '请选择教师职务'
      }
    ]
  },
  teacherName: {
    rules: [
      {
        required: true,
        errorMessage: '请输入指导教师'
      }
    ]
  },
  teacherMobile: {
    rules: [
      {
        required: true,
        errorMessage: '请输入教师电话'
      },
      {
        validateFunction: function (rule, value, data, callback) {
          if (!isMobile(value)) {
            callback('手机号码格式不正确，请重新填写')
          }
          return true
        }
      }
    ]
  }
})

// 上传文件
const getFile = (i) => {
  if (form.value.filePaths[i].name) return
  wx.chooseMessageFile({
    count: 1,
    type: 'file',
    success(res) {
      // tempFilePath可以作为img标签的src属性显示图片
      console.log(fileModels.value)

      if (res.tempFiles[0].name.indexOf(fileModels.value[i].name) == -1) {
        uni.showToast({
          icon: 'none',
          title: `请上传${fileModels.value[i].names}文件`,
          duration: 4000
        })
        return
      }
      uploadFileFun(res.tempFiles[0], i)
    }
  })
}

// 上传图片api
const uploadFileFun = async (file, i) => {
  const [err, res] = await uploadFileDic(
    {},
    { filePath: file.path, name: 'files', params: { cusname: file.name, id: form.value.gameId } }
  )
  if (!err) {
    const { result } = res
    form.value.filePaths[i] = { ...result }
  }
}

// 删除文件
const fileClose = (i) => {
  // form.value.filePaths.splice(i, 1)
  form.value.filePaths[i] = {}
}

// 验证表单
const baseForm = ref(null)
onReady(() => {
  baseForm.value.setRules(rules.value)
})
// 提交按钮
const submit = () => {
  uni.showLoading()
  baseForm.value
    .validate()
    .then((res) => {
      uni.hideLoading()
      console.log('表单数据信息：', res)
      if (oneId.value == form.value.supportingNnit && !form.value.description) {
        return uni.showToast({ icon: 'none', title: '依托单位不能为空' })
      }
      for (let i = 0; i < form.value.filePaths.length; i++) {
        const ele = form.value.filePaths[i]
        if (!ele.name) {
          return uni.showToast({ icon: 'none', title: '请上传申请报表' })
        }
      }
      signUpInfos()
    })
    .catch((err) => {
      uni.hideLoading()
      console.log('表单错误信息：', err)
    })
}

// 提交api
const signUpInfos = async () => {
  const [err, res] = await signUpInfo({ ...form.value })
  if (!err) {
    const { result } = res
    uni.navigateTo({
      url: 'pages/column-result/index?id=' + form.value.signUpRecordId
    })
  }
}

// 下载指引
const popup = ref(null)
</script>
<style lang="scss" scoped>
.column-from-box {
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

  &_from {
    margin-top: 6rpx;
    line-height: 72rpx;
    font-size: 28rpx;
    &_item {
      display: flex;
      align-items: center;
      &-wechat-phone {
        padding: 0 24rpx;
        height: 60rpx;
        border-radius: 50px;
        background-color: #f8fbff;
        border: 2rpx solid #e4f1ff;
        display: flex;
        align-items: center;
        justify-content: center;

        font-size: 24rpx;
        font-weight: 400;
        color: #666666;
      }
    }
    &_picker {
      font-family: UICTFontTextStyleBody;
      text {
        margin-right: 40rpx;
      }
      .activeA {
        color: #aaa;
        font-size: 26rpx;
      }
    }
    &_textarea {
      padding: 10px 0;
      // border-top: #f9f9f9 solid 2rpx !important;
      &_left {
        color: #606266;
        font-size: 14px;
      }
    }
  }
  ::v-deep {
    .uni-forms-item__content {
      width: calc(100% - 105px);
    }
    .uni-forms-item--border {
      border-top: none !important;
      border-bottom: #f9f9f9 solid 2rpx !important;
    }
    .uni-forms-item--border:last-of-type {
      border: none !important;
    }
    .uni-easyinput__content-input {
      padding-left: 0 !important;
    }
    .uni-easyinput__content-textarea {
      padding-left: 0 !important;
      margin: 20rpx 0 0 !important;
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
