<template>
    <div>
        <button @click="decrement" type="primary" plain>减小</button>
        <el-input v-model="count" class="mod-input-item" placeholder="请输入内容"></el-input>
        <button @click="increment" type="primary" plain>增加</button>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Action, State } from 'vuex-class'

@Component
export default class Page1 extends Vue {
    @State public count: number | undefined ;

    @Action public jian: any;
    @Action public add: any;

    decrement () {
      this.jian()
    }

    increment () {
      this.add()
    }
}
</script>

<style scoped>
.mod-input-item{
    width: 120px;
}
</style>
