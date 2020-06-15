import Moment from 'moment';
import { ButtonGroup, FormItem, TableColumn } from '@/types';

export const DialogColumns: TableColumn[] = [{
    type: 'selection',
    align: 'center',
}, {
    title: '用例名称',
    key: 'name',
    nowrap: true,
}, {
    title: '用例标签',
    key: 'caseTag',
    slot: true,
    slotName: 'tag',
    align: 'center',
}, {
    title: '创建人',
    key: 'user_name',
}, {
    title: '创建时间',
    key: 'created_at',
    render: ({ row }) => row.created_at ? Moment(row.created_at).format('YYYY-MM-DD HH:mm:ss') : '-',
}];

export const DetailsColumns = (onClickItem: any) => [{
    title: '用例名称',
    key: 'name',
    nowrap: true,
    click: onClickItem,
    style: 'color:#3293FF;cursor:pointer;',
}, {
    title: '用例标签',
    key: 'tags',
    slot: true,
    slotName: 'tag',
    nowrap: true,
}, {
    title: '所属接口',
    key: 'interface_name',
}, {
    title: '所属用例集',
    key: 'casesets',
    nowrap: true,
}, {
    title: '最后修改人',
    key: 'user_name',
}, {
    title: '创建时间',
    key: 'created_at',
    render: ({row}) => row.created_at ? Moment(row.created_at).format('YYYY-MM-DD HH:mm:ss') : '-',
}];
