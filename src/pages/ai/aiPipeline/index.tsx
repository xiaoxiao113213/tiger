import React, { useEffect, useRef, useState } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Drawer, message, Modal, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Detail from './detail';
import AddOrUpdate from './addOrUpdate';
import { aiPipelineDeleteApi, aiPipelinePageApi } from './api/api.tsx';
import { AiPipelineDetailVo } from './api/ApiBo.ts';
import { OperateEnum } from '@/utils/enum.ts';
import { checkApiRst } from '@/utils/utils.ts';
import Bord from '@/pages/ai/aiPipeline/pipeline/bord.tsx';

export default () => {
  const actionRef = useRef<ActionType>();
  const [detailModal, setDetailModalFn] = useState<OperateEnum>(OperateEnum.close);
  const [detailId, setDetailIdFn] = useState<number>();
  const [addOrUpdateModal, setAddOrUpdateModalFn] = useState<OperateEnum>(OperateEnum.close);
  const [bordModal, setBordModalFn] = useState<OperateEnum>(OperateEnum.close);


  const openDetailFn = (record: AiPipelineDetailVo) => {
    setDetailIdFn(record.aiPipelineId);
    setDetailModalFn(OperateEnum.detail);
  };
  const openAddOrUpdateFn = (record?: AiPipelineDetailVo) => {
    setDetailIdFn(record?.aiPipelineId);
    if (record) {
      setAddOrUpdateModalFn(OperateEnum.edit);
    } else {
      setAddOrUpdateModalFn(OperateEnum.add);
    }

  };
  const reloadTableFn = () => {
    actionRef.current?.reload();
  };


  const deleteDetailFn = async (item: AiPipelineDetailVo) => {
    Modal?.confirm({
      title: '是否确认删除',
      // content: item.account,
      icon: null,
      onOk: async () => {
        let rst = await aiPipelineDeleteApi({ aiPipelineId: item.aiPipelineId });
        if (checkApiRst(rst)) return;
        message.success(rst.msg);
        actionRef.current?.reload();
      },
    });
  };
  useEffect(() => {
    // initData()

  }, []); // 第二个参数表示依赖项
  const columns: ProColumns<AiPipelineDetailVo>[] = [
    {
      title: 'ID',
      dataIndex: 'aiPipelineId',
      valueType: 'text',
      copyable: false,
      search: false,
    },
// {
//     title: 'type',
//     dataIndex: 'type',
//     valueType: 'text',
//     copyable: false,
//     search: false,
// },
    {
      title: '标题',
      dataIndex: 'name',
      valueType: 'text',
      copyable: false,
      search: false,
    },
    {
      title: '描述',
      dataIndex: 'remarks',
      valueType: 'text',
      copyable: false,
      search: false,
      ellipsis: true,
    },
    {
      title: '创建人',
      dataIndex: 'createBy',
      valueType: 'text',
      copyable: false,
      search: false,
      render: (_, { createByAccount }) => {
        return createByAccount?.nickName;
      },
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
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
        return updateByAccount?.nickName;
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
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <a key="pipeline" onClick={() => {
          setDetailIdFn(record.aiPipelineId);
          setBordModalFn(OperateEnum.add);
        }}>
          编排
        </a>,
        <a key="detail" onClick={() => openDetailFn(record)}>
          详情
        </a>,
        <a key="edit" onClick={() => openAddOrUpdateFn(record)}>
          编辑
        </a>,
        <a key="del" onClick={() => deleteDetailFn(record)}>
          删除
        </a>,
      ],
    },
  ];
  return (
    <div>

      <ProTable<AiPipelineDetailVo>
        columns={columns}
        actionRef={actionRef}
        cardBordered

        params={{}}
        request={async (params = {}, sort, filter) => {
          // console.log(params, sort, filter);
          // @ts-ignore
          let p: AiPipelineDetailVo = { pageNum: params.current, pageSize: params.pageSize, pageSort: sort };
          // console.log("参数", params)
          let rst = await aiPipelinePageApi({ ...params, ...p });
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
          persistenceKey: 'aiPipeline-pro-table',
          persistenceType: 'localStorage',
          onChange(value) {
            // console.log('value: ', value);
          },

        }}
        rowKey="aiPipelineId"
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
      <Drawer
        title={<div style={{ alignItems: 'center', alignContent: 'center', width: '100%' }}><span>编排</span>
          <Tag color={'red'} style={{ marginLeft: '30px' }}>流水线的命名，描述，参数的命名和描述 至关重要，ai会去根据这些命名自动化的去赋予对应的参数值和调用</Tag>
        </div>}
        open={bordModal !== OperateEnum.close}
        width={'100%'}
        destroyOnClose={true}
        maskClosable={false}
        onClose={() => setBordModalFn(OperateEnum.close)}
        footer={null}
      >
        <div>
          <Bord aiPipelineId={detailId ?? 0}
                closeModal={() => setBordModalFn(OperateEnum.close)}
          />
        </div>
      </Drawer>

    </div>
  );
};

            