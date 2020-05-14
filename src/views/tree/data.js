/* eslint-disable */
const appdata = [
  {
    app_id: 35,
    route: '/peng',
    name: '\u5f6d\u4e8e\u664f',
    info: '',
    create_time: '2020-04-23 07:08:15',
    create_user: ''
  },
  {
    app_id: 78,
    route: '/sss',
    name: '\u5929\u4e0b\u65e0\u8d3c',
    info: '',
    create_time: '2020-04-23 07:08:15',
    create_user: ''
  },
  {
    app_id: 42,
    route: '/aaa',
    name: '\u4e0d\u8981\u5220\u9664\u8fd9\u4e2a\u5e94\u7528',
    info: '',
    create_time: '2020-04-23 07:08:15',
    create_user: ''
  }
]
const tags = [
  {
    id: 14,
    tag_name: 'asdas'
  },
  {
    id: 53,
    tag_name: 'bb'
  },
  {
    id: 15,
    tag_name: 'test1'
  },
  {
    id: 16,
    tag_name: '\u65b0\u589e\u7528\u6237\u7684\u6807\u7b7e'
  },
  {
    id: 55,
    tag_name: '\u6c89\u9c7c\u843d\u96c1'
  }
]

const interfaces = [
    {
    app_id: 105,
    interface_id: 123,
    name: '\u767b\u5f55',
    route: '/login',
    info: 'test',
    create_user: '12345678900',
    create_time: '2020-04-27T09:50:43+08:00',
    modify_user: '12345678900',
    modify_time: '2020-04-27T09:50:43+08:00',
    method: '',
    protocol: '',
    req_headers: null,
    req_body_type: '',
    req_body: '',
    req_params: null
    },
    {
    app_id: 105,
    interface_id: 122,
    name: '\u7528\u6237\u4fe1\u606f',
    route: '/userinfo',
    info: 'test\uff0c\u4e0d\u8981\u5220\u9664',
    create_user: '12345678900',
    create_time: '2020-04-27T09:49:50+08:00',
    modify_user: '12345678900',
    modify_time: '2020-04-27T09:49:50+08:00',
    method: '',
    protocol: '',
    req_headers: null,
    req_body_type: '',
    req_body: '',
    req_params: null
    },
    {
    "app_id": 35,
    "interface_id": 55,
    "name": "\u8bf7\u6c42\u5934\u540d\u79f0\u7279\u6b8a\u9a8c\u8bc1",
    "route": "/s5",
    "info": "\u4ec4\u4ec4\u4ec4\u4ec4\u4ec4\u4ec4\u4ec4\u4ec4",
    "create_user": "12345678900",
    "create_time": "2020-04-23T01:50:14+08:00",
    "modify_user": "12345678900",
    "modify_time": "2020-05-09T11:25:50+08:00",
    "method": "",
    "protocol": "",
    "req_headers": null,
    "req_body_type": "",
    "req_body": "",
    "req_params": null
    },
    {
        "app_id": 78,
        "interface_id": 110,
        "name": "\u6700\u8fd1\u5f88\u543566",
        "route": "/6564",
        "info": "",
        "create_user": "12345678900",
        "create_time": "2020-04-26T02:22:10+08:00",
        "modify_user": "12345678900",
        "modify_time": "2020-05-11T11:05:31+08:00",
        "method": "",
        "protocol": "",
        "req_headers": null,
        "req_body_type": "",
        "req_body": "",
        "req_params": null
    },
    {
        "app_id": 42,
        "interface_id": 56,
        "name": "\u6d4b\u8bd5\u63a5\u53e3",
        "route": "/aaa/ccc/ddd",
        "info": "\u6d4b\u8bd5\u63a5\u53e3",
        "create_user": "12345678900",
        "create_time": "2020-04-23T01:56:01+08:00",
        "modify_user": "12345678900",
        "modify_time": "2020-04-23T01:56:01+08:00",
        "method": "",
        "protocol": "",
        "req_headers": null,
        "req_body_type": "",
        "req_body": "",
        "req_params": null
    },
]

const cases = [
  {
    id: 111,
    project_id: '5f174bb67bfc0335451843df86c79fc41657a4bb5f1193edb4adc87c28e77218',
    app_id: 35,
    interface_id: 55,
    interface_name: '\u8bf7\u6c42\u5934\u540d\u79f0\u7279\u6b8a\u9a8c\u8bc1',
    env_id: 69,
    name: '312',
    remark: '',
    user_name: '12345678900',
    tag_names: [
      'asdas'
    ],
    req_headers: [],
    req_body: '[]',
    res_checks: [
      {
        res_type: 'response_header',
        attr: '321',
        comparison: 'large',
        target_value: '123',
        desc: ''
      }
    ],
    req_querys: [],
    casesets: '',
    created_at: '2020-05-12T10:35:12+08:00',
    updated_at: '2020-05-12T17:31:17+08:00'
  },
  {
    id: 110,
    project_id: '5f174bb67bfc0335451843df86c79fc41657a4bb5f1193edb4adc87c28e77218',
    app_id: 36,
    interface_id: 197,
    interface_name: '123',
    env_id: 76,
    name: 'fgh-\u526f\u672c',
    remark: '',
    user_name: '12345678900',
    tag_names: [
      'asdas'
    ],
    req_headers: [],
    req_body: '[]',
    res_checks: [
      {
        res_type: 'response_header',
        attr: '321',
        comparison: 'equal',
        target_value: '123',
        desc: ''
      }
    ],
    req_querys: [],
    casesets: '',
    created_at: '2020-05-11T17:26:29+08:00',
    updated_at: '2020-05-11T17:26:29+08:00'
  },
  {
    id: 109,
    project_id: '5f174bb67bfc0335451843df86c79fc41657a4bb5f1193edb4adc87c28e77218',
    app_id: 108,
    interface_id: 200,
    interface_name: 'ss',
    env_id: 75,
    name: 'aa',
    remark: '',
    user_name: '12345678900',
    tag_names: [
      '\u6c89\u9c7c\u843d\u96c1'
    ],
    req_headers: [],
    req_body: '[]',
    res_checks: [
      {
        res_type: 'response_header',
        attr: '\u662f',
        comparison: 'large',
        target_value: 's',
        desc: ''
      }
    ],
    req_querys: [],
    casesets: '',
    created_at: '2020-05-11T17:00:23+08:00',
    updated_at: '2020-05-11T17:00:23+08:00'
  },
  {
    id: 108,
    project_id: '5f174bb67bfc0335451843df86c79fc41657a4bb5f1193edb4adc87c28e77218',
    app_id: 66,
    interface_id: 201,
    interface_name: '321',
    env_id: 78,
    name: '321',
    remark: '',
    user_name: '12345678900@163.com',
    tag_names: [
      'asdas'
    ],
    req_headers: [],
    req_body: '[]',
    res_checks: [
      {
        res_type: 'response_header',
        attr: '123',
        comparison: 'large',
        target_value: '321',
        desc: ''
      }
    ],
    req_querys: [],
    casesets: '',
    created_at: '2020-05-11T17:00:03+08:00',
    updated_at: '2020-05-11T17:00:03+08:00'
  },
  {
    id: 107,
    project_id: '5f174bb67bfc0335451843df86c79fc41657a4bb5f1193edb4adc87c28e77218',
    app_id: 82,
    interface_id: 199,
    interface_name: '321',
    env_id: 77,
    name: '321',
    remark: '',
    user_name: '12345678900@163.com',
    tag_names: [
      'asdas'
    ],
    req_headers: [],
    req_body: '[]',
    res_checks: [
      {
        res_type: 'response_header',
        attr: '123',
        comparison: 'large',
        target_value: '123',
        desc: ''
      }
    ],
    req_querys: [],
    casesets: '321',
    created_at: '2020-05-11T16:56:46+08:00',
    updated_at: '2020-05-11T16:56:46+08:00'
  },
  {
    id: 106,
    project_id: '5f174bb67bfc0335451843df86c79fc41657a4bb5f1193edb4adc87c28e77218',
    app_id: 36,
    interface_id: 197,
    interface_name: '123',
    env_id: 76,
    name: 'fgh',
    remark: '',
    user_name: '12345678900',
    tag_names: [
      'asdas'
    ],
    req_headers: [],
    req_body: '[]',
    res_checks: [
      {
        res_type: 'response_header',
        attr: '321',
        comparison: 'equal',
        target_value: '123',
        desc: ''
      }
    ],
    req_querys: [],
    casesets: 'fgh',
    created_at: '2020-05-11T16:50:14+08:00',
    updated_at: '2020-05-11T17:27:01+08:00'
  },
  {
    id: 105,
    project_id: '5f174bb67bfc0335451843df86c79fc41657a4bb5f1193edb4adc87c28e77218',
    app_id: 108,
    interface_id: 196,
    interface_name: '\u5220\u9664\u63a5\u53e3\u540e\u7528\u4f8b\u662f\u5426\u88ab\u5220\u9664\u9a8c\u8bc1',
    env_id: 75,
    name: '\u7528\u4f8b\u662f\u5426\u88ab\u5220\u9664\u9a8c\u8bc1',
    remark: '',
    user_name: '12345678900',
    tag_names: [
      '\u6c89\u9c7c\u843d\u96c1'
    ],
    req_headers: [],
    req_body: '[]',
    res_checks: [
      {
        res_type: 'response_header',
        attr: ' \u6211',
        comparison: 'large',
        target_value: '\u6211',
        desc: ''
      }
    ],
    req_querys: [],
    casesets: '',
    created_at: '2020-05-11T16:42:24+08:00',
    updated_at: '2020-05-11T16:42:24+08:00'
  },
  {
    id: 103,
    project_id: '5f174bb67bfc0335451843df86c79fc41657a4bb5f1193edb4adc87c28e77218',
    app_id: 132,
    interface_id: 195,
    interface_name: '\u6b64\u7269\u6700\u76f8\u601d',
    env_id: 74,
    name: 'baby',
    remark: '',
    user_name: '12345678900',
    tag_names: [
      '\u6c89\u9c7c\u843d\u96c1'
    ],
    req_headers: [],
    req_body: '[]',
    res_checks: [
      {
        res_type: 'response_header',
        attr: 'tian',
        comparison: 'large',
        target_value: 'yue',
        desc: ''
      }
    ],
    req_querys: [],
    casesets: '\u4e0d\u80fd\u4e3b\u52a8\uff0c\u5316\u88ab\u52a8\u4e3a\u4e3b\u52a8',
    created_at: '2020-05-11T14:42:55+08:00',
    updated_at: '2020-05-11T14:42:55+08:00'
  },
  {
    id: 96,
    project_id: '5f174bb67bfc0335451843df86c79fc41657a4bb5f1193edb4adc87c28e77218',
    app_id: 35,
    interface_id: 55,
    interface_name: '\u8bf7\u6c42\u5934\u540d\u79f0\u7279\u6b8a\u9a8c\u8bc1',
    env_id: 62,
    name: '\u660e\u5929\u5c31\u653e\u5047\u4e86\u54c8\u54c8\u54c8-\u526f',
    remark: '',
    user_name: '12345678900',
    tag_names: [
      'asdas',
      'test1',
      'bb'
    ],
    req_headers: [],
    req_body: '[]',
    res_checks: [
      {
        res_type: 'response_header',
        attr: '1',
        comparison: 'large',
        target_value: '123',
        desc: ''
      },
      {
        res_type: 'response_header',
        attr: '1',
        comparison: 'large',
        target_value: '123',
        desc: ''
      }
    ],
    req_querys: [],
    casesets: '4123,22211',
    created_at: '2020-05-09T11:09:04+08:00',
    updated_at: '2020-05-12T11:50:06+08:00'
  },
  {
    id: 94,
    project_id: '5f174bb67bfc0335451843df86c79fc41657a4bb5f1193edb4adc87c28e77218',
    app_id: 35,
    interface_id: 55,
    interface_name: '\u8bf7\u6c42\u5934\u540d\u79f0\u7279\u6b8a\u9a8c\u8bc1',
    env_id: 62,
    name: '\u660e\u5929\u5c31\u653e\u5047\u4e86\u54c8\u54c8\u54c8-\u526f\u672c-\u526f\u672c-\u526f\u672c-\u526f-\u526f\u672c',
    remark: '',
    user_name: '12345678900',
    tag_names: [
      'asdas',
      'test1',
      'bb'
    ],
    req_headers: [],
    req_body: '[]',
    res_checks: [],
    req_querys: [],
    casesets: '4123,22211',
    created_at: '2020-05-08T16:18:17+08:00',
    updated_at: '2020-05-08T16:18:17+08:00'
  },
  {
    id: 93,
    project_id: '5f174bb67bfc0335451843df86c79fc41657a4bb5f1193edb4adc87c28e77218',
    app_id: 35,
    interface_id: 55,
    interface_name: '\u8bf7\u6c42\u5934\u540d\u79f0\u7279\u6b8a\u9a8c\u8bc1',
    env_id: 62,
    name: '\u660e\u5929\u5c31\u653e\u5047\u4e86\u54c8\u54c8\u54c8-\u526f\u672c-\u526f\u672c-\u526f\u672c-\u526f',
    remark: '',
    user_name: '12345678900',
    tag_names: [
      'asdas',
      'test1',
      'bb'
    ],
    req_headers: [],
    req_body: '[]',
    res_checks: [],
    req_querys: [],
    casesets: '4123,22211',
    created_at: '2020-05-07T14:51:51+08:00',
    updated_at: '2020-05-07T14:51:51+08:00'
  },
  {
    id: 92,
    project_id: '5f174bb67bfc0335451843df86c79fc41657a4bb5f1193edb4adc87c28e77218',
    app_id: 35,
    interface_id: 55,
    interface_name: '\u8bf7\u6c42\u5934\u540d\u79f0\u7279\u6b8a\u9a8c\u8bc1',
    env_id: 62,
    name: '\u660e\u5929\u5c31\u653e\u5047\u4e86\u54c8\u54c8\u54c8-\u526f\u672c-\u526f\u672c-\u526f\u672c-\u526f\u672c',
    remark: '',
    user_name: '12345678900',
    tag_names: [
      'asdas',
      'test1',
      'bb'
    ],
    req_headers: [],
    req_body: '[]',
    res_checks: [],
    req_querys: [],
    casesets: '4123,22211',
    created_at: '2020-05-07T14:51:44+08:00',
    updated_at: '2020-05-07T14:51:44+08:00'
  },
  {
    id: 55,
    project_id: '5f174bb67bfc0335451843df86c79fc41657a4bb5f1193edb4adc87c28e77218',
    app_id: 78,
    interface_id: 110,
    interface_name: '\u6700\u8fd1\u5f88\u5435',
    env_id: 39,
    name: '\u660e\u5929\u653e\u5047',
    remark: '',
    user_name: '12345678900',
    tag_names: [
      'asdas',
      'test1'
    ],
    req_headers: [],
    req_body: '[]',
    res_checks: [],
    req_querys: [],
    casesets: '',
    created_at: '2020-04-30T10:19:34+08:00',
    updated_at: '2020-04-30T10:19:34+08:00'
  },
  {
    id: 54,
    project_id: '5f174bb67bfc0335451843df86c79fc41657a4bb5f1193edb4adc87c28e77218',
    app_id: 78,
    interface_id: 95,
    interface_name: '\u65b0\u589e\u7528\u6237',
    env_id: 39,
    name: '\u660e\u5929\u653e\u5047',
    remark: '',
    user_name: '12345678900',
    tag_names: [
      'asdas',
      'test1'
    ],
    req_headers: [],
    req_body: '[]',
    res_checks: [],
    req_querys: [],
    casesets: '',
    created_at: '2020-04-30T10:18:36+08:00',
    updated_at: '2020-04-30T10:18:36+08:00'
  },
  {
    id: 52,
    project_id: '5f174bb67bfc0335451843df86c79fc41657a4bb5f1193edb4adc87c28e77218',
    app_id: 35,
    interface_id: 55,
    interface_name: '\u8bf7\u6c42\u5934\u540d\u79f0\u7279\u6b8a\u9a8c\u8bc1',
    env_id: 62,
    name: '\u660e\u5929\u5c31\u653e\u5047\u4e86\u54c8\u54c8\u54c8-\u526f\u672c-\u526f\u672c-\u526f\u672c',
    remark: '',
    user_name: '12345678900',
    tag_names: [
      'asdas',
      'test1',
      'bb'
    ],
    req_headers: [],
    req_body: '[]',
    res_checks: [],
    req_querys: [],
    casesets: '4123,22211',
    created_at: '2020-04-30T10:18:03+08:00',
    updated_at: '2020-05-07T14:51:33+08:00'
  },
  {
    id: 51,
    project_id: '5f174bb67bfc0335451843df86c79fc41657a4bb5f1193edb4adc87c28e77218',
    app_id: 35,
    interface_id: 55,
    interface_name: '\u8bf7\u6c42\u5934\u540d\u79f0\u7279\u6b8a\u9a8c\u8bc1',
    env_id: 62,
    name: '\u660e\u5929\u5c31\u653e\u5047\u4e86\u54c8\u54c8\u54c8-\u526f\u672c-\u526f\u672c',
    remark: '',
    user_name: '12345678900',
    tag_names: [
      'asdas',
      'test1'
    ],
    req_headers: [],
    req_body: '[]',
    res_checks: [],
    req_querys: [],
    casesets: '412311,22211',
    created_at: '2020-04-30T10:18:01+08:00',
    updated_at: '2020-04-30T10:18:01+08:00'
  },
  {
    id: 50,
    project_id: '5f174bb67bfc0335451843df86c79fc41657a4bb5f1193edb4adc87c28e77218',
    app_id: 35,
    interface_id: 55,
    interface_name: '\u8bf7\u6c42\u5934\u540d\u79f0\u7279\u6b8a\u9a8c\u8bc1',
    env_id: 62,
    name: '\u660e\u5929\u5c31\u653e\u5047\u4e86\u54c8\u54c8\u54c8-\u526f\u672c',
    remark: '',
    user_name: '12345678900',
    tag_names: [
      'asdas',
      'test1'
    ],
    req_headers: [],
    req_body: '[]',
    res_checks: [],
    req_querys: [],
    casesets: '412311,22211',
    created_at: '2020-04-30T10:17:59+08:00',
    updated_at: '2020-04-30T10:17:59+08:00'
  },
  {
    id: 49,
    project_id: '5f174bb67bfc0335451843df86c79fc41657a4bb5f1193edb4adc87c28e77218',
    app_id: 35,
    interface_id: 55,
    interface_name: '\u8bf7\u6c42\u5934\u540d\u79f0\u7279\u6b8a\u9a8c\u8bc1',
    env_id: 62,
    name: '\u660e\u5929\u5c31\u653e\u5047\u4e86\u54c8\u54c8\u597d\u54c8',
    remark: '',
    user_name: '12345678900',
    tag_names: [
      'asdas',
      'test1'
    ],
    req_headers: [],
    req_body: '[]',
    res_checks: [],
    req_querys: [],
    casesets: '412311,22211',
    created_at: '2020-04-30T10:17:54+08:00',
    updated_at: '2020-04-30T10:17:54+08:00'
  },
  {
    id: 48,
    project_id: '5f174bb67bfc0335451843df86c79fc41657a4bb5f1193edb4adc87c28e77218',
    app_id: 35,
    interface_id: 55,
    interface_name: '\u8bf7\u6c42\u5934\u540d\u79f0\u7279\u6b8a\u9a8c\u8bc1',
    env_id: 62,
    name: '\u660e\u5929\u5c31\u653e\u5047\u4e86\u54c8\u54c8\u54c8',
    remark: '',
    user_name: '12345678900',
    tag_names: [
      'asdas',
      'test1'
    ],
    req_headers: [],
    req_body: '[]',
    res_checks: [],
    req_querys: [],
    casesets: '412311,22211',
    created_at: '2020-04-30T10:13:34+08:00',
    updated_at: '2020-04-30T10:13:34+08:00'
  },
  {
    id: 47,
    project_id: '5f174bb67bfc0335451843df86c79fc41657a4bb5f1193edb4adc87c28e77218',
    app_id: 35,
    interface_id: 55,
    interface_name: '\u8bf7\u6c42\u5934\u540d\u79f0\u7279\u6b8a\u9a8c\u8bc1',
    env_id: 62,
    name: '\u660e\u5929\u5c31\u653e\u5047\u4e86-\u526f\u672c-\u526f\u672c-\u526f\u672c-\u526f\u672c-\u526f\u672c',
    remark: '',
    user_name: '12345678900',
    tag_names: [
      'asdas',
      'test1'
    ],
    req_headers: [],
    req_body: '[]',
    res_checks: [],
    req_querys: [],
    casesets: '412311,22211',
    created_at: '2020-04-30T10:13:20+08:00',
    updated_at: '2020-04-30T10:13:20+08:00'
  },
  {
    id: 46,
    project_id: '5f174bb67bfc0335451843df86c79fc41657a4bb5f1193edb4adc87c28e77218',
    app_id: 35,
    interface_id: 55,
    interface_name: '\u8bf7\u6c42\u5934\u540d\u79f0\u7279\u6b8a\u9a8c\u8bc1',
    env_id: 62,
    name: '\u660e\u5929\u5c31\u653e\u5047\u4e86-\u526f\u672c-\u526f\u672c-\u526f\u672c-\u526f\u672c',
    remark: '',
    user_name: '12345678900',
    tag_names: [
      'asdas',
      'test1'
    ],
    req_headers: [],
    req_body: '[]',
    res_checks: [],
    req_querys: [],
    casesets: '412311,22211',
    created_at: '2020-04-30T10:13:19+08:00',
    updated_at: '2020-04-30T10:13:19+08:00'
  },
  {
    id: 45,
    project_id: '5f174bb67bfc0335451843df86c79fc41657a4bb5f1193edb4adc87c28e77218',
    app_id: 35,
    interface_id: 55,
    interface_name: '\u8bf7\u6c42\u5934\u540d\u79f0\u7279\u6b8a\u9a8c\u8bc1',
    env_id: 62,
    name: '\u660e\u5929\u5c31\u653e\u5047\u4e86-\u526f\u672c-\u526f\u672c-\u526f\u672c',
    remark: '',
    user_name: '12345678900',
    tag_names: [
      'asdas',
      'test1'
    ],
    req_headers: [],
    req_body: '[]',
    res_checks: [],
    req_querys: [],
    casesets: '412311,22211',
    created_at: '2020-04-30T10:13:14+08:00',
    updated_at: '2020-04-30T10:13:14+08:00'
  },
  {
    id: 44,
    project_id: '5f174bb67bfc0335451843df86c79fc41657a4bb5f1193edb4adc87c28e77218',
    app_id: 35,
    interface_id: 55,
    interface_name: '\u8bf7\u6c42\u5934\u540d\u79f0\u7279\u6b8a\u9a8c\u8bc1',
    env_id: 62,
    name: '\u660e\u5929\u5c31\u653e\u5047\u4e86-\u526f\u672c-\u526f\u672c',
    remark: '',
    user_name: '12345678900',
    tag_names: [
      'asdas',
      'test1'
    ],
    req_headers: [],
    req_body: '[]',
    res_checks: [],
    req_querys: [],
    casesets: '412311,22211',
    created_at: '2020-04-30T10:13:13+08:00',
    updated_at: '2020-04-30T10:13:13+08:00'
  },
  {
    id: 43,
    project_id: '5f174bb67bfc0335451843df86c79fc41657a4bb5f1193edb4adc87c28e77218',
    app_id: 35,
    interface_id: 55,
    interface_name: '\u8bf7\u6c42\u5934\u540d\u79f0\u7279\u6b8a\u9a8c\u8bc1',
    env_id: 62,
    name: '\u660e\u5929\u5c31\u653e\u5047\u4e86-\u526f\u672c',
    remark: '',
    user_name: '12345678900',
    tag_names: [
      'asdas',
      'test1'
    ],
    req_headers: [],
    req_body: '[]',
    res_checks: [],
    req_querys: [],
    casesets: '412311,22211',
    created_at: '2020-04-30T10:13:05+08:00',
    updated_at: '2020-04-30T10:13:05+08:00'
  },
  {
    id: 41,
    project_id: '5f174bb67bfc0335451843df86c79fc41657a4bb5f1193edb4adc87c28e77218',
    app_id: 35,
    interface_id: 55,
    interface_name: '\u8bf7\u6c42\u5934\u540d\u79f0\u7279\u6b8a\u9a8c\u8bc1',
    env_id: 62,
    name: '\u660e\u5929\u5c31\u653e\u5047\u4e86',
    remark: '',
    user_name: '12345678900',
    tag_names: [
      'asdas',
      'test1'
    ],
    req_headers: [],
    req_body: '[]',
    res_checks: [],
    req_querys: [],
    casesets: '412311,22211',
    created_at: '2020-04-30T10:09:45+08:00',
    updated_at: '2020-04-30T10:09:59+08:00'
  },
  {
    id: 37,
    project_id: '5f174bb67bfc0335451843df86c79fc41657a4bb5f1193edb4adc87c28e77218',
    app_id: 42,
    interface_id: 56,
    interface_name: '\u6d4b\u8bd5\u63a5\u53e3',
    env_id: 17,
    name: '123',
    remark: '',
    user_name: '12345678900@163.com',
    tag_names: [
      'asdas'
    ],
    req_headers: [],
    req_body: '[]',
    res_checks: [],
    req_querys: [],
    casesets: '\u4e0d\u80fd\u4e3b\u52a8\uff0c\u5316\u88ab\u52a8\u4e3a\u4e3b\u52a8',
    created_at: '2020-04-29T18:03:16+08:00',
    updated_at: '2020-04-29T18:03:16+08:00'
  }
]
const select_tags =  [
    {
        "tag_id": 14,
        "status": false,
        "cases": [
            41,
            43,
            44,
            45,
            46,
            47,
            48,
            49,
            50,
            51
        ]
    },
    {
        "tag_id": 15,
        "status": false,
        "cases": [
            41,
            43,
            44,
            45,
            46,
            47,
            48,
            49,
            50,
            51
        ]
    }
];
const select_inter = {
        "app_ids": [
            35
        ],
        "interfaces": [
            {
                "interface_id": 55,
                "status": false,
                "cases": [
                    41,
                    43,
                    44,
                    45,
                    46,
                    47,
                    48,
                    49,
                    50,
                    51
                ]
            }
        ]
    };
export {
    appdata,
    tags,
    interfaces,
    cases,
    select_tags,
    select_inter
}
