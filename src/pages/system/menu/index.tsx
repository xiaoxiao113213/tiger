import React, { useEffect, useRef, useState } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Drawer, message, Modal, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import AddOrUpdate from './addOrUpdate';
import getApplicationList from '@/components/Dic/ApplicationDic';
import GetMenuTypeDicList from '@/components/Dic/MenuTypeDic';
import { OperateEnum } from '@/utils/enum.ts';
import { ModuleDetailVo } from '@/pages/system/menu/ApiBo.ts';
import { checkApiRst, oCheckHidden } from '@/utils/utils.ts';
import { moduleDeleteApi, modulePageApi } from '@/pages/system/menu/api.tsx';


export default () => {
  let { MenuTypeSearchMap, MenuTypeList } = GetMenuTypeDicList();
  const { applicationList, applicationSearchMap } = getApplicationList();
  const actionRef = useRef<ActionType>();
  const [detailId, setDetailIdFn] = useState<number>();
  const [applicationId, setApplicationIdFn] = useState<number>(1);

  const [addOrUpdateModal, setAddOrUpdateModalFn] = useState<OperateEnum>(OperateEnum.close);
  const [parentId, setParentId] = useState<number>();

  const openAddOrUpdateFn = (record?: ModuleDetailVo) => {
    setParentId(undefined);
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


  const deleteDetailFn = async (item: ModuleDetailVo) => {
    Modal?.confirm({
      title: '是否确认删除',
      // content: item.account,
      icon: null,
      onOk: async () => {
        let rst = await moduleDeleteApi({ id: item.id });
        if (checkApiRst(rst)) return;
        message.success(rst.msg);
        actionRef.current?.reload();
      },
    });
  };
  useEffect(() => {
    // initData()

  }, []); // 第二个参数表示依赖项
  const columns: ProColumns<ModuleDetailVo>[] = [
    {
      title: '应用',
      dataIndex: 'applicationId',
      initialValue: '1',
      hideInTable: true,
      valueEnum: applicationSearchMap,

      // valueEnum: {
      //     all: {text: '全部'},
      //     close: {text: '关闭'},
      //     running: {text: '运行中'},
      //     online: {text: '已上线'},
      //     error: {text: '异常'},
      // },
    },
    {
      title: '名称',
      dataIndex: 'name',
      valueType: 'text',
      copyable: false,
    },

    {
      title: '类型',
      dataIndex: 'code',
      valueType: 'text',
      search: false,
      render: (_, { type }) => {
        let dic = MenuTypeList.find(i => i.value === type);
        return (<Tag color={dic?.color}> {dic?.label}  </Tag>);
      },
    },
    {
      title: '权限编码',
      dataIndex: 'permission',
      valueType: 'text',
      copyable: true,
      // align: "right"
    },
    {
      title: '路径地址',
      dataIndex: 'component',
      valueType: 'text',
      // copyable: true,
      // align:"right"
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
      disable: true,
      title: '展示菜单',
      dataIndex: 'showFlag',
      search: false,
      render: (_, { showFlag }) => {
        if (showFlag === 0) {
          return (<Tag color={'red'}>
            否
          </Tag>);
        } else {
          return (<Tag color="green">
            是
          </Tag>);
        }
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
      width: 130,
      render: (text, record, _, action) => [
        // <a key="detail" onClick={() => openDetailFn(record)}>
        //     详情
        // </a>,
        <a key="log" onClick={() => openAddOrUpdateFn(record)} hidden={oCheckHidden("menu:edit")}>
          编辑
        </a>,
        <a key="addSon" onClick={() => {
          setParentId(record.id);
          setDetailIdFn(undefined);
          setAddOrUpdateModalFn(OperateEnum.add);

        }} hidden={oCheckHidden("menu:edit")}>
          添加子
        </a>,
        <a key="del" onClick={() => deleteDetailFn(record)} hidden={oCheckHidden("menu:del")}>
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
      <ProTable<ModuleDetailVo>
        columns={columns}
        actionRef={actionRef}
        cardBordered

        params={{}}
        request={async (params = {}, sort, filter) => {
          // console.log(params, sort, filter);
          // 先写死应用1 支持多应用玩法
          setApplicationIdFn(params.applicationId ?? 1);
          let p = {
            pageNum: params.current, pageSize: params.pageSize, pageSort: sort, applicationId: params.applicationId ?? 1,
          };
          // console.log("参数", params)
          let rst = await modulePageApi({ ...params, ...p });
          return {
            data: rst.data,
            // success 请返回 true，
            // 不然 table 会停止解析数据，即使有数据
            success: rst.code === 1000,
            // 不传会使用 data 的长度，如果是分页一定要传
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
        pagination={false}
        dateFormatter="string"
        headerTitle="菜单列表"
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
            hidden={oCheckHidden("menu:edit")}
          >
            新建
          </Button>,

        ]}
      />
      {/*<Drawer*/}
      {/*    title={"部门详情"}*/}
      {/*    open={detailModal !== OperateEnum.close}*/}
      {/*    width={"75%"}*/}
      {/*    destroyOnClose={true}*/}
      {/*    maskClosable={false}*/}
      {/*    onClose={() => setDetailModalFn(OperateEnum.close)}*/}
      {/*    footer={null}*/}
      {/*>*/}
      {/*    <div>*/}
      {/*        <Detail detailId={detailId!!}/>*/}
      {/*    </div>*/}
      {/*</Drawer>*/}

      <Drawer
        title={addOrUpdateModal == OperateEnum.edit ? '菜单编辑' : '菜单新增'}
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
                       applicationId={applicationId}
                       parentId={parentId}
          />
        </div>
      </Drawer>

    </div>
  );
};

