<template>
  <q-page class="row items-center justify-evenly">
    <div v-if="!isAjaxReady">Loading...</div>
    <div v-else-if="isContentEmpty">Well... No one post yet</div>
    <template v-else>
      <BaseCard v-for="card in cards" :key="card.id" :cardData="card" />
    </template>
  </q-page>
</template>

<script lang="ts">
import { defineComponent, ref } from '@vue/composition-api'

import BaseCard from 'components/BaseCard.vue'
import { fetchCards, CardData } from '../api/card'

const crrPage = ref(1)
const isContentEmpty = ref(true)
const isAjaxReady = ref(false)
const cards = ref<CardData[]>([])

async function init (): Promise<void> {
  const result = await fetchCards({ page: crrPage.value })
  isAjaxReady.value = true
  if (!result || !result.length) {
    isContentEmpty.value = true
    return
  }
  cards.value = result
}

export default defineComponent({
  name: 'PageHome',
  components: { BaseCard },
  setup () {
    init()
    return { cards, isAjaxReady, isContentEmpty }
  }
})
</script>
