<template>
    <div>
        <el-menu
            :default-active="activeIndex"
            :router="true"
            class="el-menu-demo"
            :mode="mode"
            @select="handleSelect"
            background-color="#545c64"
            text-color="#fff"
            active-text-color="#ffd04b">
            <el-menu-item v-for="(item,key) in subNavList" :key="key" :index="item.path" >
                <el-submenu :index="item.path" v-if="item.children">
                    <template slot="title">
                        <i :class="item.icon"/>
                        <span>{{item.name}}</span>
                    </template>
                    <el-menu-item-group v-for="(child, i) in item.children" :key="i * 22" >
<!--                        <template slot="title">{{child.name}}</template>-->
                        <el-menu-item :index="child.path">{{child.name}}</el-menu-item>
                    </el-menu-item-group>
                </el-submenu>
                <el-menu-item :index="item.path" v-else>
                    <i :class="item.icon" class="iconfont" style="font-size: 18px"/>
                    <span slot="title" style="margin-left: 12px;">{{item.name}}</span>
                </el-menu-item>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Watch, Prop } from 'vue-property-decorator'
import { MenuRoute } from '@/types/routes'

@Component
export default class Menu extends Vue {
    public activeIndex: any = '/';

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
      this.activeIndex = this.$route.path
    }

    handleSelect (key: any, keyPath: string) {
      // console.log(key, keyPath)
    }
}
</script>

<style scoped>

</style>
