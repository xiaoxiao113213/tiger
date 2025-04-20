import { ProDescriptions } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import { getNullBo } from '@/utils/utils.ts';
import { processInstanceGetOneApi } from '@/pages/flow/process/myProcess/api/processInstanceApi.tsx';
import { ProcessInstanceDetailVo, ProcessInstancePointDetailVo, ProcessInstancePointFormFieldDetailVo } from '@/pages/flow/process/myProcess/api/ApiBo.ts';
import { Button, Divider, Drawer, Tag } from 'antd';
import GetProcessInstanceStatusDicList from '@/components/Dic/ProcessInstanceStatusDic.ts';
import { FlowNodeType } from '@/pages/flow/process/process/uilts.ts';
import ViewForm from '@/pages/flow/process/process/form/form/viewForm';
import { OperateEnum } from '@/utils/enum.ts';
import Approval from '@/pages/flow/process/myProcess/pendingApproval/do/Approval.tsx';
import Handler from '@/pages/flow/process/myProcess/pendingApproval/do/Handler.tsx';
import PointList from '@/pages/flow/process/myProcess/pendingApproval/do/pointList.tsx';
import { getUserInfo } from '@/store/userStore.ts';


type Props = {
  detailId: number
};
export default (props: Props) => {
  const [detail, setDetailFn] = useState<ProcessInstanceDetailVo>(getNullBo);
  const [currentPoint, setCurrentPoint] = useState<ProcessInstancePointDetailVo>();
  const [processInstanceApprovalPeopleId, setProcessInstanceApprovalPeopleId] = useState<number>();
  const [startFieldList, setStartFieldList] = useState<ProcessInstancePointFormFieldDetailVo[]>([]);
  const { processInstanceStatusMap } = GetProcessInstanceStatusDicList();
  const userInfo = getUserInfo();
  const [approvalModal, setApprovalModal] = useState(OperateEnum.close);
  const [handlerModal, setHandlerModal] = useState(OperateEnum.close);

  const initMyDataFn = async () => {
    setProcessInstanceApprovalPeopleId(undefined);
    let rst = await processInstanceGetOneApi({ processInstanceId: props.detailId });
    setDetailFn(rst.data);
    // 获取节点列表
    const currentPoint = rst.data.pointList.find(item => item.status === '1');
    if (currentPoint) {
      currentPoint.children = rst.data.approvalPeopleList.filter(approval => approval.processInstancePointId === currentPoint.processInstancePointId);
      if (currentPoint.children.length > 0) {
        const currentUser = currentPoint.children.find(item => item.accountId.toString() == userInfo.accountId);
        if (currentUser) {
          setProcessInstanceApprovalPeopleId(currentUser.processInstanceApprovalPeopleId);
        }
      }
    }
    setCurrentPoint(currentPoint);

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

  return (
    <div className={'mmm-height'}>
      <div style={{ display: 'flex', height: 'calc(100% - 48px)' }}>
        <div style={{ flexGrow: 1, minWidth: 0 }}>
          <ProDescriptions column={2} title="" tooltip="">

            <ProDescriptions.Item label="标题" tooltip="" valueType="text" key={'title'}>
              {detail.title}
            </ProDescriptions.Item>

            <ProDescriptions.Item label="状态" tooltip="" key={'status'}>
              {(() => {
                let item = processInstanceStatusMap[detail.status];
                return <Tag color={item?.color ?? 'green'}>{item?.label}</Tag>;
              })()}
            </ProDescriptions.Item>


            <ProDescriptions.Item label="申请人" tooltip="" valueType="text" key={'createBy'}>
              {detail?.createByAccount?.account}
            </ProDescriptions.Item>
            <ProDescriptions.Item label="申请时间" tooltip="" valueType="text" key={'createTime'}>
              {detail.createTime}
            </ProDescriptions.Item>

            <ProDescriptions.Item label="结束时间" tooltip="" valueType="text" key={'endTime'}>
              {detail.endTime}
            </ProDescriptions.Item>

            {/*<Form.Item label='type' name='type' rules={[{required: true}]}>*/}
            {/*    <Select placeholder="请输入"*/}
            {/*            options={DatabaseTypeList}*/}
            {/*    />*/}
            {/*</Form.Item>*/}

            {/*<ProDescriptions.Item label="状态" tooltip="" key={"disabled"}>*/}
            {/*    {(() => {*/}
            {/*        if (detail.disabled === 0) {*/}
            {/*            return <Tag color={"green"}>启用中</Tag>;*/}
            {/*        } else {*/}
            {/*            return <Tag color={"red"}>禁用中</Tag>;*/}
            {/*        }*/}
            {/*    })()}*/}
            {/*</ProDescriptions.Item>*/}


          </ProDescriptions>
          <Divider>表单</Divider>
          <ViewForm initFieldBoList={startFieldList} />
        </div>
        <div style={{ width: '300px', flexShrink: 0 }}>
          <PointList instanceDetail={detail}></PointList>
        </div>
      </div>
      {processInstanceApprovalPeopleId &&
        <div className={'mmm-bgcolor'} style={{ height: '48px', display: 'flex', justifyContent: 'end' }}>
          <Button type={'primary'} onClick={() => {
            if (currentPoint?.type === FlowNodeType.approvalNode) {
              setApprovalModal(OperateEnum.add);
            } else if (currentPoint?.type === FlowNodeType.handleNode) {
              setHandlerModal(OperateEnum.add);
            }
          }}>处理</Button>
        </div>
      }
      <Drawer
        title={'审批'}
        open={approvalModal !== OperateEnum.close}
        width={'45%'}
        destroyOnClose={true}
        maskClosable={false}
        onClose={() => setApprovalModal(OperateEnum.close)}
        footer={null}
      >
        <div>
          <Approval onClose={() => {
            setApprovalModal(OperateEnum.close);
            initMyDataFn();
          }}
                    processInstanceApprovalPeopleId={processInstanceApprovalPeopleId}
          ></Approval>
        </div>
      </Drawer>
      <Drawer
        title={'办理'}
        open={handlerModal !== OperateEnum.close}
        width={'45%'}
        destroyOnClose={true}
        maskClosable={false}
        onClose={() => setHandlerModal(OperateEnum.close)}
        footer={null}
      >
        <div>
          <Handler onClose={() => {
            setHandlerModal(OperateEnum.close);
            initMyDataFn();
          }}
                   processInstanceApprovalPeopleId={processInstanceApprovalPeopleId}
          ></Handler>
        </div>
      </Drawer>

    </div>
  );
};

