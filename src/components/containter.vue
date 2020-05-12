<template>
    <section class="m-containter" :class="{ 'is-vertical': isVertical }">
        <slot></slot>
    </section>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
@Component
export default class Mcontainter extends Vue {
    @Prop({
      type: String,
      required: false,
      default: ''
    }) private direction: string | undefined

    get isVertical () {
      if (this.direction === 'vertical') {
        return true
      } else if (this.direction === 'horizontal') {
        return false
      }
      return this.$slots && this.$slots.default
        ? this.$slots.default.some(vnode => {
          const tag = vnode.componentOptions && vnode.componentOptions.tag
          return tag === 'MHeader' || tag === 'MFooter'
        })
        : false
    }
}
</script>

<style scoped lang="scss">
    .m-containter{
        /*display:flex;*/
        /*-webkit-box-orient:horizontal;*/
        /*flex-direction:row;*/
        /*-flex:1;*/
        /*flex-basis:auto;*/
        /*box-sizing:border-box;*/
        /*min-width:0;*/
        width: 100%;
        padding: 0 200px;
    }
    .m-containter.is-vertical{
        /*-webkit-box-orient:vertical;*/
        /*-webkit-box-direction:normal;*/
        /*-ms-flex-direction:column;*/
        /*flex-direction:column;*/
        padding-left: 0;
    }
</style>
