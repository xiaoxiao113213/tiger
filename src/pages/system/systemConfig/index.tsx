import React, { useEffect, useRef, useState } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Drawer, message, Modal, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Detail from './detail';
import AddOrUpdate from './addOrUpdate';
import { systemConfigDeleteApi, systemConfigPageApi } from './api';
import { SystemConfigListVo, SystemConfigVo } from './ApiBo';
import GetSystemConfigTypeDicList from '@/components/Dic/SystemConfigTypeDic';
import { OperateEnum } from '@/utils/enum.ts';
import { checkApiRst, oCheckHidden } from '@/utils/utils.ts';


export default () => {
  const actionRef = useRef<ActionType>();
  const [detailModal, setDetailModalFn] = useState<OperateEnum>(OperateEnum.close);
  const [detailId, setDetailIdFn] = useState<number>();
  const [addOrUpdateModal, setAddOrUpdateModalFn] = useState<OperateEnum>(OperateEnum.close);
  let { SystemConfigTypeValueEnum, SystemConfigTypeMap } = GetSystemConfigTypeDicList();

  const openDetailFn = (record: SystemConfigListVo) => {
    setDetailIdFn(record.id);
    setDetailModalFn(OperateEnum.detail);
  };
  const openAddOrUpdateFn = (record?: SystemConfigListVo) => {
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


  const deleteDetailFn = async (item: SystemConfigListVo) => {
    Modal?.confirm({
      title: '是否确认删除',
      // content: item.account,
      icon: null,
      onOk: async () => {
        let rst = await systemConfigDeleteApi({ id: item.id });
        if (checkApiRst(rst)) return;
        message.success(rst.msg);
        actionRef.current?.reload();
      },
    });
  };
  useEffect(() => {
    // initData()

  }, []); // 第二个参数表示依赖项
  const columns: ProColumns<SystemConfigListVo>[] = [
    {
      title: '类型',
      dataIndex: 'type',
      valueType: 'text',
      copyable: false,
      width: 100,
      // valueEnum:SystemConfigTypeValueEnum,
      render: (_, { type }) => {
        let dic = SystemConfigTypeMap.get(type);
        return (<Tag color={dic?.color}> {dic?.label}  </Tag>);
      },
    },
    {
      title: '配置key',
      dataIndex: 'key',
      valueType: 'text',
      copyable: false,
    },
    {
      title: '配置值',
      dataIndex: 'value',
      valueType: 'text',
      copyable: false,
    },
    {
      title: '配置描述',
      dataIndex: 'remarks',
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
        <a key="edit" onClick={() => openAddOrUpdateFn(record)} hidden={oCheckHidden("systemConfig:edit")}>
          编辑
        </a>,
        <a key="del" onClick={() => deleteDetailFn(record) } hidden={oCheckHidden("systemConfig:del")}>
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
      <ProTable<SystemConfigListVo>
        columns={columns}
        actionRef={actionRef}
        cardBordered

        params={{}}
        request={async (params = {}, sort, filter) => {
          // console.log(params, sort, filter);
          // @ts-ignore
          let p: SystemConfigVo = { pageNum: params.current, pageSize: params.pageSize, pageSort: sort };
          // console.log("参数", params)
          let rst = await systemConfigPageApi({ ...params, ...p });
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
          persistenceKey: 'systemConfig-pro-table',
          persistenceType: 'localStorage',
          onChange(value) {
            // //console.log('value: ', value);
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
            hidden={oCheckHidden("systemConfig:edit")}
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

            