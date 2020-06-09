<template>
  <div class="q-pa-sm">
    <q-breadcrumbs class="text-brown">
      <template v-slot:separator>
        <q-icon size="1.5em" name="chevron_right" color="primary" />
      </template>

      <q-breadcrumbs-el :label="$t('面板主頁')" style="cursor: pointer;" icon="home" @click="onChangeSidePageHandler(pageList.Entrance)"/>
      <q-breadcrumbs-el :label="$t(currPage)" style="cursor: pointer;" icon="widgets" v-if="!pageOn[pageList.Entrance]">
        <q-menu>
          <q-list style="min-width: 100px">
            <template v-for="(eachPage, key) in pageList"  >
              <q-item clickable v-close-popup
                v-if="eachPage !== pageList.Entrance" :key="key"
                @click="onChangeSidePageHandler(eachPage)"
              >
                <q-item-section> {{ $t(eachPage)}} </q-item-section>
              </q-item>
            </template>
          </q-list>
        </q-menu>
      </q-breadcrumbs-el>
    </q-breadcrumbs>

    <div class="content">
      <Entrance  v-show="pageOn[pageList.Entrance]" @onChangeSidePage="onChangeSidePageHandler"></Entrance>
      <DeployCase v-show="pageOn[pageList.DeployCase]"></DeployCase>
      <ExposeHistory  v-show="pageOn[pageList.ExposeHistory]"></ExposeHistory>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive } from '@vue/composition-api'
import DeployCase from 'components/sidebar/DeployCase.vue'
import Entrance from 'components/sidebar/Entrance.vue'
import ExposeHistory from 'components/sidebar/ExposeHistory.vue'
import { PageList, SidebarPage } from 'components/sidebar/model'

// 利用 object 的 key 決定要取的內容，原因： 幫助在開發階段找到錯誤、快速選字，且容易統一。
// 要是單純的利用 string (如： pageOn.string, onChangeSidePageHandler("string"))，
// 如果打錯字需要改 string 的字，會很難在開發階段檢查到錯誤發生，極有可能檢測階段或是產品階段發生錯誤，這樣就太晚了
// 矛盾點：但是在 HTML 他並沒有幫忙找尋錯誤...
export const pageList: PageList = {
  Entrance: 'Entrance',
  ExposeHistory: 'ExposeHistory',
  DeployCase: 'DeployCase'
}

const currPage = ref<SidebarPage>('Entrance')
const pageOn = reactive({
  [pageList.Entrance]: true,
  [pageList.ExposeHistory]: false,
  [pageList.DeployCase]: false
})

function onChangeSidePageHandler (choice: SidebarPage) {
  pageOn[currPage.value] = false
  pageOn[choice] = true
  currPage.value = choice
}

export default defineComponent({
  name: 'SideLayout',
  components: {
    DeployCase,
    Entrance,
    ExposeHistory
  },
  setup () {
    return { currPage, pageOn, onChangeSidePageHandler, pageList }
  }
})
</script>
