<template>
    <div class="table">
        <div
            :style="dataSource.length === 0 ? {paddingBottom: 0} : {}"
            class="table-container">
            <!--table title-->
            <h3 v-if="tableTitle" class="table-title">{{ tableTitle }}</h3>

            <!--表格上面的搜索 以及 按钮-->
            <div v-if="tableTop" class="table-top">

                <div v-if="addBtnState">
                    <el-button
                        v-for="(item, index) in addBtnState"
                        v-show="!item.hidden"
                        :key="index"
                        :type="item.type || 'primary'"
                        @click="onAdd(item)">
                        <i :class="item.icon || 'el-icon-plus'"/> {{ item.label }}
                    </el-button>
                </div>
                <slot v-else name="table-top-left"/>
                <el-input
                    v-if="showSearch"
                    :size="searchSize"
                    :placeholder="placeholder"
                    v-model="searchContent"
                    clearable
                    class="input-with-select"
                    @input="onSearchChange">
                    <template v-slot:append>
                        <el-button type="primary" icon="el-icon-search" @click="onSearch"/>
                    </template>
                </el-input>
            </div>
            <slot v-else name="table-top"/>

            <!--显示当前选中的数量-->
            <div v-if="selectionCount !== -1" class="table-alert">
                <i class="el-icon-info" style="color: #108EE9"/>
                已选择 <span>{{ selectionCount }}</span> 项
            </div>

            <!--表格渲染  :height="tableHeight" start-->
            <el-table
                ref="multipleTable"
                :border="border"
                :header-cell-class-name="headerClass"
                :data="tableDataSource"
                :height="height"
                style="width: 100%;"
                @select="onSelectRow"
                @selection-change="selectionChange"
                @select-all="selectAll">
                <template v-for="(item) in columns">

                    <!--显示普通的文字-->
                    <el-table-column
                        v-if="!item.type"
                        :label-class-name="item.labelClassName"
                        :prop="item.key"
                        :align="item.align"
                        :header-align="item.align"
                        :show-overflow-tooltip="item.nowrap"
                        :width="item.width">
                        <template #header>
                            <slot v-if="item.titleSlotName" :name="item.titleSlotName"/>
                            <div v-else>{{ item.title }}</div>
                        </template>
                        <!--单元格的内容-->
                        <template v-slot="scope">
                            <template v-if="item.slot">
                                <slot :item="scope.row" :name="item.slotName || 'cell'"/>
                            </template>
                            <div v-else-if="item.edit">
                                <span
                                    v-show="!tableEdit[scope.$index]"
                                    class="table-edit"
                                    @click="clickTableItem(scope, item)">
                                    {{ scope.row[item.key] }}
                                    <i class="el-icon-edit" @click.stop="tableEditChange(scope, true, item)"/>
                                </span>
                                <el-input
                                    v-show="tableEdit[scope.$index]"
                                    ref="editInput"
                                    v-model="tableEditValue[item.key + scope.$index]"
                                    @blur="tableEditChange(scope, false, item)"/>
                            </div>
                            <span
                                v-else
                                :style="item.style || {}"
                                @click="clickTableItem(scope, item)"
                                v-html="renderTableCell(scope, item)"/>
                        </template>
                    </el-table-column>

                    <!--显示表格的展开的内容-->
                    <el-table-column
                        v-if="item.type === 'expand' && item.expand"
                        :label="item.title"
                        type="expand">
                        <template v-slot="props">
                            <el-form label-position="left" inline class="table-expand">
                                <el-form-item
                                    v-for="(expand, expandIndex) in item.expand"
                                    :label="expand.label"
                                    :key="expandIndex">
                                    <span>{{ props.row[expand.key] }}</span>
                                </el-form-item>
                            </el-form>
                        </template>
                    </el-table-column>

                    <!--checkbox-->
                    <el-table-column
                        v-else-if="item.type === 'selection'"
                        :align="item.align"
                        :header-align="item.align"
                        :width="item.width"
                        type="selection"/>

                    <!--按钮-->
                    <el-table-column
                        v-else-if="item.type === 'operation' &&
                            item.buttonGroup &&
                            item.buttonGroup.length"
                        :align="item.align"
                        :header-align="item.align"
                        :width="item.width"
                        :label="item.title || '操作'">
                        <template v-slot="scope">
                            <el-tooltip
                                v-for="(button, btnIndex) in item.buttonGroup"
                                v-if="typeof button.show === 'function' ? button.show(scope) : true"
                                :content="button.tips"
                                :disabled="button.tips === undefined"
                                :key="btnIndex"
                                effect="dark"
                                placement="top-start">
                                <span class="table-column-button">
                                    <el-button
                                        :icon="button.icon"
                                        :class="idDisabled(button, scope) ? button.disabledClass : ''"
                                        :disabled="idDisabled(button, scope)"
                                        :size="button.size || 'mini'"
                                        :type="button.type"
                                        :plain="button.plain"
                                        @click="handlerOperation(button, scope)">
                                        {{ typeof button.label === 'function' ? button.label(scope) : button.label }}
                                    </el-button>
                                </span>
                            </el-tooltip>

                        </template>
                    </el-table-column>
                </template>

                <!--暂无数据的样式-->
                <template v-slot:empty v-if="emptyState">
                    <slot name="empty-content"/>
                </template>
            </el-table>
            <!--表格渲染 end-->

            <!--表格底部的一些控件-->
            <div v-if="tableBottom" class="table-bottom">
                <div>
                    <slot name="bottom-left"/>
                </div>
                <!--分页控件-->
                <el-pagination
                    v-if="pagingState && tableDataSource.length !== 0"
                    :page-sizes="[10, 20, 30, 40]"
                    :page-size="tablePageSize"
                    :layout="layout"
                    :total="tableTotal"
                    background
                    @size-change="sizeChange"
                    @current-change="pageChange"/>
            </div>
        </div>
        <div v-if="$slots['table-bottom-left']" class="table-bottom-left">
            <slot name="table-bottom-left"/>
        </div>
    </div>
</template>

<script>
/**
 * 对表格进行二次封装 包含分页
 * @author TianChao
 */
export default {
    name: 'Table',
    props: {
        border: {
            type: Boolean,
            default: false,
        },
        columns: {
            type: Array,
            default: () => [],
        },
        dataSource: {
            type: Array,
            default: () => [],
        },
        // 启用表格内部分页
        tablePaging: {
            type: Boolean,
            default: false,
        },
        headerClass: {
            type: String,
            default: 'table-header-style',
        },

        // 自定义表格的高度
        height: {
            type: Number,
            default: undefined,
        },

        // 修改暂无数据的样式 slot=empty-content
        emptyState: {
            type: Boolean,
            default: false,
        },

        // 控制是否显示默认的 头部一些配置
        tableTop: {
            type: Boolean,
            default: false,
        },
        // 控制是否显示默认的 底部部一些配置
        tableBottom: {
            type: Boolean,
            default: true,
        },

        // 控制是否显示默认的 表格添加按钮
        addBtnState: {
            type: Object | Boolean,
            default: () => ({ icon: null, label: '添加' }),
        },

        // 搜索框的placeholder
        placeholder: {
            type: String,
            default: '请输入内容',
        },

        // 控制是否显示分页（一下为分页控件相关的参数）
        pagingState: {
            type: Boolean,
            default: true,
        },
        total: {
            type: Number,
            default: 0,
        },
        pageSize: {
            type: Number,
            default: 10,
        },
        layout: {
            type: String,
            default: 'sizes, prev, pager, next, total',
        },
        selectionCount: {
            type: Number | Boolean,
            default: 0,
        },
        tableTitle: {
            type: String | String,
            default: false,
        },
        showSearch: {
            type: Boolean,
            default: true,
        },
        searchSize: {
            type: String,
            default: '',
        },
    },
    data () {
        return {
            searchContent: '',

            // 当前页
            currentPage: 1,

            // 页条数
            currentPageSize: 10,

            // 可编辑的单元格状态
            tableEdit: {},

            // 可编辑的单元格
            tableEditValue: {},
        };
    },
    computed: {
    /**
         * 总条数
         * @return {Number}
         */
        tableTotal () {
            if (!this.tablePaging) return this.total;
            return this.dataSource.length;
        },

        /**
         * 页条数
         * @return {Number}
         */
        tablePageSize () {
            if (!this.tablePaging) return this.pageSize;
            return this.currentPageSize;
        },

        /**
         * 表格的数据
         * @return {Array}
         */
        tableDataSource () {
            if (!this.tablePaging) return this.dataSource;

            const dataSource = this.dataSource;
            const now = this.currentPageSize * (this.currentPage - 1);
            const next = (this.currentPageSize * this.currentPage);

            return dataSource.slice(now, next);
        },
    },
    watch: {
        tableDataSource: {
            handler () {
                this.selectionAsDataSource();
                if (this.dataSource.length === 0 && this.currentPage !== 1) {
                    this.currentPage = 1;
                    this.pageChange(this.currentPage);
                }
            },
            deep: true,
        },
    },
    mounted () {
        this.selectionAsDataSource();
    },
    methods: {
    /**
         * 可编辑单元格切换显示状态
         * @param $index scope参数
         * @param row scope参数
         * @param state {Boolean} 显示的状态 false input true text
         * @param item 遍历的当前项
         */
        tableEditChange ({ $index, row }, state, item) {
            this.$set(this.tableEdit, $index, state);
            const value = row[item.key];
            const key = item.key + $index;

            this.$refs.editInput.forEach((item, index) => {
                this.$nextTick(() => {
                    if (index === $index) {
                        this.$refs.editInput[index].focus();
                    } else {
                        this.$refs.editInput[index].blur();
                    }
                });
            });

            if (state) {
                this.$set(this.tableEditValue, key, value);
            }
            if (!state) {
                const oldValue = this.tableEditValue[key];
                this.$emit('onEditTableCol', { ...item, _value: oldValue, ...row, index: $index });
            }
        },
        /**
         * 是否禁用
         */
        idDisabled (button, scope) {
            if (typeof button.disabled === 'function') {
                return button.disabled(scope);
            }
            return button.disabled || false;
        },

        /**
         * 单元格的点击事件
         */
        clickTableItem (scope, item) {
            item.click && item.click(scope, item);
        },

        /**
         * 自定义渲染表格
         */
        renderTableCell ({ row }, { key, render } = {}) {
            if (render && typeof render === 'function') {
                return render({ row: row, key });
            }

            return row[key];
        },

        /**
         * 选择对应的row (供父组件调用)
         * @param {Number} index 要选中的行
         */
        selectionRow (index) {
            this.$refs.multipleTable.toggleRowSelection(this.tableDataSource[index], true);
        },

        /**
         * 遍历dataSource 选中
         * 用于参数配置了 CHECKED 属性之后默认选中
         */
        selectionAsDataSource () {
            this.tableDataSource.forEach((item, index) => {
                if (item.CHECKED) {
                    this.$nextTick(() => this.selectionRow(index));
                }
            });
        },

        /**
         * 点击操作按钮的时候触发
         * @param button buttonGroup 的配置
         * @param scope
         */
        handlerOperation (button, scope) {
            // 回调参数类型见: @/types/table.ts TableOperation
            this.$emit('operation', { ...button, rowIndex: scope.$index });
        },

        /**
         * 选择数据时候触发
         * @param {Array} value [选中的数据]
         */
        selectionChange (value) {
            this.$emit('selection', value);
        },

        /**
         * 用户手动全选
         * @param selections 选中的数据
         */
        selectAll (selections) {
            const data = this.tableDataSource;
            for (const item of data) {
                if (selections.length === data.length) {
                    this.$emit('select', { selections: data, row: item });
                } else {
                    this.$emit('select', { selections: [], row: item });
                }
            }
        },

        /**
         * 选中某一行
         */
        onSelectRow (selections, row) {
            this.$emit('select', { selections, row });
        },

        /**
         * 分页大小发生变化
         * @param {Number} size 当前的大小
         */
        sizeChange (size) {
            this.currentPageSize = size;
            if (size * this.currentPage > this.tableDataSource.length) {
                this.currentPage = 1;
            }
            this.$emit('sizeChange', size);
        },

        /**
         * 分页
         * @param {Number} page 当前页码
         */
        pageChange (page) {
            this.currentPage = page;
            this.$emit('pageChange', page);
        },

        /**
         * 模糊搜索
         */
        onSearchChange () {
            this.$emit('onSearchChange', this.searchContent);
        },

        /**
         * 搜索
         */
        onSearch () {
            this.$emit('onSearch', this.searchContent);
        },

        /**
         * 添加 按钮
         */
        onAdd (item) {
            this.$emit('onTableTop', item);
        },
        /**
         * 清除所有已选选项 (供父组件调用)
         *
         */
        clear () {
            this.$refs.multipleTable.clearSelection();
        },
    },
};
</script>

<style lang="scss">
    .table {
        width: 100%;

        .table-bottom-left {
            padding: 18px 20px 0 20px;
            border-top: 1px solid #efefef;
        }

        .remark {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            cursor: pointer;
        }

        .table-column-button {
            margin-right: 15px;
        }
    }

    .table .table-container {
        .table-title {
            width: 90px;
            height: 25px;
            font-size: 18px;
            font-weight: 600;
            color: #555555;
            line-height: 25px;
            margin-bottom: 25px;
        }

        .el-input--suffix .el-input__inner {
            background-color: #FFFFFF;
            color: #585858;
        }

        .el-pagination {
            white-space: nowrap;
            padding: 2px 5px;
            color: #303133;
            font-weight: 700;
            display: flex;
            justify-content: flex-end;
            margin-top: 10px;

            .el-pagination__total {
                margin-right: 0;
            }
        }

        .table-top {
            width: 100%;
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 24px;

            .input-with-select {
                width: 25%;

                input {
                    /*height: 32px !important;*/
                }
            }

            .el-button--mini, .el-button--mini.is-round {
                padding: 9px 15px;
                margin-top: 10px;
            }
        }

        .table-bottom {
            margin-top: 15px;
            display: flex;
            justify-content: space-between;
            align-items: center;
        }

        .table-alert {
            width: 100%;
            color: #000000;
            padding: 9px 16px;
            font-size: 14px;
            background: rgba(230, 247, 255, 1);
            border-radius: 4px;
            border: 1px solid rgba(145, 213, 255, 1);
            font-weight: 600;
            color: rgba(0, 0, 0, 0.65);
            box-sizing: border-box;
            margin-bottom: 12px;

            span {
                color: #3695FF;
            }
        }

        .table-edit {
            cursor: pointer;

            i {
                display: none;
            }
        }

        .table-edit:hover i {
            display: inline-block;
        }
    }
</style>
