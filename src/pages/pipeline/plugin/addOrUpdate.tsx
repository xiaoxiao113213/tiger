import React, { useEffect, useState } from 'react';
import { Button, Card, Divider, Drawer, Form, Input, message, Select } from 'antd';

import { PipelinePluginDetailVo } from './ApiBo';
import { pipeline_pluginGetOneApi, pipeline_pluginSaveApi, pipeline_pluginUpdateApi } from './api';
import { OperateEnum } from '@/utils/enum.ts';
import { DicVo } from '@/utils/DicVo.ts';
import { OtherAccountBo } from '@/pages/pipeline/otherAccount/ApiBo.ts';
import { getNullBo, oFormatForm } from '@/utils/utils.ts';
import { otherAccountAllApi } from '@/pages/pipeline/otherAccount/api.tsx';
import { Rst } from '@/utils/baseBo.ts';
import CodeMirrorEditor from '@/components/CodeEidtor';
import { clientToServerValueItem, CustomerFieldBo, serverToClientValue } from '@/pages/flow/process/process/form/form/Bo.tsx';
import FormComponent, { FormBuilderRef } from '@/pages/flow/process/process/form/form/addForm/formComponent.tsx';
import SubmitForm from '@/pages/flow/process/process/form/form/submitForm';


type Props = {
  detailId: number
  operateEnum: OperateEnum
  setAddOrUpdateModalFn: React.Dispatch<React.SetStateAction<OperateEnum>>,
  reloadTable: () => void,
  scriptTypeList: DicVo[],
  typeList: DicVo[],
};
const AddOrUpdate = (props: Props) => {
  const [formRef] = Form.useForm<PipelinePluginDetailVo>();
  const [detail, setDetailFn] = useState<PipelinePluginDetailVo>({ params: [] });
  const [otherAccountList, setOtherAccountListFn] = useState<OtherAccountBo[]>([]);
  // 当非空的时候 才显示这个code插件
  const [code, setCode] = useState<string>();
  const [codeFullScreenModal, setCodeFullScreenModalFn] = useState<OperateEnum>(OperateEnum.close);
  const [reloadValue, setReloadValueFn] = useState<number>();
  const [fieldList, setFieldList] = useState<CustomerFieldBo[]>([]);
  const [formDesignOpen, setFormDesignOpen] = useState(false);
  const formBuilderRef = React.useRef<FormBuilderRef>(null);
  const [formFieldRef] = Form.useForm();

  const handleCodeChange = (value: string) => {
    setCode(value);
  };

  // 全局脚本关闭的时候
  const closeFullScreenModal = () => {
    setCodeFullScreenModalFn(OperateEnum.close);
    setReloadValueFn(prevState => (prevState ?? 0) + 1);
    // setCode(pre)
  };

  // 当无法操作的时候 返回false 正确的时候返回true

  const initMyDataFn = async () => {
    otherAccountAllApi({}).then(rst => {
      // 由于 参数选择 过程中 都是字符串最为默认值 因此 把id number 改成字符串
      rst.data.forEach(item => item.id = item.id + '');
      setOtherAccountListFn(rst.data);
    });
    if (props.operateEnum === OperateEnum.edit) {
      let rst = await pipeline_pluginGetOneApi({ id: props.detailId });
      setDetailFn(rst.data);
      if (rst.data.params) {
        rst.data.params.forEach(item => {
          serverToClientValue(item);
        });
        setFieldList(rst.data.params);
      }
      formRef.setFieldsValue(rst.data);
      setCode(rst.data.script);
    } else {
      formRef.setFieldsValue(getNullBo());
      setCode('');
    }
  };

  const saveFn = async () => {

    const isPass = await formRef.validateFields().catch(() => false);
    if (!isPass) return;

    const values = await formRef?.getFieldsValue();
    oFormatForm(values);
    // 适配value的值

    const fieldList1 = JSON.parse(JSON.stringify(fieldList));
    fieldList1.forEach((item) => {
      clientToServerValueItem(item);
    });

    let res: Rst<any>;
    if (props.operateEnum === OperateEnum.edit) {
      res = await pipeline_pluginUpdateApi({ ...values, id: props.detailId, params: fieldList1, script: code!! });
    } else {
      res = await pipeline_pluginSaveApi({ ...values, params: fieldList1, script: code!! });
    }
    if (res.code !== 1000) return;
    message.success(res.msg);
    props.reloadTable();
    props.setAddOrUpdateModalFn(OperateEnum.close);

  };

  const closeModal = () => {
    props.setAddOrUpdateModalFn(OperateEnum.close);
  };


  useEffect(() => {
    initMyDataFn();
    return () => {
    };
  }, []); // 第二个参数表示依赖项
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


  return (
    <div>
      <Form form={formRef}
        // labelCol={{ flex: '10%' }}
        // wrapperCol={{ flex: '90%' }}
      >
        <Form.Item label="名称" name="name" rules={[{ required: true }]}>
          <Input placeholder="请输入" />
        </Form.Item>
        <Form.Item label="脚本类型" name="scriptType" rules={[{ required: true }]}>
          <Select
            options={props.scriptTypeList}
          />
        </Form.Item>
        <Form.Item label="资源类型" name="type" rules={[{ required: true }]}>
          <Select
            options={props.typeList}
          />
        </Form.Item>
        <Form.Item
          label="备注"
          name="desc"
        >
          <Input.TextArea allowClear
                          autoSize={{ minRows: 2 }} />
        </Form.Item>
        <Divider>脚本 <Button type={'link'} onClick={() => setCodeFullScreenModalFn(OperateEnum.detail)}>全屏</Button></Divider>
        {code !== undefined && <CodeMirrorEditor
          value={code}
          language="shell"
          onChange={handleCodeChange}
          reloadValue={reloadValue}
        ></CodeMirrorEditor>}

      </Form>
      <Card title={<div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>表单设计</span><Button type={'link'} onClick={() => setFormDesignOpen(true)}>设计表单</Button></div>}>
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


      <div style={{ textAlign: 'center' }}>
        <Button type="default" onClick={closeModal} style={{ marginRight: 20 }}>
          取消
        </Button>
        <Button type="primary" onClick={saveFn}>
          确定
        </Button>
      </div>
      <Drawer
        title={'脚本'}
        open={codeFullScreenModal !== OperateEnum.close}
        width={'100%'}
        destroyOnClose={true}
        maskClosable={false}
        onClose={closeFullScreenModal}
        footer={null}
      >
        {code !== undefined
          && <CodeMirrorEditor
            value={code}
            language="shell"
            onChange={handleCodeChange}
            readOnly={false}
          ></CodeMirrorEditor>}
      </Drawer>
      <Drawer title={'表单设计'} open={formDesignOpen} onClose={() => setFormDesignOpen(false)}
              extra={<Button onClick={handleOk} type={'primary'}>确定</Button>}
              width={'100%'}
              destroyOnClose={true}
              keyboard={false}
      >
        <FormComponent ref={formBuilderRef} initFormDesign={fieldList} showScope={true}></FormComponent>
      </Drawer>
    </div>
  );
};

export default AddOrUpdate;