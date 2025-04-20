import React, { useEffect, useRef, useState } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Drawer, message, Modal, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';

import AddOrUpdate from './addOrUpdate';
import { OperateEnum } from '@/utils/enum.ts';
import { DicVo } from '@/utils/DicVo.ts';
import { DicDetailVo } from '@/pages/system/dic/ApiBo.ts';
import { dicAll } from '@/pages/system/dic/dicApi.tsx';
import { checkApiRst, oCheckHidden } from '@/utils/utils.ts';
import { dicValueDeleteApi, dicValuePageApi } from '@/pages/system/dic/dicValue/api.tsx';
import { DicValueDetailVo } from '@/pages/system/dic/dicValue/ApiBo.ts';

type Props = {
  dicId: number
  operateEnum: OperateEnum
  setDicValueModalFn: React.Dispatch<React.SetStateAction<OperateEnum>>,
};
export default (props: Props) => {
  const actionRef = useRef<ActionType>();

  const [detailId, setDetailIdFn] = useState<number>();
  const [dicId, setDicIdFn] = useState<number>(16);

  const [addOrUpdateModal, setAddOrUpdateModalFn] = useState<OperateEnum>(OperateEnum.close);

  const [dicList, setDicListFn] = useState<DicVo[]>([]);


  const openAddOrUpdateFn = (record?: DicDetailVo) => {
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


  const initData = async () => {
    const data = await dicAll({});
    if (checkApiRst(data)) return [];
    let list = data.data.map(it => {
      return { value: it.id, label: it.name, code: it.code };
    });
    setDicListFn(list);
    return list;
  };

  const deleteDetailFn = async (item: DicDetailVo) => {
    Modal?.confirm({
      title: '是否确认删除',
      // content: item.account,
      icon: null,
      onOk: async () => {
        let rst = await dicValueDeleteApi({ id: item.id });
        if (checkApiRst(rst)) return;
        message.success(rst.msg);
        actionRef.current?.reload();
      },
    });
  };


  useEffect(() => {
    initData();
    setDicIdFn(props.dicId);
  }, []); // 第二个参数表示依赖项
  const columns: ProColumns<DicVo>[] = [
    {
      title: '字典',
      dataIndex: 'dic',
      initialValue: props.dicId,
      align: 'left',
      valueType: 'select',
      hideInTable: true,
      request: async () => initData(),
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      title: '字典标签名称',
      dataIndex: 'label',
      valueType: 'text',
      align: 'left',
      formItemProps: {
        rules: [
          {
            required: true,
            message: '此项为必填项',
          },
        ],
      },
    },
    {
      title: '字典值key',
      dataIndex: 'value',
      align: 'left',
      valueType: 'text',
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
      disable: true,
      title: '颜色',
      dataIndex: 'color',
      search: false,
      render: (_, { color }) => {

        return (<Tag color={color ?? ''}>
          颜色
        </Tag>);

      },
    },
    {
      title: '备注',
      dataIndex: 'remarks',
      valueType: 'text',
      // ellipsis: true,
      // width: 100,
      search: false,
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
        <a key="log" onClick={() => openAddOrUpdateFn(record)} hidden={oCheckHidden("dic:edit")}>
          编辑
        </a>,
        <a key="rebuild" onClick={() => deleteDetailFn(record)} hidden={oCheckHidden("dic:del")}>
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
      <ProTable<DicValueDetailVo>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        params={{}}
        request={async (params = {}, sort, filter) => {
          let p = {
            pageNum: params.current, pageSize: params.pageSize, pageSort: sort, dicId: dicId,
          };
          let rst = await dicValuePageApi({ ...params, ...p });
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
          onValuesChange: (changedValues, values) => {
            // console.log("变化值", changedValues, values)
            if (changedValues.dic) {
              setDicIdFn(changedValues.dic);
              actionRef.current?.reload();
            }

          },
        }}
        pagination={{
          defaultPageSize: 20,
          showSizeChanger: true,
          // onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle={`字典值列表     ${dicList.find(item => {
          return item.value == dicId;
        })?.code}`}
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
            hidden={oCheckHidden("dic:edit")}
          >
            新建
          </Button>,

        ]}
      />


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
          <AddOrUpdate dicId={dicId} detailId={detailId ?? 0} operateEnum={addOrUpdateModal}
                       setAddOrUpdateModalFn={setAddOrUpdateModalFn}
                       reloadTable={reloadTableFn}
          />
        </div>
      </Drawer>

    </div>
  );
};

