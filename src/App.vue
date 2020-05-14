<template>
    <div id="app">
        <div class="main">
            <MHeader/>
            <Mcontainter >
                <Modmain>
                    <router-view/>
                </Modmain>
            </Mcontainter>
        </div>

    </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Mcontainter from '@/components/containter.vue';
import MHeader from '@/components/header.vue';
import Modmain from '@/components/main.vue';

@Component({
    name: 'Index',
    components: {
        MHeader,
        Mcontainter,
        Modmain,
    },
})
export default class Index extends Vue {
}
</script>
<style lang="scss">
@import "./assets/scss/global";
@import "./assets/scss/reset";
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
}
.main{
    background-color: #f1f2f3;
    margin-top: -80px;
    min-width: 1200px;
    overflow: auto;
    padding: 80px 0 0 0;
    box-sizing: border-box;
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
