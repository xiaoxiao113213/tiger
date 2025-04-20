import { ProDescriptions } from '@ant-design/pro-components';
import React, { useEffect, useState } from 'react';
import { tableFieldGetOneApi } from './api';
import { TableFieldDetailVo } from './ApiBo';
import { getNullBo } from '@/utils/utils.ts';


type Props = {
  detailId: number
};
export default (props: Props) => {
  const [detail, setDetailFn] = useState<TableFieldDetailVo>(getNullBo);
  const initMyDataFn = async () => {
    let rst = await tableFieldGetOneApi({ tableFieldId: props.detailId });
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
        <ProDescriptions.Item label="tableFieldId" tooltip="" valueType="text" key={'tableFieldId'}>
          {detail.tableFieldId}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="tableId" tooltip="" valueType="text" key={'tableId'}>
          {detail.tableId}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="databaseBoardId" tooltip="" valueType="text" key={'databaseBoardId'}>
          {detail.databaseBoardId}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="code" tooltip="" valueType="text" key={'code'}>
          {detail.code}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="desc" tooltip="" valueType="text" key={'desc'}>
          {detail.desc}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="type" tooltip="" valueType="text" key={'type'}>
          {detail.type}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="length" tooltip="" valueType="text" key={'length'}>
          {detail.length}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="decimal" tooltip="" valueType="text" key={'decimal'}>
          {detail.decimal}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="flagNotNull" tooltip="" valueType="text" key={'flagNotNull'}>
          {detail.flagNotNull}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="flagKey" tooltip="" valueType="text" key={'flagKey'}>
          {detail.flagKey}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="defaultValue" tooltip="" valueType="text" key={'defaultValue'}>
          {detail.defaultValue}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="flagAutoIncrement" tooltip="" valueType="text" key={'flagAutoIncrement'}>
          {detail.flagAutoIncrement}
        </ProDescriptions.Item>
        <ProDescriptions.Item label="flagUnsigned" tooltip="" valueType="text" key={'flagUnsigned'}>
          {detail.flagUnsigned}
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