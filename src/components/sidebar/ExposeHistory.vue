<template>
<div>
  <q-form
    @submit="onSubmit"
    @reset="onReset"
    class="q-gutter-md q-pa-xs"
  >
    <div class="row">
      <q-input v-if="createNewType" style="width: 65%" filled v-model="formData.type" stack-label :label="$t('案件屬性')" placeholder="自訂分類" lazy-rules />
      <q-select style="width: 65%" filled v-model="formData.type" use-input input-debounce="0" label="案件屬性" :options="options2" @filter="filterFn"
        v-else
      >
        <template v-slot:no-option>
          <q-item>
            <q-item-section class="text-grey">
              No results
            </q-item-section>
          </q-item>
        </template>
      </q-select>

      <q-toggle v-model="createNewType" label="找不到分類" />
  </div>

      <q-input v-model="formData.company" stack-label :label="$t('公司名/發案名')" filled placeholder="XX翻譯公司、Akyo89(插播主)" />
      <!-- <q-input v-model="formData.location" stack-label :label="$t('地區')" filled placeholder="雙北、台中、苗栗我... 有點..." /> -->
      <q-select
          filled
          v-model="formData.location"
          :options="options"
          :label="$t('地區')"
          multiple
          emit-value
          map-options
      >
        <template v-slot:option="scope">
          <q-item
            v-bind="scope.itemProps"
            v-on="scope.itemEvents"
          >
            <q-item-section>
              <q-item-label v-html="scope.opt.label" ></q-item-label>
            </q-item-section>
            <q-item-section side>
              <q-toggle v-model="formData.location" :val="scope.opt.value" />
            </q-item-section>
          </q-item>
        </template>
      </q-select>
      <q-input v-model="formData.webName" stack-label :label="$t('出沒點/外包平台/社團')" filled placeholder="外包達人案社團、TeSA電商社團" />
      <q-input v-model="formData.webLink" stack-label :label="$t('連結')" filled placeholder="https://www.google.com" />
      <q-input v-model="formData.contact" stack-label :label="$t('發案窗口、聯絡人、用戶名稱')" filled placeholder="王大明、小鮮肉(Diy)、Cincia3324" />
      <q-option-group
        name="accepted_genres"
        v-model="formData.items"
        :options="options"
        type="checkbox"
        color="primary"
        inline
      />
      <q-input
        v-model="formData.quality"
        filled
        autogrow
      />
      <q-input
        v-model="formData.context"
        filled
        autogrow
      />
      <div class="justify-around row">
        <q-btn :label="$t('送出')" type="submit" color="black"/>
        <q-btn :label="$t('重設')" type="reset" color="secondary"  class="q-ml-sm" />
      </div>
    </q-form>
  </div>
</template>

<script>
import { defineComponent, ref, reactive, watch } from '@vue/composition-api'
const formData = reactive({
  type: '',
  company: '',
  location: [],
  webName: '',
  webLink: '',
  contact: '',
  items: [],
  quality: '',
  context: ''
})

const createNewType = ref(false)
watch(createNewType, () => {
  formData.type = ''
})
const options = [
  {
    label: 'Rock',
    value: 'rock'
  },
  {
    label: 'Funk',
    value: 'funk'
  },
  {
    label: 'Pop',
    value: 'pop'
  }
]

function onSubmit () {
  console.log('onSubmit')
}

function onReset () {
  console.log('onReset')
}
const stringOptions = [
  'Google', 'Facebook', 'Twitter', 'Apple', 'Oracle'
]

const options2 = ref(stringOptions)

function filterFn (val, update) {
  console.log(123, val)

  if (val === '') {
    update(() => {
      options2.value = stringOptions

      // with Quasar v1.7.4+
      // here you have access to "ref" which
      // is the Vue reference of the QSelect
    })
    return
  }

  update(() => {
    const needle = val.toLowerCase()
    options2.value = stringOptions.filter(v => v.toLowerCase().includes(needle))
  })
}

export default defineComponent({
  name: 'ExposeHistory',
  setup () {
    return { createNewType, formData, onSubmit, onReset, options, filterFn, options2 }
  }

})
</script>

<style>

</style>
