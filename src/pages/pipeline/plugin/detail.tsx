import { ProDescriptions } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import { pipeline_pluginGetOneApi } from './api';
import { PipelinePluginDetailVo } from './ApiBo';
import { Button, Card, Divider, Drawer, Form, Tag } from 'antd';
import { DicVo } from '@/utils/DicVo.ts';
import { OtherAccountBo } from '@/pages/pipeline/otherAccount/ApiBo.ts';
import { OperateEnum } from '@/utils/enum.ts';
import { otherAccountAllApi } from '@/pages/pipeline/otherAccount/api.tsx';
import CodeMirrorEditor from '@/components/CodeEidtor';
import { CustomerFieldBo, serverToClientValue } from '@/pages/flow/process/process/form/form/Bo.tsx';
import SubmitForm from '@/pages/flow/process/process/form/form/submitForm';


type Props = {
  detailId: number,
  scriptTypeList: DicVo[],
  typeList: DicVo[],
  sourceList: DicVo[],
};
export default (props: Props) => {
  const [detail, setDetailFn] = useState<PipelinePluginDetailVo>({ params: [] });
  const [otherAccountList, setOtherAccountListFn] = useState<OtherAccountBo[]>([]);
  // 当非空的时候 才显示这个code插件
  const [code, setCode] = useState<string>();
  const [codeFullScreenModal, setCodeFullScreenModalFn] = useState<OperateEnum>(OperateEnum.close);
  const [fieldList, setFieldList] = useState<CustomerFieldBo[]>([]);

  const handleCodeChange = (value: string) => {
    setCode(value);
  };

  const initMyDataFn = async () => {
    otherAccountAllApi({}).then(rst => {
      // 由于 参数选择 过程中 都是字符串最为默认值 因此 把id number 改成字符串
      rst.data.forEach(item => item.id = item.id + '');
      setOtherAccountListFn(rst.data);
    });
    let rst = await pipeline_pluginGetOneApi({ id: props.detailId });
    setDetailFn(rst.data);
    setCode(rst.data.script);
    if (rst.data.params) {
      rst.data.params.forEach(item => {
        serverToClientValue(item);
      });
      setFieldList(rst.data.params);
    }

  };
  useEffect(() => {
    initMyDataFn();
    return () => {
    };
  }, []); // 第二个参数表示依赖项


  return (
    <div>
      <ProDescriptions
        column={2}
        title=""
        tooltip=""
      >

        <ProDescriptions.Item label="名称" tooltip="" valueType="text" key={'name'}>
          {detail.name}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="资源类型" tooltip="" valueType="text" key={'type'}>
          {(() => {
            return <Tag color={'green'}>{props.typeList.find(item => item.value === detail.type)?.label}</Tag>;
          })()}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="来源" tooltip="" valueType="text" key={'source'}>
          {(() => {
            return <Tag color={'green'}>{props.sourceList.find(item => item.value === detail.source)?.label}</Tag>;
          })()}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="备注" tooltip="" valueType="text" key={'desc'}>
          {detail.desc}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="当前版本号" tooltip="" valueType="text" key={'number'}>
          {detail.number}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="脚本类型" tooltip="" valueType="text" key={'scriptType'}>
          {(() => {
            return <Tag color={'green'}>{props.scriptTypeList.find(item => item.value === detail.scriptType)?.label}</Tag>;
          })()}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="创建时间" tooltip="" valueType="text" key={'createTime'}>
          {detail.createTime}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="创建人" tooltip="" valueType="text" key={'createBy'}>
          {detail.createByInfo?.account}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="更新时间" tooltip="" valueType="text" key={'updateTime'}>
          {detail.updateTime}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="更新人" tooltip="" valueType="text" key={'updateBy'}>
          {detail.updateByInfo?.account}
        </ProDescriptions.Item>
      </ProDescriptions>
      <Divider>脚本 <Button type={'link'} onClick={() => setCodeFullScreenModalFn(OperateEnum.detail)}>全屏</Button></Divider>
      {code !== undefined
        && <CodeMirrorEditor
          value={code}
          language="shell"
          onChange={handleCodeChange}
          readOnly={true}
        ></CodeMirrorEditor>}
      <Divider></Divider>
      <Card title={<div style={{ display: 'flex', justifyContent: 'space-between' }}>表单</div>}>
        <Form validateTrigger="false">
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

      <Drawer
        title={'脚本'}
        open={codeFullScreenModal !== OperateEnum.close}
        width={'100%'}
        destroyOnClose={true}
        maskClosable={false}
        onClose={() => setCodeFullScreenModalFn(OperateEnum.close)}
        footer={null}
      >
        {code !== undefined
          && <CodeMirrorEditor
            value={code}
            language="shell"
            onChange={handleCodeChange}
            readOnly={true}
          ></CodeMirrorEditor>}
      </Drawer>

    </div>
  );
};            