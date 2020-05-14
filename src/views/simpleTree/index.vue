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

<script>
/* eslint-disable */
import { TableSelections } from '@/mixins/TableSelections.js'
import Table from '@/components/common/Table.vue'
import EmptyContent from '@/components/common/EmptyContent'
import { DialogColumns } from '../tree/config'
import {
  appdata,
  interfaces,
  cases,
  select_inter
} from '../tree/data'
export default {
  name: 'TreeSelectCase',
  components: {
    Table,
    EmptyContent
  },
  mixins: [TableSelections],
  props: {
    caseTitle: {
      type: String | String,
      default: '用例库目录'
    },
    caseSetData: {
      type: Object,
      default: () => ({
        case_num: 0,
        cases: []
      })
    },
    selectInterface: {
      type: Array,
      default: () => []
    },
    defaultCheckedKeys: {
      type: Array,
      default: () => []
    },
    defaultCheckedTags: {
      type: Array,
      default: () => []
    }
  },
  data () {
    return {
      // 表格的数据
        treeDataSource: [],
      datasoure: [],
      filterText: '',
      filterCase: '',
      defaultProps: {
        children: 'children',
        label: 'name',
        isLeaf: 'leaf'
      },
      checkAll: false,
      activeName: 'app',
      currentTree: {},
      currentInterfaceId: 0,
      currentCaseSetid: 0,
      select: [],
      checkeds: {
      },
      indeterminate: {
      },
        unitCase: {},
        interface_sum: {},
      columns: DialogColumns
    }
  },
  computed: {
  },
  watch: {
    filterText (val) {
      this.$refs.tree.filter(val)
    },
    selectIds: {
      handler (ids) {
        const res = this.select
        ids.map((item) => {
          if (!res.includes(item)) {
            this.select.push(item)
          }
        })
        // this.setDataSource();
      },
      deep: true
    },
      datasoure: {
          handler() {
              this.setDataSource();
          },
          deep: true,
      },
      unitCase: {
          handler() {
              this.asyncSoureStatus();
          },
          deep: true,
      },
  },
  mounted () {
    this.appsList()
      this.getCase()
  },
  methods: {
    getSelectIds () {
      return this.select
    },
    setSelectIds (ids) {
      this.select = ids
    },
      async appsList () {
          // 获取 tree 结构数据
          this.treeDataSource = appdata
          this.currentTree = appdata
      },
    async getMockInterface (appid) {
      // 获取 二级tree 数据
      const result = []
      interfaces.filter((item) => {
        if (item.app_id === appid) {
          result.push(item)
        }
      })

      return result
    },
    filterNode (value, data, node) {
      if (!value) return true
      const _array = []
      this.getReturnNode(node, _array, value)
      let result = false
      _array.forEach(item => {
        result = result || item
      })
      return result
    },
    getReturnNode (node, _array, value) {
      const isPass = node.data && node.data.name && node.data.name.indexOf(value) !== -1
      isPass ? _array.push(isPass) : ''
      if (!isPass && node.level !== 1 && node.parent) {
        this.getReturnNode(node.parent, _array, value)
      }
    },
    async searchChange () {
      this.findCase = []
      this.filterText = this.filterText.replace(/\s/g, '')
      if (this.filterText === '') {
        this.treeDataSource = this.currentTree
        return
      }
      // 可改为从接口获取
      const res = []
      interfaces.filter((item) => {
        if (item.name.indexOf(this.filterText) > -1) {
          res.push(item)
        }
      })
      const result = []
      // 符合搜索关键字的appId
      const appIds = []
      res.forEach((item) => {
        if (!appIds.includes(item.app_id)) {
          appIds.push(item.app_id)
        }
      })
      this.currentTree.forEach((item) => {
        // 如果该应用的app_id和保存的appIds 符合 说明该应用下有符合搜索关键字的接口
        if (appIds.includes(item.app_id) || item.name.indexOf(this.filterText) !== -1) {
          result.push({
            name: item.name,
            type: 'app',
            ...item,
            isLeaf: false
          })
        }
        // 关键字搜索是应用分类时
        if (!appIds.includes(item.app_id)) {
          this.findCase.push(item.app_id)
        }
      })
      this.treeDataSource = result
    },
    // 加载树结点
    loadNode (node, resolve) {
      const interface_id = select_inter
      const findCase = this.findCase
      if (node.level === 0) {
        return resolve(this.treeDataSource)
      }
      if (node.level > 1) return resolve([])
      setTimeout(() => {
        this.getMockInterface(node.data.app_id).then(res => {
          // if (res.data.Total === 0) {
          //   this.$message.closeAll()
          //   this.$message.error('当前应用下没有接口，请新建！')
          // }
          console.log(res, '11111')
          const result = []
          res.forEach(element => {
            element.leaf = true
            if (this.filterText === '') {
              result.push(element)
            } else {
              if (element.name.indexOf(this.filterText) !== -1) {
                result.push(element)
              }
              // 关键字搜索时应用分类时
              if (findCase && findCase.includes(element.app_id)) {
                result.push(element)
              }
            }
            if (this.$route.query.action === 'edit') {
              interface_id.map((item) => {
                if (item.interface_id === element.interface_id) {
                  this.$set(this.checkeds, item.interface_id, item.status === true)
                  this.$set(this.indeterminate, item.interface_id, item.status === false)
                }
              })
            }
          })
          resolve(result)
        })
      }, 400)
    },

    /**
         * 树节点选中操作
         * */
    async handleCheckChange (data, checked, ev) {
        const result = this.getCaseFilter(data.interface_id)
        this.currentInterfaceId = data.interface_id
        const checkedArr = result.map((item) => item.id)
        const selectIds = this.select
        if (checked) {
            // 节点选中以后点击操作，tabel全选
            if (checkedArr.length < 1) {
                this.$message.closeAll()
                return this.$message.error('当前接口下没有用例，请新建！')
            }
            checkedArr.map((item) => {
                if (!selectIds.includes(item)) {
                    this.select.push(item)
                }
                this.selectIds.push(item)
            })
        } else {
            // 节点未选中以后点击操作
            // 用一个新的数组 存放最后的集合
            const newResult = []
            selectIds.map((item, index) => {
                if (!checkedArr.includes(item)) {
                    newResult.push(item)
                }
            })
            this.select = newResult
            this.selectIds = []
        }
        for (const i in result) {
            this.setTag(result[i], !checked)
        }
        this.datasoure = result
        this.setDataSource()
        this.asyncSoureStatus()
        this.$set(this.checkeds, data.interface_id, checked)
        this.$set(this.indeterminate, data.interface_id, false)
    },
    /**
    * 应用TREE 节点点击操作
    */
    async handleNodeClick (data, node) {
      // 树节点请求用例列表接口
      // 接口节点点击
      if (data.leaf) {
        this.datasoure = []
        this.currentInterfaceId = data.interface_id
          const result = this.getCaseFilter(data.interface_id)
          this.datasoure = result
      }
      // console.log(data, node, 'interface');
    },
    /**
     * 判断接口下的用例是否默认选中
     * */
    setDataSource () {
      const selectIds = this.select
      const caseData = this.datasoure
      caseData.map((item) => {
        if (selectIds.includes(item.id)) {
          item.CHECKED = true
        } else {
          delete item.CHECKED
        }
        return item
      })
      this.datasoure = caseData
    },

    // 用例列表筛选
    async getCase () {
      this.datasoure = []
      this.soureCase = cases
      const data = cases
      const interface_count = {}
      for (let i = 0; i < data.length; i++) {
        const ids = data[i].interface_id
        if (interface_count[ids]) {
          interface_count[ids]++
          continue
        }
        interface_count[ids] = 1
      }
      this.interface_sum = interface_count
      this.setDataSource()
    },
    getCaseFilter (val) {
      const result = []
      this.soureCase.filter((item) => {
          if (item.interface_id === val) {
            result.push(item)
          }
      })
      return result
    },

      /**
       * 表格选中, 同步更新到左边的树形结构数据
       * 设置选中的id
       */
      async selectCase ({ selections, row }) {
          // quxiao
          const flag = selections.includes(row) === false
          this.selection(selections, 'id')
          if (flag) {
              const select = this.select
              const index = select.indexOf(row.id)
              if (index > -1) {
                  this.select.splice(index, 1)
              }
              const index_s = this.selectIds.indexOf(row.id)
              if (index_s > -1) {
                  this.selectIds.splice(index_s, 1)
              }
          }
          await this.setTag(row, flag)
          this.asyncSoureStatus()
      },
      /**
       * 维护一个以interface为key的对象，
       * {interfaceid: [1,2,1,3,4]},{...}]
       */
      setTag (row, flag) {
          if (flag) {
              if (this.unitCase[row.interface_id]) {
                  let index = 0
                  const tags = this.unitCase[row.interface_id]
                  for (let i = 0; i < tags.length; i++) {
                      if (tags[i] === row.id) {
                          index = i
                          this.$set(this.checkeds, row.interface_id, false)
                          this.$set(this.indeterminate, row.interface_id, false)
                          this.unitCase[row.interface_id].splice(index, 1)
                          break
                      }
                  }
              }
          } else {
              if (!this.unitCase[row.interface_id]) {
                  this.unitCase[row.interface_id] = [row.id]
              } else {
                  const tagList = this.unitCase[row.interface_id]
                  if (!tagList.includes(row.id)) {
                      this.unitCase[row.interface_id].push(row.id)
                  }
              }
          }
      },
      // 过滤重复数据，统计接口用例选中个数
      uniqeCases (res) {
          // // 统计接口选中多少用例
          const interface_count = {}
          for (const item in res) {
              const interfaces = res[item]
              interface_count[item] = interfaces.length;
          }
          return interface_count
      },
      asyncSoureStatus () {
          const res = this.unitCase
          const interface_count = this.uniqeCases(res)
          //console.log(interface_count, 2222);
          for (const item in res) {
              this.setInterfaceStatus(item, interface_count)
          }
      },

      // 判断接口分类下的选择状态
      setInterfaceStatus (interfaces, interface_count) {
          const int_sum = this.interface_sum

          // 判断接口选中状态
          const ids = interfaces;
          if (interface_count[ids] < 1) {
              this.$set(this.checkeds, ids, false)
              this.$set(this.indeterminate, ids, false)
          } else if (interface_count[ids] < int_sum[ids]) {
              this.$set(this.checkeds, ids, false)
              this.$set(this.indeterminate, ids, true)
          } else if (interface_count[ids] === int_sum[ids]) {
              this.$set(this.checkeds, ids, true)
              this.$set(this.indeterminate, ids, false)
          } else {
              this.$set(this.checkeds, ids, false)
              this.$set(this.indeterminate, ids, false)
          }
      },
      // 搜索当前选中接口下的用例
      async searchCase () {
          const result =  this.getCaseFilter(this.currentInterfaceId)
          const keyword = this.filterCase
          if (!keyword) {
              this.datasoure = result
              return
          }
          const res = []
          result.filter((item) => {
              if (item.name.indexOf(keyword) > -1) {
                  res.push(item)
              }
          })
          this.datasoure = res
      }
  }
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
