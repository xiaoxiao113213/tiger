import React, { useEffect, useState } from 'react';
import { Alert, Button, Form, Input, message, Select, Spin, Typography } from 'antd';

import { databaseConfigAllApi } from '@/pages/database/databaseConfig/api';
import { compareDatabaseBoard, getDatabaseNameList } from '@/pages/database/databaseBoard/api';
import { DatabaseConfigDetailVo } from '@/pages/database/databaseConfig/ApiBo.ts';
import { DicVo } from '@/utils/DicVo.ts';
import { oFormatForm } from '@/utils/utils.ts';

const { Paragraph, Text } = Typography;

type Props = {
  databaseBoardId: number
  setAddOrUpdateModalFn: () => void,

};
// 和数据库进行对比，部署到数据库上
const CompareFromDatabase = (props: Props) => {
  const [formRef] = Form.useForm<DatabaseConfigDetailVo>();
  const [databaseList, setDatabaseList] = useState<DicVo[]>([]);
  const [dataNameList, setDataNameList] = useState<DicVo[]>([]);
  const [spinning, setSpinning] = React.useState<boolean>(false);

  const [ddlS, setDdlS] = useState<string | null | undefined>();

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
    compareDatabaseBoard({
      ...values,
      databaseBoardId: props.databaseBoardId,
    }).then((res) => {
      if (res.code !== 1000) return;
      message.success(res.msg);
      setDdlS(res.data);
    }).finally(() => {
      setSpinning(false);
    });
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
      <Spin spinning={spinning} fullscreen />

      <Alert message="要自我查看下sql语句，因为有很多情况是不支持的" type="warning"
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


        <Form.Item wrapperCol={{ offset: 8, span: 16 }} style={{ textAlign: 'left' }}>
          <Button type="primary" onClick={saveFn}>
            开始对比
          </Button>
        </Form.Item>
      </Form>
      <Paragraph copyable={{
        text: ddlS || '',
      }}></Paragraph>
      <Input.TextArea
        autoSize={{ minRows: 2 }}
        value={ddlS}
      ></Input.TextArea>

    </div>
  );
};

export default CompareFromDatabase;

