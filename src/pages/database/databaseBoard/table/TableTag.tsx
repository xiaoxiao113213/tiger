import React, { useEffect, useState } from 'react';
import { Button, Form, Input, message, Tabs, TabsProps } from 'antd';
import { tableDDlApi, tableGetOneApi, tableSaveApi, tableUpdateApi } from '@/pages/database/databaseBoard/api/table/api';
import { TableDetailVo, TableIndexVo, TableVo } from '@/pages/database/databaseBoard/api/table/ApiBo';
import AddOrUpdateTable from '@/pages/database/databaseBoard/table/AddOrUpdateTable';
import { oGetRandomNumberString } from '@/utils/utils.ts';
import { Rst } from '@/utils/baseBo.ts';
import { TableFieldDetailVo } from '@/pages/database/databaseBoard/api/tableField/ApiBo.ts';
import AddOrUpdateTableField from '@/pages/database/databaseBoard/table/AddOrUpdateTableField.tsx';
import AddOrUpdateIndex from '@/pages/database/databaseBoard/table/AddOrUpdateIndex.tsx';

type Props = {
  tableId?: number;
  databaseBoardId: number;
  closeTableTagModal: () => void;
}
const TableTag = (props: Props) => {
  if (!props.tableId) return <div></div>;
  const [table, setTable] = useState<TableDetailVo>();
  const [tableDDlSql, setTableDDlSql] = useState<string>('');
  const [tagNum, setTagNum] = useState<string>('5');
  const [tableFieldForm] = Form.useForm<TableFieldDetailVo>();
  const [fieldList, setFieldList] = useState<TableFieldDetailVo[]>([]);
  const [tableIndexForm] = Form.useForm<TableIndexVo>();
  const [indexList, setIndexList] = useState<TableIndexVo[]>([]);
  const [indexChange, setIndexChange] = useState(false);

  const initData = async () => {
    let table = await tableGetOneApi({ tableId: props.tableId });
    table.data?.indexList.forEach(value => {
      value.id = oGetRandomNumberString(9);
    });
    setTable(table.data);
    setFieldList(table.data.fieldList);
    setIndexList(table.data.indexList.map(value => {
      return { ...value, id: oGetRandomNumberString(9) };
    }));
  };

  useEffect(() => {
    initData();
  }, []); // 第二个参数表示依赖项

  if (!table) return <div></div>;

  const onTabChange = async (key: string) => {
    // console.log(key);
    setTagNum(key);
    if (key === '6' && !indexChange) {
      setIndexChange(true);
    }
    // 3是结构预览
    if (key !== '3') {
      return;
    }
    if (!table.code) return;
    const fieldList = await getFieldList();
    let res = await tableDDlApi({ ...table, databaseBoardId: props.databaseBoardId, fieldList: fieldList } as TableVo);
    if (res.code !== 1000) return;
    setTableDDlSql(res.data);
  };
  const saveFn = async () => {
    table.fieldList = await getFieldList();
    if (indexChange) {
      table.indexList = await getIndexList();
    }
    let res: Rst<any>;
    if (table.tableId) {
      res = await tableUpdateApi(table);
    } else {
      res = await tableSaveApi({ ...table, databaseBoardId: props.databaseBoardId, x: '0', y: '0', shapeType: '0' } as TableVo);
    }
    if (res.code !== 1000) return;
    message.success(res.msg);
  };
  const saveAndBackFn = async () => {
    table.fieldList = await getFieldList();
    if (indexChange) {
      table.indexList = await getIndexList();
    }
    let res: Rst<any>;
    if (table.tableId) {
      res = await tableUpdateApi(table);
    } else {
      res = await tableSaveApi({ ...table, databaseBoardId: props.databaseBoardId, x: '0', y: '0', shapeType: '0' } as TableVo);
    }
    if (res.code !== 1000) return;
    message.success(res.msg);
    props.closeTableTagModal();
  };
  const getFieldList = async () => {
    const isPass = await tableFieldForm.validateFields().catch(() => false);
    if (!isPass) {
      message.error('必填项不能为空');
      throw new Error('必填项不能为空');
    }
    const formData = await tableFieldForm.getFieldsValue();
    console.log('save', formData);
    const newData: TableFieldDetailVo[] = [];
    formData && Object.keys(formData).forEach((key) => {
      const [dataIndex, recordKey] = key.split('-');
      const tableFieldId = parseInt(recordKey);
      const record = newData.find((i) => i.tableFieldId == tableFieldId);
      if (!record) {
        newData.push({ tableFieldId: tableFieldId, [dataIndex]: formData[key] } as TableFieldDetailVo);
      } else {
        record[dataIndex] = formData[key];
      }
    });
    // newData 的排序 要根据 data 的排序
    const finalData: TableFieldDetailVo[] = [];
    fieldList.forEach((item) => {
      const record = newData.find((i) => i.tableFieldId == item.tableFieldId);
      if (record) {
        finalData.push(record);
        //   如果是defaultValue 字段  需要判断是否是 数组 如果是数组  且有值  需要取第一个值
        if (record.defaultValue && Array.isArray(record.defaultValue)) {
          if (record.defaultValue.length > 0) {
            record.defaultValue = record.defaultValue[0];
          } else {
            record.defaultValue = undefined;
          }
        }
        if (record.flagKey !== undefined) {
          record.flagKey = Number(!!record.flagKey); // 保证转换为 0 或 1
        }
        if (record.flagNotNull !== undefined) {
          record.flagNotNull = Number(!!record.flagNotNull); // 保证转换为 0 或 1
        }
        if (record.flagAutoIncrement !== undefined) {
          record.flagAutoIncrement = Number(!!record.flagAutoIncrement); // 保证转换为 0 或 1
        }
        if (record.flagUnsigned !== undefined) {
          record.flagUnsigned = Number(!!record.flagUnsigned); // 保证转换为 0 或 1
        }
      }
    });
    console.log('save', finalData);
    return finalData;
  };
  const getIndexList = async () => {
    const isPass = await tableIndexForm.validateFields().catch(() => false);
    if (!isPass) {
      message.error('必填项不能为空');
      throw new Error('必填项不能为空');
    }
    const formData = await tableIndexForm.getFieldsValue();
    console.log('save', formData);
    const newData: TableIndexVo[] = [];
    formData && Object.keys(formData).forEach((key) => {
      const [dataIndex, recordKey] = key.split('-');
      const id = recordKey;
      const record = newData.find((i) => i.id == id);
      if (!record) {
        newData.push({ id: id, [dataIndex]: formData[key] } as TableIndexVo);
      } else {
        record[dataIndex] = formData[key];
      }
    });
    // newData 的排序 要根据 data 的排序
    const finalData: TableIndexVo[] = [];
    indexList.forEach((item) => {
      const record = newData.find((i) => i.id == item.id);
      if (record) {
        finalData.push(record);
      }
    });
    console.log('save', finalData);
    return finalData;
  };

  const items: TabsProps['items'] = [
    {
      key: '5',
      label: '字段',
      children: <AddOrUpdateTableField
        form={tableFieldForm}
        data={fieldList}
        setData={setFieldList}
        tagNum={tagNum}
      />,
    },
    {
      key: '0',
      label: '表',
      children: <AddOrUpdateTable table={table} setTable={setTable} />,
    },
    {
      key: '6',
      label: '索引',
      children: <AddOrUpdateIndex
        form={tableIndexForm}
        data={indexList}
        setData={setIndexList}
        tableCode={table.code}
        getFieldList={getFieldList}
        tagNum={tagNum}
      />,
    },
    {
      key: '3',
      label: '结构预览',
      children: <Input.TextArea readOnly
                                value={tableDDlSql}
                                autoSize
                                style={{ fontSize: 20, fontWeight: 'bold' }}
      ></Input.TextArea>,
    },
  ];
  const operations = <div>
    <span style={{ marginRight: '10px' }}>{table.code}</span>
    <Button type={'primary'} onClick={saveFn} style={{ marginRight: '10px' }}>保存</Button>
    <Button type={'primary'} onClick={saveAndBackFn}>保存并返回</Button>
  </div>;
  return (
    <div>
      <Tabs
        onChange={onTabChange}
        type="card"
        items={items}
        tabBarExtraContent={operations}
      />
    </div>
  );
};

export default TableTag;