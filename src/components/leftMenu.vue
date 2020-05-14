<template>
    <el-menu
        default-active="$route.path"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#2D4157"
        text-color="#fff"
        active-text-color="#ffd04b"
    >
        <template v-for="(menu_v,menu_k) in subNavList">
            <el-submenu v-if="menu_v.children" :index="menu_v.path" :key="menu_k">
                <template slot="title">
                    <i :class="menu_v.icon"/>
                    <span slot="title">{{ menu_v.name }}</span>
                </template>
                <div v-for="(subItem, i) in menu_v.children" :key="i">
                    <el-submenu v-if="subItem.children" :index="subItem.name">
                        <template slot="title">
                            <i :class="subItem.icon"/>
                            <span slot="title">{{ subItem.name }}</span>
                        </template>
                        <el-menu-item v-for="(threeItem, k) in subItem.children" :key="k" :index="threeItem.path">
                            <i :class="threeItem.icon"/>
                            <span slot="title">{{ threeItem.name }}</span>
                        </el-menu-item>
                    </el-submenu>
                    <el-menu-item v-else :index="subItem.path">
                        <i :class="subItem.icon"/>
                        <span slot="title">{{ subItem.name }}</span>
                    </el-menu-item>
                </div>
            </el-submenu>
            <el-menu-item v-else :index="menu_v.path" :key="menu_k">
                <i :class="menu_v.icon"/>
                <span slot="title">{{ menu_v.name }}</span>
            </el-menu-item>
        </template>
    </el-menu>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator';
import { MenuRoute } from '@/types/routes';

  @Component
export default class Menu extends Vue {
    @Prop({
        type: Array,
        required: true,
        default: [],
    })
    public subNavList!: MenuRoute[];

    @Prop({
        type: String,
        required: false,
        default: '',
    })
    public mode?: string

    @Watch('$route')
    private onRouterChange (): void {
        // this.activeIndex = this.$route.path
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public handleOpen (key: any, keyPath: string) {
        console.log(key, keyPath);
    }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    public handleClose (key: any, keyPath: string) {
        console.log(key, keyPath);
    }
}
</script>

<style scoped lang="scss">

</style>
