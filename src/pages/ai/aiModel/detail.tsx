import React, {useEffect, useState} from "react";
import {Tag} from "antd";
import { getNullBo } from '@/utils/utils.ts';
import {aiModelGetOneApi} from "./api";
import {AiModelDetailVo} from "./ApiBo";
import { Descriptions, DescriptionsProps } from 'antd';


type Props = {
    detailId: number
};
export default (props: Props) => {
    const [detail, setDetailFn] = useState<AiModelDetailVo>(getNullBo);
    const [items, setItems] = useState([]);    
    const initMyDataFn = async () => {
        let rst = await aiModelGetOneApi({aiModelId: props.detailId})
        setDetailFn(rst.data)
        const detail = rst.data;
        const items: DescriptionsProps['items'] = [
          {
            key: 'aiModelId',
            label: 'aiModelId',
            children: <p>{detail.aiModelId}</p>,
          },
          {
            key: 'belong',
            label: 'belong',
            children: <p>{detail.belong}</p>,
          },
          {
            key: 'type',
            label: 'type',
            children: <p>{detail.type}</p>,
          },
          {
            key: 'sort',
            label: 'sort',
            children: <p>{detail.sort}</p>,
          },
          {
            key: 'remarks',
            label: 'remarks',
            children: <p>{detail.remarks}</p>,
          },
          {
            key: 'name',
            label: 'name',
            children: <p>{detail.name}</p>,
          },
          {
            key: 'code',
            label: 'code',
            children: <p>{detail.code}</p>,
          },
          {
            key: 'contextLength',
            label: 'contextLength',
            children: <p>{detail.contextLength}</p>,
          },
          {
            key: 'maxInput',
            label: 'maxInput',
            children: <p>{detail.maxInput}</p>,
          },
          {
            key: 'maxOutput',
            label: 'maxOutput',
            children: <p>{detail.maxOutput}</p>,
          },
        ];
        setItems(items);
    }
    useEffect(() => {
        initMyDataFn()
        return () => {
        };
    }, []); // 第二个参数表示依赖项


    return (
        <div>
        <Descriptions items={items} />
        </div>
    );
};            