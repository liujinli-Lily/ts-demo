<template>
    <div>
        <h3>模块滚动</h3>
        <div class="home-category">
            <div class="scroll-wrapper" ref="scroll">
                <div class="scroll-content" ref="test">
                    <div class="scroll-item" v-for="(item, index) in cateList" :key="index">
                        <p class="text">{{item}}</p>
                    </div>
                </div>
            </div>
            <div class="dot-wrapper">
                <div class="dot" :style="{'transform': `translateX(${rate})`}"></div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import BScroll from '@better-scroll/core'
@Component
export default class Page2 extends Vue {
    public rate: number | any = 0;
    public cateList: [] | any = []

    public created () {
      this.setCate()
    }

    public mounted () {
      this.init()
    }

    public init (): void {
      (this as any).bs = new BScroll((this as any).$refs.scroll, {
        scrollX: true,
        click: true,
        probeType: 3 // listening scroll hook
      })

      const totalX = Math.abs((this as any).bs.maxScrollX)

      this._registerHooks(['scroll'], (pos: any) => {
        const currentX = Math.abs(pos.x)
        this.rate = `${Number((currentX / totalX) * 100).toFixed(2)}%`
      })
    }

    public setCate (): void {
      for (let i = 0; i < 20; i++) {
        this.cateList.push(i)
      }
    }

    public _registerHooks (hookNames: any, handler: any): void {
      hookNames.forEach((name: any) => {
        (this as any).bs.on(name, handler)
      })
    }
}
</script>

<style scoped lang="scss">
    .home-category {
        .scroll-wrapper {
            width: 100%;
            white-space: nowrap;
            overflow: hidden;
        }
        .scroll-content {
            display: inline-block;
            .scroll-item {
                // box-sizing: content-box;
                height: 50px;
                font-size: 24px;
                display: inline-block;
                text-align: center;
                background: #c0f5f0;
                padding: 0 32px;
                line-height: 50px;
                margin: 0 10px;
                .text {
                    width: 88px;
                }
            }
        }
        .dot-wrapper {
            width: 80px;
            height: 4px;
            background: rgba(0, 0, 0, 0.1);
            border-radius: 3px;
            margin: 0 auto;
            margin-top: 20px;
            overflow: hidden;
            .dot {
                box-sizing: border-box;
                width: 40px;
                height: 4px;
                background: #f96c1d;
                transition: all 0.4s linear;
            }
        }
    }
</style>
