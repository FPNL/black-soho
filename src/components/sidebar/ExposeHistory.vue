<template>
  <div>
  <q-form class="q-gutter-md q-pa-xs" >
    <div class="row">
     <q-input :label="$t('案件屬性')" :placeholder="$t('自訂分類')"
        v-if="isNewType"
        v-model="formData.type"
        label-color="black" standout="bg-pnk-1"
        style="width: 65%" filled stack-label  lazy-rules />
      <q-select :label="$t('案件屬性')"
        v-else
        v-model="formData.type"
        :options="typeList" @filter="filterFn"
        label-color="black" standout="bg-pink-1"
        style="width: 65%" filled use-input input-debounce="0"
      >
        <template v-slot:no-optin>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>
      </q-select>

      <q-toggle :label="$t('找不到分類')" v-model="isNewType"  />
    </div>
      <q-input :label="$t('公司名/發案名')" :placeholder="$t('EX: XX翻譯公司、Akyo89(插播主)')"
        v-model="formData.company"
        label-color="black" standout="bg-pink-1"
        stack-label filled />
      <!-- <q-input v-model="formData.location" stack-label :label="$t('地區')" filled placeholder="雙北、台中、苗栗我... 有點..." /> -->

      <q-select
        :label="$t('地區')"
        v-model="formData.location" :options="locationList"
        label-color="black" standout="bg-pink-1"
        filled multiple emit-value map-options
      >
        <template v-slot:option="scope">
          <q-item v-bind="scope.itemProps" v-on="scope.itemEvents" >
            <q-item-section>
              <q-item-label v-html="scope.opt.label" ></q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-toggle v-model="formData.location" :val="scope.opt.value" />
            </q-item-section>
          </q-item>
        </template>
      </q-select>

      <q-input :label="$t('出沒點/外包平台/社團')" :placeholder="$t('EX: 外包達人案社團、TeSA電商社團')"
        v-model="formData.webName"
        label-color="black" standout="bg-pink-1"
        stack-label  filled  />

      <q-input :label="$t('連結')" :placeholder="$t('EX: https://www.google.com')"
        v-model="formData.webLink"
        label-color="black" standout="bg-pink-1"
        stack-label  filled />

      <q-input :label="$t('發案窗口、聯絡人、用戶名稱')" :placeholder="$t('EX: 王大明、小鮮肉(Diy)、Cincia3324')"
        v-model="formData.contact"
        label-color="black" standout="bg-pink-1"
        stack-label filled />

      <div class="q-pa-sm">
        <p class="q-mb-sm text-subtitle1" >{{$t('事項')}}</p>
        <div v-for="(evItem, key, index) in evList" :key="'ev'+ index ">
          <q-icon name="star" size="1rem" color="primary" v-for="s in (index+1)" :key="'star'+ index + s"/>
          <q-option-group name="accepted_genres" v-model="formData.items" :options="evItem" type="checkbox" color="primary" inline />
        </div>
        <!-- <q-icon name="star" size="1rem" color="primary" v-for="s in 2" :key="'star'+ index+ s"/>
        <q-option-group name="accepted_genres" v-model="formData.items" :options="ev2" type="checkbox" color="primary" inline />
        <q-icon name="star" size="1rem" color="primary"/>
        <q-option-group name="accepted_genres" v-model="formData.items" :options="ev1" type="checkbox" color="primary" inline /> -->
      </div>

      <q-input
        :label="$t('特徵')"
        v-model="formData.quality"
        label-color="black" standout="bg-pink-1"
        filled stack-label autogrow />

      <q-input
        :label="$t('經過')"
        v-model="formData.context"
        label-color="black" standout="bg-pink-1"
        filled stack-label autogrow />

      <q-checkbox v-model="submitCheck[0]" :label="$t('以上描述我未有污辱之意，只是陳述相對客觀事實')"/>
      <q-checkbox v-model="submitCheck[1]" :label="$t('以上事跡我都是有憑有據')" />

      <div class="justify-around row">
        <q-btn :label="$t('送出')" type="button" @click="onSubmitHandler" color="black" :disable="!submitCheck[0] || !submitCheck[1]"/>
        <q-btn :label="$t('重設')" type="button" @click="onResetHandler" color="secondary"  class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, watch, PropType } from '@vue/composition-api'
import { ExposeHistoryForm, TypicalSelectInputList, TypicalFormList } from './model'

const originData: ExposeHistoryForm = {
  type: '',
  company: '',
  location: [],
  webName: '',
  webLink: '',
  contact: '',
  items: [],
  quality: '',
  context: ''
}

const formData: ExposeHistoryForm = reactive({ ...originData })
const submitCheck = reactive([false, false])
const isNewType = ref(false)
watch(isNewType, () => { formData.type = '' })

// TODO: AJAX
function onSubmitHandler () {
  const cloneFormData = { ...formData }
  const regexp = new RegExp(/(\n){3,}/, 'g')
  cloneFormData.quality = cloneFormData.quality.replace(regexp, '\n\n').trim()
  console.log('onSubmitHandler')
}

function onResetHandler () {
  for (const key in formData) {
    if (Array.isArray(formData[key])) {
      formData[key] = []
    } else {
      formData[key] = ''
    }
  }
}

const filteredList = ref<TypicalSelectInputList>([])

function useFilterLocation (props: TypicalSelectInputList) {
  return {
    filterFn (val: string, update: (cbFn: Function) => void) {
      if (val === '') {
        update(() => {
          filteredList.value = props
          // with Quasar v1.7.4+ // here you have access to "ref" which // is the Vue reference of the QSelect
        })
        return
      }

      update(() => {
        const needle = val.toLowerCase()
        filteredList.value = props.filter(v => v.toLowerCase().includes(needle))
      })
    }
  }
}

export default defineComponent({
  name: 'ExposeHistory',
  props: {
    typeList: {
      type: (Array as unknown) as PropType<TypicalSelectInputList>,
      default () {
        return ['台北', '新北', '台中', '彰化', '高雄']
      }
    },
    locationList: {
      type: (Array as unknown) as PropType<TypicalFormList>,
      default () {
        return [
          { label: '台北', value: 't1' },
          { label: '新北', value: 't2' },
          { label: '彰化', value: 't3' },
          { label: '台中', value: 't4' },
          { label: '高雄', value: 't5' }
        ]
      }
    },
    evList: {
      type: (Object as unknown) as PropType<{ev1: TypicalFormList; ev2: TypicalFormList;ev3: TypicalFormList}>,
      default () {
        return {
          ev3: [
            { label: '轉包人拿到款項就消失', value: 'ev31' }, { label: '案件完成，不結清款項', value: 'ev32' }
          ],
          ev2: [
            { label: '不對等合約', value: 'ev21' },
            { label: '正式簽約後，追加許多非簽約範圍的製作內容', value: 'ev22' },
            { label: '討論 2 週以上後，已讀不回、無法抽時間簽約', value: 'ev23' },
            { label: '要求報價，卻不提供需求、規格', value: 'ev24' },
            { label: '轉介者採用他人作品自介', value: 'ev25' }
          ],
          ev1: [
            { label: '諮詢後，不回覆訊息', value: 'ev11' },
            { label: '案件金額低於合理價格範圍', value: 'ev12' }
          ]
        }
      }
    }
  },
  setup (props: { locationList: string[] }) {
    return { isNewType, formData, onSubmitHandler, onResetHandler, submitCheck, ...useFilterLocation(props.locationList) }
  }
})

// // 定義：已經有金錢來往
// const ev3 = [
//   {
//     label: '轉包人拿到款項就消失', value: 'ev31'
//   },
//   {
//     label: '案件完成，不結清款項', value: 'ev32'
//   }
// ]
// // 時間拖延，時間就是金錢
// const ev2 = [
//   {
//     label: '不對等的合約', value: 'ev21'
//   },
//   {
//     label: '正式簽約後，追加許多非簽約範圍的製作內容', value: 'ev22'
//   },
//   {
//     label: '討論 2 週以上後，已讀不回、無法抽時間簽約', value: 'ev23'
//   },
//   {
//     label: '要求報價，卻未提供需求、規格', value: 'ev24'
//   },
//   {
//     label: '轉介者採用他人作品自介', value: 'ev25'
//   }
// ]
// // 不尊重與不禮貌
// const ev1 = [
//   {
//     label: '諮詢後，不回覆訊息', value: 'ev11'
//   },
//   {
//     label: '案件金額低於合理價格範圍', value: 'ev12'
//   }
// ]
</script>

<style lang="stylus">

</style>
