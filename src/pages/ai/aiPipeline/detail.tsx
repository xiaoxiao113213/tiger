import React, { useEffect, useState } from 'react';
import { Descriptions, DescriptionsProps } from 'antd';
import { getNullBo } from '@/utils/utils.ts';
import { aiPipelineGetOneApi } from './api/api.tsx';
import { AiPipelineDetailVo } from './api/ApiBo.ts';


type Props = {
  detailId: number
};
export default (props: Props) => {
  const [detail, setDetailFn] = useState<AiPipelineDetailVo>(getNullBo);
  const [items, setItems] = useState([]);
  const initMyDataFn = async () => {
    let rst = await aiPipelineGetOneApi({ aiPipelineId: props.detailId });
    setDetailFn(rst.data);
    const detail = rst.data;
    const items: DescriptionsProps['items'] = [
      {
        key: 'aiPipelineId',
        label: 'aiPipelineId',
        children: <p>{detail.aiPipelineId}</p>,
      },
      {
        key: 'type',
        label: 'type',
        children: <p>{detail.type}</p>,
      },
      {
        key: 'name',
        label: 'name',
        children: <p>{detail.name}</p>,
      },
      {
        key: 'remarks',
        label: 'remarks',
        children: <p>{detail.remarks}</p>,
      },
      {
        key: 'createBy',
        label: 'createBy',
        children: <p>{detail.createBy}</p>,
      },
      {
        key: 'createTime',
        label: 'createTime',
        children: <p>{detail.createTime}</p>,
      },
      {
        key: 'updateBy',
        label: 'updateBy',
        children: <p>{detail.updateBy}</p>,
      },
      {
        key: 'updateTime',
        label: 'updateTime',
        children: <p>{detail.updateTime}</p>,
      },
      {
        key: 'deleteFlag',
        label: 'deleteFlag',
        children: <p>{detail.deleteFlag}</p>,
      },
      {
        key: 'sort',
        label: 'sort',
        children: <p>{detail.sort}</p>,
      },
    ];
    setItems(items);
  };
  useEffect(() => {
    initMyDataFn();
    return () => {
    };
  }, []); // 第二个参数表示依赖项


  return (
    <div>
      <Descriptions items={items} />
    </div>
  );
};            