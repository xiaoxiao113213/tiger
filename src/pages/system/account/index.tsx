import React, { useEffect, useRef, useState } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Drawer, message, Modal, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Detail from './detail';
import AddOrUpdate from './addOrUpdate';
import getIfFlag from '@/components/Dic/IfFlagDic.ts';
import { OperateEnum } from '@/utils/enum.ts';
import { oCheckHidden } from '@/utils/utils.ts';
import { AccountItemBo } from '@/pages/system/account/ApiBo.ts';
import { accountDeleteApi, accountPageApi, restPasswordByAdminApi } from '@/pages/system/account/accountApi.tsx';


export default () => {
  let ifFlagList = getIfFlag();
  const actionRef = useRef<ActionType>();
  const [detailModal, setDetailModalFn] = useState<OperateEnum>(OperateEnum.close);
  const [detailId, setDetailIdFn] = useState<number>();

  const [addOrUpdateModal, setAddOrUpdateModalFn] = useState<OperateEnum>(OperateEnum.close);
  // 应用列表和应用列表下的菜单数据

  const initMyDataFn = async () => {
  };


  const openDetailFn = (record: AccountItemBo) => {
    setDetailIdFn(record.id);
    setDetailModalFn(OperateEnum.detail);
  };
  const openAddOrUpdateFn = (record?: AccountItemBo) => {

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


  const deleteFn = async (record: AccountItemBo) => {
    Modal?.confirm({
      title: '是否删除该条数据',
      content: record.account,
      icon: null,
      onOk: async () => {
        const res = await accountDeleteApi({ id: record?.id });
        if (res?.code !== 1000) return;
        message.success(res?.msg);
        reloadTableFn();
      },
    });
  };

  const restPasswordByAdminFn = async (record: AccountItemBo) => {
    Modal?.confirm({
      title: '是否确认重置此用户密码',
      content: record.account,
      icon: null,
      onOk: async () => {
        const res = await restPasswordByAdminApi({ id: record?.id });
        if (res?.code !== 1000) return;
        message.success(res?.msg);
        Modal?.success({
          title: '重置密码成功 密码如下 请保存',
          content: res?.data,
          icon: null,
        });
        reloadTableFn();
      },
    });
  };

  useEffect(() => {
    initMyDataFn();

  }, []); // 第二个参数表示依赖项
  const columns: ProColumns<AccountItemBo>[] = [

    {
      title: '账号',
      dataIndex: 'account',
      valueType: 'text',
      copyable: false,
    },
    {
      title: '昵称',
      dataIndex: 'nickName',
      valueType: 'text',
      copyable: false,
    },
    {
      title: '手机号',
      dataIndex: 'phone',
      valueType: 'text',
      copyable: false,
    },
    {
      title: '禁用状态',
      dataIndex: 'disabled',
      search: false,
      render: (_, { disabled }) => {
        let item = ifFlagList.find(item => item.value === disabled);
        return <Tag color={item?.color}>{item?.label}</Tag>;
      },
    },
    {
      title: '类型',
      dataIndex: 'type',
      // search: true,
      order: 1,
      initialValue: 1,
      request: async () => [{ label: '后台', value: 1 }, { label: '前台', value: 0 }],
      render: (_, { type }) => {
        if (type === 0) {
          return (<Tag color={'green'}>
            前台
          </Tag>);
        } else {
          return (<Tag color="red">
            后台
          </Tag>);
        }
      },
    },
    {
      title: '角色',
      dataIndex: 'roleNames',
      valueType: 'text',
      search: false,
    },
    {
      title: '部门',
      dataIndex: 'deptNames',
      valueType: 'text',
      search: false,
    },
    {
      title: '个人简介',
      dataIndex: 'remarks',
      ellipsis: true,
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
      width: 180,
      render: (text, record, _, action) => [

        <a key="detail" onClick={() => openDetailFn(record)}>
          详情
        </a>,

        <a key="edit" onClick={() => openAddOrUpdateFn(record)} hidden={oCheckHidden('account:edit')}>
          编辑
        </a>,

        <a key="del" onClick={() => deleteFn(record)} hidden={oCheckHidden('account:del')}>
          删除
        </a>,
        <a key="resetPsw" onClick={() => restPasswordByAdminFn(record)} style={{ color: 'red' }} hidden={oCheckHidden('account:restPwd')}>
          重置密码
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
      <ProTable<AccountItemBo>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        key={'id'}
        params={{}}
        request={async (params = {}, sort, filter) => {
          // console.log(params, sort, filter);
          let p = {
            pageNum: params.current, pageSize: params.pageSize, pageSort: sort,
          };
          // console.log("参数", params)
          let rst = await accountPageApi({ ...params, ...p });
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
        headerTitle="管理员列表"
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
            hidden={oCheckHidden("account:edit")}
          >
            新建
          </Button>,

        ]}
      />
      <Drawer
        title={'管理员详情'}
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
        title={addOrUpdateModal == OperateEnum.edit ? '管理员编辑' : '管理员新增'}
        open={addOrUpdateModal !== OperateEnum.close}
        width={'70%'}
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

