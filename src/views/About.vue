<template>
  <div class="about">
        <div id="nav">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="vuex 加减" name="page1"></el-tab-pane>
                <el-tab-pane label="模块滚动" name="scroll"></el-tab-pane>
                <el-tab-pane label="from动态添加" name="form"></el-tab-pane>
            </el-tabs>
        </div>
      <router-view/>
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator'
import { Route } from 'vue-router'
@Component
export default class About extends Vue {
  beforeRouteEnter (to: Route, from: Route, next: () => void): void {
    console.log(123, 'enter')
    next()
  }

  beforeRouteUpdate (to: Route, from: Route, next: () => void): void {
    console.log('beforeRouteUpdate')// 暂时不生效，版本问题
    next()
  }

  beforeRouteLeave (to: Route, from: Route, next: () => void): void {
    console.log('beforeRouteLeave')
    next()
  }

  public activeName: string | any = '';

  @Watch('$route', { deep: true })
  public routerChange (): void {
    this.setDefaultActive()
  }

  public mounted () {
    this.setDefaultActive()
  }

  public setDefaultActive () {
    // 默认开始给第一个子页面
    if (this.$route.path === '/about') {
      this.activeName = 'page1'
    } else {
      this.activeName = this.$route.name
    }
    this.handleClick()
  }

  public getDefaultActive (menu: any) {
    let active = ''
    for (const key in menu) {
      if (menu[key] && menu[key].path === this.$route.fullPath) {
        return this.$route.fullPath
      }
      if (menu[key].children) {
        active += this.getDefaultActive(menu[key].children)
      }
    }
    // 页面刷新时，store 状态值为空
    return active || this.$route.fullPath
  }

  public handleClick () {
    this.$router.push({ path: `/about/${this.activeName}` })
  }
}
</script>
<style lang="scss" scoped>
    .about{
        background: #fff;
        padding: 20px;
    }
</style>
