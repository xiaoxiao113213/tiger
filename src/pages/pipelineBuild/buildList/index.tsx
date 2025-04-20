import React, { useEffect, useRef, useState } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { ProTable } from '@ant-design/pro-components';
import { Button, Drawer, message, Modal, Popover, Switch, Tag } from 'antd';
import BuildDetail from '@/pages/pipelineBuild/buildDetail';
import Log, { LogTypeEnum } from '@/pages/pipelineBuild/Log';
import styles from './buildlist.css';
import { PipelineBuildBo } from '@/pages/pipeline/pipeline/api/bo.tsx';
import { OperateEnum } from '@/utils/enum.ts';
import { pipelineBuildPageApi, pipelineBuildStopApi } from '@/pages/pipelineBuild/api/pipelineBuildApi.tsx';
import { checkApiRst } from '@/utils/utils.ts';
import { getPipelineBuildStatusEnum, PipelineBuildStatusEnum, PipelineBuildStatusMap } from '@/components/enums/PipelineBuildStatus.ts';

type Props = {
  pipelineId: number
  refresh: number
};
export default (props: Props) => {
  const actionRef = useRef<ActionType>();
  const [buildDetailModal, setBuildDetailModalFn] = useState<OperateEnum>(OperateEnum.close);
  const [buildDetailId, setBuildDetailIdFn] = useState<number>(0);

  const [buildLogModal, setBuildLogModalFn] = useState<OperateEnum>(OperateEnum.close);
  const [autoFlush, setAutoFlushFn] = useState<boolean>(true);

  const autoChangeFn = () => {
    setAutoFlushFn(!autoFlush);
  };


  // 自定义删除操作的回调函数
  const openBuildDetailFn = (record: PipelineBuildBo) => {
    setBuildDetailIdFn(record.id);
    setBuildDetailModalFn(OperateEnum.detail);
  };
  const openBuildLogFn = (record: PipelineBuildBo) => {
    setBuildDetailIdFn(record.id);
    setBuildLogModalFn(OperateEnum.detail);
  };

  const buildDetail = (record: PipelineBuildBo) => {

  };


  const stopBuild = async (item: PipelineBuildBo) => {
    Modal?.confirm({
      title: '是否确认终止构建',
      // content: item.account,
      icon: null,
      onOk: async () => {
        let rst = await pipelineBuildStopApi({ id: item.id });
        if (checkApiRst(rst)) return;
        message.success(rst.msg);
        actionRef.current?.reload();
      },
    });
  };
  const stopShow = (item: PipelineBuildBo) => {
    let status = getPipelineBuildStatusEnum(item.buildStatus);
    let b = true;
    if (status === PipelineBuildStatusEnum.stop || status === PipelineBuildStatusEnum.success || status === PipelineBuildStatusEnum.fail
      || status === PipelineBuildStatusEnum.fail_skip
    ) {
      b = false;
    }
    return b;

  };
  useEffect(() => {
    // todo 临时关闭
    const intervalId = setInterval(() => {
      if (autoFlush) {
        actionRef.current?.reload();
      }

    }, 3000);

    return () => {
      // 在组件卸载前执行清理操作
      clearInterval(intervalId);
    };
  }, [props.pipelineId, autoFlush]); // 第二个参数表示依赖项

  useEffect(() => {
    actionRef.current?.reload();
  }, [props.refresh]);


  const columns: ProColumns<PipelineBuildBo>[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      valueType: 'text',
      width: 48,
    },
    {
      disable: true,
      title: '状态',
      dataIndex: 'buildStatus',
      search: false,
      renderFormItem: (_, { defaultRender }) => {
        return defaultRender(_);
      },
      render: (_, { buildStatus }) => {
        const status = getPipelineBuildStatusEnum(buildStatus);
        if (status === PipelineBuildStatusEnum.fail || status === PipelineBuildStatusEnum.fail_skip || status === PipelineBuildStatusEnum.stop) {
          return (<Tag color={'red'}>
            {PipelineBuildStatusMap.get(buildStatus)}
          </Tag>);
        } else {
          return (<Tag color="green">
            {PipelineBuildStatusMap.get(buildStatus)}
          </Tag>);
        }
      },
    },
    {
      title: '构建人',
      dataIndex: 'createBy',
      ellipsis: true,
      render(_, record) {
        return record.createByInfo?.account;
      },
    },
    {
      title: '创建时间',
      key: 'showTime',
      dataIndex: 'createTime',
      valueType: 'dateTime',
      sorter: false,
      hideInSearch: true,
    },
    {
      title: '开始构建时间',
      dataIndex: 'buildStartTime',
      valueType: 'dateTime',

      hideInTable: false,
    },
    {

      // valueType: 'dateTime',
      hideInTable: false,
      title: '构建时长',
      dataIndex: 'useTime',
      //     计算下 如果没有开始 为0  如何没有结束 以当前时间减去开始时间
    },
    {
      title: '操作',
      valueType: 'option',
      key: 'option',
      render: (text, record, _, action) => [
        <a key="detail" onClick={() => openBuildDetailFn(record)}>
          详情
        </a>,
        <div key={'stop'}>
          {stopShow(record) &&
            <a key="stop" onClick={() => stopBuild(record)} style={{ color: 'red' }}>
              终止构建
            </a>}
        </div>,
        <a key="log" onClick={() => openBuildLogFn(record)}>
          日志
        </a>,
        <a key="rebuild" onClick={() => buildDetail(record)}>
          再次构建
        </a>,
      ],
    },
  ];

  const content = (
    <div>
      <h3>内置参数</h3>
      <table className={styles['styled-table']}>
        <tr>
          <td>参数名</td>
          <td>使用方式</td>
          <td>描述</td>
        </tr>
        <tr>
          <td>WORKSPACE</td>
          <td>{'${WORKSPACE}'}</td>
          <td>当前脚本执行的绝对目录</td>
        </tr>
        <tr>
          <td>PIPELINE_ID</td>
          <td>{'${PIPELINE_ID}'}</td>
          <td>流水线的id</td>
        </tr>
        <tr>
          <td>PIPELINE_BUILD_ID</td>
          <td>{'${PIPELINE_BUILD_ID}'}</td>
          <td>此次构建的唯一id</td>
        </tr>
        <tr>
          <td>STEP_ID</td>
          <td>{'${STEP_ID}'}</td>
          <td>当前执行阶段的id</td>
        </tr>
        <tr>
          <td>STEP_NAME</td>
          <td>{'${STEP_NAME}'}</td>
          <td>当前执行阶段的名称</td>
        </tr>
        <tr>
          <td>NODE_LABEL</td>
          <td>{'${NODE_LABEL}'}</td>
          <td>执行机的标签</td>
        </tr>
        <tr>
          <td>NODE_ID</td>
          <td>{'${NODE_ID}'}</td>
          <td>执行机的id</td>
        </tr>
        <tr>
          <td>NODE_IP</td>
          <td>{'${NODE_IP}'}</td>
          <td>执行机的ip</td>
        </tr>

      </table>
      <h3>文件参数使用说明</h3>
    </div>
  );

  return (
    <div>
      <ProTable<PipelineBuildBo>
        columns={columns}
        actionRef={actionRef}
        cardBordered

        params={{ pipelineId: props.pipelineId }}
        request={async (params = {}, sort, filter) => {
          // console.log(params, sort, filter);
          let p = {
            pipelineId: props.pipelineId, pageNum: params.current, pageSize: params.pageSize, pageSort: sort,
          };
          let rst = await pipelineBuildPageApi(p);
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
            console.log('value: ', value);
          },

        }}
        rowKey="id"
        search={false}
        options={{
          setting: {
            listsHeight: 400,
          },
        }}
        form={{
          syncToUrl: false,
        }}
        pagination={{
          pageSize: 10,
          onChange: (page) => console.log(page),
        }}
        dateFormatter="string"
        headerTitle="构建列表"
        // showHeader={false}
        toolBarRender={() => [
          // <Button
          //     key="button"
          //     icon={<PlusOutlined/>}
          //     onClick={() => {
          //         actionRef.current?.reload();
          //     }}
          //     type="primary"
          // >
          //     新建
          // </Button>,
          <Button type={'link'} key={'funP'} onClick={() => {
            window.open('/#/doc/globalFun.html');
          }}>方法介绍</Button>,
          <Popover content={content} title="" trigger="click" key={'PopoverParam'}>
            <Button type={'link'}>参数说明</Button>
          </Popover>,
          <Switch key={'autoCheck'} checkedChildren="自动刷新" unCheckedChildren="自动刷新" defaultChecked={true} onChange={autoChangeFn} />,

        ]}
      />
      <Drawer
        title={'构建详情 '}
        open={buildDetailModal !== OperateEnum.close}
        width={'75%'}
        destroyOnClose={true}
        maskClosable={false}
        onClose={() => setBuildDetailModalFn(OperateEnum.close)}
        footer={null}
        // styles={drawerStyles}
      >
        <div>
          <BuildDetail
            pipelineId={props.pipelineId}
            buildDetailId={buildDetailId}
          />
        </div>
      </Drawer>
      <Drawer
        title={'构建日志 '}
        open={buildLogModal !== OperateEnum.close}
        width={'75%'}
        destroyOnClose={true}
        maskClosable={false}
        onClose={() => setBuildLogModalFn(OperateEnum.close)}
        footer={null}
      >
        <div>
          <Log
            pipelineId={props.pipelineId}
            buildDetailId={buildDetailId}
            type={LogTypeEnum.pipeline}
            buildStepId={0}
          />
        </div>
      </Drawer>

    </div>
  );
};

