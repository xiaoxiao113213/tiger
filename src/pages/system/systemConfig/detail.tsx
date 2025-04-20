import { ProDescriptions } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import { systemConfigGetOneApi } from './api';
import { SystemConfigDetailVo } from './ApiBo';
import GetSystemConfigTypeDicList from '@/components/Dic/SystemConfigTypeDic';
import { Tag } from 'antd';
import { getNullBo } from '@/utils/utils.ts';


type Props = {
  detailId: number
};
export default (props: Props) => {
  const [detail, setDetailFn] = useState<SystemConfigDetailVo>(getNullBo);
  const { SystemConfigTypeMap } = GetSystemConfigTypeDicList();

  const initMyDataFn = async () => {
    let rst = await systemConfigGetOneApi({ id: props.detailId });
    setDetailFn(rst.data);
  };
  useEffect(() => {
    initMyDataFn();
    return () => {
    };
  }, []); // 第二个参数表示依赖项


  return (
    <div>
      <ProDescriptions
        column={1}
        title=""
        tooltip=""
      >
        <ProDescriptions.Item label="类型" tooltip="" valueType="text" key={'type'}>
          <Tag color={SystemConfigTypeMap.get(detail.type)?.color ?? 'blue'}>
            {
              SystemConfigTypeMap.get(detail.type)?.label
            }
          </Tag>
        </ProDescriptions.Item>
        <ProDescriptions.Item label="配置key" tooltip="" valueType="text" key={'key'}>
          {detail.key}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="配置描述" tooltip="" valueType="text" key={'remarks'}>
          {detail.remarks}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="配置值" tooltip="" valueType="textarea" key={'value'}
                              contentStyle={{ borderWidth: 2, backgroundColor: 'rgba(245, 245, 245, 1)' }}>
          {detail.value}
        </ProDescriptions.Item>

        {/*<ProDescriptions.Item label="状态" tooltip="" key={"disabled"}>*/}
        {/*    {(() => {*/}
        {/*        if (detail.disabled === 0) {*/}
        {/*            return <Tag color={"green"}>启用中</Tag>;*/}
        {/*        } else {*/}
        {/*            return <Tag color={"red"}>禁用中</Tag>;*/}
        {/*        }*/}
        {/*    })()}*/}
        {/*</ProDescriptions.Item>*/}

      </ProDescriptions>


    </div>
  );
};            