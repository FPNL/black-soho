<template>
  <div class="side__entrance q-pa-xs q-mt-md">
    <q-list bordered padding class="rounded-borders text-primary" >
      <q-item
        clickable
        v-ripple
        @click="onClickBtnHandler(pageList.ExposeHistory)"
      >
        <q-item-section avatar>
          <q-icon name="inbox" />
        </q-item-section>

        <q-item-section>{{ $t(pageList.ExposeHistory)}}</q-item-section>
      </q-item>

      <q-separator inset />

      <q-item
        clickable
        v-ripple
        @click="onClickBtnHandler(pageList.DeployCase)"
      >
        <q-item-section avatar>
          <q-icon name="send" />
        </q-item-section>
        <q-item-section>{{ $t(pageList.DeployCase)}}</q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script lang="ts">
import { defineComponent, SetupContext } from '@vue/composition-api'
import { SidebarPage } from './model'
import { pageList } from 'layouts/SideLayout.vue'

function onClickBtnHandler (context: SetupContext): {onClickBtnHandler: (choice: SidebarPage) => void} {
  return {
    onClickBtnHandler (choice: SidebarPage) {
      context.emit('onChangeSidePage', choice)
    }
  }
}

export default defineComponent({
  name: 'Entrance',
  setup (_props, context: SetupContext) {
    return { ...onClickBtnHandler(context), pageList }
  }
})
</script>

<style lang="stylus">
.my-menu-link
  background: #F2C037
</style>
