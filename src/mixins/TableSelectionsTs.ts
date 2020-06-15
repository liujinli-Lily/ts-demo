import { Vue, Watch } from 'vue-property-decorator';

/**
 * 用于表格的Selections 用于计算存储当前选中的selections集合
 */
export class TableSelections extends Vue{

    // 当前页选中的
    public pageSelection: number[] = [];

    // 最后选中的 总数组
    public selectIds: number[] | any = [];

    /**
     * 清空
     */
    public clearSelectIds() {
        this.selectIds = [];
    }

    /**
     * 设置选中的id
     * @param rows
     * @param key 要存储的key
     */
    public selection(rows: any[], key = 'id'): void {
        let pageSelection: number[] = this.pageSelection;
        const ids = rows.map((item: any) => Number(item[key]));
        let selectIds = this.selectIds;

        if (pageSelection.length === 0 || pageSelection.length <= rows.length) {
            pageSelection = ids;
        }

        // repeats 是要从总数组删除的元素集合
        let repeats: any[] = [];
        if (pageSelection.length > ids.length && ids.length !== 0) {
            pageSelection.forEach((item: number) => {
                const idsIndex: number = ids.indexOf(item);
                if (idsIndex === -1) {
                    repeats.push(item);
                }
            });
            pageSelection = ids;
        }
        if (ids.length === 0) {
            repeats = pageSelection.map((item) => item);
            pageSelection = [];
        }
        selectIds = Array.from(new Set([...pageSelection, ...selectIds]));

        // 用一个新的数组 存放最后的集合
        const newResult: number[] = [];
        selectIds.forEach((item: any) => {
            if (!repeats.includes(item)) {
                newResult.push(item);
            }
        });
        this.pageSelection = pageSelection;
        this.selectIds = newResult;

    }

    @Watch('nowPage')
    public onPageChange(): void {
        this.pageSelection = [];
    }
}
