import React, { useEffect, useRef } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { message, Modal } from 'antd';
import { checkApiRst } from '@/utils/utils.ts';
import { machineTaskDeleteApi, MachineTaskDetailVo, machineTaskPageApi } from '@/pages/machine/machine/machineTaskApi.tsx';
import { getUserToken } from '@/store/userStore.ts';

export default (props: { machineId: number }) => {
  const actionRef = useRef<ActionType>();

  const downloadFn = (record: MachineTaskDetailVo) => {
    const url = import.meta.env.VITE_APP_BASE_API;
    window.open(`${url}/devops-server/machineTask/download/${record.machineTaskId}/${getUserToken()?.fileToken}`);
  };

  const deleteDetailFn = async (item: MachineTaskDetailVo) => {
    Modal?.confirm({
      title: '是否确认删除',
      // content: item.account,
      icon: null,
      onOk: async () => {
        let rst = await machineTaskDeleteApi({ machineTaskId: item.machineTaskId });
        if (checkApiRst(rst)) return;
        message.success(rst.msg);
        actionRef.current?.reload();
      },
    });
  };
  useEffect(() => {

  }, []); // 第二个参数表示依赖项
  const columns: ProColumns<MachineTaskDetailVo>[] = [
    {
      title: 'ID',
      dataIndex: 'machineTaskId',
      valueType: 'text',
      copyable: false,
      search: false,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'text',
      copyable: false,
      search: false,
      valueEnum: {
        'success': { text: '成功', status: 'Success' },
        'fail': { text: '失败', status: 'Error' },
        'running': { text: 'running', status: 'Processing' },
        'waiting': { text: 'waiting', status: 'Warning' },

      },
    }, {
      title: '类型',
      dataIndex: 'type',
      valueType: 'text',
      copyable: false,
      search: false,
      valueEnum: {
        'download': { text: '下载任务' },
        'upload': { text: '上传' },
      },
    },
    {
      title: '创建人',
      dataIndex: 'createBy',
      valueType: 'text',
      copyable: false,
      search: false,
      render: (text, record) => {
        return record.createByAccount?.nickName;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      valueType: 'text',
      copyable: false,
      search: false,
    },
    {
      title: '下载路径',
      dataIndex: 'remotePath',
      valueType: 'text',
      copyable: false,
      search: false,
    },
    {
      title: '实际开始时间',
      dataIndex: 'startTime',
      valueType: 'text',
      copyable: false,
      search: false,
    }, {
      title: '实际结束时间',
      dataIndex: 'endTime',
      valueType: 'text',
      copyable: false,
      search: false,
    },
    {
      title: '错误日志',
      dataIndex: 'errorLog',
      valueType: 'text',
      copyable: false,
      search: false,
      ellipsis: true,
    },

    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: 120,
      render: (text, record, _, action) => [
        <a key="edit" onClick={() => downloadFn(record)} hidden={record.status != 'success'}>
          下载
        </a>,
        <a key="del" onClick={() => deleteDetailFn(record)}>
          删除
        </a>,
      ],
    },
  ];
  return (
    <div>
      <ProTable<MachineTaskDetailVo>
        columns={columns}
        actionRef={actionRef}
        cardBordered

        params={{}}
        request={async (params = {}, sort, filter) => {
          // console.log(params, sort, filter);
          // @ts-ignore
          let p: MachineTaskDetailVo = { pageNum: params.current, pageSize: params.pageSize, pageSort: sort };
          // console.log("参数", params)
          let rst = await machineTaskPageApi({ ...params, ...p, machineId: props.machineId });
          return {
            data: rst.data.list,
            // success 请返回 true，
            // 不然 table 会停止解析数据，即使有数据
            success: rst.code === 1000,
            // 不传会使用 data 的长度，如果是分页一定要传
            total: rst.data.total,
          };

        }}
        editable={{
          type: 'multiple',
        }}
        columnsState={{
          persistenceKey: 'machineTask-pro-table',
          persistenceType: 'localStorage',
          onChange(value) {
            // console.log('value: ', value);
          },

        }}
        rowKey="machineTaskId"
        search={false}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        form={{
          // 地址栏是否自动写上页数
          syncToUrl: false,
        }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          // onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="列表"
        // showHeader={false}
        toolBarRender={() => [
          <span style={{ color: 'red' }}>根据结束时间一天后会被自动删除</span>,
        ]}
      />


    </div>
  );
};

            