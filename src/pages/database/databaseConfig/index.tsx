import React, { useEffect, useRef, useState } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Drawer, message, Modal } from 'antd';

import { PlusOutlined } from '@ant-design/icons';
import Detail from './detail';
import AddOrUpdate from './addOrUpdate';
import { databaseConfigDeleteApi, databaseConfigPageApi } from './api';
import { DatabaseConfigListVo, DatabaseConfigVo } from './ApiBo';
import GetDatabaseTypeDicList from '@/components/Dic/DatabaseTypeDic';
import { OperateEnum } from '@/utils/enum.ts';
import { checkApiRst, oCheckHidden } from '@/utils/utils.ts';


export default () => {
  const actionRef = useRef<ActionType>();
  const [detailModal, setDetailModalFn] = useState<OperateEnum>(OperateEnum.close);
  const [detailId, setDetailIdFn] = useState<number>();
  const [addOrUpdateModal, setAddOrUpdateModalFn] = useState<OperateEnum>(OperateEnum.close);
  const { DatabaseTypeList, DatabaseTypeValueEnum, DatabaseTypeMap } = GetDatabaseTypeDicList();

  const openDetailFn = (record: DatabaseConfigListVo) => {
    setDetailIdFn(record.databaseConfigId);
    setDetailModalFn(OperateEnum.detail);
  };
  const openAddOrUpdateFn = (record?: DatabaseConfigListVo) => {
    setDetailIdFn(record?.databaseConfigId);
    if (record) {
      setAddOrUpdateModalFn(OperateEnum.edit);
    } else {
      setAddOrUpdateModalFn(OperateEnum.add);
    }

  };
  const reloadTableFn = () => {
    actionRef.current?.reload();
  };


  const deleteDetailFn = async (item: DatabaseConfigListVo) => {
    Modal?.confirm({
      title: '是否确认删除',
      // content: item.account,
      icon: null,
      onOk: async () => {
        let rst = await databaseConfigDeleteApi({ databaseConfigId: item.databaseConfigId });
        if (checkApiRst(rst)) return;
        message.success(rst.msg);
        actionRef.current?.reload();
      },
    });
  };
  useEffect(() => {
    // initData()

  }, []); // 第二个参数表示依赖项
  const columns: ProColumns<DatabaseConfigListVo>[] = [
    {
      title: '库名称',
      dataIndex: 'name',
      valueType: 'text',
      copyable: false,
      search: false,
    },
    {
      title: '类型',
      dataIndex: 'type',
      valueType: 'text',
      copyable: false,
      search: false,
      valueEnum: DatabaseTypeValueEnum,
    },
    {
      title: '连接地址',
      dataIndex: 'ip',
      valueType: 'text',
      copyable: false,
      search: false,
    },
    {
      title: '端口号',
      dataIndex: 'port',
      valueType: 'text',
      copyable: false,
      search: false,
    },
    {
      title: '用户名',
      dataIndex: 'username',
      valueType: 'text',
      copyable: false,
      search: false,
    },

    {
      title: '备注',
      dataIndex: 'remarks',
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
        <a key="edit" onClick={() => openAddOrUpdateFn(record)} hidden={oCheckHidden('databaseConfig:edit')}>
          编辑
        </a>,
        <a key="del" onClick={() => deleteDetailFn(record)} hidden={oCheckHidden('databaseConfig:del')}>
          删除
        </a>,
      ],
    },
  ];
  return (
    <div>
      <ProTable<DatabaseConfigListVo>
        columns={columns}
        actionRef={actionRef}
        cardBordered

        params={{}}
        request={async (params = {}, sort, filter) => {
          // console.log(params, sort, filter);
          // @ts-ignore
          let p: DatabaseConfigVo = { pageNum: params.current, pageSize: params.pageSize, pageSort: sort };
          // console.log("参数", params)
          let rst = await databaseConfigPageApi({ ...params, ...p });
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
          persistenceKey: 'databaseConfig-pro-table',
          persistenceType: 'localStorage',
          onChange(value) {
            // console.log('value: ', value);
          },

        }}
        rowKey="databaseConfigId"
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
            hidden={oCheckHidden('databaseConfig:edit')}
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
          <Detail detailId={detailId!!}
                  DatabaseTypeMap={DatabaseTypeMap}
          />
        </div>
      </Drawer>

      <Drawer
        title={addOrUpdateModal === OperateEnum.edit ? '配置编辑' : '配置新增'}
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
                       DatabaseTypeList={DatabaseTypeList}
          />
        </div>
      </Drawer>

    </div>
  );
};

            