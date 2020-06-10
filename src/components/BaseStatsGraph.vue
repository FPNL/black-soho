<template>
  <details class="details-reset">
    <summary title="Click for language details">
      <div class="evaluate__stats__graph">
        <span v-for="(graph, key) in stats" :key="key" :class="['evaluate', key]" :style="{width: graph.w}" >
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
import { EVForm } from 'src/api/config'

function useCalculateStatsWidth (props: EVForm): StatsGraph {
  const stats: StatsGraph = { ev1: { w: '0%', content: [] } }
  let totoalWeight = 0
  for (const key in props) {
    totoalWeight += props[key].length
  }
  for (const key in props) {
    const content = props[key]
    stats[key] = {
      w: (content.length * 100 / totoalWeight).toFixed(3) + '%',
      content: content.map(value => value.label)
    }
  }
  return stats
}

export default defineComponent({
  name: 'BaseStatsGraph',
  props: {
    evList: {
      type: (Object as unknown) as PropType<EVForm>,
      default () {
        return { ev1: [{ label: '', value: '' }] }
      }
    }
  },
  setup (props: {evList: EVForm}) {
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
