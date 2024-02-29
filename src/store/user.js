import { defineStore } from 'pinia'
import { GetUser } from '@/api/user'

export const useUserStore = defineStore('userInfo', {
  state: () => ({
    userInfo: {}
  }),
  actions: {
    async getUserInfo() {
      const [err, res] = await GetUser()
      if (!err) {
        this.setUserInfo(res.result)
      }
      return Promise.resolve()
    },
    setUserInfo(info = {}) {
      this.userInfo = info
    }
  }
})
