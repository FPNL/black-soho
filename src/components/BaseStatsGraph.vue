<template>
  <details class="details-reset">
    <summary title="Click for language details">
      <div class="evaluate__stats__graph">
        <span :class="['evaluate', key]" :style="{width: graph.w}"
        v-for="(graph, key) in stats" :key="key"
        >
        <q-tooltip>
          <p v-for="(txt, index) in graph.content" :key="index + key">{{txt}}</p>
        </q-tooltip>
        </span>
      </div>
    </summary>
  </details>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@vue/composition-api'
import { StatsContent, StatsGraph } from './models'

function useCalculateStatsWidth (props: StatsContent): {stats: StatsGraph} {
  const stats: StatsGraph = { evaluate1: { w: '0%', content: [] } }
  let totoalWeight = 0
  for (const key in props) {
    totoalWeight += props[key].length
  }
  for (const key in props) {
    const content = props[key]
    stats[key] = {
      w: (content.length * 100 / totoalWeight).toFixed(3) + '%',
      content
    }
  }
  return { stats }
}
export default defineComponent({
  name: 'BaseStatsGraph',
  props: {
    statsContent: {
      type: (Object as unknown) as PropType<StatsContent>,
      // required: true,
      default () {
        return ({
          evaluate5: ['a', 'b', 'd', 'e'],
          evaluate4: ['c', 'c1'],
          evaluate3: ['d', 'd3'],
          evaluate2: ['d', 'd3']
        })
      }
    }
  },
  setup (props: {statsContent: StatsContent}) {
    return { ...useCalculateStatsWidth(props.statsContent) }
  }
})
</script>

<style lang="stylus">
$graphHeight = 10px
$evaluate5 = black
$evaluate4 = #f44336
$evaluate3 = #ff9800
$evaluate2 = #ffeb3b
$evaluate1 = white

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
.evaluate5
  background-color $evaluate5
.evaluate4
  background-color $evaluate4
.evaluate3
  background-color $evaluate3
.evaluate2
  background-color $evaluate2
.evaluate1
  background-color $evaluate1
</style>
