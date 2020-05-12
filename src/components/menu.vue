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
<!--                <el-submenu :index="item.path" v-if="item.children">-->
<!--                    <template slot="title">-->
<!--                        <i :class="item.icon"/>-->
<!--                        <span>{{item.name}}</span>-->
<!--                    </template>-->
<!--                    <el-menu-item-group v-for="(child, i) in item.children" :key="i * 22" >-->
<!--                        <el-menu-item :index="child.path">{{child.name}}</el-menu-item>-->
<!--                    </el-menu-item-group>-->
<!--                </el-submenu>-->
                <el-menu-item :index="item.path">
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
    activeIndex = '/';

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

    public mounted () {
      this.updateMenus()
    }

    public updateMenus () {
      // 优先使根据fullPath 去匹配对应的菜单
      for (let i = 0; i < this.subNavList.length; i++) {
        const item = this.subNavList[i]
        const state = this.findMenusItemByFullPath(item)
        if (state) {
          this.activeIndex = item.path
          break
        }
      }
    }

    // 根据当前得路由 对比 循环得item.path 返回boolean
    public findMenusItemByFullPath (item: any) {
      if (item.path === this.$route.fullPath) {
        return true
      }
      for (const key in item.children) {
        const state = this.findMenusItemByFullPath(item.children[key])
        if (state) {
          return true
        }
      }
      return false
    }

    // public toggleMenu (item: object, index: any) {
    //   console.log(item)
    //   if (item.children) {
    //     const path = this.getDefaultPath(item.children)
    //     this.$router.push(path)
    //   } else {
    //     this.$router.push(item.path)
    //   }
    // }

    // 自动获取第一个子页面的path
    // private getDefaultPath (obj: any): any {
    //   let path = null
    //   if (obj.children) {
    //     path = this.getDefaultPath(obj.children)
    //   } else {
    //     const key = Object.keys(obj)[0]
    //     if (obj[key].children) {
    //       path = this.getDefaultPath(obj[key].children)
    //     } else {
    //       path = obj[key].path
    //     }
    //   }
    //   return path
    // }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    handleSelect (key: any, keyPath: string) {
      console.log(key, keyPath)
    }
}
</script>

<style scoped>

</style>
