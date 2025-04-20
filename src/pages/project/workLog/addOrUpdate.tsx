import React, { useEffect, useState } from 'react';
import { Button, Form, Input, InputNumber, message, Select } from 'antd';
import { WorkLogDetailVo } from './ApiBo';
import { workLogGetOneApi, workLogSaveApi, workLogUpdateApi } from './api';
import { OperateEnum } from '@/utils/enum.ts';
import { Rst } from '@/utils/baseBo.ts';
import { DicVo } from '@/utils/DicVo.ts';
import { projectIssueDicApi } from '@/pages/project/issues/api.tsx';
import FileUploadCom from '@/components/upload/FileUploadCom.tsx';
import { fileClientToServer, fileServerToClient } from '@/components/upload/utils.ts';

type Props = {
  detailId: number
  operateEnum: OperateEnum
  setAddOrUpdateModalFn: React.Dispatch<React.SetStateAction<OperateEnum>>,
  reloadTable: () => void,
  day?: string
};
const AddOrUpdate = (props: Props) => {
  const [formRef] = Form.useForm<WorkLogDetailVo>();
  const [detail, setDetailFn] = useState<WorkLogDetailVo>();
  const [issuesDic, setIssuesDic] = useState<DicVo[]>();


  const initMyDataFn = async () => {
    if (props.operateEnum === OperateEnum.edit) {
      let rst = await workLogGetOneApi({ workLogId: props.detailId });
      rst.data.fileList = fileServerToClient(rst.data.fileList);
      setDetailFn(rst.data);
      formRef.setFieldsValue(rst.data);
    } else {
      formRef.setFieldsValue({ day: props.day });
      setDetailFn({ day: props.day });
    }
    let issuesDic = await projectIssueDicApi({});
    setIssuesDic(issuesDic.data);
  };
  useEffect(() => {
    initMyDataFn();
    return () => {
    };
  }, []);
  if (!issuesDic) return null;


  const saveFn = async () => {

    const isPass = await formRef.validateFields().catch(() => false);
    if (!isPass) return;
    const values = await formRef?.getFieldsValue();
    values.fileList = fileClientToServer(values.fileList);
    let res: Rst<any>;
    if (props.operateEnum === OperateEnum.edit) {
      res = await workLogUpdateApi({ ...values, workLogId: props.detailId });
    } else {
      res = await workLogSaveApi({ ...values, day: props.day });
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
            labelCol={{ flex: '100px' }}

      >
        <Form.Item label="工时" name="hours" rules={[{ required: true }]}>
          <InputNumber placeholder="请输入" suffix={'小时'} style={{ width: '200px' }} />
        </Form.Item>
        <Form.Item label="issue" name="projectIssueId" rules={[{ required: true }]}>
          <Select placeholder="请输入"
                  showSearch={true}
                  options={issuesDic}
                  optionFilterProp={'label'}
          />
        </Form.Item>

        <Form.Item label="描述" name="remarks" rules={[{ required: true }]}>
          <Input.TextArea placeholder="请输入" maxLength={1900} showCount
                          autoSize={{ minRows: 3, maxRows: 5 }}
          />
        </Form.Item>
        <FileUploadCom name={'fileList'} label={'附件'} required={false} />
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