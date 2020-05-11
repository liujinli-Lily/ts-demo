<template>
  <div class="home">
      <el-carousel indicator-position="outside" height="500px">
          <el-carousel-item v-for="(item) in images" :key="item.id">
              <img :src="item.src">
          </el-carousel-item>
      </el-carousel>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import { Component, Vue } from 'vue-property-decorator'
import { ImagesArray, ImagesData } from '@/types/data'

@Component({
  components: {
    HelloWorld
  }
})
export default class Home extends Vue {
    public images: ImagesArray[] = ImagesData;
}
</script>
<style>
    img{
        height: 470px;
        width: 960px;
    }
</style>
