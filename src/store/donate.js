import { defineStore } from 'pinia'

export const useDonateStore = defineStore('donate', {
  state: () => ({
    activeTab: 0
  }),
  actions: {
    setActiveTab(v) {
      this.activeTab = v
    }
  }
})
