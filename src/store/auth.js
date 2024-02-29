import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    refresh_token: '',
    access_token: ''
  }),
  actions: {
    setRefreshToken(value) {
      this.refresh_token = value
    },
    setAccessToken(value) {
      this.access_token = value
    },
    setToken(obj) {
      this.setRefreshToken(obj.refresh_token)
      this.setAccessToken(obj.access_token)
    }
  },
  persist: {
    enabled: true,
    // #ifdef H5
    H5Storage: window?.localStorage
    // #endif
  }
})
