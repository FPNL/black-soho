<template>
  <q-card flat bordered class="bg-grey-1 main__card">
    <q-card-section class="q-py-none q-px-none">
      <BaseStatsGraph :evList="cardData.items"/>
      <div class="row items-center no-wrap q-px-sm">
        <div class="col">
          <div class="text-subtitle1 card__line__list">
            <span class="card__title__info"> {{ cardData.type }} </span>
            <span class="card__title__info"> {{ cardData.company }} </span>
            <span class="card__title__info"> {{ cardData.location.join(' + ') }} </span>
            <i class="text-subtitle2 card__from" > from </i>
            <a :href="cardData.webLink">{{ cardData.webName }}</a>
            <span> {{ cardData.contact }} </span>
          </div>
        </div>
        <div class="col-auto">
          <q-btn color="grey-7" round flat icon="more_vert">
            <q-menu auto-close anchor="bottom left" self="top left">
              <q-list>
                <q-item clickable>
                  <q-item-section>{{$t('補充說明')}}</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>{{$t('我要平反')}}</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>{{$t('檢舉')}}</q-item-section>
                </q-item>
                <q-item clickable>
                  <q-item-section>{{$t('刪除')}}</q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </div>
    </q-card-section>

    <q-card-section horizontal class="q-pa-sm card__sections">
      <div class="card__section q-pa-xs">
        <h6 class="q-my-none">
          {{ $t('quality') }}
        </h6>
        <p class="card__section__content">
          {{ cardData.quality }}
        </p>
      </div>
      <div class="card__section q-pa-xs">
        <h6 class="q-my-none">
          {{ $t('context') }}
        </h6>
        <p class="card__section__content">
          {{ cardData.context }}
        </p>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'

import BaseStatsGraph from 'components/BaseStatsGraph.vue'
import { CardData } from 'src/api/card'

export default defineComponent({
  name: 'ComponentBaseCard',
  components: { BaseStatsGraph },
  props: {
    cardData: {
      type: (Object as unknown) as PropType<CardData>,
      require: true
    }
  }
  // setup () {
  //   return { }
  // }
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
