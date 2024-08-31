import { defineStore } from 'pinia'

export const useCryptoStore = defineStore('cryptoStore', {
  state: () => ({
    cryptoData: [],
    currency: 'brl'
  }),
  actions: {
    setCryptoData(data) {
      this.cryptoData = data
    },
    setCurrency(currency) {
      this.currency = currency
    }
  },
  getters: {
    getCryptoData: (state) => state.cryptoData,
    getCurrency: (state) => state.currency
  },
  persist: {
    enabled: true,
    strategies: [
      {
        key: 'cryptoStore',
        storage: localStorage
      }
    ]
  }
})
