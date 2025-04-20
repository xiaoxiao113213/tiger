import React, { useEffect, useState } from 'react';
import { Button, Card, Form, InputNumber, Radio, Select } from 'antd';
import { PermissionBo } from '@/pages/pipeline/pipeline/component/pipelineTab.tsx';
import { PipelineBo } from '@/pages/pipeline/pipeline/api/bo.tsx';
import { pipelineGetOneApi, pipelineUpdateOtherApi } from '@/pages/pipeline/pipeline/api/pipeline.tsx';
import { DatabaseBoardDetailVo } from '@/pages/database/databaseBoard/ApiBo.ts';
import { DicVo } from '@/utils/DicVo.ts';
import { getAccountDic } from '@/pages/system/account/accountApi.tsx';


export type OtherBo = {
  parallel: number,
  timer: number,
  timerCron: number,
  email: number,
  list: PermissionBo[],
}
type Props = {
  // 初始化的查询参数 可插入一些 写死的参数值
  pipelineId: number,
  closeFn: () => void,
};
const PipelineOtherAdd = (props: Props) => {
  const [formRef] = Form.useForm<DatabaseBoardDetailVo>();
  const [accountList, setAccountList] = useState<DicVo[]>([]);
  const [pipeline, setPipeline] = useState<PipelineBo>();
  const [email, setEmail] = useState(0);

  const initData = async () => {
    getAccountDic().then((rst) => {
      setAccountList(rst.data);

    });
    pipelineGetOneApi({ id: props.pipelineId }).then((rst) => {
      setPipeline(rst.data);
      formRef.setFieldsValue(rst.data);
      setEmail(rst.data.email);
    });


  };
  useEffect(() => {
    initData();
    return () => {
      // 在组件卸载前执行清理操作
    };
  }, []); // 第二个参数表示依赖项

  if (!pipeline) {
    return <div>loading...</div>;
  }
  if (!accountList) {
    return <div>loading...</div>;
  }

  const save = () => {
    const values = formRef.getFieldsValue();
    pipelineUpdateOtherApi({ id: props.pipelineId, ...values });
    props.closeFn();
  };


  return (
    <Card>
      <div>
        <Form
          name="user"
          autoComplete="off"
          form={formRef}
        >
          <Form.Item label="是否运行并行构建" name="parallel" rules={[{ required: true }]}>
            <Radio.Group>
              <Radio value={0}> 不允许 </Radio>
              <Radio value={1}> 允许 </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="固定时间触发" name="timer" rules={[{ required: true }]}>
            <Radio.Group>
              <Radio value={0}> 不开启 </Radio>
              <Radio value={1}> 开启 </Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item label="" name="timerCron" rules={[{ required: true }]}>
            <InputNumber placeholder="请输入"
                         addonAfter={'/分钟'}
            />
          </Form.Item>


          <Form.Item label="邮件通知" name="email" rules={[{ required: true }]}>
            <Radio.Group onChange={
              (e) => {
                setEmail(e.target.value);
              }
            }>
              <Radio value={0}> 不发送 </Radio>
              <Radio value={1}> 发送 </Radio>
            </Radio.Group>
          </Form.Item>

          {email === 1 && <Form.Item
            label="邮件通知人员"
            name="emailUser"
            rules={[{ required: false }]}
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
          >
            <Select
              style={{ width: '100%' }}
              mode="multiple"
              showSearch
              optionFilterProp={'label'}
              placeholder="请选择人员"
              options={accountList}
            />
          </Form.Item>}

        </Form>
        <div style={{ marginTop: '20px', display: 'flex', justifyContent: 'center' }}>
          <Button type={'primary'}
                  onClick={save}
          >保存</Button>
        </div>
      </div>
    </Card>
  );
};

export default PipelineOtherAdd;
