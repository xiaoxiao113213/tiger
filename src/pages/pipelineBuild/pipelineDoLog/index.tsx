import React, { useEffect, useRef } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { message, Modal, Tag } from 'antd';
import { PipelineBuildBo } from '@/pages/pipeline/pipeline/api/bo.tsx';
import { pipelineBuildPageApi, pipelineBuildStopApi } from '@/pages/pipelineBuild/api/pipelineBuildApi.tsx';
import { checkApiRst } from '@/utils/utils.ts';
import { getPipelineBuildStatusEnum, PipelineBuildStatusEnum, PipelineBuildStatusMap } from '@/components/enums/PipelineBuildStatus.ts';


type Props = {
  pipelineId: number
  refresh: number
};
export default (props: Props) => {
  const actionRef = useRef<ActionType>();

  // 自定义删除操作的回调函数
  const handleDelete = (key: string, record: PipelineBuildBo) => {
    console.log('Deleting record:', key, record);
    // 在这里执行删除操作的逻辑，可以调用后端接口等
  };

  const buildDetail = (record: PipelineBuildBo) => {

  };
  const stopBuild = async (item: PipelineBuildBo) => {
    Modal?.confirm({
      title: '是否确认终止构建',
      // content: item.account,
      icon: null,
      onOk: async () => {
        let rst = await pipelineBuildStopApi({ id: item.id });
        if (checkApiRst(rst)) return;
        message.success(rst.msg);
        actionRef.current?.reload();
      },
    });
  };
  const stopShow = (item: PipelineBuildBo) => {
    let status = getPipelineBuildStatusEnum(item.buildStatus);
    let b = true;
    if (status === PipelineBuildStatusEnum.stop || status === PipelineBuildStatusEnum.success || status === PipelineBuildStatusEnum.fail
      || status === PipelineBuildStatusEnum.fail_skip
    ) {
      b = false;
    }
    return b;

  };
  useEffect(() => {
    // initData()
    const intervalId = setInterval(() => {
      actionRef.current?.reload();
    }, 2000);

    return () => {
      // 在组件卸载前执行清理操作
      clearInterval(intervalId);
    };
  }, [props.pipelineId]); // 第二个参数表示依赖项
  const columns: ProColumns<PipelineBuildBo>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'text',
      width: 48,
    },
    {
      title: 'NO',
      dataIndex: 'buildNo',
      valueType: 'text',
      width: 48,
    },
    {
      disable: true,
      title: '状态',
      dataIndex: 'buildStatus',
      search: false,
      renderFormItem: (_, { defaultRender }) => {
        return defaultRender(_);
      },
      render: (_, { buildStatus }) => {
        const status = getPipelineBuildStatusEnum(buildStatus);
        if (status === PipelineBuildStatusEnum.fail || status === PipelineBuildStatusEnum.fail_skip || status === PipelineBuildStatusEnum.stop) {
          return (<Tag color={'red'}>
            {PipelineBuildStatusMap.get(buildStatus)}
          </Tag>);
        } else {
          return (<Tag color="green">
            {PipelineBuildStatusMap.get(buildStatus)}
          </Tag>);
        }
      },
    },
    {
      title: '构建人',
      dataIndex: 'createBy',
      // copyable: true,
      ellipsis: true,
    },
    {
      title: '创建时间',
      key: 'showTime',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      sorter: true,
      hideInSearch: true,
    },
    {
      title: '开始构建时间',
      dataIndex: 'buildStartTime',
      valueType: 'dateTime',
      sorter: true,
      hideInTable: false,
    },
    {

      // valueType: 'dateTime',
      hideInTable: false,
      title: '构建时长',
      sorter: true,
      dataIndex: 'updateBy',
      //     计算下 如果没有开始 为0  如何没有结束 以当前时间减去开始时间
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <a key="detail" onClick={() => buildDetail(record)}>
          详情
        </a>,
        <div key={'stop'}>
          {stopShow(record) &&
            <a key="stop" onClick={() => stopBuild(record)} style={{ color: 'red' }}>
              终止构建
            </a>}
        </div>,
        <a key="log" onClick={() => buildDetail(record)}>
          日志
        </a>,
        <a key="rebuild" onClick={() => buildDetail(record)}>
          再次构建
        </a>,
        // <TableDropdown
        //     key="actionGroup"
        //     onSelect={(key) => handleDelete(key, record)}
        //     menus={[
        //         {key: 'copy', name: '复制'},
        //         {key: 'delete', name: '删除'},
        //     ]}
        // />,
      ],
    },
  ];
  return (
    <ProTable<PipelineBuildBo>
      columns={columns}
      actionRef={actionRef}
      cardBordered

      params={{ pipelineId: props.pipelineId }}
      request={async (params = {}, sort, filter) => {
        console.log(params, sort, filter);
        let p = {
          pipelineId: props.pipelineId, pageNum: params.current, pageSize: params.pageSize, pageSort: sort,
        };
        let rst = await pipelineBuildPageApi(p);
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
        persistenceKey: 'pro-table-singe-demos',
        persistenceType: 'localStorage',
        onChange(value) {
          console.log('value: ', value);
        },

      }}
      rowKey="id"
      search={false}
      options={{
        setting: {
          listsHeight: 400,
        },
      }}
      form={{
        syncToUrl: false,
      }}
      pagination={{
        pageSize: 10,
        onChange: (page) => console.log(page),
      }}
      dateFormatter="string"
      headerTitle="构建列表"
      // showHeader={false}
      toolBarRender={() => [
        // <Button
        //     key="button"
        //     icon={<PlusOutlined/>}
        //     onClick={() => {
        //         actionRef.current?.reload();
        //     }}
        //     type="primary"
        // >
        //     新建
        // </Button>,

      ]}
    />
  );
};

