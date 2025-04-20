import React, { useEffect, useRef, useState } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Drawer, message, Modal, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Detail from './detail';
import AddOrUpdate from './addOrUpdate';
import { projectCustomFieldAllApi, projectCustomFieldSaveApi, projectDeleteApi, projectPageApi } from './api';
import { OperateEnum } from '@/utils/enum.ts';
import { checkApiRst, oCheckHidden, oDateRemoveTime } from '@/utils/utils.ts';
import { ProjectDetailVo, projectStatusEnum } from '@/pages/project/project/ApiBo.ts';
import projectTypeDic from '@/components/Dic/projectTypeDic.ts';
import FormComponent, { FormBuilderRef } from '@/pages/flow/process/process/form/form/addForm/formComponent.tsx';
import { clientToServerValueItem, CustomerFieldBo, serverToClientValue } from '@/pages/flow/process/process/form/form/Bo.tsx';
import AccountSetting from '@/pages/project/project/accountSetting.tsx';
import { bizTypeEnum } from '@/pages/system/account/ApiBo.ts';

export default () => {
  const actionRef = useRef<ActionType>();
  const [detailModal, setDetailModalFn] = useState<OperateEnum>(OperateEnum.close);
  const [detailId, setDetailIdFn] = useState<number>();
  const [addOrUpdateModal, setAddOrUpdateModalFn] = useState<OperateEnum>(OperateEnum.close);
  const [formDesignOpen, setFormDesignOpen] = useState(false);
  const formBuilderRef = React.useRef<FormBuilderRef>(null);
  const [fieldList, setFieldList] = useState<CustomerFieldBo[]>([]);
  const { projectTypeValueEnum } = projectTypeDic();
  const [accountSettingOpen, setAccountSettingOpen] = useState(OperateEnum.close);

  const openDetailFn = (record: ProjectDetailVo) => {
    setDetailIdFn(record.projectId);
    setDetailModalFn(OperateEnum.detail);
  };
  const openAddOrUpdateFn = (record?: ProjectDetailVo) => {
    setDetailIdFn(record?.projectId);
    if (record) {
      setAddOrUpdateModalFn(OperateEnum.edit);
    } else {
      setAddOrUpdateModalFn(OperateEnum.add);
    }

  };
  const reloadTableFn = () => {
    actionRef.current?.reload();
  };


  const deleteDetailFn = async (item: ProjectDetailVo) => {
    Modal?.confirm({
      title: '是否确认删除',
      // content: item.account,
      icon: null,
      onOk: async () => {
        let rst = await projectDeleteApi({ projectId: item.projectId });
        if (checkApiRst(rst)) return;
        message.success(rst.msg);
        actionRef.current?.reload();
      },
    });
  };
  useEffect(() => {
  }, []); // 第二个参数表示依赖项
  const handleOk = async () => {
    const list = formBuilderRef.current?.getFieldList();
    if (!list) return;
    // 如果list中 key为空 或者有重复的key 都报错
    list.forEach((item) => {
      if (item.keyName === '') {
        message.error('有字段的唯一标识为空');
        throw new Error('有字段的唯一标识为空');
      }
      const tmpList = list.filter((i) => i.keyName === item.keyName);
      if (tmpList.length > 1) {
        message.error(`有重复的唯一标识【${tmpList[0].keyName}】`);
        throw new Error(`有重复的唯一标识【${tmpList[0].keyName}】`);
      }
      item.bizType = '0';
    });
    // setFieldList(list);
    list.forEach((item) => {
      clientToServerValueItem(item);
    });
    // 保存表单设计
    await projectCustomFieldSaveApi({ bizType: '0', list: list });
    setFormDesignOpen(false);
  };
  const columns: ProColumns<ProjectDetailVo>[] = [
    {
      title: 'ID',
      dataIndex: 'projectId',
      valueType: 'text',
      copyable: false,
      search: false,
    },
    {
      title: '名称',
      dataIndex: 'name',
      valueType: 'text',
      copyable: false,
      search: false,
      render: (_, record) => {
        return <a key="detail1" onClick={() => openDetailFn(record)}>
          {record.name}
        </a>;
      },
    },
    {
      title: '类型',
      dataIndex: 'type',
      valueType: 'text',
      copyable: false,
      search: false,
      valueEnum: projectTypeValueEnum,
    },

    {
      title: '编码',
      dataIndex: 'code',
      valueType: 'text',
      copyable: false,
      search: false,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'text',
      copyable: false,
      search: false,
      render: (_, { status }) => {
        if (status === projectStatusEnum.NotStarted) {
          return (<Tag color={''}>
            未开始
          </Tag>);
        }
        if (status === projectStatusEnum.Underway) {
          return (<Tag color={'blue'}>
            进行中
          </Tag>);
        }
        if (status === projectStatusEnum.Completed) {
          return (<Tag color={'green'}>
            已完成
          </Tag>);
        }
        if (status === projectStatusEnum.Closed) {
          return (<Tag color={'red'}>
            已关闭
          </Tag>);
        }
      },
    },
    {
      title: '计划开始时间',
      dataIndex: 'planStartDate',
      valueType: 'text',
      copyable: false,
      search: false,
      render: (text, { planStartDate }) => {
        return oDateRemoveTime(planStartDate);
      },
    },
    {
      title: '计划结束时间',
      dataIndex: 'planEndDate',
      valueType: 'text',
      copyable: false,
      search: false,
      render: (text, { planEndDate }) => {
        return oDateRemoveTime(planEndDate);
      },
    },
    {
      title: '开始时间',
      dataIndex: 'startDate',
      valueType: 'text',
      copyable: false,
      search: false,
      render: (text, { startDate }) => {
        return oDateRemoveTime(startDate);
      },
    },
    {
      title: '结束时间',
      dataIndex: 'endDate',
      valueType: 'text',
      copyable: false,
      search: false,
      render: (text, { endDate }) => {
        return oDateRemoveTime(endDate);
      },
    },
    {
      title: '负责人',
      dataIndex: 'headUserId',
      valueType: 'text',
      copyable: false,
      search: false,
      render: (_, item) => {
        return item.headUser?.nickName;
      },
    },
    {
      title: '报告人',
      dataIndex: 'reporterUserId',
      valueType: 'text',
      copyable: false,
      search: false,
      render: (_, item) => {
        return item.reporterUser?.nickName;
      },
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      width: 160,
      render: (text, record, _, action) => [
        <a key="detail" onClick={() => openDetailFn(record)}>
          详情
        </a>,
        <a key="edit" hidden={oCheckHidden('project:edit')} onClick={() => openAddOrUpdateFn(record)}
        >
          编辑
        </a>,
        <a key="del" hidden={oCheckHidden('project:del')} onClick={() => deleteDetailFn(record)}>
          删除
        </a>,
        <a key="account" hidden={oCheckHidden('project:permission')} onClick={() => {
          setDetailIdFn(record.projectId);
          setAccountSettingOpen(OperateEnum.add);
        }}>
          人员
        </a>,
      ],
    },
  ];
  return (
    <div>
      <ProTable<ProjectDetailVo>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        params={{}}
        request={async (params = {}, sort, filter) => {
          // console.log(params, sort, filter);
          // @ts-ignore
          let p: ProjectVo = { pageNum: params.current, pageSize: params.pageSize, pageSort: sort };
          // console.log("参数", params)
          let rst = await projectPageApi({ ...params, ...p });
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
          persistenceKey: 'project-pro-table',
          persistenceType: 'localStorage',
          onChange(value) {
            // console.log('value: ', value);
          },

        }}
        rowKey="projectId"
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
            hidden={oCheckHidden('project:edit')}
          >
            新建
          </Button>,
          <Button
            key="button1"
            onClick={async () => {
              const list = await projectCustomFieldAllApi({ bizType: '0' } as any);
              list.data.forEach((item) => {
                item.id = item.projectCustomFieldId + '';
                const item1 = item as CustomerFieldBo;
                item1.notEditKeyName = true;
                serverToClientValue(item1);
              });
              setFieldList(list.data);
              setFormDesignOpen(true);
            }}
            type="primary"
            hidden={oCheckHidden('project:form')}
          >
            定义表单
          </Button>,
        ]}
      />
      <Drawer
        title={'详情'}
        open={detailModal !== OperateEnum.close}
        width={'50%'}
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
      <Drawer title={'表单设计'} open={formDesignOpen} onClose={() => setFormDesignOpen(false)}
              extra={<Button onClick={handleOk} type={'primary'}>确定</Button>}
              width={'100%'}
              destroyOnClose={true}
      >
        <FormComponent ref={formBuilderRef} initFormDesign={fieldList}></FormComponent>
      </Drawer>
      <Drawer key={'accountSetting'} title={'项目人员'} open={accountSettingOpen !== OperateEnum.close} onClose={() => setAccountSettingOpen(OperateEnum.close)}
              width={'80%'}
              destroyOnClose={true}
      >
        <AccountSetting
          bizType={bizTypeEnum.Project}
          bizTypeId={detailId}
          closeFn={() => setAccountSettingOpen(OperateEnum.close)}
        ></AccountSetting>
      </Drawer>


    </div>
  );
};

            