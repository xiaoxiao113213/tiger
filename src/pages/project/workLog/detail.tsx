import React, { useEffect, useState } from 'react';
import { getNullBo } from '@/utils/utils.ts';
import { workLogGetOneApi } from './api';
import { WorkLogDetailVo } from './ApiBo';
import FileView from '@/components/upload/FileView.tsx';
import { Descriptions, DescriptionsProps } from 'antd';


type Props = {
  detailId: number
};
export default (props: Props) => {
  const [detail, setDetailFn] = useState<WorkLogDetailVo>(getNullBo);
  const [items, setItems] = useState([]);
  const initMyDataFn = async () => {
    let rst = await workLogGetOneApi({ workLogId: props.detailId });
    setDetailFn(rst.data);
    const detail = rst.data;
    const items: DescriptionsProps['items'] = [
      {
        key: 'workLogId',
        label: 'ID',
        children: <p>{detail.workLogId}</p>,
      },
      {
        key: 'hours',
        label: '工时',
        children: <p>{detail.hours}</p>,
      },
      {
        key: 'issue',
        label: 'issue',
        children: <p>{detail.issueName}</p>,
      },
      {
        key: 'project',
        label: '项目',
        children: <p>{detail.projectName}</p>,
      },
      {
        key: 'remarks',
        label: '描述',
        children: <p>{detail.remarks}</p>,
      }, {
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
        key: 'fileList',
        label: '附件',
        children: <FileView fileList={detail?.fileList ?? []} />,
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