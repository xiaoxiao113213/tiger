import React, { useEffect, useState } from 'react';
import { checkApi } from '@/pages/ai/aiPipeline/api/api.tsx';
import { aiTextTest, getTextStartVarJsonSign } from '@/pages/ai/aiPipeline/api/varApi.tsx';
import { Button, Form, Input, Spin, Timeline } from 'antd';
import type { TimelineItemProps } from 'antd/es/timeline/TimelineItem';
import Title from 'antd/lib/typography/Title';
import { AiPipelinePointVarDetailVo, Category, NodeType, VarType } from '@/pages/ai/aiPipeline/api/ApiBo.ts';
import MarkdownViewer from '@/components/markdown';
import { DownSquareTwoTone, RightSquareTwoTone } from '@ant-design/icons';
import FileUploadCom from '@/components/upload/FileUploadCom.tsx';
import { fileClientToServer } from '@/components/upload/utils.ts';

const TextAi1Test = (props: { aiPipelineId: number }) => {
  const { aiPipelineId } = props;
  const [pass, setPass] = useState<{ isPass: boolean, errorMsg: string }>();
  const [paramList, setParamList] = useState<AiPipelinePointVarDetailVo[]>([]);
  const [spinning, setSpinning] = React.useState(false);
  const [pointItem, setPointItem] = useState<TimelineItemProps[]>();
  const [endVarList, setEndVarList] = useState<{ lable: string, value?: string }>();
  const [down, setDown] = useState(false);
  const [formRef] = Form.useForm<{}>();

  const checkPipeline = () => {
    checkApi({ aiPipelineId }).then((res) => {
      setPass(res.data);
      if (res.data.isPass) {
        getTextStartVarJsonSign({ aiPipelineId }).then((res) => {
          setParamList(res.data);
        });
      } else {
        console.log('校验不通过', res.data.errorMsg);
      }
    });
  };


  const test = async () => {
    const isPass = await formRef.validateFields().catch(() => false);
    if (!isPass) return;

    const values = await formRef?.getFieldsValue();
    paramList.forEach((item) => {
      if (item.type.startsWith('file')) {
        values[item.name] = fileClientToServer(values[item.name]);
      }
    });
    setSpinning(true);
    aiTextTest({ aiPipelineId, map: { ...values } }).then((res) => {
      setDown(false);
      console.log(res);
      let items = res.data.map((item) => {
        return {
          // color: item.isPass ? 'green' : 'red',
          color: 'green',
          children: (
            <>
              <Title level={4}>{item.title}</Title>
              {
                item.varList.filter((varItem) => {
                  if (item.type == NodeType.End) {
                    return varItem.category == Category.Input;
                  } else {
                    return varItem.category == Category.Output;
                  }
                }).map((varItem) => {
                  return <p style={{ color: 'green' }}>{varItem.name}: <MarkdownViewer content={varItem.value ?? ''} backgroundColor={'#f0f0f0'} /></p>;
                })
              }
            </>
          ),
        };
      });
      setPointItem(items);
      res.data.find((item) => {
        return item.type == NodeType.End;
      })?.varList.forEach((varItem) => {
        setEndVarList({ lable: varItem.name, value: varItem.value });
      });

    }).finally(() => {
      setSpinning(false);
    });
  };


  useEffect(() => {
    checkPipeline();
  }, []);

  return (
    <div>
      <Spin spinning={spinning} fullscreen />
      {!pass?.isPass &&
        <div style={{ color: 'red' }}>
          校验不通过
          {pass?.errorMsg}
        </div>
      }
      {
        pass?.isPass &&
        <div>
          {/*<ReactJsonView*/}
          {/*  name={false}*/}
          {/*  displayDataTypes={false}*/}
          {/*  src={param}*/}
          {/*  onEdit={handleJsonEdit}*/}
          {/*  onAdd={handleJsonAdd}*/}
          {/*  onDelete={handleJsonDelete}*/}
          {/*/>*/}
          <Form form={formRef}>
            <Form.Item label="用户输入信息" name="newMsg" rules={[{ required: true }]}>
              <Input.TextArea placeholder="请输入" maxLength={3000} showCount autoSize={{
                minRows: 1,
                maxRows: 5,
              }} />
            </Form.Item>
            {
              paramList.map((item) => {
                let desc = '';
                if (item.remarks.length > 0) {
                  desc = '（' + item.remarks + '）';
                }
                if (item.type == VarType.Object) {
                  return (
                    <Form.Item label={item.name} name={item.name} rules={[{ required: true }]}>
                      <Input.TextArea placeholder={'请输入对应的json对象' + desc} maxLength={3000} showCount autoSize={{
                        minRows: 1,
                        maxRows: 5,
                      }} />
                    </Form.Item>
                  );
                }
                if (item.type.startsWith('array')) {
                  return (
                    <Form.Item label={item.name} name={item.name} rules={[{ required: true }]}>
                      <Input.TextArea placeholder={'请输入对应的json数组' + desc} maxLength={3000} showCount autoSize={{
                        minRows: 1,
                        maxRows: 5,
                      }} />
                    </Form.Item>
                  );
                }
                if (item.type.startsWith('fileDoc')) {
                  return (
                    <FileUploadCom label={item.name} name={item.name} required={true} maxCount={1}
                                   accept={'application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document'}
                    />
                  );
                }
                if (item.type.startsWith('fileImage')) {
                  return (
                    <FileUploadCom label={item.name} name={item.name} required={true} maxCount={1}
                                   accept={'image/*'}
                    />
                  );
                }
                if (item.type.startsWith('fileAudio')) {
                  return (
                    <FileUploadCom label={item.name} name={item.name} required={true} maxCount={1}
                                   accept={'audio/*'}
                    />
                  );
                }
                if (item.type.startsWith('fileVideo')) {
                  return (
                    <FileUploadCom label={item.name} name={item.name} required={true} maxCount={1}
                                   accept={'video/*'}
                    />
                  );
                }
                if (item.type.startsWith('fileTxt')) {
                  return (
                    <FileUploadCom label={item.name} name={item.name} required={true} maxCount={1}
                                   accept={'text/plain'}
                    />
                  );
                }
                if (item.type.startsWith('fileExcel')) {
                  return (
                    <FileUploadCom label={item.name} name={item.name} required={true} maxCount={1}
                                   accept={'application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'}
                    />
                  );
                }
                if (item.type.startsWith('filePdf')) {
                  return (
                    <FileUploadCom label={item.name} name={item.name} required={true} maxCount={1}
                                   accept={'application/pdf'}
                    />
                  );
                }
                if (item.type.startsWith('fileList')) {
                  return (
                    <FileUploadCom label={item.name} name={item.name} required={true} maxCount={10}
                      /*上面文件类型的合集*/
                                   accept={'application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/*,audio/*,video/*,text/plain,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/pdf'}
                    />
                  );
                }
                return (
                  <Form.Item label={item.name} name={item.name} rules={[{ required: true }]}>
                    <Input placeholder="请输入" maxLength={200} showCount />
                  </Form.Item>
                );
              })
            }


            <Form.Item>
              <Button onClick={test} type={'primary'}>调试</Button>
            </Form.Item>
          </Form>

        </div>


      }


      {
        endVarList &&
        <div style={{ marginTop: '20px' }}>
          <Title level={3}>测试结果：</Title>
          <Title level={4}>{endVarList.lable}：</Title>
          <MarkdownViewer content={endVarList.value ?? ''} backgroundColor={'#f0f0f0'} />
        </div>
      }


      {
        pointItem &&
        <div style={{ marginTop: '20px' }}>
          <>
            {!down &&
              <Button icon={<RightSquareTwoTone />} type={'link'} onClick={() => {
                setDown(true);
              }}>
                展开详情
              </Button>

            }
          </>

          <>
            {
              down &&
              <Button icon={<DownSquareTwoTone />} type={'link'} onClick={() => {
                setDown(false);
              }}>
                收起详情
              </Button>
            }
          </>


          <div style={{ marginTop: '10px' }}>
            {
              down &&
              <Timeline
                items={pointItem}
              />
            }
          </div>
        </div>

      }


    </div>
  );
};

export default TextAi1Test;