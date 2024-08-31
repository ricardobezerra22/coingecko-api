<template>
  <div class="container">
    <div class="navbar" data-test-navbar>
      <div class="navbar-header">
        <span data-test-home @click="handleHomeNavigation" class="navbar-title">{{
          navTitle
        }}</span>
      </div>

      <div class="navbar-dropdown-list">
        <span class="navbar-dropdown-list-title">{{ currentCurrency.toUpperCase() }}</span>
        <v-icon
          v-if="!isDropdownOpen"
          class="navbar-dropdown-list-icon"
          @click="toggleDropdown"
          data-test-change-currency-icon-open
          >{{ icons.down }}</v-icon
        >
        <v-icon
          v-else
          class="navbar-dropdown-list-icon"
          @click="toggleDropdown"
          data-test-change-currency-icon-close
          >{{ icons.up }}</v-icon
        >
        <v-list
          :class="{ 'navbar-dropdown-list-dropdown': true, visible: isDropdownOpen }"
          data-test-change-currency-list
        >
          <v-list-item
            data-test-change-currency-list-open
            v-for="(data, i) in currency"
            :key="i"
            :title="data.title"
            :value="data.title"
            @click="changeValues(data)"
          ></v-list-item>
        </v-list>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, reactive, ref } from 'vue'
import { useCryptoStore } from '@/stores/coinStore'
const navTitle = 'Bitcoin Live Tracker'
const cryptoStore = useCryptoStore()
const currency = reactive([
  {
    title: 'USD',
    value: 'usd'
  },
  {
    title: 'EUR',
    value: 'eur'
  },
  {
    title: 'BRL',
    value: 'brl'
  }
])
const icons = reactive({
  down: 'mdi-chevron-down',
  up: 'mdi-chevron-up'
})
const isDropdownOpen = ref(false)

const currentCurrency = ref('brl')
function toggleDropdown() {
  isDropdownOpen.value = !isDropdownOpen.value
}
function changeValues(data) {
  currentCurrency.value = data.value
  cryptoStore.setCurrency(currentCurrency.value)
  toggleDropdown()
}
const emit = defineEmits(['handleHomeNavigation'])
const handleHomeNavigation = () => {
  emit('handleHomeNavigation')
}
onMounted(() => {
  cryptoStore.setCurrency(currentCurrency.value)
})
</script>

<style lang="scss" scoped src="./style.scss"></style>
