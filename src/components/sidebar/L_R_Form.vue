<template>
  <div class="q-mt-md">
    <q-tabs v-model="crrState" class="bg-grey-1" dense align="justify" >
      <q-tab class="text-black" name="login" icon="mail" :label="$t('登入')" />
      <q-tab class="text-black" name="register" icon="movie" :label="$t('註冊')" />
    </q-tabs>
    <div :class="['q-pa-md', 'rounded-borders', 'LRForm']"
    >
      <q-form
        @submit="onSubmit"
        @reset="onReset"
        class="q-gutter-md"
      >
        <q-input filled v-model="formData.account" stack-label :label="$t('信箱')" placeholder="example@email.com" lazy-rules />
        <q-input v-model="formData.password" stack-label :label="$t('密碼')" filled :type="isPwd ? 'password' : 'text'" :placeholder="$t('包含') + ' a-Z, 1-9, _'">
          <template v-slot:append>
            <q-icon
              :name="isPwd ? 'visibility_off' : 'visibility'"
              class="cursor-pointer"
              @click="isPwd = !isPwd"
            />
          </template>
        </q-input>

      <div class="row items-center" v-if="crrState === formState.register">
        <span class="row items-center">
          {{$t('當您繼續註冊，即表示已了解並同意我們的')}}
          <q-btn dense flat color="blue" :label="$t('使用者條款')" />
          {{$t('和')}}
          <q-btn flat  dense color="blue" :label="$t('隱私權政策')" />
        </span>
      </div>

        <div class="justify-around row">
          <q-btn :label="$t('送出')" type="submit" color="black"/>
          <q-btn :label="$t('重設')" type="reset" color="secondary"  class="q-ml-sm" />
        </div>
      </q-form>
    </div>
  </div>
</template>

<script lang="ts">
// SetupContext
import { defineComponent, ref, reactive } from '@vue/composition-api'
import { LRList, LRForm } from './model'
import { UserRequest, login } from '../../api/user'

const crrState = ref<LRList>('login')
const isPwd = ref(true)
const formState: LRForm = reactive({
  login: 'login',
  register: 'register'
})

const formData: UserRequest = reactive({
  account: '',
  password: ''
})

function onReset () {
  for (const key in formData) {
    formData[key] = ''
  }
}

async function onSubmit () {
  // TODO loading -> check data -> req api -> 失敗的話 -> show error message
  const success = await login(formData)
  if (!success) {
    return // showErrorMsg()
  }

  //  clean Form Data
  console.log('onSubmit', formData)
  onReset()
}

export default defineComponent({
  name: 'LRForm',
  setup () {
    return { crrState, formState, onSubmit, onReset, formData, isPwd }
  }
})
</script>

<style lang="stylus">
$LRFormWidth = 400px
.LRForm
  border 2px solid
  max-width $LRFormWidth
  border-color black
// .border-login
// .border-register
//   border-color black

</style>
