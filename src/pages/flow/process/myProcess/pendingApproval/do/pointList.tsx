import React from 'react';
import { ProcessInstanceDetailVo, ProcessInstancePointDetailVo } from '@/pages/flow/process/myProcess/api/ApiBo.ts';
import { Avatar, List, Tag, Timeline, Typography } from 'antd';
import GetProcessInstancePointStatusDicList from '@/components/Dic/ProcessInstancePointStatusDic.ts';
import { FlowNodeType } from '@/pages/flow/process/process/uilts.ts';
import { DicMap } from '@/utils/baseBo.ts';

const { Title } = Typography;

const ApprovalList = (
  props: {
    point: ProcessInstancePointDetailVo,
    ProcessInstancePointStatusMap: DicMap
  },
) => {
  const { point, ProcessInstancePointStatusMap } = props;
  console.log('point', point, ProcessInstancePointStatusMap);

  return (
    <div className={'mmm-height'}>
      <Title level={4}>{point?.name}</Title>
      <List
        itemLayout="horizontal"
        dataSource={point.children}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={<div>
                <Avatar style={{ backgroundColor: '#2b87db', verticalAlign: 'middle' }} size="default"
                        src={item.accountVo.avatar}>{item.accountVo.nickName}</Avatar>
              </div>
              }
              title={<div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>{item?.accountVo?.nickName}</span>
                  {point.type !== FlowNodeType.startNode &&
                    <Tag color={ProcessInstancePointStatusMap[item.status]?.color ?? 'geekblue'} key={1}>
                      {ProcessInstancePointStatusMap[item.status]?.label ?? '未知'}
                    </Tag>
                  }
                </div>
                {item.endTime}
              </div>}
              description={item?.reason ?? ''}
            />
          </List.Item>
        )}
      />
    </div>
  );
};


const PointList = (props: {
  instanceDetail?: ProcessInstanceDetailVo
}) => {
  const { ProcessInstancePointStatusMap } = GetProcessInstancePointStatusDicList();
  if (!props?.instanceDetail || !props?.instanceDetail?.pointList || !ProcessInstancePointStatusMap) {
    return null;
  }

  const { instanceDetail } = props;
  const pointList = instanceDetail.pointList;
  pointList.forEach(item => {
    const peopleList = instanceDetail.approvalPeopleList
      .filter(approval => approval.processInstancePointId === item.processInstancePointId)
      .map(approval => {
        return {
          ...approval,
        };
      });
    if (peopleList.length > 0) {
      item.children = peopleList;
    } else {
      item.children = [];
    }
  });
  const startPoint = pointList.find(item => item.type === FlowNodeType.startNode)!!;
  startPoint.children = [{
    accountVo: instanceDetail?.createByAccount,
    status: 1,
    endTime: startPoint.endTime,
  }];

  const items = pointList.map((point, index) => {
    return {
      color: ProcessInstancePointStatusMap[point.status]?.color ?? 'geekblue',
      children: (
        <ApprovalList point={point} ProcessInstancePointStatusMap={ProcessInstancePointStatusMap} />
      ),
    };
  });

  return (
    <div className={'mmm-height'} style={{ overflowY: 'auto' }}>
      <Timeline items={items}>

      </Timeline>
    </div>
  );
};

export default PointList;