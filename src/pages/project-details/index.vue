<template>
  <page-meta :page-style="'overflow:' + (showPopup ? 'hidden' : 'visible')"></page-meta>
  <bc-navbar
    v-if="!showForm"
    title="捐赠详情"
    :type="4"
    :custom-style="{ backgroundColor: '#fff' }"
    :share="!!mixin$_shareInfo.shareAppMessage"
  />
  <view v-if="pageLoaded" class="project-details">
    <com-booth :info="boothList" :count="orderCount" />
    <com-info :info="infoObj" />
    <!-- <com-agency v-if="agencyArr.length" :info="agencyArr" /> -->
    <com-donation :info="projectPay" :info-obj="infoObj" />
    <com-message :info="projectComment" :info-obj="infoObj" />
    <com-image-text :info="projectContent" :popupInfo="popupInfo" />
    <!-- 注释掉版权信息
    <view style="margin: 54rpx auto; display: flex; justify-content: center">
      <tc-image width="458" height="34" src="!@/icons/i29.png" />
    </view> -->
    <tc-tabbar :z-index="5">
      <com-footer
        style="flex: 1"
        :info="projectBtn"
        @submit="isSubmitForm == 1 ? redTo() : popup && popup.open()"
        @reload="isSubmitForm == 1 ? redTo() : getProjectInfo"
      />
    </tc-tabbar>
    <view class="project-popup">
      <uni-popup
        ref="popup"
        type="bottom"
        :is-mask-click="false"
        :safe-area="false"
        mask-background-color="rgba(0,0,0,0.8)"
        @change="popupChange"
      >
        <com-popup
          v-if="showPopup"
          :info="popupInfo"
          :project-id="pageId"
          :goods-id="goodsId"
          @close="popup && popup.close()"
          @submit="handleCreateOrder"
          @popup="handleCreateOrderPopup"
        />
      </uni-popup>
    </view>
    <com-unwanted
      v-model:isshow="isShowUnwanted"
      :type="2"
      @submit-btn="handleCreateOrder(createOrderPrams)"
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
import ComBooth from './com-booth.vue'
import ComInfo from './com-info.vue'
import ComAgency from './com-agency.vue'
import ComImageText from './com-image-text.vue'
import ComDonation from './com-donation.vue'
import ComMessage from './com-message.vue'
import ComFooter from './com-footer.vue'
import ComPopup from './com-popup.vue'
import ComUnwanted from '@/pages/repay-select/components/unwanted.vue'
import { ref, onMounted } from 'vue'
import { onLoad } from '@dcloudio/uni-app'
import { projectinfo, getProjectPay, createOrder } from '@/api/index'

let pageId = ref('')
let goodsId = ref('')
let businessId = ref('')
let sourceType = ref(0) //1是文创，2是基金会，其他是项目
const myRoute = ref()

onLoad((option) => {
  myRoute.value = option
  pageId.value = option.id || ''
  goodsId.value = option.goodsId || ''
  businessId.value = option.businessId || ''
  sourceType.value = option.sourceType || ''
})

const popup = ref(null)
const showPopup = ref(false)
const popupChange = ({ show }) => {
  if (show) {
    showPopup.value = true
  } else {
    setTimeout(() => {
      showPopup.value = false
    }, 320)
  }
}

const pageLoaded = ref(false)
const boothList = ref([])
const orderCount = ref(0)
const infoObj = ref({})
const agencyArr = ref([])
const projectContent = ref('')

const projectPay = ref({})
const projectComment = ref({})

const projectBtn = ref({})
const isSubmitForm = ref('')
defineExpose({ isSubmitForm })
const getProjectInfo = async () => {
  const p = {
    id: pageId.value,
    goodsId: goodsId.value,
    businessId: businessId.value,
    sourceType: sourceType.value
  }
  const [err, res] = await projectinfo(p)
  if (!err) {
    const { result, currentDate } = res

    boothList.value = result.imageUrl
    orderCount.value = result.orderCount
    isSubmitForm.value = result.isSubmitForm
    infoObj.value = {
      id: result.id,
      name: result.name,
      title: result.title,
      tags: result.tags,
      intro: result.intro,
      donateLogo: result.donateLogo
    }

    agencyArr.value = result.companys

    projectContent.value = result.content

    projectComment.value = result.projectComment

    projectPay.value = result.projectPay

    projectBtn.value = {
      currentDate,
      startTime: result.startTime,
      endTime: result.endTime,
      status: result.status,
      sellout: result.sellout
    }
    if (result.status === 2) {
      getProjectPayInfo()
    }
    pageLoaded.value = true
  }
}

const popupInfo = ref({})
const getProjectPayInfo = async () => {
  const [err, res] = await getProjectPay({
    id: pageId.value,
    goodsId: goodsId.value,
    businessId: businessId.value,
    sourceType: sourceType.value
  })
  if (!err) {
    popupInfo.value = res.result || {}
  }
}
const redTo = () => {
  console.log(route)

  let route = ''
  for (var key in myRoute.value) {
    // 执行代码块
    route = route + key + '=' + myRoute.value[key] + '&'
  }
  uni.navigateTo({ url: `pages/project-details-form/index?${route}` })
  // uni.redirectTo({ url: `pages/project-details-form/index?${route}` })
}
onMounted(() => {
  getProjectInfo()
})

const isShowUnwanted = ref(false)

const createOrderPrams = ref({})
const handleCreateOrderPopup = (prams) => {
  isShowUnwanted.value = true
  createOrderPrams.value = prams
}

const handleCreateOrder = async (prams) => {
  isSubmitForm.value = 0
  const po = {
    businessId: businessId.value,
    sourceType: sourceType.value,
    ...prams
  }
  const [err, res] = await createOrder(po)
  if (!err) {
    const { orderId } = res.result
    if (prams.goodsId) {
      uni.navigateTo({ url: `pages/repay-select/index?id=${orderId}` })
    } else {
      uni.navigateTo({ url: `pages/wait-donation/index?id=${orderId}` })
    }
  }
}
</script>

<style lang="scss" scoped>
.project-details {
  background: #fff;
}
</style>
