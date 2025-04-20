import { ProDescriptions } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import { Tag } from 'antd';
import { getNullBo } from '@/utils/utils.ts';
import { DeptVo } from '@/pages/system/dept/ApiBo.ts';
import { deptGetOneApi } from '@/pages/system/dept/api.tsx';


type Props = {
  detailId: number
};
export default (props: Props) => {
  const [detail, setDetailFn] = useState<DeptVo>(getNullBo);
  const initMyDataFn = async () => {
    let rst = await deptGetOneApi({ id: props.detailId });
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
      </ProDescriptions>


    </div>
  );
};