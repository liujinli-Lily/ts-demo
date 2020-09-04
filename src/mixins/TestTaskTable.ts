import { Vue, Component, Prop } from 'vue-property-decorator';
import { ButtonGroup, TableColumn, TableOperation } from '@/types/table';
import { DetailsColumns, TableOperationType } from '@/views/tree/config';
import { Action, State } from 'vuex-class';
import Table from '@/components/Table.vue';
import TableEmptyState from '@/components/TableEmptyState.vue';

@Component({
    components: {
        Table, TableEmptyState,
    },
})
export default class TestTaskTableMixins extends Vue {
    public columns: TableColumn[] | any = DetailsColumns;

    public pageSize = 10;

    public currentPage = 1;

    public keyword = '';

    public tableTop = true;

    public disabledIds: number[] = [];

    public addBtnState: boolean | object = { label: '创建测试任务' };

    @Action private getTestTask: any;
    @Action private deleteTestTask: any;
    @Action private runTestTask: any;
    @State private TestTask: any;

    public mounted() {
        this.init();
    }

    private init() {
        this.getTestTask({ pagesize: this.pageSize, pagenum: this.currentPage, keyword: this.keyword });
    }

    private async onSearch(searchContent: string) {
        this.keyword = searchContent;
        this.init();
    }

    /**
     * 点击表格的操作按钮
     * @param params
     */
    private async operation(params: TableOperation): Promise<void> {
        const OperationType = TableOperationType;
        const rowId: number = this.TestTask.testTaskList[params.rowIndex].Task_Id;
        switch (params.key) {
            case OperationType.DELETE:
                const state: boolean = await this.deleteTestTask(rowId);
                if (state) {
                    this.init();
                }
                break;
            case OperationType.EDIT:
                // @ts-ignore
                await this.$router.push({ path: '/test-task-edit', query: { taskId: rowId }});
                break;
            case OperationType.RUN:
                this.disabledIds.push(rowId);
                const { status, id } = await this.runTestTask({ op: 'start', test_id: rowId });
                status ? this.$message.success('运行成功') : this.$message.error('已有任务正在运行');
                if (status) {
                    await this.$router.push({ path: '/test-report-see', query: { reportId: id }});
                }
                break;
        }
    }

    private sizeChange(size: number) {
        this.pageSize = size;
        this.init();
    }

    private pageChange(page: number) {
        this.currentPage = page;
        this.init();
    }
}
