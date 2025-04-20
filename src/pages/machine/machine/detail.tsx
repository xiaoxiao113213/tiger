import React, { useEffect, useState } from 'react';
import { Descriptions, DescriptionsProps } from 'antd';
import { getNullBo } from '@/utils/utils.ts';
import { machineGetOneApi } from './api';
import { MachineDetailVo, TypeList } from './ApiBo';


type Props = {
  detailId: number
};
export default (props: Props) => {
  const [detail, setDetailFn] = useState<MachineDetailVo>(getNullBo);
  const [items, setItems] = useState([]);
  const initMyDataFn = async () => {
    let rst = await machineGetOneApi({ machineId: props.detailId });
    setDetailFn(rst.data);
    const detail = rst.data;
    const items: DescriptionsProps['items'] = [
      {
        key: 'ID',
        label: 'ID',
        children: <p>{detail.machineId}</p>,
      },
      {
        key: 'type',
        label: '类型',
        children: <p>{TypeList.find(item => item.value == detail.type)?.label}</p>,
      },
      {
        key: 'host',
        label: 'host',
        children: <p>{detail.host}</p>,
      },
      {
        key: 'port',
        label: '端口号',
        children: <p>{detail.port}</p>,
      },
      {
        key: 'createBy',
        label: '创建人',
        children: <p>{detail.createByAccount?.nickName}</p>,
      },
      {
        key: 'createTime',
        label: '创建时间',
        children: <p>{detail.createTime}</p>,
      },
      {
        key: 'updateBy',
        label: '更新人',
        children: <p>{detail.updateByAccount?.nickName}</p>,
      },
      {
        key: 'updateTime',
        label: '更新时间',
        children: <p>{detail.updateTime}</p>,
      },
      {
        key: 'remarks',
        label: '描述',
        children: <p>{detail.remarks}</p>,
      },
      {
        key: 'username',
        label: '用户名',
        children: <p>{detail.username}</p>,
      },
      {
        key: 'isOnline',
        label: 'isOnline',
        children: <p>{detail.isOnline == 1 ? '在线' : '离线'}</p>,
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