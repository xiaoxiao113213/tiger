import { ProDescriptions } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import { processInstanceGetOneApi } from '@/pages/flow/process/myProcess/api/processInstanceApi.tsx';
import { ProcessInstanceDetailVo, ProcessInstancePointFormFieldDetailVo } from '@/pages/flow/process/myProcess/api/ApiBo.ts';
import { Divider, Tag } from 'antd';
import GetProcessInstanceStatusDicList from '@/components/Dic/ProcessInstanceStatusDic.ts';
import { FlowNodeType } from '@/pages/flow/process/process/uilts.ts';
import ViewForm from '@/pages/flow/process/process/form/form/viewForm';
import PointList from '@/pages/flow/process/myProcess/pendingApproval/do/pointList.tsx';


type Props = {
  detailId: number
};
export default (props: Props) => {
  const [detail, setDetailFn] = useState<ProcessInstanceDetailVo>();
  const [startFieldList, setStartFieldList] = useState<ProcessInstancePointFormFieldDetailVo[]>([]);
  const { processInstanceStatusMap, processInstanceStatusList } = GetProcessInstanceStatusDicList();
  const initMyDataFn = async () => {
    let rst = await processInstanceGetOneApi({ processInstanceId: props.detailId });
    setDetailFn(rst.data);
    // 获取节点列表
    // const pointListtmp = rst.data.pointList.filter(item => item.type !== FlowNodeType.startNode);

    // 获取开始节点的表单
    const startNode = rst.data.pointList.find(item => item.type === FlowNodeType.startNode);
    if (!startNode) {
      return;
    }
    const startForm = rst.data.pointFormList.find(item => item.processInstancePointId === startNode.processInstancePointId);
    if (!startForm) {
      return;
    }
    const startFieldList = rst.data.pointFieldList.filter(item => item.processInstancePointFormId === startForm.processInstancePointFormId);
    setStartFieldList(startFieldList);
  };
  useEffect(() => {
    initMyDataFn();
    return () => {
    };
  }, []); // 第二个参数表示依赖项

  if (!detail) {
    return null;
  }

  return (
    <div style={{ display: 'flex' }}>
      <div style={{ flexGrow: 1, minWidth: 0 }}>
        <ProDescriptions column={2} title="" tooltip="">
          <ProDescriptions.Item label="标题" tooltip="" valueType="text" key={'title'}>
            {detail?.title}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="状态" tooltip="" key={'status'}>
            {(() => {
              let item = processInstanceStatusMap[detail?.status];
              return <Tag color={item?.color ?? 'green'}>{item?.label}</Tag>;
            })()}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="申请人" tooltip="" valueType="text" key={'createBy'}>
            {detail?.createByAccount?.account}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="申请时间" tooltip="" valueType="text" key={'createTime'}>
            {detail?.createTime}
          </ProDescriptions.Item>
          <ProDescriptions.Item label="结束时间" tooltip="" valueType="text" key={'endTime'}>
            {detail?.endTime}
          </ProDescriptions.Item>
        </ProDescriptions>
        <Divider>表单</Divider>
        <ViewForm initFieldBoList={startFieldList} />
        <Divider></Divider>
        {/*<Table columns={columns}*/}
        {/*       dataSource={pointList}*/}
        {/*       key={'processInstancePointId'}*/}
        {/*       expandable={*/}
        {/*         {*/}
        {/*           expandedRowKeys: expandedRowKeys,*/}
        {/*           onExpandedRowsChange: setExpandedRowKeys,*/}
        {/*         }*/}
        {/*       }*/}
        {/*/>*/}
      </div>
      <div style={{ width: '300px', flexShrink: 0 }}>
        <PointList instanceDetail={detail}></PointList>
      </div>
    </div>
  );
};            