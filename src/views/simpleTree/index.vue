<template>
    <div>
        <div class="mod-content">
            <div class="mod-left">
                <div class="mock_input">
                    <el-input
                        v-model="filterText"
                        size="mini"
                        placeholder="应用/接口名称"
                        suffix-icon="el-icon-search"
                        @input="searchChange"
                    />
                </div>
                <div class="mod-tree">
                    <el-tree
                        v-if="treeDataSource.length !== 0"
                        ref="tree"
                        :data="treeDataSource"
                        :props="defaultProps"
                        :load="loadNode"
                        :filter-node-method="filterNode"
                        lazy
                        @node-click="handleNodeClick"
                    >
                        <div slot-scope="{ node, data }" class="custom-tree-node">
                            <el-checkbox
                                v-if="node.level >1"
                                v-model="checkeds[data.interface_id]"
                                :indeterminate="indeterminate[data.interface_id]"
                                class="u-check"
                                @click.native.stop
                                @change="handleCheckChange(data,$event)"
                            />
                            <div class="treeName">
                                <span :class="[node.level >1 ? 'node_label child': 'node_label']">{{ node.label }}</span>
                                <span v-if="node.childNodes && node.childNodes.length > 0" class="node_num">{{ node.childNodes.length }}</span>
                            </div>
                        </div>
                    </el-tree>
                    <div v-else class="mod-empty">
                        <EmptyContent text="暂无数据，请先创建接口"/>
                    </div>
                </div>
            </div>
            <div class="mod-right">
                <Table
                    ref="caseSetTable"
                    :columns="columns"
                    :table-top="false"
                    :add-btn-state="[]"
                    :data-source="datasoure"
                    :emptyState="true"
                    :selection-count="-1"
                    :height="600"
                    :tableBottom="false"
                    @select="selectCase"
                >
                    <div slot="table-top">
                        <div class="mock_input mock_input_middle">
                            <el-input
                                v-model="filterCase"
                                size="mini"
                                placeholder="搜索用例名称"
                            >
                                <el-button slot="append" type="primary" icon="el-icon-search" @click="searchCase" />
                            </el-input>
                        </div>
                    </div>
                    <template #tag="{item}">
                        <div v-if="item.tag_names">
                            <span v-for="(i, k) in item.tag_names" :key="k">
                                <el-tag v-if="k<3" type="info" class="u-tag">{{ i }}</el-tag>
                                <span v-else class="u-ellipsis">...</span>
                            </span>
                        </div>
                        <span v-else>-</span>
                    </template>
                </Table>

            </div>
        </div>
        <div>
            已添加 <i class="u-blue">{{ select.length }}</i> 条用例
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Watch} from 'vue-property-decorator';
import { TableSelections } from '@/mixins/TableSelectionsTs.ts';
import Table from '@/components/common/Table.vue';
import EmptyContent from '@/components/common/EmptyContent.vue';
// @ts-ignore
import { DialogColumns } from '../tree/config.ts';
// @ts-ignore
import { appdata, interfaces, cases, select_inter } from '../tree/data.ts';
@Component({
    name: 'Simple',
    components: {
        Table,
        EmptyContent,
    },
})
export default class Simple extends TableSelections {
    public treeDataSource: [] | any = [];

    public datasoure: [] = [];
    public filterText = '';
    public filterCase = '';
    public defaultProps: object = {
        children: 'children',
        label: 'name',
        isLeaf: 'leaf',
    };

    public checkAll = false;
    public activeName = 'app';
    public currentTree: object | any = {};
    public currentInterfaceId = 0;
    public currentCaseSetid = 0;
    public select: [] | any = [];
    public checkeds: object = {};
    public indeterminate: object = {};
    public unitCase: object | any = {};
    public interface_sum: object = {};
    public columns: any = DialogColumns;
    public soureCase: [] | any = [];
    public findCase: [] | any = [];

    // @Prop({
    //     type: Object,
    //     required: true,
    //     default: () => ({
    //         case_num: 0,
    //         cases: [],
    //     }),
    // })
    // public caseSetData!: [] | any;

    // @Prop({ type: Array, default: [] })
    // public selectInterface: [] | any;
    //
    // @Prop({ type: Array, default: [] })
    // public defaultCheckedKeys: [] | any;
    //
    // @Prop({ type: Array, default: [] })
    // public defaultCheckedTags: [] | any;

    @Watch('filterText', { deep: true })
    public filterFn (val: string): void {
        (this as any).$refs.tree.filter(val);
    };

    @Watch('selectIds', { deep: true })
    public selectIdFilter(selects: number[]) {
        const res: []|any = this.select;
        selects.map((item) => {
            if (!res.includes(item)) {
                this.select.push(item);
                // this.setDataSource();
            }
        })
    };

    @Watch('datasoure', { deep: true })
    public asyncSetSoureData (val: string): void {
        this.setDataSource();
    };

    @Watch('unitCase', { deep: true })
    public asyncSoureState (): void {
        this.asyncSoureStatus();
    };

    public mounted(): void {
        this.appsList();
        this.getCase();
    }

    public getSelectIds () {
        return this.select;
    };

    public setSelectIds (ids: number[] | any) {
        this.select = ids;
    };

    public async appsList () {
        // 获取 tree 结构数据
        this.treeDataSource = appdata;
        this.currentTree = appdata;
    };

    public async getMockInterface (appid: any) {
        // 获取 二级tree 数据
        const result: []|any = [];
        interfaces.filter((item: any) => {
            if (item.app_id === appid) {
                result.push(item);
            }
        });
        return result;
    };

    public filterNode (value: any, data: object|any, node: object|any) {
        if (!value) return true;
        const _array: [] = [];
        this.getReturnNode(node, _array, value);
        let result = false;
        _array.forEach(item => {
            result = result || item;
        });
        return result;
    };

    public getReturnNode (node: object|any, _array: object|any, value: any) {
        const isPass: boolean = node.data && node.data.name && node.data.name.indexOf(value) !== -1;
        isPass ? _array.push(isPass) : '';
        if (!isPass && node.level !== 1 && node.parent) {
            this.getReturnNode(node.parent, _array, value);
        }
    };

    public async searchChange () {
        this.findCase = [];
        this.filterText = this.filterText.replace(/\s/g, '');
        if (this.filterText === '') {
            this.treeDataSource = this.currentTree;
            return;
        }
        // 可改为从接口获取
        const res: [] | any = [];
        interfaces.filter((item: any) => {
            if (item.name.indexOf(this.filterText) > -1) {
                res.push(item);
            }
        });
        const result: [] | any = [];
        // 符合搜索关键字的appId
        const appIds: []|any = [];
        res.forEach((item: any) => {
            if (!appIds.includes(item.app_id)) {
                appIds.push(item.app_id);
            }
        });
        this.currentTree.forEach((item: any) => {
            // 如果该应用的app_id和保存的appIds 符合 说明该应用下有符合搜索关键字的接口
            if (appIds.includes(item.app_id) || item.name.indexOf(this.filterText) !== -1) {
                result.push({
                    name: item.name,
                    type: 'app',
                    ...item,
                    isLeaf: false,
                });
            }
            // 关键字搜索是应用分类时
            if (!appIds.includes(item.app_id)) {
                this.findCase.push(item.app_id);
            }
        });
        this.treeDataSource = result;
    };

    // 加载树结点
    public loadNode (node: object| any, resolve: any) {
        const interface_id: [] | any = select_inter;
        const findCase = this.findCase;
        if (node.level === 0) {
            return resolve(this.treeDataSource);
        }
        if (node.level > 1) return resolve([]);
        setTimeout(() => {
            this.getMockInterface(node.data.app_id).then(res => {
                // if (res.data.Total === 0) {
                //   this.$message.closeAll()
                //   this.$message.error('当前应用下没有接口，请新建！')
                // }
                console.log(res, '11111');
                const result: []|any = [];
                res.forEach((element: any) => {
                    element.leaf = true;
                    if (this.filterText === '') {
                        result.push(element);
                    } else {
                        if (element.name.indexOf(this.filterText) !== -1) {
                            result.push(element);
                        }
                        // 关键字搜索时应用分类时
                        if (findCase && findCase.includes(element.app_id)) {
                            result.push(element);
                        }
                    }
                    if (this.$route.query.action === 'edit') {
                        interface_id.map((item: any) => {
                            if (item.interface_id === element.interface_id) {
                                this.$set(this.checkeds, item.interface_id, item.status === true);
                                this.$set(this.indeterminate, item.interface_id, item.status === false);
                            }
                        });
                    }
                });
                resolve(result);
            });
        }, 400);
    };

    /**
     * 树节点选中操作
     * */
    public async handleCheckChange (data: object|any, checked: any, ev: any) {
        const result: []|any = this.getCaseFilter(data.interface_id);
        this.currentInterfaceId = data.interface_id;
        const checkedArr: [] | any = result.map((item: any) => item.id);
        const selectIds: [] | any = this.select;
        if (checked) {
            // 节点选中以后点击操作，tabel全选
            if (checkedArr.length < 1) {
                (this as any).$message.closeAll();
                return this.$message.error('当前接口下没有用例，请新建！');
            }
            checkedArr.map((item: any) => {
                if (!selectIds.includes(item)) {
                    this.select.push(item);
                }
                this.selectIds.push(item);
            });
        } else {
            // 节点未选中以后点击操作
            // 用一个新的数组 存放最后的集合
            const newResult: [] | any = [];
            selectIds.map((item: any) => {
                if (!checkedArr.includes(item)) {
                    newResult.push(item);
                }
            });
            this.select = newResult;
            this.selectIds = [];
        }
        for (const i in result) {
            this.setTag(result[i], !checked);
        }
        this.datasoure = result;
        this.setDataSource();
        this.asyncSoureStatus();
        this.$set(this.checkeds, data.interface_id, checked);
        this.$set(this.indeterminate, data.interface_id, false);
    };

    /**
     * 应用TREE 节点点击操作
     */
    public async handleNodeClick (data: object | any, node: object | any) {
        // 树节点请求用例列表接口
        // 接口节点点击
        if (data.leaf) {
            this.datasoure = [];
            this.currentInterfaceId = data.interface_id;
            const result = this.getCaseFilter(data.interface_id);
            this.datasoure = result;
        }
        // console.log(data, node, 'interface');
    };

    /**
     * 判断接口下的用例是否默认选中
     * */
    public setDataSource () {
        const selectIds: [] | any = this.select;
        const caseData: []|any = this.datasoure;
        caseData.map((item: any) => {
            if (selectIds.includes(item.id)) {
                item.CHECKED = true;
            } else {
                delete item.CHECKED;
            }
            return item;
        });
        this.datasoure = caseData;
    };

    // 用例列表筛选
    public async getCase () {
        this.datasoure = [];
        this.soureCase = cases;
        const data = cases;
        const interface_count: {} | any = {};
        for (let i = 0; i < data.length; i++) {
            const ids = data[i].interface_id;
            if (interface_count[ids]) {
                interface_count[ids]++;
                continue;
            }
            interface_count[ids] = 1;
        }
        this.interface_sum = interface_count;
        this.setDataSource();
    };

    public getCaseFilter (val: any) {
        const result: [] | any = [];
        this.soureCase.filter((item: any) => {
            if (item.interface_id === val) {
                result.push(item);
            }
        });
        return result;
    };

    /**
     * 表格选中, 同步更新到左边的树形结构数据
     * 设置选中的id
     */
    // @ts-ignore
    public async selectCase ({ selections, row }) {
        // quxiao
        const flag: boolean = selections.includes(row) === false;
        this.selection(selections, 'id');
        if (flag) {
            const select = this.select;
            const index = select.indexOf(row.id);
            if (index > -1) {
                this.select.splice(index, 1);
            }
            const index_s = this.selectIds.indexOf(row.id);
            if (index_s > -1) {
                this.selectIds.splice(index_s, 1);
            }
        }
        await this.setTag(row, flag);
        this.asyncSoureStatus();
    };

    /**
     * 维护一个以interface为key的对象，
     * {interfaceid: [1,2,1,3,4]},{...}]
     */
    public setTag (row: []|any, flag: boolean) {
        if (flag) {
            if (this.unitCase[row.interface_id]) {
                let index = 0;
                const tags = this.unitCase[row.interface_id];
                for (let i = 0; i < tags.length; i++) {
                    if (tags[i] === row.id) {
                        index = i;
                        this.$set(this.checkeds, row.interface_id, false);
                        this.$set(this.indeterminate, row.interface_id, false);
                        this.unitCase[row.interface_id].splice(index, 1);
                        break;
                    }
                }
            }
        } else {
            if (!this.unitCase[row.interface_id]) {
                this.unitCase[row.interface_id] = [row.id];
            } else {
                const tagList = this.unitCase[row.interface_id];
                if (!tagList.includes(row.id)) {
                    this.unitCase[row.interface_id].push(row.id);
                }
            }
        }
    };

    // 过滤重复数据，统计接口用例选中个数
    public uniqeCases (res: any) {
        // // 统计接口选中多少用例
        const interface_count: object | any = {};
        for (const item in res) {
            const interfaces = res[item];
            interface_count[item] = interfaces.length;
        }
        return interface_count;
    };

    public asyncSoureStatus () {
        const res = this.unitCase;
        const interface_count = this.uniqeCases(res);
        // console.log(interface_count, 2222);
        for (const item in res) {
            this.setInterfaceStatus(item, interface_count);
        }
    };

    // 判断接口分类下的选择状态
    public setInterfaceStatus (interfaces: any, interface_count: any) {
        const int_sum: any = this.interface_sum;

        // 判断接口选中状态
        const ids = interfaces;
        if (interface_count[ids] < 1) {
            this.$set(this.checkeds, ids, false);
            this.$set(this.indeterminate, ids, false);
        } else if (interface_count[ids] < int_sum[ids]) {
            this.$set(this.checkeds, ids, false);
            this.$set(this.indeterminate, ids, true);
        } else if (interface_count[ids] === int_sum[ids]) {
            this.$set(this.checkeds, ids, true);
            this.$set(this.indeterminate, ids, false);
        } else {
            this.$set(this.checkeds, ids, false);
            this.$set(this.indeterminate, ids, false);
        }
    };

    // 搜索当前选中接口下的用例
    public async searchCase () {
        const result: [] | any = this.getCaseFilter(this.currentInterfaceId);
        const keyword = this.filterCase;
        if (!keyword) {
            this.datasoure = result;
            return;
        }
        const res: [] | any = [];
        result.filter((item: any) => {
            if (item.name.indexOf(keyword) > -1) {
                res.push(item);
            }
        });
        this.datasoure = res;
    };
}
</script>

<style scoped lang="scss">
    i{
        font-style: normal;
    }
    .u-blue{
        color: #409EFF;
    }
    .mod-content{
        display: flex;
        margin-bottom: 15px;
    }
    .mod-left{
        border: 1px solid #e0e0e0;
        width: 250px;
        .m-tab{
            height:40px;
            background:rgba(231,234,237,1);
            color:rgba(85,85,85,1);
            line-height: 40px;
            padding: 0 15px;
            margin-bottom: 15px;
        }
        .custom-tree-node{
            width: 100%;
        }
        .u-check{
            float: left;
            margin-right: 8px;
        }
        .node_label{
            float: left;
            color: #777;
            font-size:14px;
            max-width: 200px;
            overflow: hidden;
            text-overflow:ellipsis;
            white-space: nowrap;
            &.child{
                max-width: 160px;
            }
        }
    }
    .mod-right{
        border: 1px solid #e0e0e0;
        width: calc(100% - 280px);
        margin-left: 20px;
        /*flex: 1;*/
        .u-tag{
            margin-right: 10px;
        }
        .u-ellipsis{

        }
    }
    .mock_input{
        padding: 0 15px;
        margin-bottom: 10px;
        &.mock_input_middle{
            width: 240px;
            padding: 0;
        }
    }
    .mod-tree{
        //height: 600px;
        min-height: 400px;
        max-height: 700px;
        width: 250px;
        padding: 0 10px;
        overflow: auto;
        &::-webkit-scrollbar {
            width: 5px;
            height: 10px;
            border-radius: 5px;
            background: #f1f2f3;
        }
        &::-webkit-scrollbar-thumb {
            width: 3px;
            background: #c2c3c4;
        }
        .m-check-all{
            padding: 0 24px;
        }
        .node_num {
            color: #D0D0D0;
            font-size:14px;
            margin: 0 0 0 6px;
        }
    }
    .mod-empty{
        padding-top: 150px;
    }
</style>
