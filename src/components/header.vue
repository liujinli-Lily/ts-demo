<template>
    <div style="height: 60px">
        <header class="header">
            <div class="logo">
                <img src="../assets/logo.png" alt="fail">
            </div>
            <Menu mode="horizontal" :subNavList="headerMenu"/>
        </header>
<!--        <Maside :width="asideWidth">-->
<!--            <leftMenu :subNavList="Menu" mode="vertical"/>-->
<!--        </Maside>-->
    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Menu from '@/components/menu.vue'
import { MenuRoute } from '@/types/routes'
import { Menuroutes } from '../router/index'
import Maside from '@/components/leftbar.vue'
import leftMenu from '@/components/leftMenu.vue'
@Component({
  components: {
    Menu,
    Maside,
    leftMenu
  }
})
export default class MHeader extends Vue {
    public asideWidth = '200px';

    public Menu: MenuRoute[] = Menuroutes;
    public headerMenu: MenuRoute[] = Menuroutes;
}
</script>
<style lang="scss">
    .header{
        width: 100%;
        min-width: 1200px;
        position: fixed;
        display: -webkit-box;
        display: -webkit-flex;
        display: flex;
        height: 60px;
        background-color: rgb(84, 92, 100);
        z-index: 10;
        -webkit-box-align: center;
        -webkit-align-items: center;
        align-items: center;
        width: 100%;
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
