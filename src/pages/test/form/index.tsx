import React, { useState } from 'react';
import { Button, Card, Drawer, Form, message } from 'antd';
import FormComponent, { FormBuilderRef } from '@/pages/flow/process/process/form/form/addForm/formComponent.tsx';
import { CustomerFieldBo } from '@/pages/flow/process/process/form/form/Bo.tsx';
import SubmitForm from '@/pages/flow/process/process/form/form/submitForm';

const App: React.FC = () => {
  const [formDesignOpen, setFormDesignOpen] = useState(false);
  const formBuilderRef = React.useRef<FormBuilderRef>(null);
  const [formFieldRef] = Form.useForm();
  const [fieldList, setFieldList] = useState<CustomerFieldBo[]>([]);
  const showModal = () => {
    setFormDesignOpen(true);
  };

  const handleOk = () => {
    const list = formBuilderRef.current?.getFieldList();
    if (!list) return;
    // 如果list中 key为空 或者有重复的key 都报错
    list.forEach((item) => {
      if (item.keyName === '') {
        message.error('有字段的唯一标识为空');
        throw new Error('有字段的唯一标识为空');
      }
      const tmpList = list.filter((i) => i.keyName === item.keyName);
      if (tmpList.length > 1) {
        message.error(`有重复的唯一标识【${tmpList[0].keyName}】`);
        throw new Error(`有重复的唯一标识【${tmpList[0].keyName}】`);
      }
    });
    setFieldList(list);
    const value = {};
    list.forEach((item) => {
      value[item.id] = item.value;
    });
    formFieldRef.setFieldsValue(value);
    setFormDesignOpen(false);
  };

  const handleCancel = () => {
    setFormDesignOpen(false);
  };

  return (
    <>
      <Button type="primary" onClick={showModal}>
        Open Modal
      </Button>
      <Card title={<div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>表单设计</span><Button type={'primary'} onClick={() => setFormDesignOpen(true)}>设计表单</Button></div>}>
        <Form form={formFieldRef}
              validateTrigger="false"
              onValuesChange={(changedValues, allValues) => {
                // console.log('变动值了', changedValues, allValues);
                fieldList.forEach((item) => {
                  // 如何验证是否有这个key
                  if (changedValues.hasOwnProperty(item.id)) {
                    item.value = changedValues[item.id];
                  }
                });
                setFieldList(fieldList);
              }
              }>
          {
            fieldList.map((item) => {
              return <SubmitForm
                key={item.id}
                initFieldBo={item}
              ></SubmitForm>;
            })
          }
        </Form>
      </Card>


      <Drawer title={'表单设计'} open={formDesignOpen} onClose={() => setFormDesignOpen(false)}
              extra={<Button onClick={handleOk} type={'primary'}>确定</Button>}
              width={'100%'}
              destroyOnClose={true}
              keyboard={false}
      >
        <FormComponent ref={formBuilderRef} initFormDesign={fieldList}></FormComponent>
      </Drawer>
    </>
  );
};

export default App;