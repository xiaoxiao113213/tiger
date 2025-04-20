import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message, Select } from 'antd';
import { ProjectReleaseDetailVo } from './ApiBo';
import { projectReleaseGetOneApi, projectReleaseSaveApi, projectReleaseUpdateApi } from './api';
import { OperateEnum } from '@/utils/enum.ts';
import { getNullBo, oFormatForm } from '@/utils/utils.ts';
import { Rst } from '@/utils/baseBo.ts';
import FileUploadCom from '@/components/upload/FileUploadCom.tsx';
import SubmitNowform from '@/pages/flow/process/process/form/form/submitForm/submitNowform.tsx';
import projectDic from '@/components/Dic/ProjectDic.ts';
import { clientToServerValue1, CustomerFieldBo, serverToClientValue, serverToClientValue1 } from '@/pages/flow/process/process/form/form/Bo.tsx';
import { projectCustomFieldAllApi } from '@/pages/project/project/api.tsx';
import { fileClientToServer, fileServerToClient } from '@/components/upload/utils.ts';

type Props = {
  detailId: number
  operateEnum: OperateEnum
  setAddOrUpdateModalFn: React.Dispatch<React.SetStateAction<OperateEnum>>,
  reloadTable: () => void,
  defaultProjectId: number
};
const AddOrUpdate = (props: Props) => {
  const [formRef] = Form.useForm<ProjectReleaseDetailVo>();
  const [detail, setDetailFn] = useState<ProjectReleaseDetailVo>(getNullBo);
  const { ProjectList } = projectDic();
  const [fieldList, setFieldList] = useState<CustomerFieldBo[]>();

  const initMyDataFn = async () => {
    // 获取自定义字段
    const rst1 = await projectCustomFieldAllApi({ bizType: '1' } as any);
    const fieldList = rst1.data;
    fieldList.forEach((item) => {
      const projectCustomFieldId = item.projectCustomFieldId;
      const item1 = item as CustomerFieldBo;
      serverToClientValue(item1);
      item1.id = projectCustomFieldId + '_customField';
    });
    setFieldList(fieldList);

    if (props.operateEnum === OperateEnum.edit) {
      let rst = await projectReleaseGetOneApi({ projectReleaseId: props.detailId });
      rst.data.fileList = fileServerToClient(rst.data.fileList);
      for (let key in rst.data.customValues) {
        if (rst.data.customValues.hasOwnProperty(key)) {
          const keys = key.split('_');
          if (keys.length === 2) {
            const projectCustomFieldId = keys[0];
            rst.data.customValues[key] = serverToClientValue1(fieldList.find(item => item.projectCustomFieldId == projectCustomFieldId), rst.data.customValues[key]);
          }
        }
      }
      setDetailFn(rst.data);
      formRef.setFieldsValue({ ...rst.data, ...rst.data.customValues });
    } else {
      formRef.setFieldsValue({ projectId: props.defaultProjectId });
    }
  };
  useEffect(() => {
    initMyDataFn();
    return () => {
    };
  }, []); // 第二个参数表示依赖项
  if (fieldList === undefined) return <div></div>;
  const saveFn = async () => {

    const isPass = await formRef.validateFields().catch(() => false);
    if (!isPass) return;
    const values = await formRef?.getFieldsValue();
    oFormatForm(values);
    for (let key in values) {
      if (values.hasOwnProperty(key)) {
        const keys = key.split('_');
        if (keys.length === 2) {
          const projectCustomFieldId = keys[0];
          values[keys[0]] = clientToServerValue1(fieldList.find(item => item.projectCustomFieldId == projectCustomFieldId), values[key]);
          delete values[key];
        }
      }
    }
    values.fileList = fileClientToServer(values.fileList);
    let res: Rst<any>;
    if (props.operateEnum === OperateEnum.edit) {
      res = await projectReleaseUpdateApi({ ...values, projectReleaseId: props.detailId });
    } else {
      res = await projectReleaseSaveApi({ ...values });
    }
    if (res.code !== 1000) return;
    message.success(res.msg);
    props.reloadTable();
    props.setAddOrUpdateModalFn(OperateEnum.close);

  };

  const closeModal = () => {
    props.setAddOrUpdateModalFn(OperateEnum.close);
  };


  return (
    <div>
      <Form form={formRef}
            labelCol={{ flex: '120px' }}
      >
        <Form.Item label="项目" name="projectId" rules={[{ required: true }]}>
          <Select options={ProjectList} disabled={true}>
          </Select>
        </Form.Item>
        {/*<Form.Item label="状态" name="status" rules={[{ required: true }]}>*/}
        {/*  <Input placeholder="请输入" maxLength={200} showCount />*/}
        {/*</Form.Item>*/}
        {/*<Form.Item label="sort" name="sort" rules={[{ required: true }]}>*/}
        {/*  <Input placeholder="请输入" maxLength={200} showCount />*/}
        {/*</Form.Item>*/}
        <Form.Item label="版本" name="version" rules={[{ required: true }]}>
          <Input placeholder="请输入" maxLength={200} showCount />
        </Form.Item>
        <Form.Item label="remarks" name="remarks" rules={[{ required: false }]}>
          <Input.TextArea placeholder="请输入" maxLength={1900} showCount
                          autoSize={{ minRows: 2, maxRows: 5 }}
          />
        </Form.Item>
        {/*<Form.Item label="progress" name="progress" rules={[{ required: true }]}>*/}
        {/*  <Input placeholder="请输入" maxLength={200} showCount />*/}
        {/*</Form.Item>*/}
        <FileUploadCom name={'fileList'} label={'附件'} required={false} />

        {/*<Form.Item label='状态' name='disabled' rules={[{required: true}]}>*/}
        {/*    <Radio.Group>*/}
        {/*        <Radio value={0}> 启用 </Radio>*/}
        {/*        <Radio value={1}> 禁用 </Radio>*/}
        {/*    </Radio.Group>*/}
        {/*</Form.Item>*/}


        {
          fieldList.map((item) => {
            return <SubmitNowform
              key={item.id}
              initFieldBo={item}
            ></SubmitNowform>;
          })
        }

        <Form.Item wrapperCol={{ offset: 8, span: 16 }} style={{ textAlign: 'right' }}>
          <Button type="default" onClick={closeModal} style={{ marginRight: 20 }}>
            取消
          </Button>
          <Button type="primary" onClick={saveFn}>
            确定
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default AddOrUpdate;