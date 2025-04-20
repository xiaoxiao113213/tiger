import React, { useEffect, useRef, useState } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Drawer, message, Modal, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Detail from './detail';
import AddOrUpdate from './addOrUpdate';
import { pipeline_pluginDeleteApi, pipeline_pluginPageApi } from './api';
import { PipelinePluginListVo, PipelinePluginVo } from './ApiBo';
import getPipelinePluginTypeDicList from '@/components/Dic/PipelinePluginTypeDic';
import getPipelinePluginSourceDicList from '@/components/Dic/PipelinePluginSourceDic';
import getPipelineScriptTypeDicList from '@/components/Dic/PipelineScriptTypeDic';
import { OperateEnum } from '@/utils/enum.ts';
import { checkApiRst } from '@/utils/utils.ts';


export default () => {
  const actionRef = useRef<ActionType>();
  const [detailModal, setDetailModalFn] = useState<OperateEnum>(OperateEnum.close);
  const [detailId, setDetailIdFn] = useState<number>();
  const [addOrUpdateModal, setAddOrUpdateModalFn] = useState<OperateEnum>(OperateEnum.close);
  // 字典
  let { PipelinePluginTypeList: typeList } = getPipelinePluginTypeDicList();
  let { PipelinePluginSourceList: sourceList } = getPipelinePluginSourceDicList();
  let { PipelineScriptTypeList: scriptTypeList } = getPipelineScriptTypeDicList();


  const openDetailFn = (record: PipelinePluginListVo) => {
    setDetailIdFn(record.id);
    setDetailModalFn(OperateEnum.detail);
  };
  const openAddOrUpdateFn = (record?: PipelinePluginListVo) => {
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
  const initData = () => {
    // 在组件挂载或更新后执行操作
  };


  const deleteDetailFn = async (item: PipelinePluginListVo) => {
    Modal?.confirm({
      title: '是否确认删除',
      // content: item.account,
      icon: null,
      onOk: async () => {
        let rst = await pipeline_pluginDeleteApi({ id: item.id });
        if (checkApiRst(rst)) return;
        message.success(rst.msg);
        actionRef.current?.reload();
      },
    });
  };
  useEffect(() => {
    initData();

  }, []); // 第二个参数表示依赖项
  const columns: ProColumns<PipelinePluginListVo>[] = [
    {
      title: '名称',
      dataIndex: 'name',
      valueType: 'text',
      copyable: false,
      // search: true,
    },
    {
      title: '资源类型',
      dataIndex: 'type',
      valueType: 'text',
      copyable: false,
      search: false,
      render: (_, { type }) => {
        return (<Tag color="green">
          {
            typeList.find(item => item.value == type)?.label
          }
        </Tag>);
      },
    },
    {
      title: '来源',
      dataIndex: 'source',
      valueType: 'text',
      copyable: false,
      search: false,
      render: (_, { source }) => {
        return (<Tag color="green">
          {
            sourceList.find(item => item.value == source)?.label
          }
        </Tag>);
      },
    },
    {
      title: '备注',
      dataIndex: 'desc',
      valueType: 'text',
      copyable: false,
      search: false,
    },
    {
      title: '当前版本号',
      dataIndex: 'number',
      valueType: 'text',
      copyable: false,
      search: false,
    },
    {
      title: '脚本类型',
      dataIndex: 'scriptType',
      valueType: 'text',
      copyable: false,
      search: false,
      render: (_, { scriptType }) => {
        return (<Tag color="green">
          {
            scriptTypeList.find(item => item.value === scriptType)?.label
          }
        </Tag>);
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
      title: '更新时间',
      dataIndex: 'updateTime',
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
      <ProTable<PipelinePluginListVo>
        columns={columns}
        actionRef={actionRef}
        cardBordered

        params={{}}
        request={async (params = {}, sort, filter) => {
          // console.log(params, sort, filter);
          // @ts-ignore
          let p: PipelinePluginVo = { pageNum: params.current, pageSize: params.pageSize, pageSort: sort };
          // console.log("参数", params)
          let rst = await pipeline_pluginPageApi({ ...params, ...p });
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
          persistenceKey: 'pipeline_plugin-pro-table',
          persistenceType: 'localStorage',
          onChange(value) {
            // console.log('value: ', value);
          },

        }}
        rowKey="id"
        search={{
          labelWidth: 'auto',
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
        headerTitle="插件列表"
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
          <Detail detailId={detailId!!} scriptTypeList={scriptTypeList} typeList={typeList} sourceList={sourceList} />
        </div>
      </Drawer>

      <Drawer
        title={addOrUpdateModal === OperateEnum.edit ? '插件编辑' : '插件新增'}
        open={addOrUpdateModal !== OperateEnum.close}
        width={'85%'}
        destroyOnClose={true}
        maskClosable={false}
        onClose={() => setAddOrUpdateModalFn(OperateEnum.close)}
        footer={null}
      >
        <div>
          <AddOrUpdate detailId={detailId ?? 0} operateEnum={addOrUpdateModal}
                       setAddOrUpdateModalFn={setAddOrUpdateModalFn}
                       reloadTable={reloadTableFn}
                       scriptTypeList={scriptTypeList}
                       typeList={typeList}
          />
        </div>
      </Drawer>

    </div>
  );
};

            