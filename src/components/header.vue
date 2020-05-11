<template>
    <header class="header">
        <div class="logo">
            <img src="../assets/logo.png" alt="fail">
        </div>
        <Menu mode="horizontal" :subNavList="headerMenu"/>
    </header>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Menu from '@/components/menu.vue'
import { MenuRoute } from '@/types/routes'
import { Menuroutes } from '../router/index'
@Component({
  components: {
    Menu
  }
})
export default class MHeader extends Vue {
    public headerMenu: MenuRoute[] = Menuroutes;
}
</script>
<style lang="scss">
    .header{
        width: 100%;
        height: 60px;
        flex-shrink:0;
        display: flex;
        background: rgb(84, 92, 100);
        padding: 0 20px;
        .logo{
            width: 100px;
            height: 50px;
            img{
                width: 100px;
                height: 50px;
            }
        }
    }
    //.el-header{padding:0 20px;-webkit-box-sizing:border-box;box-sizing:border-box;-ms-flex-negative:0;flex-shrink:0}
</style>
