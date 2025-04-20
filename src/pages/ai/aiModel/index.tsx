import React, { useEffect, useRef, useState } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Drawer, message, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Detail from './detail';
import AddOrUpdate from './addOrUpdate';
import { aiModelDeleteApi, aiModelPageApi } from './api';
import { AiModelDetailVo } from './ApiBo';
import { OperateEnum } from '@/utils/enum.ts';
import { checkApiRst } from '@/utils/utils.ts';

export default () => {
  const actionRef = useRef<ActionType>();
  const [detailModal, setDetailModalFn] = useState<OperateEnum>(OperateEnum.close);
  const [detailId, setDetailIdFn] = useState<number>();
  const [addOrUpdateModal, setAddOrUpdateModalFn] = useState<OperateEnum>(OperateEnum.close);


  const openDetailFn = (record: AiModelDetailVo) => {
    setDetailIdFn(record.aiModelId);
    setDetailModalFn(OperateEnum.detail);
  };
  const openAddOrUpdateFn = (record?: AiModelDetailVo) => {
    setDetailIdFn(record?.aiModelId);
    if (record) {
      setAddOrUpdateModalFn(OperateEnum.edit);
    } else {
      setAddOrUpdateModalFn(OperateEnum.add);
    }

  };
  const reloadTableFn = () => {
    actionRef.current?.reload();
  };


  const deleteDetailFn = async (item: AiModelDetailVo) => {
    Modal?.confirm({
      title: '是否确认删除',
      // content: item.account,
      icon: null,
      onOk: async () => {
        let rst = await aiModelDeleteApi({ aiModelId: item.aiModelId });
        if (checkApiRst(rst)) return;
        message.success(rst.msg);
        actionRef.current?.reload();
      },
    });
  };
  useEffect(() => {
    // initData()

  }, []); // 第二个参数表示依赖项
  const columns: ProColumns<AiModelDetailVo>[] = [
    {
      title: 'ID',
      dataIndex: 'aiModelId',
      valueType: 'text',
      copyable: false,
      search: false,
    },
    {
      title: '所属平台',
      dataIndex: 'belong',
      valueType: 'text',
      copyable: false,
      search: false,
    },
    {
      title: '模型类型',
      dataIndex: 'type',
      copyable: false,
      search: false,
      render: (_, { type }) => {
        return type.join('/');
      },
    },
    {
      title: '名称',
      dataIndex: 'name',
      valueType: 'text',
      copyable: false,
      search: false,
    },
    {
      title: '模型编码',
      dataIndex: 'code',
      valueType: 'text',
      copyable: false,
      search: false,
    },
    {
      title: '上下文长度',
      dataIndex: 'contextLength',
      valueType: 'text',
      copyable: false,
      search: false,
    },
    {
      title: '最大输入量',
      dataIndex: 'maxInput',
      valueType: 'text',
      copyable: false,
      search: false,
    },
    {
      title: '最大输出量',
      dataIndex: 'maxOutput',
      valueType: 'text',
      copyable: false,
      search: false,
    },
    {
      title: '排序',
      dataIndex: 'sort',
      valueType: 'text',
      copyable: false,
      search: false,
    },
    {
      title: '说明',
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
        // <a key="detail" onClick={() => openDetailFn(record)}>
        //   详情
        // </a>,
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
      <ProTable<AiModelDetailVo>
        columns={columns}
        actionRef={actionRef}
        cardBordered

        params={{}}
        request={async (params = {}, sort, filter) => {
          // console.log(params, sort, filter);
          // @ts-ignore
          let p: AiModelDetailVo = { pageNum: params.current, pageSize: params.pageSize, pageSort: sort };
          // console.log("参数", params)
          let rst = await aiModelPageApi({ ...params, ...p });
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
          persistenceKey: 'aiModel-pro-table',
          persistenceType: 'localStorage',
          onChange(value) {
            // console.log('value: ', value);
          },

        }}
        rowKey="aiModelId"
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
        headerTitle="列表"
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
        title={addOrUpdateModal == OperateEnum.edit ? '编辑' : '新增'}
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

            