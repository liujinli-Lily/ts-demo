<template>
    <div class="mod-form-containter">
        <el-form :model="ruleForm" ref="ruleForm" class="demo-ruleForm" :style="{width}">
            <el-form-item
                class="mod-form-item normal"
                label="规则名称"
                prop="name"
                :rules="{required: true, message: '请输入规则名称', trigger: 'blur'}"
            >
                <el-input v-model="ruleForm.name"></el-input>
            </el-form-item>
            <el-form-item
                class="mod-form-item normal"
                label="类型"
                prop="level"
                :rules="{required: true, message: '请输入类型', trigger: 'change'}"
            >
                <el-select v-model="ruleForm.level" placeholder="类型">
                    <el-option
                        v-for="item in levellist"
                        :key="item.id"
                        :label="item.label"
                        :value="item.id"
                    />
                </el-select>
            </el-form-item>

            <div
                class="mod-append"
                v-for="(checks, index) in ruleForm.rule"
                :key="index"
                :data-index="index">
                <el-form-item
                    class="mod-form-item_append"
                    label="监控项"
                    :data-type="'rule.'+ index +'.itemid'"
                    :prop="'rule.'+ index +'.itemid'"
                    :rules="{ required: true, message: '请选择监控项',trigger: 'change' }"
                >
                    <el-select v-model="checks.itemid" placeholder="监控项">
                        <el-option
                            v-for="item in controllist"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                        />
                    </el-select>
                </el-form-item>
                <el-form-item
                    class="mod-form-item_append no-label"
                    :prop="'rule.'+ index +'.operator'"
                    :rules="{ required: true, message: '请选择条件', trigger: 'change' }"
                >
                    <el-select v-model="checks.operator" placeholder="请选择">
                        <el-option label="=" value="="/>
                        <el-option label=">" value=">"/>
                        <el-option label="<" value="<"/>
                        <el-option label=">=" value=">="/>
                        <el-option label="<=" value="<="/>
                        <el-option label="!=" value="!="/>
                    </el-select>
                </el-form-item>
                <el-form-item
                    class="mod-form-item_append no-label"
                    label=""
                    :prop="'rule.'+ index +'.result'"
                >
                    <el-input v-model="checks.result" placeholder="请填写" @keyup.native="checks.result=checks.result.replace(/^ +| +$/g,'')"></el-input>
                </el-form-item>
                <div class="mod-form-item_append min-form">
                    最近
                    <el-form-item
                        class="mod-form-item_append no-label"
                        label=""
                        :prop="'rule.'+ index +'.countm'"
                        :rules="[{validator: checkNumPre, trigger: 'blur' }
                        ]"
                    >
                        <el-input v-model.number="checks.countm"></el-input>
                    </el-form-item>
                    次中出现
                    <el-form-item
                        class="mod-form-item_append no-label"
                        label=""
                        :prop="'rule.'+ index +'.countn'"
                        :rules="[{ validator: checkNumNext, trigger: 'blur' }]"
                    >
                        <el-input v-model.number="checks.countn"></el-input>
                    </el-form-item>
                    次
                </div>
                <a v-if="ruleForm.rule.length !== 1" href="javasript:;" @click.prevent="removeDomain(checks)">删除</a>
                <a v-if="index+1 == ruleForm.rule.length" href="javasript:;" @click="addCheck">添加</a>
            </div>

            <el-form-item
                class="mod-form-item normal"
                label="触发动作"
                prop="action"
            >
                <el-select v-model="ruleForm.action" placeholder="触发动作">
                    <el-option value="0" label="无"></el-option>
                    <el-option
                        v-for="item in actionlist"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id"
                    />
                </el-select>
            </el-form-item>
            <el-form-item class="g-clearfix">
                <el-button type="primary" @click="submitForm('ruleForm')">确定</el-button>
                <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
        </el-form>
    </div>

</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Action, State } from 'vuex-class';
import { mapActions } from 'vuex';
@Component
export default class From extends Vue {
      public levellist: any[] = [{
          label: 'error',
          id: 1,
      }, {
          label: 'warning',
          id: 2,
      }]

    public ruleForm: Record<string, any> = {
        name: '',
        level: '',
        action: '0',
        rule: [{
            itemid: '',
            operator: '',
            result: '',
            countm: '',
            countn: '',
        }],
    }

    public width = '1000px'

    public controllist: any[] = [{ id: 1, name: '123' }, { id: 2, name: '2222' }];
    public actionlist: any[] = [{ id: 1, name: '123' }, { id: 2, name: '2222' }];

    public mounted () {
        // console.log(this.appendCheck[0].control,222);
    }

    public checkNumPre (rule: object, value: any, callback: any) {
        if (value === ' ' && value !== 0) {
            return callback(new Error('请输入数字值'));
        }
        if (!Number.isInteger(parseInt(value))) {
            callback(new Error('请输入数字值'));
        } else {
            if (value <= 0) {
                callback(new Error('必须大于0'));
            } else {
                callback();
            }
        }
    }

    public checkNumNext (rule: any, value: any, callback: any) {
        const { field } = rule;
        const start = field.indexOf('.countn');// 获得开始位置
        const result = field.substring(0, start);
        const _key = parseInt(result.substring(result.indexOf('.') + 1)); // 获取rule的key值
        const _countm = this.ruleForm.rule[_key].countm;
        // console.log(_countm,'222');
        if (value === ' ' && value !== 0) {
            return callback(new Error('请输入数字值'));
        }
        if (!Number.isInteger(parseInt(value))) {
            callback(new Error('请输入数字值'));
        } else {
            if (value <= 0) {
                callback(new Error('必须大于0'));
            } else if (_countm < value) {
                callback(new Error('必须小于或等于总数'));
            } else {
                callback();
            }
        }
    }

    public reset () {
        this.ruleForm.name = '';
        this.ruleForm.level = '';
        this.ruleForm.action = '0';
        this.ruleForm.rule = [{
            itemid: '',
            operator: '',
            result: '',
            countm: '',
            countn: '',
        }];
    }

    public async submitForm (formName: string): Promise<void> {
        const el: any = this.$refs[formName];
        el.validate((valid: any) => {
            if (valid) {
                console.log('success submit!!');
                // const result = this.ruleForm.rule;
            } else {
                console.log('error submit!!');
                return false;
            }
        });
    }

    public resetForm () {
        const el: any = this.$refs.ruleForm;
        el.resetFields();
    }

    public addCheck () {
        this.ruleForm.rule.push({
            itemid: '',
            operator: '',
            result: '',
            countm: '',
            countn: '',
        });
    }

    public removeDomain (item: any) {
        const index = this.ruleForm.rule.indexOf(item);
        if (index !== -1) {
            this.ruleForm.rule.splice(index, 1);
        }
    }
}
</script>

<style scoped lang="scss">
    .mod-form-containter{
        width: 100%;
        background: #fff;
        /*padding: 20px;*/
        .mod-append{
            text-align: left;
        }
    }
    .mod-block{
        margin-bottom: 15px;
        input{
            width: 320px;
        }
        textarea{
            width: 320px;
            min-height: 60px;
        }
    }
    .u-label{
        width: 120px;
        height: 32px;
        line-height: 32px;
        text-align: right;
        display: inline-block;
    }

</style>
