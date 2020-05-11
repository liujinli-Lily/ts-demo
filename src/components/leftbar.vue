<template>
    <aside class="m-aside" :style="{ width }">
        <slot></slot>
    </aside>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'

@Component
export default class Maside extends Vue {
    @Prop({
      type: String,
      required: false,
      default: '200px'
    })
    private width!: string;
}
</script>

<style scoped>
    .m-aside{
        overflow:auto;
        -webkit-box-sizing:border-box;
        box-sizing:border-box;
        -ms-flex-negative:0;
        flex-shrink:0
    }
</style>
