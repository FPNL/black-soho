<template>
  <details class="details-reset">
    <summary title="Click for language details">
      <div class="evaluate__stats__graph">
        <span v-for="(graph, index) in stats" :key="key" :class="['evaluate', 'ev'+(index+1)]" :style="{width: graph.w}" >
          <q-tooltip>
            <p v-for="(txt, index) in graph.content" :key="index + key">{{ $t(txt) }}</p>
          </q-tooltip>
        </span>
      </div>
    </summary>
  </details>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import { StatsGraph } from './models'
import { evListHandler } from 'src/api/config'
type XX = {w: string; content: string[]}[]
function useCalculateStatsWidth (list: string[]): XX {
  const { evList } = evListHandler(list)
  const stats: XX = []
  let totoalWeight = 0
  for (const ev of evList) {
    totoalWeight += ev.length
  }
  for (const ev of evList) {
    const content = []
    for (const value of ev) {
      content.push(value.label)
    }
    stats.push({
      w: (ev.length * 100 / totoalWeight).toFixed(3) + '%',
      content
    })
  }
  return stats
}

export default defineComponent({
  name: 'BaseStatsGraph',
  props: {
    evList: {
      type: (Array as unknown) as PropType<string[]>,
      default () {
        return ['']
        // return { ev1: [{ label: '', value: '' }] }
      }
    }
  },
  setup (props: {evList: string[]}) {
    return { stats: useCalculateStatsWidth(props.evList) }
  }
})
</script>

<style lang="stylus">
$graphHeight = 10px
$ev3 = black
$ev2 = #f44336
$ev1 = #ff9800
// $ev2 = #ffeb3b
// $ev1 = white

details summary::-webkit-details-marker
  display none

.details-reset>summary
  list-style: none

summary
  list-style none
  cursor pointer
  display list-item
  &:focus
    outline none
    box-shadow none

.evaluate__stats__graph
  display flex
  width 100%
  overflow hidden
  white-space nowrap
  cursor pointer
  -webkit-user-select none
  -moz-user-select none
  -ms-user-select none
  user-select none
  border-radius 3px 3px 0 0

.evaluate
  height $graphHeight
  line-height $graphHeight
.ev5
  background-color $ev5
.ev4
  background-color $ev4
.ev3
  background-color $ev3
.ev2
  background-color $ev2
.ev1
  background-color $ev1
</style>
