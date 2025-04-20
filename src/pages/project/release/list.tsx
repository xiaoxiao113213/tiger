import React, { useEffect, useRef, useState } from 'react';
import { ActionType, ProColumns, ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Drawer, message, Modal, Tag } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import Detail from './detail';
import AddOrUpdate from './addOrUpdate';
import { projectReleaseDeleteApi, projectReleasePageApi, projectReleaseUpdateStatusApi } from './api';
import { ProjectReleaseDetailVo } from './ApiBo';
import { OperateEnum } from '@/utils/enum.ts';
import { checkApiRst, oCheckHidden } from '@/utils/utils.ts';
import { projectCustomFieldAllApi, projectCustomFieldSaveApi } from '@/pages/project/project/api.tsx';
import { clientToServerValueItem, CustomerFieldBo, serverToClientValue } from '@/pages/flow/process/process/form/form/Bo.tsx';
import FormComponent, { FormBuilderRef } from '@/pages/flow/process/process/form/form/addForm/formComponent.tsx';
import projectDic from '@/components/Dic/ProjectDic.ts';

export default (props: { tab: string }) => {
  const actionRef = useRef<ActionType>();
  const [detailModal, setDetailModalFn] = useState<OperateEnum>(OperateEnum.close);
  const [detailId, setDetailIdFn] = useState<number>();
  const [addOrUpdateModal, setAddOrUpdateModalFn] = useState<OperateEnum>(OperateEnum.close);
  const { ProjectList, ProjectMap, ProjectValueEnum } = projectDic();

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
    if (props.tab != '2') return;
    if (defaultProjectId) {
      actionRef.current?.reload();
    }
  }, [props.tab]);


  if (ProjectList.length === 0 || !defaultProjectId) {
    return <div>loading</div>;
  }


  const openDetailFn = (record: ProjectReleaseDetailVo) => {
    setDetailIdFn(record.projectReleaseId);
    setDetailModalFn(OperateEnum.detail);
  };
  const openAddOrUpdateFn = (record?: ProjectReleaseDetailVo) => {
    setDetailIdFn(record?.projectReleaseId);
    if (record) {
      setAddOrUpdateModalFn(OperateEnum.edit);
    } else {
      setAddOrUpdateModalFn(OperateEnum.add);
    }

  };
  const reloadTableFn = () => {
    actionRef.current?.reload();
  };


  const deleteDetailFn = async (item: ProjectReleaseDetailVo) => {
    Modal?.confirm({
      title: '是否确认删除',
      // content: item.account,
      icon: null,
      onOk: async () => {
        let rst = await projectReleaseDeleteApi({ projectReleaseId: item.projectReleaseId });
        if (checkApiRst(rst)) return;
        message.success(rst.msg);
        actionRef.current?.reload();
      },
    });
  };
  const dropdownFu = async (key: string, item: ProjectReleaseDetailVo) => {
    if (key === 'start') {
      await projectReleaseUpdateStatusApi({ projectReleaseId: item.projectReleaseId, status: '1' });
      actionRef.current?.reload();
    } else if (key === 'success') {
      Modal?.confirm({
        title: '确认完成冲刺',
        // content: item.account,
        icon: null,
        onOk: async () => {
          let rst = await projectReleaseUpdateStatusApi({ projectReleaseId: item.projectReleaseId, status: '2' });
          if (checkApiRst(rst)) return;
          message.success(rst.msg);
          actionRef.current?.reload();
        },
      });
    } else if (key === 'close') {
      Modal?.confirm({
        title: '确认关闭版本',
        // content: item.account,
        icon: null,
        onOk: async () => {
          let rst = await projectReleaseUpdateStatusApi({ projectReleaseId: item.projectReleaseId, status: '3' });
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
      item.bizType = '1';
    });
    // setFieldList(list);
    list.forEach((item) => {
      clientToServerValueItem(item);
    });
    // 保存表单设计
    await projectCustomFieldSaveApi({ bizType: '1', list: list });
    setFormDesignOpen(false);
  };


  const columns: ProColumns<ProjectReleaseDetailVo>[] = [
    {
      title: 'ID',
      dataIndex: 'projectReleaseId',
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
      valueEnum: ProjectValueEnum,
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
      title: '状态',
      dataIndex: 'status',
      valueType: 'text',
      copyable: false,
      // search: false,
      valueEnum: {
        '0': { text: '待开始', status: 'Default' },
        '1': { text: '冲刺中', status: 'Processing' },
        '2': { text: '已发布', status: 'Success' },
        '3': { text: '冲刺失败', status: 'Error' },
      },
      // render: (text, { status }) => {
      //   return getStatus(status);
      // },
    },
    {
      title: '版本',
      dataIndex: 'version',
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
        <a key="edit" onClick={() => openAddOrUpdateFn(record)} hidden={oCheckHidden('release:edit')}>
          编辑
        </a>,
        <TableDropdown
          key="actionGroup"

          onSelect={(key) => dropdownFu(key, record)}
          menus={[
            { key: 'start', name: '冲刺', style: { color: 'rgb(76, 157, 255)' }, hidden: record.status != '0' || oCheckHidden('release:edit') },
            { key: 'success', name: '发布', style: { color: 'green' }, hidden: record.status != '1' || oCheckHidden('release:edit') },
            { key: 'close', name: '关闭', danger: true, hidden: (record.status == '2' || record.status == '3' || oCheckHidden('release:edit')) },
            { key: 'del', name: '删除', danger: true, hidden: oCheckHidden('release:del') },
          ]}

        />,
      ],
    },
  ];
  return (
    <div>
      <ProTable<ProjectReleaseDetailVo>
        columns={columns}
        actionRef={actionRef}
        cardBordered
        params={{ projectId: defaultProjectId }}
        request={async (params = {}, sort, filter) => {
          // console.log(params, sort, filter);
          // @ts-ignore
          let p: ProjectReleaseDetailVo = { pageNum: params.current, pageSize: params.pageSize, pageSort: sort };
          // console.log("参数", params)
          let rst = await projectReleasePageApi({ ...params, ...p });
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
          persistenceKey: 'projectRelease-pro-table',
          persistenceType: 'localStorage',
          onChange(value) {
            // console.log('value: ', value);
          },

        }}
        rowKey="projectReleaseId"
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
            console.log('变化值', changedValues, values);
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
            hidden={oCheckHidden('release:edit')}
          >
            新建
          </Button>,
          <Button
            key="button1"
            onClick={async () => {
              const list = await projectCustomFieldAllApi({ bizType: '1' } as any);
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
            hidden={oCheckHidden('release:form')}
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
}
;

export function getStatus(status: string) {
  //   状态 0待开始 1冲刺中 2已发布 3关闭"
  if (status == '0') {
    return <Tag color="blue">待开始</Tag>;
  } else if (status == '1') {
    return <Tag color="green">冲刺中</Tag>;
  } else if (status == '2') {
    return <Tag color="gray">已发布</Tag>;
  } else if (status == '3') {
    return <Tag color="red">关闭</Tag>;
  } else {
    return <Tag color="red">未知</Tag>;
  }
}