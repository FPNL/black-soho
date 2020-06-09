<template>
  <q-page class="row items-center justify-evenly">
    <!-- <example-component
      title="Example component"
      active
      :meta="meta"
      :todos="todos"
    ></example-component> -->
    <BaseCard></BaseCard>
  </q-page>
</template>

<script lang="ts">
import Vue from 'vue'

// import ExampleComponent from 'components/CompositionComponent.vue'
import BaseCard from 'components/BaseCard.vue'
import { Todo, Meta } from 'components/models'
export default Vue.extend({
  name: 'PageIndex',
  components: { BaseCard },
  data () {
    const todos: Todo[] = [
      {
        id: 1,
        content: 'ct1'
      },
      {
        id: 2,
        content: 'ct2'
      },
      {
        id: 3,
        content: 'ct3'
      },
      {
        id: 4,
        content: 'ct4'
      },
      {
        id: 5,
        content: 'ct5'
      }
    ]
    const meta: Meta = {
      totalCount: 1200
    }
    return { todos, meta }
  }
})
</script>
