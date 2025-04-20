import React, { useEffect, useRef, useState } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Drawer, message, Modal, Tag } from 'antd';
import { checkApiRst, oCheckHidden } from '@/utils/utils.ts';
import { OperateEnum } from '@/utils/enum.ts';
import { PlusOutlined } from '@ant-design/icons';
import Detail from './detail';
import AddOrUpdate from './addOrUpdate';
import { processDeleteApi, processPageApi } from './api/processApi.tsx';
import { ProcessListVo, ProcessVo } from './api/ProcessApiBo.ts';
import ProcessEdit from '@/pages/flow/process/process/ProcessEdit';


export default () => {
  const actionRef = useRef<ActionType>();
  const [detailModal, setDetailModalFn] = useState<OperateEnum>(OperateEnum.close);
  const [detailId, setDetailIdFn] = useState<number>();
  const [detail, setDetailFn] = useState<ProcessListVo>();
  const [addOrUpdateModal, setAddOrUpdateModalFn] = useState<OperateEnum>(OperateEnum.close);
  const [configProcessModal, setConfigProcessModalFn] = useState<OperateEnum>(OperateEnum.close);


  const openDetailFn = (record: ProcessListVo) => {
    setDetailIdFn(record.processId);
    setDetailModalFn(OperateEnum.detail);
  };
  const openAddOrUpdateFn = (record?: ProcessListVo) => {
    setDetailIdFn(record?.processId);
    if (record) {
      setAddOrUpdateModalFn(OperateEnum.edit);
    } else {
      setAddOrUpdateModalFn(OperateEnum.add);
    }
  };
  const openConfigProcessFn = (record?: ProcessListVo) => {
    setDetailIdFn(record?.processId);
    setDetailFn(record);
    setConfigProcessModalFn(OperateEnum.edit);

  };


  const reloadTableFn = () => {
    actionRef.current?.reload();
  };


  const deleteDetailFn = async (item: ProcessListVo) => {
    Modal?.confirm({
      title: '是否确认删除',
      // content: item.account,
      icon: null,
      onOk: async () => {
        let rst = await processDeleteApi({ processId: item.processId });
        if (checkApiRst(rst)) return;
        message.success(rst.msg);
        actionRef.current?.reload();
      },
    });
  };
  useEffect(() => {
    // initData()

  }, []); // 第二个参数表示依赖项
  const columns: ProColumns<ProcessListVo>[] = [
    {
      title: '流程ID',
      dataIndex: 'processId',
      valueType: 'text',
      copyable: false,
      search: false,
    },
    {
      title: '名称',
      dataIndex: 'name',
      valueType: 'text',
      copyable: false,
      search: false,
    },
    // {
    //   title: '版本号',
    //   dataIndex: 'version',
    //   valueType: 'text',
    //   copyable: false,
    //   search: false,
    // },

    {
      title: '状态',
      dataIndex: 'disabled',
      valueType: 'text',
      copyable: false,
      search: false,
      render: (_, { disabled }) => {
        if (disabled === 0) {
          return (<Tag color={'green'}>
            启用
          </Tag>);
        } else {
          return (<Tag color="red">
            禁用
          </Tag>);
        }
      },
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      valueType: 'text',
      copyable: false,
      search: false,
    },
    {
      title: '更新人',
      dataIndex: 'updateBy',
      valueType: 'text',
      copyable: false,
      search: false,
      render: (_, { updateByAccount }) => {
        return updateByAccount.account;
      },
    },


    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: 180,
      render: (text, record, _, action) => [
        <a key="detail" onClick={() => openDetailFn(record)}>
          详情
        </a>,
        <a key="edit" onClick={() => openAddOrUpdateFn(record)} hidden={oCheckHidden('approvalSet:edit')}>
          编辑
        </a>,
        <a key="config" onClick={() => openConfigProcessFn(record)}  hidden={oCheckHidden('approvalSet:edit')}>
          配置流程
        </a>,
        <a key="del" onClick={() => deleteDetailFn(record)}  hidden={oCheckHidden('approvalSet:del')}>
          删除
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
    <div>
      <ProTable<ProcessListVo>
        columns={columns}
        actionRef={actionRef}
        cardBordered

        params={{}}
        request={async (params = {}, sort, filter) => {
          // console.log(params, sort, filter);
          // @ts-ignore
          let p: ProcessVo = { pageNum: params.current, pageSize: params.pageSize, pageSort: sort };
          // console.log("参数", params)
          let rst = await processPageApi({ ...params, ...p });
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
          persistenceKey: 'process-pro-table',
          persistenceType: 'localStorage',
          onChange(value) {
            // console.log('value: ', value);
          },

        }}
        rowKey="processId"
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
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              openAddOrUpdateFn();
            }}
            type="primary"
            hidden={oCheckHidden('approvalSet:edit')}
          >
            新建
          </Button>,

        ]}
      />
      <Drawer
        title={'配置详情'}
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
      <Drawer
        title={'配置流程'}
        open={configProcessModal !== OperateEnum.close}
        width={'98%'}
        destroyOnClose={true}
        maskClosable={false}
        onClose={() => {
          setConfigProcessModalFn(OperateEnum.close);
          reloadTableFn();
        }}
        footer={null}
      >
        <div>
          <ProcessEdit processId={detailId!!} processVersionId={detail?.processVersionId!!}
                       close={() => {
                         setConfigProcessModalFn(OperateEnum.close);
                         reloadTableFn();
                       }}
          ></ProcessEdit>
        </div>
      </Drawer>

    </div>
  );
};

            