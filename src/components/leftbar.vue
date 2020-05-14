<template>
    <div class="m-aside" :style="{ width }">
        <slot></slot>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';

@Component
export default class Maside extends Vue {
    @Prop({
        type: String,
        required: false,
        default: '200px',
    })
    private width!: string;
}
</script>

<style scoped>
    .m-aside{
        position: fixed;
        margin-top: 60px;
        min-height: calc(100vh - 50px);
        z-index: 10;
        background-color: #2D4157;
        height: 100%;
    }
</style>
