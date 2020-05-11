<template>
  <div class="about">
<!--      <el-container>-->
<!--          <el-header>Header</el-header>-->
<!--          <el-container>-->
<!--              <el-aside width="200px">Aside</el-aside>-->
<!--              <el-main>Main</el-main>-->
<!--          </el-container>-->
<!--      </el-container>-->
        <div id="nav">
          <router-link to="/about/page1">vuex 加减</router-link> |
          <router-link to="/about/page2">page2</router-link>
        </div>
      <router-view/>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
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
}
</script>
