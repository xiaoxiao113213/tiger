import React, { useEffect, useRef, useState } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Drawer, message, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Detail from './detail';
import AddOrUpdate from './addOrUpdate';
import { tableFieldDeleteApi, tableFieldPageApi } from './api';
import { TableFieldListVo, TableFieldVo } from './ApiBo';
import { OperateEnum } from '@/utils/enum.ts';
import { checkApiRst } from '@/utils/utils.ts';


export default () => {
  const actionRef = useRef<ActionType>();
  const [detailModal, setDetailModalFn] = useState<OperateEnum>(OperateEnum.close);
  const [detailId, setDetailIdFn] = useState<number>();
  const [addOrUpdateModal, setAddOrUpdateModalFn] = useState<OperateEnum>(OperateEnum.close);


  const openDetailFn = (record: TableFieldListVo) => {
    setDetailIdFn(record.tableFieldId);
    setDetailModalFn(OperateEnum.detail);
  };
  const openAddOrUpdateFn = (record?: TableFieldListVo) => {
    setDetailIdFn(record?.tableFieldId);
    if (record) {
      setAddOrUpdateModalFn(OperateEnum.edit);
    } else {
      setAddOrUpdateModalFn(OperateEnum.add);
    }

  };
  const reloadTableFn = () => {
    actionRef.current?.reload();
  };


  const deleteDetailFn = async (item: TableFieldListVo) => {
    Modal?.confirm({
      title: '是否确认删除',
      // content: item.account,
      icon: null,
      onOk: async () => {
        let rst = await tableFieldDeleteApi({ tableFieldId: item.tableFieldId });
        if (checkApiRst(rst)) return;
        message.success(rst.msg);
        actionRef.current?.reload();
      },
    });
  };
  useEffect(() => {
    // initData()

  }, []); // 第二个参数表示依赖项
  const columns: ProColumns<TableFieldListVo>[] = [
    {
      title: 'tableFieldId',
      dataIndex: 'tableFieldId',
      valueType: 'text',
      copyable: false,
      search: false,
    },
    {
      title: 'tableId',
      dataIndex: 'tableId',
      valueType: 'text',
      copyable: false,
      search: false,
    },
    {
      title: 'databaseBoardId',
      dataIndex: 'databaseBoardId',
      valueType: 'text',
      copyable: false,
      search: false,
    },
    {
      title: 'code',
      dataIndex: 'code',
      valueType: 'text',
      copyable: false,
      search: false,
    },
    {
      title: 'desc',
      dataIndex: 'desc',
      valueType: 'text',
      copyable: false,
      search: false,
    },
    {
      title: 'type',
      dataIndex: 'type',
      valueType: 'text',
      copyable: false,
      search: false,
    },
    {
      title: 'length',
      dataIndex: 'length',
      valueType: 'text',
      copyable: false,
      search: false,
    },
    {
      title: 'decimal',
      dataIndex: 'decimal',
      valueType: 'text',
      copyable: false,
      search: false,
    },
    {
      title: 'flagNotNull',
      dataIndex: 'flagNotNull',
      valueType: 'text',
      copyable: false,
      search: false,
    },
    {
      title: 'flagKey',
      dataIndex: 'flagKey',
      valueType: 'text',
      copyable: false,
      search: false,
    },
    {
      title: 'defaultValue',
      dataIndex: 'defaultValue',
      valueType: 'text',
      copyable: false,
      search: false,
    },
    {
      title: 'flagAutoIncrement',
      dataIndex: 'flagAutoIncrement',
      valueType: 'text',
      copyable: false,
      search: false,
    },
    {
      title: 'flagUnsigned',
      dataIndex: 'flagUnsigned',
      valueType: 'text',
      copyable: false,
      search: false,
    },


    // {
    //     disable: true,
    //     title: '状态',
    //     dataIndex: 'disabled',
    //     search: false,
    //     render: (_, {disabled}) => {
    //         if (disabled === 0) {
    //             return (<Tag color={"green"}>
    //                 启用
    //             </Tag>)
    //         } else {
    //             return (<Tag color='red'>
    //                 禁用
    //             </Tag>)
    //         }
    //     },
    // },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: 120,
      render: (text, record, _, action) => [
        <a key="detail" onClick={() => openDetailFn(record)}>
          详情
        </a>,
        <a key="edit" onClick={() => openAddOrUpdateFn(record)}>
          编辑
        </a>,
        <a key="del" onClick={() => deleteDetailFn(record)}>
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
      <ProTable<TableFieldListVo>
        columns={columns}
        actionRef={actionRef}
        cardBordered

        params={{}}
        request={async (params = {}, sort, filter) => {
          // console.log(params, sort, filter);
          // @ts-ignore
          let p: TableFieldVo = { pageNum: params.current, pageSize: params.pageSize, pageSort: sort };
          // console.log("参数", params)
          let rst = await tableFieldPageApi({ ...params, ...p });
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
          persistenceKey: 'tableField-pro-table',
          persistenceType: 'localStorage',
          onChange(value) {
            // console.log('value: ', value);
          },

        }}
        rowKey="tableFieldId"
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

    </div>
  );
};

            