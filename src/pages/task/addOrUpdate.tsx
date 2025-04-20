import React, { useEffect, useState } from 'react';
import { Button, DatePicker, Form, Input, message, Slider } from 'antd';
import { TaskDetailVo } from './ApiBo';
import { taskGetOneApi, taskSaveApi, taskUpdateApi } from './api';
import { OperateEnum } from '@/utils/enum.ts';
import { Rst } from '@/utils/baseBo.ts';
import FileUploadCom from '@/components/upload/FileUploadCom';
import dayjs from 'dayjs';
import { fileClientToServer, fileServerToClient } from '@/components/upload/utils.ts';
import { oFormatForm } from '@/utils/utils.ts';

type Props = {
  detailId: number
  operateEnum: OperateEnum
  setAddOrUpdateModalFn: React.Dispatch<React.SetStateAction<OperateEnum>>,
  reloadTable: () => void
};
const AddOrUpdate = (props: Props) => {
  const [formRef] = Form.useForm<TaskDetailVo>();
  const [detail, setDetailFn] = useState<TaskDetailVo>();
  const [processCount, setProcessCount] = React.useState<number>(0);

  const initMyDataFn = async () => {
    if (props.operateEnum === OperateEnum.edit) {
      let rst = await taskGetOneApi({ taskId: props.detailId });
      rst.data.startTime = dayjs(rst.data.startTime);
      rst.data.endTime = dayjs(rst.data.endTime);
      rst.data.fileList = fileServerToClient(rst.data.fileList);
      setDetailFn(rst.data);
      formRef.setFieldsValue(rst.data);
      setProcessCount(rst.data.progress);
    } else {
      formRef.setFieldsValue({});
      setDetailFn({} as TaskDetailVo);
    }
  };
  useEffect(() => {
    initMyDataFn();
    return () => {
    };
  }, []); // 第二个参数表示依赖项
  if (!detail) {
    return <div></div>;
  }

  const saveFn = async () => {

    const isPass = await formRef.validateFields().catch(() => false);
    if (!isPass) return;

    const values = await formRef?.getFieldsValue();
    oFormatForm(values);
    let res: Rst<any>;
    if (props.operateEnum === OperateEnum.edit) {
      res = await taskUpdateApi({
        ...values, taskId: props.detailId,
        fileList: fileClientToServer(values.fileList),
        progress: processCount,
      });
    } else {
      res = await taskSaveApi({
        ...values,
        fileList: fileClientToServer(values.fileList),
        progress: processCount,
      });
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
        // labelCol={{ flex: '10%' }}
        // wrapperCol={{ flex: '90%' }}
      >

        {/*<Form.Item label="userId" name="userId" rules={[{ required: true }]}>*/}
        {/*  <Input placeholder="请输入" />*/}
        {/*</Form.Item>*/}
        {/*<Form.Item label="type" name="type" rules={[{ required: true }]}>*/}
        {/*  <Input placeholder="请输入" />*/}
        {/*</Form.Item>*/}
        <Form.Item label="名称" name="name" rules={[{ required: true }]}>
          <Input placeholder="请输入"
                 maxLength={200}
                 showCount={true}
          />
        </Form.Item>
        <Form.Item label="描述" name="remarks" rules={[{ required: false }]}>
          <Input.TextArea
            placeholder="请输入"
            autoSize={{ minRows: 3, maxRows: 5 }}
            showCount={true}
            maxLength={1000}
          />
        </Form.Item>
        <Form.Item label="开始时间" name="startTime" rules={[{ required: true }]}>
          <DatePicker format="YYYY-MM-DD" picker="date"
            // showTime={{ format: 'HH:mm' }}
                      onChange={(date, dateString) => {
                        // console.log(date, dateString);
                      }}
                      placeholder={'请选择开始时间'}
          />
        </Form.Item>
        <Form.Item label="结束时间" name="endTime" rules={[{ required: true }]}>
          <DatePicker format="YYYY-MM-DD" picker="date"
            // showTime={{ format: 'HH:mm' }}
                      onChange={(date, dateString) => {
                        // console.log(date, dateString);
                      }}
                      placeholder={'请选择结束时间'}
          />
        </Form.Item>
        <Form.Item label="进度" name="progress" rules={[{ required: false }]}>
          <Slider min={0} max={100} value={processCount} onChange={setProcessCount} />
          {processCount}%
        </Form.Item>
        {/*<Form.Item label="依赖的任务" name="dependencies" rules={[{ required: true }]}>*/}
        {/*  <Input placeholder="请输入" />*/}
        {/*</Form.Item>*/}

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