import React, { useEffect, useState } from 'react';
import { Button, Card, Col, Drawer, Row } from 'antd';
import { getMyUseProcess } from '@/pages/flow/process/process/api/processApi.tsx';
import { ProcessListVo } from '@/pages/flow/process/process/api/ProcessApiBo.ts';
import { OperateEnum } from '@/utils/enum.ts';
import AddInstance from '@/pages/flow/process/myProcess/apply/AddInstance.tsx';

const Index = (props: { tabId: string }) => {

  const [processList, setProcessList] = useState<ProcessListVo[]>([]);
  const [addinstanceModal, setAddinstanceModal] = useState(OperateEnum.close);
  const [processId, setProcessId] = useState(0);

  const initData = async () => {
    const rst = await getMyUseProcess();
    setProcessList(rst.data);
  };

  useEffect(() => {
    if (props.tabId === '3') {
      initData();
    }
  }, [props.tabId]);

  return (
    <div>
      <Row gutter={16}>
        {
          processList.map((item, index) => {
            return (
              <Col span={8} key={index}>
                <Card title={
                  <div>
                    <span>{item.name}</span>
                    <span style={{ float: 'right' }}>
                      <Button type={'primary'}
                              onClick={() => {
                                setProcessId(item.processId);
                                setAddinstanceModal(OperateEnum.add);
                              }}
                      >申请</Button></span>
                  </div>
                } bordered={false}>
                  {item.remarks}
                </Card>
              </Col>
            );
          })
        }
      </Row>
      <Drawer
        title={'申请'}
        open={addinstanceModal !== OperateEnum.close}
        width={'90%'}
        destroyOnClose={true}
        maskClosable={false}
        onClose={() => {
          setAddinstanceModal(OperateEnum.close);
        }}
        footer={null}
      >
        <div>
          <AddInstance processId={processId}
                       closeModal={() => {
                         setAddinstanceModal(OperateEnum.close);

                       }
                       }
          >

          </AddInstance>
        </div>
      </Drawer>
    </div>
  );
};

export default Index;