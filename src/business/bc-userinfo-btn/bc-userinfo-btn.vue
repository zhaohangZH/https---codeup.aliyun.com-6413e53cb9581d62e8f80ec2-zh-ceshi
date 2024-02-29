<template>
  <button class="btn" @click="popup && popup.open()"><slot /></button>
  <uni-popup
    ref="popup"
    type="bottom"
    mask-background-color="rgba(0,0,0,0.8)"
    :is-mask-click="false"
    :safe-area="false"
  >
    <view style="background-color: #fff; border-radius: 20rpx 20rpx 0 0">
      <form class="form-box" @submit="formSubmit">
        <view class="form-box-title">
          <text style="font-weight: 700">北京中国地质大学教育基金会</text>
          <text style="margin-left: 12rpx; font-size: 24rpx">授权您的头像、昵称</text>
        </view>
        <view class="form-box-body">
          <!-- <view class="form-box-body-title">授权您的头像、昵称</view> -->
          <button
            class="btn"
            open-type="chooseAvatar"
            @chooseavatar="chooseavatar"
            @error="() => {}"
          >
            <view class="form-item">
              <view class="form-item-hd">
                <text class="form-item-k">头像</text>
                <view class="form-item-v">
                  <image style="width: 80rpx; height: 80rpx" :src="headImageUrl"></image>
                </view>
              </view>
              <tc-image width="17" height="26" src="!@/icons/i21.png" />
            </view>
          </button>
          <label class="form-item">
            <view class="form-item-hd">
              <text class="form-item-k">昵称</text>
              <view class="form-item-v">
                <input
                  name="nickname"
                  :value="nickName"
                  :always-embed="true"
                  class="form-item-v-input"
                  type="nickname"
                  placeholder="请输入昵称"
                />
              </view>
            </view>
          </label>
        </view>
        <view class="form-box-foot">
          <button class="btn">
            <view
              class="btn-cancel"
              hover-class="hover-class"
              @click="popup && popup.close(), emits('reject')"
            >
              取消
            </view>
          </button>
          <button class="btn" form-type="submit">
            <view class="btn-confirm" hover-class="hover-class">确定</view>
          </button>
        </view>
      </form>
      <view :style="[safeArea]"></view>
    </view>
  </uni-popup>
</template>
<script setup>
import { ref, computed, watch } from 'vue'
import { useUserStore } from '@/store/user'
import { uploadFile } from '@/api/index'
import { modifyUser } from '@/api/user'

const emits = defineEmits(['resolve', 'reject'])
let defaultImageUrl = import.meta.env.VITE_VUE_APP_STATIC_BASEURL + 'my/tx.png'
const userStore = useUserStore()

const headImageUrl = ref('')
const nickName = ref('')
watch(
  () => userStore.userInfo,
  (userInfo) => {
    defaultImageUrl = userInfo.headImageUrl || defaultImageUrl
    headImageUrl.value = defaultImageUrl
    nickName.value = userInfo.nickName
  },
  { immediate: true }
)

const chooseavatar = ({ detail }) => {
  const { avatarUrl = '' } = detail
  headImageUrl.value = avatarUrl
}

const popup = ref(null)
const safeArea = computed(() => ({ height: uni.getSystemInfoSync().safeAreaInsets.bottom + 'px' }))

const formSubmit = async ({ detail }) => {
  const { nickname } = detail.value

  if (defaultImageUrl === headImageUrl.value && nickname === nickName.value) {
    popup.value && popup.value.close()
    return emits('resolve')
  }

  const params = {}

  if (nickname !== nickName.value) {
    params.nickName = nickname
  }
  if (defaultImageUrl !== headImageUrl.value) {
    const [err, res] = await uploadFile({}, { filePath: headImageUrl.value, name: 'files' })
    if (!err) {
      const { result } = res
      headImageUrl.value = result
      params.headImageUrl = result
    }
  }

  const [err, res] = await modifyUser(params)
  if (!err) {
    const { result } = res
    useUserStore().setUserInfo(result)
    popup.value && popup.value.close()
    return emits('resolve')
  }
  return emits('reject')
}
</script>
<style lang="scss" scoped>
.btn {
  background-color: transparent;
  border-radius: 0;
  box-sizing: border-box;
  color: transparent;
  display: block;
  font-size: inherit;
  line-height: inherit;
  margin-left: auto;
  margin-right: auto;
  overflow: hidden;
  padding: 0 4rpx;
  position: relative;
  text-align: center;
  text-decoration: none;
  cursor: pointer;

  &:after {
    content: ' ';
    width: 0;
    height: 0;
    position: absolute;
    top: 0;
    left: 0;
    border: 0 solid rgba(0, 0, 0, 0.2);
    transform: scale(0);
    transform-origin: 0 0;
    border-radius: 0;
    box-sizing: border-box;
  }
}
.form-box {
  display: flex;
  flex-direction: column;
  padding: 48rpx;
  &-title {
    display: flex;
    flex-direction: row;
    align-items: center;

    font-size: 30rpx;
    color: #333;
  }
  &-body {
    padding: 24rpx;
    &-title {
      font-size: 34rpx;
      font-weight: bold;
      color: #333;
    }
  }
  &-foot {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
  .form-item {
    height: 120rpx;

    display: flex;
    flex-direction: row;
    align-items: center;

    font-size: initial;
    color: #333;

    &-hd {
      flex: 1;
      display: flex;
      flex-direction: row;
      align-items: center;
    }

    &-k {
      font-size: 32rpx;
      font-weight: bold;
      color: #333;
    }
    &-v {
      padding: 0 20rpx;
      flex: 1;
      display: flex;
      flex-direction: row;
      align-items: center;

      &-input {
        font-size: 28rpx;
        display: block;
        width: 100%;
      }
    }
  }
  .btn-cancel {
    width: 240rpx;
    height: 80rpx;
    background-color: rgba(239, 239, 239, 1);
    border-radius: 10rpx;

    font-size: 34rpx;
    color: #333;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
  .btn-confirm {
    width: 240rpx;
    height: 80rpx;
    background-color: rgba(31, 173, 103, 1);
    border-radius: 10rpx;

    font-size: 34rpx;
    color: #fff;

    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
}
</style>
