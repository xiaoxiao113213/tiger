import React, { useEffect, useRef, useState } from 'react';
import { ActionType, ProColumns, ProSchemaValueEnumObj, ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Drawer, message, Modal, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Detail from './detail';
import AddOrUpdate from './addOrUpdate';
import { projectIssueDeleteApi, projectIssuePageApi, projectIssueUpdateStatusApi } from './api';
import { ProjectIssueListVo, ProjectIssueVo } from './ApiBo';
import { OperateEnum } from '@/utils/enum.ts';
import { checkApiRst, oDateRemoveTime } from '@/utils/utils.ts';
import { projectCustomFieldAllApi, projectCustomFieldSaveApi } from '@/pages/project/project/api.tsx';
import { clientToServerValueItem, CustomerFieldBo, serverToClientValue } from '@/pages/flow/process/process/form/form/Bo.tsx';
import projectDic from '@/components/Dic/ProjectDic.ts';
import FormComponent, { FormBuilderRef } from '@/pages/flow/process/process/form/form/addForm/formComponent.tsx';
import issueTypeDic from '@/components/Dic/IssueTypeDic.ts';
import { projectReleaseAllApi } from '@/pages/project/release/api.tsx';

export default () => {
  const actionRef = useRef<ActionType>();
  const [detailModal, setDetailModalFn] = useState<OperateEnum>(OperateEnum.close);
  const [detailId, setDetailIdFn] = useState<number>();
  const [addOrUpdateModal, setAddOrUpdateModalFn] = useState<OperateEnum>(OperateEnum.close);
  const { ProjectList, ProjectMap, ProjectValueEnum } = projectDic();
  const { IssueTypeMap, IssueTypeValueEnum } = issueTypeDic();
  const [releaseEnum, setReleaseEnum] = useState<ProSchemaValueEnumObj>();

  const [formDesignOpen, setFormDesignOpen] = useState(false);
  const formBuilderRef = React.useRef<FormBuilderRef>(null);
  const [fieldList, setFieldList] = useState<CustomerFieldBo[]>([]);

  const [defaultProjectId, setDefaultProjectId] = useState<number | string | undefined>(undefined);
  // 等待项目列表加载完成后，设置第一个项目为默认值
  useEffect(() => {
    if (ProjectList.length > 0) {
      setDefaultProjectId(ProjectList[0].value); // 假设每个项目有 `value` 字段
    }
  }, [ProjectList]);
  useEffect(() => {
    if (defaultProjectId) {
      // 获取release字典
      projectReleaseAllApi({ projectId: defaultProjectId }).then((res) => {
        let valueEnumMap = {};
        res.data.forEach(item => {
          valueEnumMap[item.value] = { text: item.label };
        });
        setReleaseEnum(valueEnumMap);
      });
    }
  }, [defaultProjectId]);


  if (ProjectList.length === 0 || !defaultProjectId) {
    return <div>loading</div>;
  }

  const openDetailFn = (record: ProjectIssueListVo) => {
    setDetailIdFn(record.projectIssueId);
    setDetailModalFn(OperateEnum.detail);
  };
  const openAddOrUpdateFn = (record?: ProjectIssueListVo) => {
    setDetailIdFn(record?.projectIssueId);
    if (record) {
      setAddOrUpdateModalFn(OperateEnum.edit);
    } else {
      setAddOrUpdateModalFn(OperateEnum.add);
    }

  };
  const reloadTableFn = () => {
    actionRef.current?.reload();
  };


  const deleteDetailFn = async (item: ProjectIssueListVo) => {
    Modal?.confirm({
      title: '是否确认删除',
      // content: item.account,
      icon: null,
      onOk: async () => {
        let rst = await projectIssueDeleteApi({ projectIssueId: item.projectIssueId });
        if (checkApiRst(rst)) return;
        message.success(rst.msg);
        actionRef.current?.reload();
      },
    });
  };

  const dropdownFu = async (key: string, item: ProjectIssueListVo) => {
    if (key === 'start') {

      await projectIssueUpdateStatusApi({ projectIssueId: item.projectIssueId, status: '1' });
      actionRef.current?.reload();
    } else if (key === 'success') {
      Modal?.confirm({
        title: '确认完成任务',
        // content: item.account,
        icon: null,
        onOk: async () => {
          let rst = await projectIssueUpdateStatusApi({ projectIssueId: item.projectIssueId, status: '2' });
          if (checkApiRst(rst)) return;
          message.success(rst.msg);
          actionRef.current?.reload();
        },
      });
    } else if (key === 'close') {
      Modal?.confirm({
        title: '确认关闭任务',
        // content: item.account,
        icon: null,
        onOk: async () => {
          let rst = await projectIssueUpdateStatusApi({ projectIssueId: item.projectIssueId, status: '3' });
          if (checkApiRst(rst)) return;
          message.success(rst.msg);
          actionRef.current?.reload();
        },
      });

    } else if (key === 'del') {
      deleteDetailFn(item);
    }
  };

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
      item.bizType = '2';
    });
    // setFieldList(list);
    list.forEach((item) => {
      clientToServerValueItem(item);
    });
    // 保存表单设计
    await projectCustomFieldSaveApi({ bizType: '2', list: list });
    setFormDesignOpen(false);
  };

  const columns: ProColumns<ProjectIssueListVo>[] = [
    {
      title: 'ID',
      dataIndex: 'projectIssueId',
      valueType: 'text',
      copyable: false,
      search: false,
    },
    {
      title: '项目',
      dataIndex: 'projectId',
      valueType: 'text',
      copyable: false,
      search: true,
      hideInTable: true,
      valueEnum: ProjectValueEnum,
      ellipsis: true,
      formItemProps: {
        rules: [
          {
            required: true,
            message: '项目是必填项',
          },
        ],
      },
      initialValue: defaultProjectId,   // 设置默认值
    },
    {
      title: '版本',
      dataIndex: 'projectReleaseId',
      valueType: 'text',
      copyable: false,
      search: true,
      ellipsis: true,
      valueEnum: releaseEnum,
    },
    {
      title: '类型',
      dataIndex: 'type',
      valueType: 'text',
      copyable: false,
      search: true,
      valueEnum: IssueTypeValueEnum,
      render: (text, { type }) => {
        return <Tag color={IssueTypeMap[type].color}>{IssueTypeMap[type].label}</Tag>;
      },
    },
    {
      title: '标题',
      dataIndex: 'name',
      valueType: 'text',
      copyable: false,
      search: true,
      ellipsis: true,
    },
    {
      title: '状态',
      dataIndex: 'status',
      valueType: 'text',
      copyable: false,
      search: true,
      valueEnum: {
        '0': { text: '未开始', status: 'Default' },
        '1': { text: '进行中', status: 'Processing' },
        '2': { text: '已完成', status: 'Success' },
        '3': { text: '已关闭', status: 'Error' },
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
      title: '备注',
      dataIndex: 'remarks',
      valueType: 'text',
      copyable: false,
      search: false,
    },
    {
      title: '责任人',
      dataIndex: 'headUserId',
      valueType: 'text',
      copyable: false,
      search: false,
      render: (text, { headUserInfo }) => {
        return headUserInfo?.nickName;
      },
    },
    {
      title: '优先级',
      dataIndex: 'priority',
      valueType: 'text',
      copyable: false,
      search: false,
      valueEnum: {
        '0': { text: '一般', status: 'Success' },
        '1': { text: '重要', status: 'Processing' },
        '2': { text: '紧急', status: 'Error' },
      },
    },
    {
      title: '创建人',
      dataIndex: 'createBy',
      valueType: 'text',
      copyable: false,
      search: false,
      render: (text, { createByAccount }) => {
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
        <TableDropdown
          key="actionGroup"
          onSelect={(key) => dropdownFu(key, record)}
          menus={[
            { key: 'start', name: '进行任务', style: { color: 'rgb(76, 157, 255)' }, hidden: record.status != '0' },
            { key: 'success', name: '完成任务', style: { color: 'rgb(76, 157, 255)' }, hidden: record.status != '1' },
            { key: 'close', name: '关闭任务', danger: true, hidden: (record.status == '2' || record.status == '3') },
            { key: 'del', name: '删除', danger: true },
          ]}
        />,
      ],
    },
  ];
  return (
    <div>
      <div>
        <ProTable<ProjectIssueListVo>
          columns={columns}
          actionRef={actionRef}
          cardBordered
          defaultSize={'small'}

          params={{}}
          request={async (params = {}, sort, filter) => {
            // console.log(params, sort, filter);
            // @ts-ignore
            let p: ProjectIssueVo = { pageNum: params.current, pageSize: params.pageSize, pageSort: sort };
            // console.log("参数", params)
            let rst = await projectIssuePageApi({ ...params, ...p });
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
            persistenceKey: 'projectIssue-pro-table',
            persistenceType: 'localStorage',
            onChange(value) {
              // console.log('value: ', value);
            },

          }}
          rowKey="projectIssueId"
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
            onValuesChange: (changedValues, values) => {
              // console.log('变化值', changedValues, values);
              // 如果 `projectId` 发生变化，自动触发搜索
              if (changedValues.projectId) {
                // actionRef.current?.reload();
                setDefaultProjectId(changedValues.projectId);
              }

            },
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
            >
              新建
            </Button>,
            <Button
              key="button1"
              onClick={async () => {
                const list = await projectCustomFieldAllApi({ bizType: '2' } as any);
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
            >
              定义表单
            </Button>,
          ]}
        />

      </div>
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
                       defaultProjectId={defaultProjectId}
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
    </div>
  );
};

            