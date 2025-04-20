import React, { useEffect, useState } from 'react';
import { BranchesOutlined, EditOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Card, Col, Drawer, Row, Skeleton } from 'antd';
import { docAllApi } from '@/pages/doc/api';
import { DocListVo } from '@/pages/doc/ApiBo';
import AddOrUpdate from '@/pages/doc/addOrUpdate';
import { OperateEnum } from '@/utils/enum.ts';

const { Meta } = Card;

const App: React.FC = () => {
  const [itemList, setItemListFn] = useState<DocListVo[]>([]);
  const [detailId, setDetailIdFn] = useState<number>();
  const [addOrUpdateModal, setAddOrUpdateModalFn] = useState<OperateEnum>(OperateEnum.close);
  const initData = async () => {
    let rst = await docAllApi({});
    setItemListFn(rst.data);
  };

  const forwardDoc = (docId: number) => {
    //     打开新的标签页 跳转到文档

    window.open(`/#/doc/doc?docId=${docId}`);

  };

  useEffect(() => {
    initData();
  }, []); // 第二个参数表示依赖项


  return (
    <>
      <div>
        <Button type={'link'} onClick={() => {
          setAddOrUpdateModalFn(OperateEnum.add);
        }}>新增</Button>
      </div>

      <Row gutter={16}>
        {
          itemList.map((item, index) => {
            return (
              <Col span={8} key={`${index}-col`}>
                <Card
                  key={index}
                  style={{ marginTop: 16 }}
                  actions={[
                    <SettingOutlined key="setting" />,
                    <EditOutlined key="edit" onClick={() => {
                      setDetailIdFn(item.docId);
                      setAddOrUpdateModalFn(OperateEnum.edit);
                    }} />,
                    <BranchesOutlined key="ellipsis" onClick={() => {
                      forwardDoc(item.docId);
                    }} />,
                  ]}
                >
                  <Skeleton loading={false} avatar active>
                    <Meta
                      // avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />}
                      title={item.name}
                      description={
                        <div
                          style={{
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                          }}>
                          {item.remarks}
                        </div>}
                    />
                  </Skeleton>
                </Card>
              </Col>
            );
          })
        }
      </Row>

      <Drawer
        title={addOrUpdateModal == OperateEnum.edit ? '文档空间编辑' : '文档空间新增'}
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
                       reloadTable={initData}
          />
        </div>
      </Drawer>

    </>
  );
};

export default App;