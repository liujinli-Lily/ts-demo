<template>
    <el-menu
        default-active="$route.path"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
    >
        <el-submenu v-for="(item,index) in subNavList" :key="index" :index="item.path">
            <template slot="title">
                <i class="el-icon-location"></i>
                <span>{{ item.name }}</span>
            </template>
            <el-menu-item v-for="(subItem, subIndex) in item.children" :key="subIndex" :index="subItem.path" class="SubLi" >
                {{ subItem.name }}
            </el-menu-item>

        </el-submenu>

    </el-menu>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { MenuRoute } from '@/types/routes'

  @Component
export default class Menu extends Vue {
    @Prop({
      type: Array,
      required: true,
      default: []
    })
    public subNavList!: MenuRoute[];

    @Prop({
      type: String,
      required: false,
      default: ''
    })
    public mode?: string

    @Watch('$route')
    private onRouterChange (): void {
      // this.activeIndex = this.$route.path
    }

    handleOpen (key: any, keyPath: string) {
      console.log(key, keyPath)
    }

    handleClose (key: any, keyPath: string) {
      console.log(key, keyPath)
    }
}
</script>

<style scoped>

</style>
