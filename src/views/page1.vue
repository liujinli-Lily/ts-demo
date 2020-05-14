<template>
    <div>
        <div class="text-left">
            <el-form ref="form" :model="form" :rules="rules" label-width="80px">
                <el-form-item label="输入" prop="count">
                    <el-input v-model.number="form.count" class="mod-input-item" placeholder="请输入内容"></el-input>
                </el-form-item>
                <el-form-item label="">
                    <el-button @click="submit('form','decrement')" type="primary" plain>减小</el-button>
                    <el-button @click="submit('form','increment')" type="primary" plain>增加</el-button>
                </el-form-item>
            </el-form>

        </div>

    </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, State } from 'vuex-class';

function checkNum (rule: any, value: any, callback: any) {
    if (!Number.isInteger(parseInt(value))) {
        callback(new Error('请输入数字值'));
    } else {
        callback();
    }
};
const fromrules: object | any = {
    count: [
        { required: true, message: '请输入数字', validator: checkNum },
    ],
};

@Component
export default class Page1 extends Vue {
    @State public form: object | any ;
    public rules: object | any = fromrules

    @Action public jian: any;
    @Action public add: any;

    submit (refname: string, type: string) {
        const el: any = this.$refs[refname];
        el.validate(async (valid: any) => {
            if (!valid) {
                return;
            }
            if (type === 'decrement') {
                this.jian();
                return;
            }
            this.add();
        });
    }
}
</script>

<style scoped>
.mod-input-item{
    width: 120px;
}
    .text-left{
        text-align: left;
    }
</style>
