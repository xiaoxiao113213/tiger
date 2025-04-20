import { ProDescriptions } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import { tableGetOneApi } from './api';
import { TableDetailVo } from './ApiBo';
import { getNullBo } from '@/utils/utils.ts';


type Props = {
  detailId: number
};
export default (props: Props) => {
  const [detail, setDetailFn] = useState<TableDetailVo>(getNullBo);
  const initMyDataFn = async () => {
    let rst = await tableGetOneApi({ tableId: props.detailId });
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
        <ProDescriptions.Item label="tableId" tooltip="" valueType="text" key={'tableId'}>
          {detail.tableId}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="code" tooltip="" valueType="text" key={'code'}>
          {detail.code}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="desc" tooltip="" valueType="text" key={'desc'}>
          {detail.desc}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="indexList" tooltip="" valueType="text" key={'indexList'}>
          {detail.indexList}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="databaseBoardId" tooltip="" valueType="text" key={'databaseBoardId'}>
          {detail.databaseBoardId}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="y" tooltip="" valueType="text" key={'y'}>
          {detail.y}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="x" tooltip="" valueType="text" key={'x'}>
          {detail.x}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="createTime" tooltip="" valueType="text" key={'createTime'}>
          {detail.createTime}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="createBy" tooltip="" valueType="text" key={'createBy'}>
          {detail.createBy}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="updateTime" tooltip="" valueType="text" key={'updateTime'}>
          {detail.updateTime}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="updateBy" tooltip="" valueType="text" key={'updateBy'}>
          {detail.updateBy}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="deleteFlag" tooltip="" valueType="text" key={'deleteFlag'}>
          {detail.deleteFlag}
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