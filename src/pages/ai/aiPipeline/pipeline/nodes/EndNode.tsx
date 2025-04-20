import React, { useState } from 'react';
import { Handle, Position, useReactFlow } from '@xyflow/react';
import { Drawer } from 'antd';
import { OperateEnum } from '@/utils/enum.ts';
import Title from 'antd/lib/typography/Title';
import { AiPipelinePointDetailVo } from '@/pages/ai/aiPipeline/api/ApiBo.ts';
import { aiPipelinePointGetOneApi } from '@/pages/ai/aiPipeline/api/pointApi.tsx';
import { getInputAllByPointApi } from '@/pages/ai/aiPipeline/api/varApi.tsx';
import { OptionVo } from '@/utils/DicVo.ts';
import EndOutputForm from '@/pages/ai/aiPipeline/pipeline/component/endOutputForm.tsx';


function EndNode({ id, isConnectable }) {
  const { getNode } = useReactFlow();
  const [modal, setModalFn] = useState<OperateEnum>(OperateEnum.close);

  const [point, setPoint] = useState<AiPipelinePointDetailVo>();
  const [inputVarList, setInputVarList] = useState<OptionVo[]>([]);


  const getDetail = async () => {
    const rst1 = await getInputAllByPointApi({ aiPipelinePointId: id });
    setInputVarList(rst1.data);
    const rst = await aiPipelinePointGetOneApi({ aiPipelinePointId: id });
    setPoint(rst.data);
  };


  return (
    <div>
      <div style={{
        width: '100px',
        height: '40px',
        display: 'flex', // 使用 flexbox 布局
        justifyContent: 'center', // 水平居中
        alignItems: 'center', // 垂直居中
        textAlign: 'center',
        fontSize: 'medium',
        cursor: 'pointer', // 添加鼠标指针样式
        backgroundColor: '#f0f0f0',
      }} onClick={() => {
        getDetail();
        setModalFn(OperateEnum.add);
      }}>
        <span>
          结束
        </span>
      </div>
      <Handle type="target" position={Position.Left} isConnectable={isConnectable} />

      <Drawer
        title={'设置'}
        open={modal !== OperateEnum.close}
        width={'800px'}
        destroyOnClose={true}
        maskClosable={true}
        onClose={() => setModalFn(OperateEnum.close)}
        footer={null}
      >
        <div style={{}}>
          <div style={{}}>
            <Title level={4}>结束</Title>
          </div>
          <div>
            {
              point &&
              <EndOutputForm point={point} getDetail={getDetail} inputVarList={inputVarList}
                             title={'最终输出：'}
              />
            }
          </div>
        </div>
      </Drawer>

    </div>
  );
}


export default EndNode;
