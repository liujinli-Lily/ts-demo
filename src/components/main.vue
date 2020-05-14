<template>
    <main class="m-main">
        <slot></slot>
    </main>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
@Component
export default class Modmain extends Vue {
}
</script>

<style scoped>
    .m-main{
        overflow:auto;
        box-sizing:border-box;
        padding: 0 30px 30px 30px;
        min-height: calc(100vh - 215px);
    }
</style>
