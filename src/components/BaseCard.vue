<template>
  <q-card flat bordered class="bg-grey-1 main__card">
    <q-card-section class="q-py-none q-px-none">
      <BaseStatsGraph ></BaseStatsGraph>
      <div class="row items-center no-wrap q-px-sm">
        <div class="col">
          <div class="text-subtitle1 card__line__list">
            <span class="card__title__info">製作女裝服飾製作Facebook、 instagram、商城等 BN</span>
            <span class="card__title__info">公司已歇業（現在屬於個人接案agent）</span>
            <span class="card__title__info">雙北、台中||未標注地點</span>
            <i class="text-subtitle2 card__from" >from</i>
            <a href="#">104外包網，外包平台</a>
            <span>凃炳《AKNENNA》</span>
          </div>
        </div>
        <div class="col-auto">
          <q-btn color="grey-7" round flat icon="more_vert">
            <q-menu auto-close anchor="bottom left" self="top left">
              <q-list>
                <q-item clickable>
                  <q-item-section>補充說明</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>我要平反</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>檢舉</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </div>
    </q-card-section>

    <q-card-section horizontal class="q-pa-sm card__sections">
      <!-- FIXME KEY 會出錯還要加上卡片編號等 -->
      <div class="card__section q-pa-xs" v-for="(content, key) in state.descriptions" :key="'descriptions'+key">
        <h6 class="q-my-none">
          {{$t(key)}}
        </h6>
        <p class="card__section__content">
          {{ content }}
        </p>
      </div>
    </q-card-section>
  </q-card>
</template>

<script>
// ref,
import { defineComponent, reactive } from '@vue/composition-api'
import BaseStatsGraph from 'components/BaseStatsGraph.vue'
const state = reactive({
  descriptions: {
    quality: '123123123123123123123123123123123123123123123123123123123123123123123123123123123123123123',
    context: 'sdfsdfsdf'
  }
})
export default defineComponent({
  name: 'BaseCard',
  components: { BaseStatsGraph },
  setup () {
    return { state }
  }
})
</script>

<style lang="stylus">
$cardWidth = 800px
$cardHeight = 170px
$sectionNum = 2
$sectionWidth = (100 / $sectionNum)%

.main__card
  // overflow hidden
  width $cardWidth
  // height $cardHeight

.card__line__list > span.card__title__info::after
  content: "·";
  color: rgb(0, 0, 0);
  margin: 0px 0.4em;

.card__from
  margin-right 15px

.card__sections > .card__section:last-child
  border-right none

.card__section
  width $sectionWidth
  border-right 1px solid #000

.card__section__content
  word-break: break-all;

</style>
