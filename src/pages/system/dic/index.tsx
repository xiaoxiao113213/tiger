import React, { useEffect, useRef, useState } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Drawer, message, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AddOrUpdate from './addOrUpdate';
import DicValue from '@/pages/system/dic/dicValue';
import { OperateEnum } from '@/utils/enum.ts';
import { dicDel, dicPage, DicVo } from '@/pages/system/dic/dicApi.tsx';
import { checkApiRst, oCheckHidden } from '@/utils/utils.ts';


export default () => {
  const actionRef = useRef<ActionType>();
  const [detailModal, setDetailModalFn] = useState<OperateEnum>(OperateEnum.close);
  const [detailId, setDetailIdFn] = useState<number>();

  const [addOrUpdateModal, setAddOrUpdateModalFn] = useState<OperateEnum>(OperateEnum.close);
  const [dicValueModal, setDicValueModalFn] = useState<OperateEnum>(OperateEnum.close);


  const openDetailFn = (record: DicVo) => {
    setDetailIdFn(record.id);
    setDetailModalFn(OperateEnum.detail);
  };
  const openAddOrUpdateFn = (record?: DicVo) => {
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


  const handleModelDetailDicValueOpen = async (record: any) => {
    // const data = await getDetail(record?.id);
    // if (!data) return;
    // setOpType(OperateEnum.detail);
    // setOpen(true);
    setDetailIdFn(record.id);
    setDicValueModalFn(OperateEnum.detail);

  };


  const deleteDetailFn = async (item: DicVo) => {
    Modal?.confirm({
      title: '是否确认删除',
      // content: item.account,
      icon: null,
      onOk: async () => {
        let rst = await dicDel({ id: item.id });
        if (checkApiRst(rst)) return;
        message.success(rst.msg);
        actionRef.current?.reload();
      },
    });
  };
  useEffect(() => {
    // initData()

  }, []); // 第二个参数表示依赖项
  const columns: ProColumns<DicVo>[] = [

    {
      title: '名称',
      dataIndex: 'name',
      align: 'left',
      valueType: 'text',
      render: (_, record) => {
        return <a onClick={() => handleModelDetailDicValueOpen(record)}>{record.name}</a>;
      },
    },
    {
      title: '编码',
      dataIndex: 'code',
      align: 'left',
      valueType: 'text',
      copyable: true,
      render: (_, record) => {
        return <a onClick={() => handleModelDetailDicValueOpen(record)}>{record.code}</a>;
      },
    },

    {
      title: '备注',
      dataIndex: 'remarks',
      valueType: 'text',
      ellipsis: true,
      search: false,
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
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: 80,
      render: (text, record, _, action) => [
        // <a key="detail" onClick={() => openDetailFn(record)}>
        //     详情
        // </a>,
        <a key="log" onClick={() => openAddOrUpdateFn(record)} hidden={oCheckHidden('dic:edit')}>
          编辑
        </a>,
        <a key="rebuild" onClick={() => deleteDetailFn(record)} hidden={oCheckHidden('dic:del')}>
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
      <ProTable<DicVo>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        params={{}}
        request={async (params = {}, sort, filter) => {
          let p = {
            pageNum: params.current, pageSize: params.pageSize, pageSort: sort,
          };
          let rst = await dicPage({ ...params, ...p });
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
          defaultPageSize: 20,
          showSizeChanger: true,
          // onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="字典列表"
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
            hidden={oCheckHidden('dic:edit')}
          >
            新建
          </Button>,

        ]}
      />
      <Drawer
        title={'字典值详情'}
        open={dicValueModal !== OperateEnum.close}
        width={'75%'}
        destroyOnClose={true}
        maskClosable={false}
        onClose={() => setDicValueModalFn(OperateEnum.close)}
        footer={null}
      >
        <div>
          <DicValue dicId={detailId!!}
                    setDicValueModalFn={setDicValueModalFn}
                    operateEnum={dicValueModal}
          />
        </div>
      </Drawer>

      <Drawer
        title={addOrUpdateModal == OperateEnum.edit ? '字典编辑' : '字典新增'}
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

