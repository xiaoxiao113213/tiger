import React, { useEffect, useRef, useState } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Drawer, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Detail from './detail';
import AddOrUpdate from './addOrUpdate';
import { OperateEnum } from '@/utils/enum.ts';
import { ApplicationVo } from '@/pages/system/application/ApiBo.ts';
import { applicationPageApi } from '@/pages/system/application/api.tsx';
import { oCheckHidden } from '@/utils/utils.ts';


export default () => {
  const actionRef = useRef<ActionType>();
  const [detailModal, setDetailModalFn] = useState<OperateEnum>(OperateEnum.close);
  const [detailId, setDetailIdFn] = useState<number>();

  const [addOrUpdateModal, setAddOrUpdateModalFn] = useState<OperateEnum>(OperateEnum.close);


  const openDetailFn = (record: ApplicationVo) => {
    setDetailIdFn(record.id);
    setDetailModalFn(OperateEnum.detail);
  };
  const openAddOrUpdateFn = (record?: ApplicationVo) => {

    setDetailIdFn(record?.id);
    if (record) {
      setAddOrUpdateModalFn(OperateEnum.edit);
    } else {
      setAddOrUpdateModalFn(OperateEnum.add);
    }

  };
  const reloadTableFn = () => {
    actionRef.current?.reload();
  };


  const deleteDetailFn = async (item: ApplicationVo) => {
    // Modal?.confirm({
    //     title: '是否确认删除',
    //     // content: item.account,
    //     icon: null,
    //     onOk: async () => {
    //         let rst = await applicationdel({id: item.id})
    //         if (checkApiRst(rst)) return
    //         message.success(rst.msg)
    //         actionRef.current?.reload()
    //     },
    // });
  };
  useEffect(() => {
    // initData()

  }, []); // 第二个参数表示依赖项
  const columns: ProColumns<ApplicationVo>[] = [

    {
      title: '名称',
      dataIndex: 'name',
      valueType: 'text',
      copyable: false,
    },
    {
      title: '编码',
      dataIndex: 'code',
      valueType: 'text',
      copyable: true,
    },
    {
      title: '排序',
      dataIndex: 'sort',
      valueType: 'text',
      search: false,
    },
    {
      disable: true,
      title: '状态',
      dataIndex: 'disabled',
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
      title: '备注',
      dataIndex: 'remarks',
      valueType: 'text',
      ellipsis: true,
      width: 80,
      search: false,
    },
    {
      title: '创建人',
      dataIndex: 'createBy',
      // copyable: true,
      ellipsis: true,
      search: false,
      render: (_, record) => {
        return record.createByAccount.account;
      },
    },
    {
      title: '创建时间',
      key: 'showTime',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      sorter: true,
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: 100,
      render: (text, record, _, action) => [
        <a key="detail" onClick={() => openDetailFn(record)}>
          详情
        </a>,
        <a key="log" onClick={() => openAddOrUpdateFn(record)} hidden={oCheckHidden('application:edit')}>
          编辑
        </a>,
        // <a key="rebuild" onClick={() => deleteDetailFn(record)}>
        //     删除
        // </a>,
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
      <ProTable<ApplicationVo>
        columns={columns}
        actionRef={actionRef}
        cardBordered

        params={{}}
        request={async (params = {}, sort, filter) => {
          // console.log(params, sort, filter);
          let p = {
            pageNum: params.current, pageSize: params.pageSize, pageSort: sort,
          };
          // console.log("参数", params)
          let rst = await applicationPageApi({ ...params, ...p });
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
            //console.log('value: ', value);
          },

        }}
        rowKey="id"
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
          syncToUrl: false,
        }}
        pagination={{
          defaultPageSize: 10,
          showSizeChanger: true,
          // onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="应用列表"
        // showHeader={false}
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              // actionRef.current?.reload();
              openAddOrUpdateFn();
            }}
            type="primary"
            hidden={oCheckHidden('application:edit')}
          >
            新建
          </Button>,

        ]}
      />
      <Drawer
        title={'应用详情'}
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
        title={addOrUpdateModal == OperateEnum.edit ? '应用编辑' : '应用新增'}
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

