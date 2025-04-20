import { ActionType, ProColumns, ProTable, TableDropdown } from '@ant-design/pro-components';
import { Button, Drawer, message, Modal, Switch } from 'antd';
import './index.css';
import React, { useRef, useState } from 'react';
import BuildModal from '@/pages/pipeline/pipeline/component/BuildModal';
import { PlusOutlined } from '@ant-design/icons';
import { PipelineBo } from '@/pages/pipeline/pipeline/api/bo.tsx';
import { pipelineDeleteApi, pipelinePageApi, pipelineUpdateDisabledApi } from '@/pages/pipeline/pipeline/api/pipeline.tsx';
import { OperateEnum, showOperateName } from '@/utils/enum.ts';
import GetPipelineUseStatusDicList from '@/components/Dic/PipelineUseStatusDic.ts';
import AccountSetting from './accountSetting.tsx';
import PipelineOtherAdd from '@/pages/pipeline/pipeline/component/pipelineOtherAdd.tsx';
import PipelineMainAdd from '@/pages/pipeline/pipeline/component/pipelineMainAdd.tsx';
import { oCheckHidden } from '@/utils/utils.ts';


const Index = () => {
  const actionRef = useRef<ActionType>();
  const [openType, setOpenTypeFn] = useState<OperateEnum>(OperateEnum.close);
  const [detailId, setDetailIdFn] = useState<number>();
  const [buildModal, setBuildModalFn] = useState<OperateEnum>(OperateEnum.close);
  let { PipelineUseStatusValueEnum } = GetPipelineUseStatusDicList();
  const [accountSettingOpen, setAccountSettingOpen] = useState(OperateEnum.close);
  const [otherSettingOpen, setOtherSettingOpen] = useState(OperateEnum.close);
  const modalCloseFn = async (val = true) => {
    setOpenTypeFn(OperateEnum.detail);
  };
  // 打开构建列表页面
  const openBuildListFn = async (record: PipelineBo) => {
    // history.push("/pipelineBuild");
    window.open('/#/pipelineBuild?pipelineId=' + record.id, '_blank');
  };

  // 打开构建流水线的弹框
  const openBuildModalFn = async (record: PipelineBo) => {
    setDetailIdFn(record.id);
    setBuildModalFn(OperateEnum.add);
  };
  const openDetailFn = async (record: PipelineBo) => {
    setDetailIdFn(record.id);
    setOpenTypeFn(OperateEnum.detail);
  };
  const openEditFn = async (record: PipelineBo) => {
    setDetailIdFn(record.id);
    setOpenTypeFn(OperateEnum.edit);
  };
  //   开启新增页面
  const openAddFn = async () => {
    setDetailIdFn(undefined);
    setOpenTypeFn(OperateEnum.add);
  };


  const deleteFn = async (record: PipelineBo) => {
    Modal?.confirm({
      title: '是否删除该条数据',
      content: record.name,
      icon: null,
      onOk: async () => {
        const res = await pipelineDeleteApi({ id: record?.id });
        if (res?.code !== 1000) return;
        message.success(res?.msg);
        actionRef?.current?.reload();
      },
    });
  };
  const onDisabledChange = (id, checked: boolean) => {
    console.log(`switch to ${checked}`);
    pipelineUpdateDisabledApi({ id: id, disabled: checked ? 0 : 1 }).then(res => {
      if (res.code !== 1000) return;
    });
  };

  const handleDeopdown = (key, record) => {
    switch (key) {
      case 'other':
        setDetailIdFn(record.id);
        setOtherSettingOpen(OperateEnum.add);
        break;
      case 'delete':
        deleteFn(record);
        break;

      case 'permission':
        setDetailIdFn(record.id);
        setAccountSettingOpen(OperateEnum.add);
        break;
    }
  };


  const columns: ProColumns<PipelineBo>[] = [

    {
      title: 'ID',
      dataIndex: 'id',
      width: '80px',
      valueType: 'text',
      search: false,
    },
    {
      title: '名称',
      dataIndex: 'name',
      render: (_, record) => {
        return (<a style={{ color: '#1668dc' }} onClick={() => openDetailFn(record)}>
          {record.name}
        </a>);
      },
    },
    {
      title: '状态',
      dataIndex: 'disabled',
      search: false,
      render: (_, { disabled, id }) => {
        return <Switch defaultValue={disabled === 0} onChange={(checked) => {
          onDisabledChange(id, checked);
        }} />;
      },
    },
    {
      title: '使用状态',
      search: false,
      dataIndex: 'useStatus',
      valueEnum: PipelineUseStatusValueEnum,
    },
    {
      title: '最后构建时长',
      search: false,
      dataIndex: 'lastBuildTotalTime',
    },
    {
      title: '最后构建结果',
      search: false,
      dataIndex: 'lastBuildStatus',
    },
    {
      title: '创建人',
      search: false,
      dataIndex: 'updateBy',
    },
    {
      title: '创建时间',
      search: false,
      dataIndex: 'createTime',
    },

    {
      title: '操作',
      // ellipsis: true,
      valueType: 'option',
      width: 170,
      key: 'operation',
      render: (_, record: PipelineBo) => {
        return [
          <Button
            key="buildList"
            onClick={() => openBuildListFn(record)}
            size="small"
            type={'link'}
          >
            构建列表
          </Button>,
          <Button
            key="build"
            onClick={() => openBuildModalFn(record)}
            size="small"
            type={'link'}
          >
            构建
          </Button>,
          <Button
            key="edit"
            onClick={() => openEditFn(record)}
            size="small"
            type={'link'}
            hidden={oCheckHidden('pipeline:edit')}
          >
            编辑
          </Button>,

          <TableDropdown
            key="actionGroup"
            onSelect={(key) => handleDeopdown(key, record)}
            menus={[
              { key: 'permission', name: '权限', hidden: oCheckHidden('pipeline:permission') },
              { key: 'other', name: '其他配置', hidden: oCheckHidden('pipeline:edit') },
              { key: 'delete', name: '删除', danger: true, hidden: oCheckHidden('pipeline:del') },
            ]}
          />,

        ];
      },
    },
  ];

  return (
    <div>
      <ProTable<PipelineBo>
        columns={columns}
        actionRef={actionRef}
        cardBordered

        params={{}}
        request={async (params = {}, sort, filter) => {
          // console.log(params, sort, filter);
          // @ts-ignore
          let p: PipelineVo = { pageNum: params.current, pageSize: params.pageSize, pageSort: sort };
          // console.log("参数", params)
          let rst = await pipelinePageApi({ ...params, ...p });
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
          persistenceKey: 'pipeline-pro-table',
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
        headerTitle="配置列表"
        // showHeader={false}
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            onClick={() => {
              openAddFn();
            }}
            type="primary"
            hidden={oCheckHidden('pipeline:add')}
          >
            新建
          </Button>,

        ]}
      />

      <Drawer
        title={showOperateName(openType)}
        open={openType !== OperateEnum.close}
        width={'100%'}
        key={'pipelineTab'}
        destroyOnClose={true}
        maskClosable={false}
        onClose={() => setOpenTypeFn(OperateEnum.close)}
        footer={null}
        keyboard={false}
      >
        <PipelineMainAdd
          openType={openType}
          pipelineId={detailId}
          reloadTable={() => {
            setOpenTypeFn(OperateEnum.close);
            actionRef?.current?.reload();
          }}
        />
      </Drawer>
      <Drawer
        title={'构建流水线'}
        open={buildModal !== OperateEnum.close}
        footer={false}
        width={'75%'}
        destroyOnClose={true}
        maskClosable={false}
        onClose={() => setBuildModalFn(OperateEnum.close)}
      >
        <BuildModal
          setBuildModalFn={setBuildModalFn}
          detailId={detailId}
          reloadTable={() => {
            actionRef?.current?.reload();
            setBuildModalFn(OperateEnum.close);
          }}
        />
      </Drawer>

      <Drawer key={'accountSetting'} title={'项目人员'}
              open={accountSettingOpen !== OperateEnum.close}
              onClose={() => setAccountSettingOpen(OperateEnum.close)}
              width={'80%'}
              destroyOnClose={true}
      >
        <AccountSetting pipelineId={detailId}
                        closeFn={() => setAccountSettingOpen(OperateEnum.close)}
        ></AccountSetting>
      </Drawer>

      <Drawer key={'otherSetting'} title={'其他配置'}
              open={otherSettingOpen !== OperateEnum.close}
              onClose={() => setOtherSettingOpen(OperateEnum.close)}
              width={'80%'}
              destroyOnClose={true}
      >
        <PipelineOtherAdd
          pipelineId={detailId}
          closeFn={() => setOtherSettingOpen(OperateEnum.close)}
        />
      </Drawer>

    </div>
  )
    ;
};
export default Index;
