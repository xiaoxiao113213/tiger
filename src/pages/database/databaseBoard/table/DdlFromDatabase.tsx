import React, { useEffect, useState } from 'react';
import { Alert, Button, Form, message, Select, Spin } from 'antd';
import { databaseConfigAllApi } from '@/pages/database/databaseConfig/api';
import { getDatabaseNameList, syncDatabaseBoard } from '@/pages/database/databaseBoard/api';
import { DatabaseConfigDetailVo } from '@/pages/database/databaseConfig/ApiBo.ts';
import { DicVo } from '@/utils/DicVo.ts';
import { oFormatForm } from '@/utils/utils.ts';


type Props = {
  databaseBoardId: number
  setAddOrUpdateModalFn: () => void,
};
const DdlFromDatabase = (props: Props) => {
  const [formRef] = Form.useForm<DatabaseConfigDetailVo>();
  const [databaseList, setDatabaseList] = useState<DicVo[]>([]);
  const [dataNameList, setDataNameList] = useState<DicVo[]>([]);
  const [spinning, setSpinning] = React.useState<boolean>(false);
  const initMyDataFn = async () => {
    let rst = await databaseConfigAllApi({});
    let list = rst.data.map((item) => {
      return {
        label: item.name,
        value: item.databaseConfigId,
      };
    });
    setDatabaseList(list);

  };
  const changeDatabase = async (value: number) => {
    let rst1 = await getDatabaseNameList({ databaseConfigId: value });
    let list1 = rst1.data.map((item) => {
      return {
        label: item,
        value: item,
      };
    });
    setDataNameList(list1);

  };

  const saveFn = async () => {

    const isPass = await formRef.validateFields().catch(() => false);
    if (!isPass) return;

    const values = await formRef?.getFieldsValue();
    oFormatForm(values);
    // 加载loding
    setSpinning(true);
    let res = await syncDatabaseBoard({
      ...values,
      databaseBoardId: props.databaseBoardId,
    });
    setSpinning(false);
    if (res.code !== 1000) return;
    message.success(res.msg);

    props.setAddOrUpdateModalFn();

  };

  const closeModal = () => {
    props.setAddOrUpdateModalFn();
  };


  useEffect(() => {
    initMyDataFn();
    return () => {
    };
  }, []); // 第二个参数表示依赖项


  return (
    <div>

      <Spin tip="Loading" spinning={spinning} size="small">
        <Alert message="从数据库同步 会直接覆盖本地的内容！！" type="warning"
               showIcon
               style={{ marginBottom: 20 }}
        />
        <Form form={formRef}
              labelCol={{ flex: '10%' }}
              wrapperCol={{ flex: '90%' }}>

          <Form.Item label="数据库" name="databaseConfigId" rules={[{ required: true }]}>
            <Select placeholder="请选择"
                    options={databaseList}
                    onChange={changeDatabase}
                    showSearch={true}
                    optionFilterProp={'label'}
            />
          </Form.Item>
          <Form.Item label="库名称" name="databaseName" rules={[{ required: true }]}>
            <Select placeholder="请选择"
                    options={dataNameList}
                    showSearch={true}
                    optionFilterProp={'label'}
            />
          </Form.Item>


          <Form.Item wrapperCol={{ offset: 8, span: 16 }} style={{ textAlign: 'right' }}>
            <Button type="default" onClick={closeModal} style={{ marginRight: 20 }}>
              取消
            </Button>
            <Button type="primary" onClick={saveFn}>
              确定
            </Button>
          </Form.Item>
        </Form>
      </Spin>
    </div>
  );
};

export default DdlFromDatabase;

