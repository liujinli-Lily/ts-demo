<template>
    <div>
        <div class="mod-content">
            <div class="mod-left">
                <el-tabs
                    v-if="tab"
                    v-model="activeName"
                    class="mod-case-set-tab"
                >
                    <el-tab-pane label="接口目录" name="app">
                        <div class="mock_input">
                            <el-input
                                v-model.trim="filterText"
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
                    </el-tab-pane>
                    <el-tab-pane label="标签目录" name="tag">
                        <div class="mock_input">
                            <el-input
                                v-model.trim="filterText1"
                                size="mini"
                                placeholder="标签名称"
                                suffix-icon="el-icon-search"/>
                        </div>
                        <div class="mod-tree">
                            <el-tree
                                v-if="treeDataTag.length !== 0"
                                ref="tagTree"
                                :data="treeDataTag"
                                :props="defaultPropsTag"
                                :filter-node-method="filterNodeTag"
                                :default-checked-keys="defaultCheckedTags"
                                node-key="id"
                                check-strictly
                                @node-click="handleTagClick"
                            >
                                <!-- show-checkbox  @check-change="checkChangeTag"-->
                                <div slot-scope="{ node, data }" class="custom-tree-node">
                                    <el-checkbox
                                        v-model="tagchecked[data.tag_name]"
                                        :indeterminate="taginder[data.tag_name]"
                                        class="u-check"
                                        @click.native.stop
                                        @change="checkChangeTag(data,$event)"
                                    />
                                    <div class="treeName">
                                        <span class="node_label">{{ node.label }}</span>
                                    </div>
                                </div>
                            </el-tree>
                            <div v-else class="mod-empty">
                                <EmptyContent text="暂无数据，请先创建接口"/>
                            </div>

                        </div>
                    </el-tab-pane>
                </el-tabs>
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
                    <div v-if="tab" slot="table-top">
                        <div class="mock_input mock_input_middle">
                            <el-input
                                v-model.trim="filterCase"
                                size="mini"
                                clearable
                                placeholder="搜索用例名称"
                            >
                                <el-button slot="append" type="primary" icon="el-icon-search" @click="searchCase" />
                            </el-input>
                        </div>
                    </div>
                    <template #tag="{item}">
                        <div v-if="item.tag_names">
                            <span v-for="(i, k) in item.tag_names" :key="k">
                                <el-tag v-if="k<3" type="info" class="u-tag" size="mini" >{{ i }}</el-tag>
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

<script>
import { TableSelections } from '@/mixins/TableSelections.js';
import Table from '@/components/common/Table.vue';
import EmptyContent from '@/components/common/EmptyContent';
import { DialogColumns } from './config.ts';
import {
    appdata,
    tags,
    interfaces,
    cases,
    select_tags,
    select_inter,
} from './data.ts';
export default {
    name: 'TreeSelectCase',
    components: {
        Table,
        EmptyContent,
    },
    mixins: [TableSelections],
    props: {
        tab: {
            type: Boolean,
            default: true,
        },
        caseTitle: {
            type: String | String,
            default: '用例库目录',
        },
        showChild: {
            type: Boolean,
            default: true,
        },
        caseSetData: {
            type: Object,
            default: () => ({
                case_num: 0,
                cases: [],
            }),
        },
        selectInterface: {
            type: Object,
            default: () => ({
                interfaces: [],
                app_ids: [],
            }),
        },
        defaultCheckedKeys: {
            type: Array,
            default: () => [],
        },
        defaultCheckedTags: {
            type: Array,
            default: () => [],
        },
    },
    data () {
        return {
            // 表格的数据
            soureCase: [],
            datasoure: [],
            filterText: '',
            filterText1: '',
            filterText2: '',
            filterCase: '',
            defaultProps: {
                children: 'children',
                label: 'name',
                isLeaf: 'leaf',
            },
            defaultPropsTag: {
                children: 'children',
                label: 'tag_name',
            },
            checkAll: false,
            activeName: 'app',
            currentTree: [],
            currentInterfaceId: 0,
            currentTagName: '',
            currentCaseSetid: 0,
            select: [],
            total: 0,
            pageSize: 10,
            pageNum: 1,
            checkeds: {
            },
            indeterminate: {
            },
            tagchecked: {},
            taginder: {},
            treeDataTag: [],
            unitCase: {},
            interface_sum: {},
            tag_sum: {},
            treeDataSource: [],
            findCase: [],
            columns: DialogColumns,
        };
    },
    computed: {
    },
    watch: {
        filterText1 (val) {
            this.$refs.tagTree.filter(val);
        },
        selectIds: {
            handler (ids) {
                const res = this.select;
                ids.map((item) => {
                    if (!res.includes(item)) {
                        this.select.push(item);
                    }
                });
            },
            deep: true,
        },
        datasoure: {
            handler () {
                this.setDataSource();
            },
            deep: true,
        },
        unitCase: {
            handler () {
                this.asyncSoureStatus();
            },
            deep: true,
        },
    },
    mounted () {
        this.appsList();
        this.tagList();
        this.getCase();
        this.setSelectIds();
    },
    methods: {
        getSelectIds () {
            return this.select;
        },
        setSelectIds (ids) {
            // 模拟已选中的数据
            // [41, 43, 44, 45, 46, 47, 48, 49, 50, 51]
            this.select = [41, 43, 44, 45, 46, 47, 48, 49, 50, 51];
        },
        async appsList () {
            // 获取 tree 结构数据
            this.treeDataSource = appdata;
            this.currentTree = appdata;
        },
        async getMockInterface (appid) {
            // 获取 二级tree 数据
            const result = [];
            interfaces.filter((item) => {
                if (item.app_id === appid) {
                    result.push(item);
                }
            });

            return result;
        },
        filterNodeTag (value, data, node) {
            if (!value) return true;
            return node.data.tag_name.indexOf(value) !== -1;
        },
        filterNode (value, data, node) {
            if (!value) return true;
            const _array = [];
            this.getReturnNode(node, _array, value);
            let result = false;
            _array.forEach(item => {
                result = result || item;
            });
            return result;
        },
        getReturnNode (node, _array, value) {
            const isPass = node.data && node.data.name && node.data.name.indexOf(value) !== -1;
            isPass ? _array.push(isPass) : '';
            if (!isPass && node.level !== 1 && node.parent) {
                this.getReturnNode(node.parent, _array, value);
            }
        },
        async searchChange () {
            this.findCase = [];
            this.filterText = this.filterText.replace(/\s/g, '');
            if (this.filterText === '') {
                this.treeDataSource = this.currentTree;
                return;
            }
            // 可改为从接口获取
            const res = [];
            interfaces.filter((item) => {
                if (item.name.indexOf(this.filterText) > -1) {
                    res.push(item);
                }
            });
            const result = [];
            // 符合搜索关键字的appId
            const appIds = [];
            res.forEach((item) => {
                if (!appIds.includes(item.app_id)) {
                    appIds.push(item.app_id);
                }
            });
            this.currentTree.forEach((item) => {
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
        },
        // 加载树结点
        loadNode (node, resolve) {
            const interface_id = select_inter.interfaces;
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
                    const result = [];
                    res.forEach(element => {
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
                        // if (this.$route.query.action === 'edit') {
                        interface_id.map((item) => {
                            if (item.interface_id === element.interface_id) {
                                this.$set(this.checkeds, item.interface_id, item.status === true);
                                this.$set(this.indeterminate, item.interface_id, item.status === false);
                            }
                        });
                        // }
                    });
                    resolve(result);
                });
            }, 400);
        },

        async tagList () {
            // 第二维度数据
            // if (this.$route.query.action === 'edit') {
            const selectArr = await this.getCaseTagList();
            const result = tags.map(element => {
                selectArr.map((item) => {
                    if (item.tag_id === element.id) {
                        this.$set(this.tagchecked, element.tag_name, item.status === true);
                        this.$set(this.taginder, element.tag_name, item.status === false);
                    }
                });
                return element;
            });
            // console.log(result,'222');
            this.treeDataTag = result;
            // } else {
            //   this.treeDataTag = tags
            // }
        },
        async getCaseTagList () {
            // 已选tag标签状态
            const selectids = select_tags;
            return selectids;
        },

        /**
         * 应用TREE 节点点击操作
         */
        async handleNodeClick (data, node) {
            // 树节点请求用例列表接口
            // 接口节点点击
            console.log(node)
            if (data.leaf) {
                this.datasoure = [];
                this.selectIds = [];
                this.currentInterfaceId = data.interface_id;
                const result = this.getCaseFilter(data.interface_id, false);
                this.datasoure = result;
            }
        },

        // 用例标签节点点击
        async handleTagClick (data, node) {
            console.log(data, node, 'tag')
            this.currentTagName = data.tag_name;
            this.selectIds = [];
            this.datasoure = [];
            const result = this.getCaseFilter(data.tag_name, true);
            this.datasoure = result;
        },
        /**
         * 树节点选中操作
         * */
        async handleCheckChange (data, checked) {
            const result = this.getCaseFilter(data.interface_id, false);
            this.currentInterfaceId = data.interface_id;
            const checkedArr = result.map((item) => item.id);
            const selectIds = this.select;
            if (checked) {
                // 节点选中以后点击操作，tabel全选
                if (checkedArr.length < 1) {
                    this.$message.closeAll();
                    return this.$message.error('当前接口下没有用例，请新建！');
                }
                checkedArr.map((item) => {
                    if (!selectIds.includes(item)) {
                        this.select.push(item);
                    }
                    this.selectIds.push(item);
                });
            } else {
                // 节点未选中以后点击操作
                // 用一个新的数组 存放最后的集合
                const newResult = [];
                selectIds.map((item) => {
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
        },
        /**
         *  用例标签节点选中事件 设置选中的ID
         * @param item
         * @param checked 是否被选中
         * @param childIsCheck 子节点是否有被选中的
         */
        async checkChangeTag (item, checked) {
            const result = this.getCaseFilter(item.tag_name, true);
            const checkedArr = result.map((item) => item.id);
            const selectIds = this.select;
            if (checked) {
                // 节点选中以后点击操作，tabel全选
                if (checkedArr.length < 1) {
                    this.$message.closeAll();
                    return this.$message.error('当前标签下没有用例，请新建！');
                }
                checkedArr.map((item) => {
                    if (!selectIds.includes(item)) {
                        this.select.push(item);
                    }
                    this.selectIds.push(item);
                });
            } else {
                // 节点未选中以后点击操作
                this.checkAll = false;
                // 用一个新的数组 存放最后的集合
                const newResult = [];
                selectIds.map((item) => {
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
            this.$set(this.tagchecked, item.tag_name, checked);
            this.$set(this.taginder, item.tag_name, false);
        },
        /**
         * 判断接口下的用例是否默认选中
         * */
        setDataSource () {
            const selectIds = this.select;
            const caseData = this.datasoure;
            caseData.map((item) => {
                if (selectIds.includes(item.id)) {
                    item.CHECKED = true;
                } else {
                    delete item.CHECKED;
                }
                return item;
            });
            for (const i in caseData) {
                if (!caseData[i].CHECKED) {
                    this.setTag(caseData[i], true);
                } else {
                    this.setTag(caseData[i], false);
                }
            }
            this.datasoure = caseData;
        },
        // 用例列表筛选
        async getCase () {
            this.datasoure = [];
            this.soureCase = cases;
            const data = cases;
            const interface_count = {};
            const tag_count = {};
            for (let i = 0; i < data.length; i++) {
                const ids = data[i].interface_id;
                if (interface_count[ids]) {
                    interface_count[ids]++;
                    continue;
                }
                interface_count[ids] = 1;
            }
            for (let j = 0; j < data.length; j++) {
                const tags = data[j].tag_names;
                for (const tag of tags) {
                    if (tag_count[tag]) {
                        tag_count[tag]++;
                        continue;
                    }
                    tag_count[tag] = 1;
                }
            }
            this.interface_sum = interface_count;
            this.tag_sum = tag_count;
            this.setDataSource();
        },
        getCaseFilter (val, bool = false) {
            const result = [];
            this.soureCase.filter((item) => {
                if (bool) {
                    if (item.tag_names.indexOf(val) > -1) {
                        result.push(item);
                    }
                } else {
                    if (item.interface_id === val) {
                        result.push(item);
                    }
                }
            });

            return result;
        },

        /**
         * 表格选中, 同步更新到左边的树形结构数据
         * 设置选中的id
         */
        async selectCase ({ selections, row }) {
            // quxiao
            const flag = selections.includes(row) === false;
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
        },

        /**
         * 维护一个以tags为key的对象，
         * { tagsname: [{interfaceid,caseid],[...]},{...}]
         */
        setTag (row, flag) {
            for (const tag of row.tag_names) {
                if (flag) {
                    if (this.unitCase[tag]) {
                        let index = 0;
                        const tags = this.unitCase[tag];
                        for (let i = 0; i < tags.length; i++) {
                            if (tags[i][1] === row.id) {
                                index = i;
                                this.$set(this.checkeds, tags[i][0], false);
                                this.$set(this.indeterminate, tags[i][0], false);
                                this.unitCase[tag].splice(index, 1);
                                break;
                            }
                        }
                    }
                } else {
                    if (!this.unitCase[tag]) {
                        this.unitCase[tag] = [[row.interface_id, row.id]];
                    } else {
                        const tagList = this.unitCase[tag];
                        const caseIds = tagList.map((item) => item[1]);
                        if (!caseIds.includes(row.id)) {
                            this.unitCase[tag].push([row.interface_id, row.id]);
                        }
                    }
                }
            }
        },
        // 过滤重复数据，统计接口用例选中个数
        uniqeCases (res) {
            const total = {};
            // // 统计接口选中多少用例
            const interface_count = {};
            for (const item in res) {
                const interfaces = res[item];
                for (const i in interfaces) {
                    const ids = interfaces[i][0];
                    const cases = interfaces[i][1];
                    if (!total[cases]) {
                        total[cases] = [ids];
                    }
                }
            }
            for (const i in total) {
                const ids = total[i];
                if (interface_count[ids]) {
                    interface_count[ids]++;
                    continue;
                }
                interface_count[ids] = 1;
            }
            return interface_count;
        },
        asyncSoureStatus () {
            const res = this.unitCase;
            const sum = this.tag_sum;
            const interface_count = this.uniqeCases(res);
            // console.log(interface_count, 2222);

            for (const item in res) {
                if (res[item].length < 1) {
                    this.$set(this.tagchecked, item, false);
                    this.$set(this.taginder, item, false);
                } else if (res[item].length < sum[item]) {
                    this.$set(this.tagchecked, item, false);
                    this.$set(this.taginder, item, true);
                } else if (res[item].length === sum[item]) {
                    this.$set(this.tagchecked, item, true);
                    this.$set(this.taginder, item, false);
                } else {
                    this.$set(this.tagchecked, item, false);
                    this.$set(this.taginder, item, false);
                }

                const interfaces = res[item];
                if (!interfaces || interfaces.length < 1) {
                    continue;
                }
                this.setInterfaceStatus(interfaces, interface_count);
            }
        },

        // 判断接口分类下的选择状态
        setInterfaceStatus (interfaces, interface_count) {
            const int_sum = this.interface_sum;

            // 判断接口选中状态
            for (const i in interfaces) {
                const ids = interfaces[i][0];

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
            }
        },
        // 搜索当前选中接口下的用例
        async searchCase () {
            let result = [];
            if (this.activeName === 'tag') {
                result = this.getCaseFilter(this.currentTagName, true);
            } else if (this.activeName === 'app') {
                result = this.getCaseFilter(this.currentInterfaceId, false);
            }
            const keyword = this.filterCase;
            if (!keyword) {
                this.datasoure = result;
                return;
            }
            const res = [];
            result.filter((item) => {
                if (item.name.indexOf(keyword) > -1) {
                    res.push(item);
                }
            });
            this.datasoure = res;
        },
    },
};
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
