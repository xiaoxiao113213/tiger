import { ProDescriptions } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import { Tag } from 'antd';
import { ApplicationVo } from '@/pages/system/application/ApiBo.ts';
import { getNullBo } from '@/utils/utils.ts';
import { applicationGetOneApi } from '@/pages/system/application/api.tsx';


type Props = {
  detailId: number
};


export default (props: Props) => {
  const [detail, setDetailFn] = useState<ApplicationVo>(getNullBo);
  const initMyDataFn = async () => {
    let rst = await applicationGetOneApi({ id: props.detailId });
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
        column={2}
        title=""
        tooltip=""
      >
        <ProDescriptions.Item label="名称" tooltip="" valueType="text" key={'name'}>
          {detail.name}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="编码" tooltip="" valueType="text" key={'code'}>
          {detail.code}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="排序" tooltip="" valueType="text" key={'label'}>
          {detail.sort}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="状态" tooltip="" key={'disabled'}>
          {(() => {
            if (detail.disabled === 0) {
              return <Tag color={'green'}>启用中</Tag>;
            } else {
              return <Tag color={'red'}>禁用中</Tag>;
            }
          })()}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="创建时间" tooltip="" valueType="text" key={'createTime'}>
          {detail.createTime}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="创建人" tooltip="" valueType="text" key={'token'}>
          {detail.createBy}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="备注" tooltip="" valueType="textarea" key={'desc'}>
          {detail.remarks}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="密钥" tooltip="" valueType="textarea" key={'token'} copyable={true}>
          {detail.token}
        </ProDescriptions.Item>
      </ProDescriptions>


    </div>
  );
};