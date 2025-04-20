import React, { useEffect, useState } from 'react';
import { Button, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { oGetRandomNumberString } from '@/utils/utils.ts';
import '../../customer/fieldRow.css';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import { FormInstance } from 'antd/es/form/hooks/useForm';
import { TableIndexVo } from '@/pages/database/databaseBoard/api/table/ApiBo.ts';
import MysqlIndexFunDic from '@/components/Dic/MysqlIndexFunDic.ts';
import MysqlIndexTypeDic from '@/components/Dic/MysqlIndexTypeDic.ts';
import IndexRow from '@/pages/database/customer/indexRow.tsx';
import { TableFieldDetailVo } from '@/pages/database/databaseBoard/api/tableField/ApiBo.ts';
import { DicVo } from '@/utils/DicVo.ts';

type Props = {
  form: FormInstance<TableIndexVo>;
  data: TableIndexVo[];
  setData: (data: TableIndexVo[]) => void;
  tableCode: string;
  getFieldList: () => Promise<TableFieldDetailVo[]>;
  tagNum: string;
}
const App = (props: Props) => {
  const { data, form, setData, tableCode, tagNum } = props;
  const { MysqlIndexFunList } = MysqlIndexFunDic();
  const { MysqlIndexTypeList } = MysqlIndexTypeDic();
  // 用于检查是否有数据
  const isDataReady = MysqlIndexFunList !== null && MysqlIndexTypeList !== null;
  // 你可以根据 isDataReady 来决定渲染什么
  if (!isDataReady) {
    return <div>Loading...</div>;  // 或者你可以显示一个加载指示器
  }
  const [fieldCodeList, setFieldCodeList] = useState<DicVo[]>();
  useEffect(() => {
    console.log('tagNum', tagNum);
    if (tagNum !== '6') return;
    props.getFieldList().then((res) => {
      setFieldCodeList(res.map(value => {
        return { value: value.code, label: value.code };
      }));
    });
  }, [tagNum]);
  if (!fieldCodeList) return <div></div>;


  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const newList = [...data];
    const [removed] = newList.splice(result.source.index, 1);
    newList.splice(result.destination.index, 0, removed);
    setData(newList);
  };


  return (
    <div style={{}}>
      <Form form={form} component={false}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="my-droppable1">
            {(provided) => (
              <table className={'my-table'} ref={provided.innerRef} {...provided.droppableProps} style={{ width: '100%', tableLayout: 'auto' }}>
                <thead>
                <tr style={{ backgroundColor: '#f0f0f0', height: '40px' }}>
                  <th>索引名</th>
                  <th>字段</th>
                  <th>索引类型</th>
                  <th>索引方法</th>
                  <th>描述</th>
                  <th>操作</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                  <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
                    {(provided, snapshot) => (
                      <tr
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`my-row ${snapshot.isDragging ? 'my-dragging' : ''}`}
                      >
                        <IndexRow key={item.id} field={item}
                                  MysqlIndexFunList={MysqlIndexFunList ?? []}
                                  MysqlIndexTypeList={MysqlIndexTypeList ?? []}
                                  form={form}
                                  fieldCodeList={fieldCodeList}
                        />
                      </tr>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
                </tbody>
              </table>
            )}
          </Droppable>
        </DragDropContext>
        <Button style={{ width: '100%' }} type={'dashed'}
                onClick={() => setData([...data, {
                  id: oGetRandomNumberString(9),
                  indexType: 'NORMAL',
                  indexFun: 'BTREE',
                  name: tableCode + '_',
                } as TableIndexVo])}
        ><PlusOutlined />添加索引</Button>
      </Form>
    </div>
  );
};

export default App;