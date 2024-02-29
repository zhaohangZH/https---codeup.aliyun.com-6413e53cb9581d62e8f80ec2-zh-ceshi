<template>
  <!-- #ifdef MP-WEIXIN -->
  <button class="btn" open-type="getPhoneNumber" @getphonenumber="getphonenumber"><slot /></button>
  <!-- #endif -->
  <!-- #ifndef MP-WEIXIN -->
  <button class="btn"><slot /></button>
  <!-- #endif -->
</template>
<script setup>
import { wxSynPhone, getWxSynPhone } from '@/api/auth'
import { useUserStore } from '@/store/user'

const props = defineProps({
  syncUserInfo: {
    type: Boolean,
    default: true
  }
})
const emits = defineEmits(['resolve', 'reject'])

const getphonenumber = async ({ detail }) => {
  const { code } = detail
  console.log(detail)
  if (code) {
    const [err, res] = props.syncUserInfo
      ? await wxSynPhone({ code })
      : await getWxSynPhone({ code })
    if (!err) {
      const { result } = res
      useUserStore().setUserInfo(result)
      setTimeout(() => emits('resolve', result.mobile), 20)
    } else {
      emits('reject')
    }
  } else {
    emits('reject')
  }
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
</style>
