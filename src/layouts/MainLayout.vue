<template>
  <q-layout view="hHh LpR lfr">

    <q-header elevated class="bg-primary text-white" height-hint="98">
      <q-toolbar>
        <!-- <q-btn dense flat round icon="menu" @click="left = !left" /> -->

        <q-toolbar-title>
          <q-avatar>
            <img src="https://cdn.quasar.dev/logo/svg/quasar-logo.svg">
          </q-avatar>
          {{$t("暗黑發案名錄")}}
        </q-toolbar-title>

         <q-input dark dense standout v-model="researchTxt" input-class="text-right" class="q-ml-md" :placeholder="$t('輸入公司名稱') + '...'" >
          <template v-slot:append>
            <q-icon v-if="researchTxt === ''" name="search" />
            <q-icon v-else name="clear" class="cursor-pointer" @click="researchTxt = ''" />
          </template>
        </q-input>
        <q-space />
        <q-btn color="primary" :label="$t('快速面板')" @click="right = !right" />
        <!-- <q-btn dense flat round icon="menu" @click="right = !right" /> -->
      </q-toolbar>

      <q-tabs align="left">
        <q-route-tab to="/page1" label="發案黑" />
        <q-route-tab to="/page2" label="接案黑" />
        <q-route-tab to="/page3" label="同業黑" />
      </q-tabs>
    </q-header>

    <!-- <q-drawer v-model="openLeftDrawer" side="left" overlay elevated> -->
      <!-- drawer content -->
    <!-- </q-drawer> -->
    <q-drawer v-model="openRightDrawer" :width="400" side="right" overlay bordered class="bg-sidebar">
      <!-- TODO sidebarReady loading 畫面, error 502  -->
      <div v-if="!sidebarReady">Loading...</div>
      <div v-else-if="errorHappened">Error 502</div>
      <LRForm v-else-if="!isLogin"/>
      <ExposeHistory v-else :exposeForm="config.exposeForm" />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer elevated class="bg-grey-8 text-white">
      <q-toolbar>
        <q-toolbar-title>
          {{ $t("版權", { company: $t("政典廣告有限公司") }) }}
          {{$t("聯絡我們")}}
        </q-toolbar-title>
      </q-toolbar>
    </q-footer>

  </q-layout>
</template>

<script lang="ts">
/* PropType, computed, reactive */
import { defineComponent, ref } from '@vue/composition-api'
import { isLogin, login } from '../api/user'
import { fetchConfig, config } from '../api/config'

import SideLayout from 'layouts/SideLayout.vue'
import BaseCard from 'components/BaseCard.vue'
import LRForm from 'components/sidebar/L_R_Form.vue'
import ExposeHistory from 'components/sidebar/ExposeHistory.vue'

const openLeftDrawer = ref(false)
const openRightDrawer = ref(true)
const researchTxt = ref('')
const sidebarReady = ref(false)
const errorHappened = ref(false)

async function init () {
  const result = await Promise.all([login(), fetchConfig()])
  if (result[1] === false) {
    errorHappened.value = true
  }
  sidebarReady.value = true
}

export default defineComponent({
  name: 'MainLayout',
  components: { BaseCard, SideLayout, LRForm, ExposeHistory },
  setup () {
    init()
    return {
      openLeftDrawer,
      openRightDrawer,
      researchTxt,
      sidebarReady,
      errorHappened,
      isLogin,
      config
    }
  }
})
</script>

<style lang="stylus">
.bg-sidebar
  background-color  #f9f9f9
</style>
