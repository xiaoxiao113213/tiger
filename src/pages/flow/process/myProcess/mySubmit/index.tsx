import React, { useEffect, useRef, useState } from 'react';
import { processInstanceDeleteApi, processMySubmitApi } from '@/pages/flow/process/myProcess/api/processInstanceApi.tsx';
import { ProcessInstanceListVo } from '@/pages/flow/process/myProcess/api/ApiBo.ts';
import { ActionType, ProColumns, ProTable } from '@ant-design/pro-components';
import { Drawer, message, Modal, Tag } from 'antd';
import { OperateEnum } from '@/utils/enum.ts';
import AddOrUpdate from '@/pages/system/dic/addOrUpdate.tsx';
import { checkApiRst } from '@/utils/utils.ts';
import GetProcessInstanceStatusDicList from '@/components/Dic/ProcessInstanceStatusDic.ts';
import Detail from '@/pages/flow/process/myProcess/mySubmit/detail.tsx';


export default (props: { tabId: string }) => {
  const actionRef = useRef<ActionType>();
  const [detailModal, setDetailModalFn] = useState<OperateEnum>(OperateEnum.close);
  const [detailId, setDetailIdFn] = useState<number>();
  const [addOrUpdateModal, setAddOrUpdateModalFn] = useState<OperateEnum>(OperateEnum.close);
  const { processInstanceStatusMap, processInstanceStatusList } = GetProcessInstanceStatusDicList();

  const openDetailFn = (record: ProcessInstanceListVo) => {
    setDetailIdFn(record.processInstanceId);
    setDetailModalFn(OperateEnum.detail);
  };
  const openAddOrUpdateFn = (record?: ProcessInstanceListVo) => {
    setDetailIdFn(record?.processInstanceId);
    if (record) {
      setAddOrUpdateModalFn(OperateEnum.edit);
    } else {
      setAddOrUpdateModalFn(OperateEnum.add);
    }

  };
  const reloadTableFn = () => {
    actionRef.current?.reload();
  };


  const deleteDetailFn = async (item: ProcessInstanceListVo) => {
    Modal?.confirm({
      title: '是否确认撤回',
      // content: item.account,
      icon: null,
      onOk: async () => {
        let rst = await processInstanceDeleteApi({ processInstanceId: item.processInstanceId });
        if (checkApiRst(rst)) return;
        message.success(rst.msg);
        actionRef.current?.reload();
      },
    });
  };
  const initData = async () => {
  };

  useEffect(() => {
    if (props.tabId === '4') {
      initData();
      actionRef.current?.reload();
    }
  }, [props.tabId]);


  const columns: ProColumns<ProcessInstanceListVo>[] = [
    {
      title: 'ID',
      dataIndex: 'processInstanceId',
      valueType: 'text',
      copyable: false,
      search: false,
    },
    {
      title: '标题',
      dataIndex: 'title',
      valueType: 'text',
      copyable: false,
      search: false,
      render: (_, record) => {
        return <a onClick={() => openDetailFn(record)}>{record.title}</a>;
      },
    },
    {
      title: 'status',
      dataIndex: 'status',
      valueType: 'text',
      copyable: false,
      search: false,
      render: (_, { status }) => {
        let dic = processInstanceStatusList.find(i => i.value === status);
        return (<Tag color={dic?.color}> {dic?.label}  </Tag>);
      },
    },

    {
      title: '申请时间',
      dataIndex: 'createTime',
      valueType: 'text',
      copyable: false,
      search: false,
    },
    {
      title: '申请人',
      dataIndex: 'createBy',
      valueType: 'text',
      copyable: false,
      search: false,
      render: (_, item) => {
        return item.createByAccount.account;
      },
    },
    {
      title: '结束时间',
      dataIndex: 'endTime',
      valueType: 'text',
      copyable: false,
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: 120,
      render: (text, record, _, action) => [
        <a key="detail" onClick={() => openDetailFn(record)}>
          详情
        </a>,
        <a key="del" onClick={() => deleteDetailFn(record)} hidden={record.status != 1}>
          撤回
        </a>,
      ],
    },
  ];
  return (
    <div>
      <ProTable<ProcessInstanceListVo>
        columns={columns}
        actionRef={actionRef}
        cardBordered

        params={{}}
        request={async (params = {}, sort, filter) => {
          // console.log(params, sort, filter);
          // @ts-ignore
          let p: ProcessInstanceVo = { pageNum: params.current, pageSize: params.pageSize, pageSort: sort };
          // console.log("参数", params)
          let rst = await processMySubmitApi({ ...params, ...p });
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
          persistenceKey: 'processInstance-pro-table',
          persistenceType: 'localStorage',
          onChange(value) {
            // console.log('value: ', value);
          },

        }}
        rowKey="processInstanceId"
        search={{
          labelWidth: 'auto',
          // 搜索默认展开
          defaultCollapsed: false,
        }}
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
        headerTitle="配置列表"
        // showHeader={false}
        toolBarRender={() => []}
      />
      <Drawer
        title={'详情'}
        open={detailModal !== OperateEnum.close}
        width={'75%'}
        destroyOnClose={true}
        maskClosable={false}
        onClose={() => setDetailModalFn(OperateEnum.close)}
        footer={null}
      >
        <div>
          <Detail detailId={detailId!!} />
        </div>
      </Drawer>

      <Drawer
        title={addOrUpdateModal == OperateEnum.edit ? '配置编辑' : '配置新增'}
        open={addOrUpdateModal !== OperateEnum.close}
        width={'50%'}
        destroyOnClose={true}
        maskClosable={false}
        onClose={() => setAddOrUpdateModalFn(OperateEnum.close)}
        footer={null}
      >
        <div>
          <AddOrUpdate detailId={detailId ?? 0} operateEnum={addOrUpdateModal}
                       setAddOrUpdateModalFn={setAddOrUpdateModalFn}
                       reloadTable={reloadTableFn}
          />
        </div>
      </Drawer>

    </div>
  );
};


