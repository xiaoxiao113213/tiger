import React, { useEffect, useRef, useState } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Drawer, message, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Detail from './detail';
import AddOrUpdate from './addOrUpdate';
import { copyBoardApi, databaseBoardDeleteApi, databaseBoardPageApi } from './api';
import { DatabaseBoardListVo, DatabaseBoardVo } from './ApiBo';
import MysqlTypeDic from '@/components/Dic/MysqlTypeDic';
import { OperateEnum } from '@/utils/enum.ts';
import { checkApiRst, oCheckHidden } from '@/utils/utils.ts';
import Visualizer from '@/pages/database/Visualizer';


export default () => {
  const actionRef = useRef<ActionType>();
  const [detailModal, setDetailModalFn] = useState<OperateEnum>(OperateEnum.close);
  const [detailId, setDetailIdFn] = useState<number>();
  const [detailName, setDetailNameFn] = useState<string>();
  const [addOrUpdateModal, setAddOrUpdateModalFn] = useState<OperateEnum>(OperateEnum.close);
  // const [boardModal, setBoardModalFn] = useState<OperateEnum>(OperateEnum.close);
  const [boardModal1, setBoardModal1Fn] = useState<OperateEnum>(OperateEnum.close);
  const { MysqlTypeMap } = MysqlTypeDic();

  const openDetailFn = (record: DatabaseBoardListVo) => {
    setDetailIdFn(record.databaseBoardId);
    setDetailNameFn(record.name);
    setDetailModalFn(OperateEnum.detail);
  };
  const openAddOrUpdateFn = (record?: DatabaseBoardListVo) => {
    setDetailIdFn(record?.databaseBoardId);
    setDetailNameFn(record?.name);
    if (record) {
      setAddOrUpdateModalFn(OperateEnum.edit);
    } else {
      setAddOrUpdateModalFn(OperateEnum.add);
    }
  };

  const openBoardModal1Fn = (record?: DatabaseBoardListVo) => {
    setDetailIdFn(record?.databaseBoardId);
    setDetailNameFn(record?.name);
    if (record) {
      setBoardModal1Fn(OperateEnum.edit);
    } else {
      setBoardModal1Fn(OperateEnum.add);
    }
  };


  const reloadTableFn = () => {
    actionRef.current?.reload();
  };


  const deleteDetailFn = async (item: DatabaseBoardListVo) => {
    Modal?.confirm({
      title: '是否确认删除',
      // content: item.account,
      icon: null,
      onOk: async () => {
        let rst = await databaseBoardDeleteApi({ databaseBoardId: item.databaseBoardId });
        if (checkApiRst(rst)) return;
        message.success(rst.msg);
        actionRef.current?.reload();
      },
    });
  };
  const copyFn = async (item: DatabaseBoardListVo) => {
    Modal?.confirm({
      title: '是否确认复制',
      // content: item.account,
      icon: null,
      onOk: async () => {
        let rst = await copyBoardApi({ databaseBoardId: item.databaseBoardId });
        if (checkApiRst(rst)) return;
        message.success(rst.msg);
        actionRef.current?.reload();
      },
    });
  };


  useEffect(() => {
    // initData()

  }, []); // 第二个参数表示依赖项
  const columns: ProColumns<DatabaseBoardListVo>[] = [

    {
      title: '名称',
      dataIndex: 'name',
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
      title: 'createTime',
      dataIndex: 'createTime',
      valueType: 'text',
      copyable: false,
      search: false,
    },
    {
      title: 'updateTime',
      dataIndex: 'updateTime',
      valueType: 'text',
      copyable: false,
      search: false,
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: 250,
      render: (text, record, _, action) => [
        // <a key="detail1" onClick={() => openDetailFn(record)}>
        //   画板详情
        // </a>,
        <a key="edit13" onClick={() => openBoardModal1Fn(record)} hidden={oCheckHidden('databaseBoard:list')}>
          画板
        </a>,
        <a key="edit2" onClick={() => openAddOrUpdateFn(record)} hidden={oCheckHidden('databaseBoard:edit')}>
          编辑
        </a>,
        <a key="copy" onClick={() => copyFn(record)} hidden={oCheckHidden('databaseBoard:edit')}>
          复制
        </a>,
        <a key="del1" onClick={() => deleteDetailFn(record)} hidden={oCheckHidden('databaseBoard:del')}>
          删除
        </a>,
      ],
    },
  ];
  return (
    <div>
      <ProTable<DatabaseBoardListVo>
        columns={columns}
        actionRef={actionRef}
        cardBordered

        params={{}}
        request={async (params = {}, sort, filter) => {
          // console.log(params, sort, filter);
          // @ts-ignore
          let p: DatabaseBoardVo = { pageNum: params.current, pageSize: params.pageSize, pageSort: sort };
          // console.log("参数", params)
          let rst = await databaseBoardPageApi({ ...params, ...p });
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
          persistenceKey: 'databaseBoard-pro-table',
          persistenceType: 'localStorage',
          onChange(value) {
            // console.log('value: ', value);
          },

        }}
        rowKey="databaseBoardId"
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
            hidden={oCheckHidden('databaseBoard:edit')}
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
          />
        </div>
      </Drawer>
      <Drawer
        title={'编辑画板     ' + detailName}
        open={boardModal1 !== OperateEnum.close}
        width={'100%'}
        destroyOnClose={true}
        maskClosable={false}
        onClose={() => {
          setBoardModal1Fn(OperateEnum.close);
        }}
        footer={null}
      >
        <div>
          <Visualizer databaseBoardId={detailId!!} MysqlTypeMap={MysqlTypeMap} closeBoardModalFn={() => {
            setBoardModal1Fn(OperateEnum.close);
          }} />
        </div>
      </Drawer>


    </div>
  );
};

            