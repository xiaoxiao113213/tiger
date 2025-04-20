import React, { useEffect, useRef, useState } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Drawer, message, Modal } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Detail from './detail';
import AddOrUpdate from './addOrUpdate';
import { machineDeleteApi, machinePageApi } from './api';
import { MachineDetailVo, TypeValueEnum } from './ApiBo';
import { OperateEnum } from '@/utils/enum.ts';
import { checkApiRst, oCheckHidden } from '@/utils/utils.ts';
import AccountSetting from '@/pages/project/project/accountSetting.tsx';
import { bizTypeEnum } from '@/pages/system/account/ApiBo.ts';

export default () => {
  const actionRef = useRef<ActionType>();
  const [detailModal, setDetailModalFn] = useState<OperateEnum>(OperateEnum.close);
  const [detailId, setDetailIdFn] = useState<number>();
  const [addOrUpdateModal, setAddOrUpdateModalFn] = useState<OperateEnum>(OperateEnum.close);
  const [accountSettingOpen, setAccountSettingOpen] = useState(OperateEnum.close);

  const openDetailFn = (record: MachineDetailVo) => {
    setDetailIdFn(record.machineId);
    setDetailModalFn(OperateEnum.detail);
  };
  const openAddOrUpdateFn = (record?: MachineDetailVo) => {
    setDetailIdFn(record?.machineId);
    if (record) {
      setAddOrUpdateModalFn(OperateEnum.edit);
    } else {
      setAddOrUpdateModalFn(OperateEnum.add);
    }

  };
  const reloadTableFn = () => {
    actionRef.current?.reload();
  };


  const deleteDetailFn = async (item: MachineDetailVo) => {
    Modal?.confirm({
      title: '是否确认删除',
      // content: item.account,
      icon: null,
      onOk: async () => {
        let rst = await machineDeleteApi({ machineId: item.machineId });
        if (checkApiRst(rst)) return;
        message.success(rst.msg);
        actionRef.current?.reload();
      },
    });
  };
  useEffect(() => {
    // initData()

  }, []); // 第二个参数表示依赖项
  const columns: ProColumns<MachineDetailVo>[] = [
    {
      title: 'ID',
      dataIndex: 'machineId',
      valueType: 'text',
      copyable: false,
      search: false,
    }, {
      title: 'host',
      dataIndex: 'host',
      valueType: 'text',
      copyable: false,
      search: false,
    },
    {
      title: '类型',
      dataIndex: 'type',
      valueType: 'text',
      copyable: false,
      search: false,
      valueEnum: TypeValueEnum,
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
      title: '描述',
      dataIndex: 'remarks',
      valueType: 'text',
      copyable: false,
      search: false,
    },
    {
      title: '是否在线',
      dataIndex: 'isOnline',
      valueType: 'text',
      copyable: false,
      search: false,
      valueEnum: {
        0: { text: '离线', status: 'Error' },
        1: { text: '在线', status: 'Success' },
      },
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
      // width: 120,
      render: (text, record, _, action) => [

        <a key="xterm" onClick={() => {
          // setDetailIdFn(record.machineId);
          window.open(`/#/xterm?machineId=${record.machineId}`);
        }} hidden={oCheckHidden('machine:list')}>
          终端
        </a>,
        <a key="file" onClick={() => {
          // setDetailIdFn(record.machineId);
          window.open(`/#/machine/file?machineId=${record.machineId}`);
        }} hidden={oCheckHidden('machine:list')}>
          文件
        </a>,

        <a key="edit" onClick={() => openAddOrUpdateFn(record)} hidden={oCheckHidden('machine:edit')}>
          编辑
        </a>,
        <a key="edit" onClick={() => {
          setDetailIdFn(record.machineId);
          setAccountSettingOpen(OperateEnum.add);
        }} hidden={oCheckHidden('machine:permission')}>
          权限
        </a>,
        <a key="detail" onClick={() => openDetailFn(record)}>
          详情
        </a>,
        <a key="del" onClick={() => deleteDetailFn(record)} hidden={oCheckHidden('machine:del')}>
          删除
        </a>,

      ],
    },
  ];
  return (
    <div>
      <ProTable<MachineDetailVo>
        columns={columns}
        actionRef={actionRef}
        cardBordered

        params={{}}
        request={async (params = {}, sort, filter) => {
          // console.log(params, sort, filter);
          // @ts-ignore
          let p: MachineDetailVo = { pageNum: params.current, pageSize: params.pageSize, pageSort: sort };
          // console.log("参数", params)
          let rst = await machinePageApi({ ...params, ...p });
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
          persistenceKey: 'machine-pro-table',
          persistenceType: 'localStorage',
          onChange(value) {
            // console.log('value: ', value);
          },

        }}
        rowKey="machineId"
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
            hidden={oCheckHidden('machine:edit')}
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
      <Drawer key={'accountSetting'} title={'项目人员'} open={accountSettingOpen !== OperateEnum.close} onClose={() => setAccountSettingOpen(OperateEnum.close)}
              width={'80%'}
              destroyOnClose={true}
      >
        <AccountSetting
          bizType={bizTypeEnum.Machine}
          bizTypeId={detailId}
          closeFn={() => setAccountSettingOpen(OperateEnum.close)}
        ></AccountSetting>
      </Drawer>


    </div>
  );
};

            