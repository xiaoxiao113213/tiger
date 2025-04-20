import React, { useEffect, useState } from 'react';
import { getUserInfo } from '@/store/userStore.ts';
import { Button, Descriptions, DescriptionsProps, Divider, Form, message } from 'antd';
import { getCanSubmitProcessApi } from '@/pages/flow/process/process/api/processApi.tsx';
import { ProcessVersionDetailVo } from '@/pages/flow/process/process/api/ProcessApiBo.ts';
import { clientToServerValue, serverToClientValue } from '@/pages/flow/process/process/form/form/Bo.tsx';
import SubmitNowform from '@/pages/flow/process/process/form/form/submitForm/submitNowform.tsx';
import { processInstanceSaveApi } from '@/pages/flow/process/myProcess/api/processInstanceApi.tsx';
import { checkApiRst } from '@/utils/utils.ts';

const AddInstance = (
  props: {
    processId: number;
    closeModal: () => void;
  },
) => {
  const [form] = Form.useForm();
  const userInfo = getUserInfo()!!;
  const [process, setProcess] = useState<ProcessVersionDetailVo>({ fieldList: [] });

  const initData = async () => {
    getCanSubmitProcessApi({ processId: props.processId }).then((rst) => {
      rst.data.fieldList.forEach((item) => {
        serverToClientValue(item);
      });
      setProcess(rst.data);
    });
  };
  const save = async () => {
    const isPass = await form.validateFields().catch(() => false);
    if (!isPass) return;
    const values = await form.getFieldsValue();
    console.log('value1', values);
    process.fieldList.forEach((item) => {
      clientToServerValue(item, values);
    });
    console.log('value2', values);
    const rst = await processInstanceSaveApi({ processId: props.processId, processVersionId: process.processVersionId, values: values });
    if (checkApiRst(rst)) {
      return;
    }
    message.success('提交成功');
    props.closeModal();

  };


  useEffect(() => {
    initData();
  }, []);

  const items: DescriptionsProps['items'] = [
    {
      key: '1',
      label: '申请人',
      children: userInfo.nickName,
    },
  ];
  return (
    <div>
      <Descriptions title="申请流程" items={items} />
      <Divider>表单</Divider>
      <Form form={form}
            labelCol={{ span: 3 }}
        // wrapperCol={{ span: 16 }}
      >
        {
          process.fieldList.map((item, index) => {
            return (
              <div key={index} style={{ display: 'flex' }}>
                <span style={{ flex: 20 }}><SubmitNowform initFieldBo={item}></SubmitNowform></span>
              </div>
            );
          })
        }
      </Form>
      <div style={{ width: '100%', textAlign: 'center' }}>
        <Button type={'primary'} onClick={save}>提交</Button>
        <Button style={{ marginLeft: '20px' }} onClick={props.closeModal}>取消</Button>
      </div>
    </div>
  );
};

export default AddInstance;
