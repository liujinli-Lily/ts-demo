<template>
    <main class="m-main">
        <slot></slot>
    </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
@Component
export default class Modmain extends Vue {
}
</script>

<style scoped>
    .m-main{
        display:block;
        flex:1;
        flex-basis:auto;
        overflow:auto;
        box-sizing:border-box;
        padding:20px
    }
</style>
