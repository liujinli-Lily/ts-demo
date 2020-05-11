<template>
  <div id="app">
      <Mcontainter >
          <MHeader/>

          <Mcontainter >
              <Maside :width="asideWidth">
<!--                  <leftMenu :subNavList="Menu" mode="vertical"/>-->
              </Maside>
              <Modmain>
                  <router-view/>
              </Modmain>
          </Mcontainter>
      </Mcontainter>

  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import Mcontainter from '@/components/containter.vue'
import MHeader from '@/components/header.vue'
import Modmain from '@/components/main.vue'
import Maside from '@/components/leftbar.vue'
import Menu from '@/components/menu.vue'
import leftMenu from '@/components/leftMenu.vue'
import { MenuRoute } from '@/types/routes'
import { Menuroutes } from '@/router'

@Component({
  name: 'Index',
  components: {
    MHeader,
    Mcontainter,
    Maside,
    Menu,
    leftMenu,
    Modmain
  }
})
export default class Index extends Vue {
    public asideWidth: any = '200px';

    public Menu: MenuRoute[] = Menuroutes;
}
</script>
<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
