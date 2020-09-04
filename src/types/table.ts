export interface ButtonGroup {
    type?: string;

    label?: string;

    /**
     * 可用于定位当前点击的按钮
     */
    key?: any;

    size?: 'primary' | 'success' | 'warning' | 'danger' | 'info' | 'text';

    disabled?: boolean | ((scope: any) => boolean);

    /**
     * 自定义的禁用样式
     */
    disabledClass?: 'disabled-style-primary' | string;

    icon?: string;

    /**
     * 按钮的hover提升文字
     */
    tips?: string;

    /**
     * 是否隐藏
     */
    hidden?: boolean;

    /**
     * loading
     */
    loading?: true;

    clickTime?: number;
}

interface Expand {
    label: string | number;

    key: string | number;
}

// tslint:disable-next-line:class-name
interface renderParams {
    /**
     * 当前行的数据
     */
    row: object | any;

    /**
     * 当前对应列的key
     */
    key: string;
}

export interface TableColumn {
    title?: string;

    key?: string | number;

    type?: 'selection' | 'operation' | 'expand' | undefined;

    width?: number;

    align?: 'left' | 'center' | 'right';

    /**
     * 按钮组 （type = "operation"）时有效
     */
    buttonGroup?: ButtonGroup[];

    /**
     * 表格展开的内容 （type = "expand"）时有效
     */
    expand?: Expand[];

    /**
     * 给当前列的所有单元格添加样式名称
     */
    className?: string;

    /**
     * 给当前表格的表头添加class
     */
    labelClassName?: string;

    /**
     * 为当前列添加样式
     */
    style?: object;

    /**
     * 自定义渲染 可返回HTML
     */
    render?: (params: renderParams) => string;

    /**
     * 是否换行
     */
    nowrap?: boolean;

    /**
     * 是否需要slot
     * */
    slot?: boolean;

    slotName?: string;
}

/**
 * 点击表的的操作按钮的回调参数
 */
export interface TableOperation extends ButtonGroup {

    /**
     * 当前行的索引
     */
    rowIndex: number;
}
