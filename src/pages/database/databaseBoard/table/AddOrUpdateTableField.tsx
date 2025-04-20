import React, { useEffect, useState } from 'react';
import { Button, Form } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { TableFieldDetailVo } from '@/pages/database/databaseBoard/api/tableField/ApiBo.ts';
import { oGetRandomNumberString } from '@/utils/utils.ts';
import MysqlTypeDic from '@/components/Dic/MysqlTypeDic.ts';
import '../../customer/fieldRow.css';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import FieldRow from '@/pages/database/customer/fieldRow.tsx';
import { FormInstance } from 'antd/es/form/hooks/useForm';

type Props = {
  form: FormInstance<TableFieldDetailVo>;
  data: TableFieldDetailVo[];
  setData: (data: TableFieldDetailVo[]) => void;
  tagNum: string;
}
const App = (props: Props) => {
  const { data, form, setData } = props;
  const { MysqlTypeList } = MysqlTypeDic();
  // 用于检查是否有数据
  const isDataReady = MysqlTypeList !== null;
  // 你可以根据 isDataReady 来决定渲染什么
  if (!isDataReady) {
    return <div>Loading...</div>;  // 或者你可以显示一个加载指示器
  }
  const [selectedDraggable, setSelectedDraggable] = useState<string | number | null>(null);
  const onDragEnd = (result) => {
    if (!result.destination) {
      return;
    }
    const newList = [...data];
    const [removed] = newList.splice(result.source.index, 1);
    newList.splice(result.destination.index, 0, removed);
    setData(newList);
  };

  useEffect(() => {
    if (props.tagNum !== '5') return;
    console.log('useEffect');
    const handleKeyDown = async (event: KeyboardEvent) => {
      const isMac = /Mac|iPod|iPhone|iPad/.test(window.navigator.platform);
      const ctrlKeyForPlatform = isMac ? event.metaKey : event.ctrlKey;

      if (ctrlKeyForPlatform) {
        switch (event.key) {
          case 'c': {
            // event.preventDefault(); // 阻止默认行为，比如浏览器本身的保存页面功能
            // 复制逻辑
            let fields = (await getSelectField()).filter(i => i.selected);
            if (fields?.length <= 0) break;
            navigator.clipboard.writeText(JSON.stringify({ fields: fields })).then(() => {
            }).catch(err => {
            });
            break;
          }
          case 'v': {
            // event.preventDefault(); // 阻止默认行为，比如浏览器本身的保存页面功能
            // 粘贴逻辑
            navigator.clipboard.readText().then(async (pasteText) => {
              if (!pasteText) return;
              let json = JSON.parse(pasteText);
              if (!json.fields) return;
              let fieldList = JSON.parse(JSON.stringify(data));
              for (let field of json.fields) {
                let tmp = fieldList.find(i => i.code === field.code);
                if (!tmp) {
                  fieldList.push(field);
                }
              }
              setData(fieldList);
              // 这里处理粘贴内容
            }).catch(err => {
              // console.error('粘贴失败:', err);
            });
            break;
          }
          case 's':
            break;
          // event.preventDefault(); // 阻止默认行为，比如浏览器本身的保存页面功能
          // 在这里处理保存逻辑
          // break;
          default:
          // 其他按键组合
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    // 清理函数：当组件卸载时移除事件监听器
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [props.tagNum]); // 空依赖数组意味着仅在挂载时执行一次


  const getSelectField = async () => {
    const formData = await form.getFieldsValue();
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
    console.log('save', newData);
    return newData;
  };


  return (
    <div style={{}}>
      <Form form={form} component={false} key={'fields'}>
        <DragDropContext onDragEnd={onDragEnd}>
          <Droppable droppableId="my-droppable1">
            {(provided) => (
              <table className={'my-table'} ref={provided.innerRef} {...provided.droppableProps} style={{ width: '100%', tableLayout: 'auto' }}>
                <thead>
                <tr style={{ backgroundColor: '#f0f0f0', height: '40px' }}>
                  <th></th>
                  <th>字段名</th>
                  <th>类型</th>
                  <th>长度</th>
                  <th>小数点</th>
                  <th>不空</th>
                  <th>主键</th>
                  <th>默认值</th>
                  <th>描述</th>
                  <th>自增</th>
                  <th>无符号</th>
                  <th>操作</th>
                </tr>
                </thead>
                <tbody>
                {data.map((item, index) => (
                  <Draggable key={item.tableFieldId} draggableId={item.tableFieldId.toString()} index={index}>
                    {(provided, snapshot) => (
                      <tr
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onClick={() => setSelectedDraggable(item.tableFieldId)}
                        onDoubleClick={() => {
                        }}
                        className={`my-row ${snapshot.isDragging ? 'my-dragging' : ''}`}
                      >
                        <FieldRow key={item.tableFieldId} field={item} mysqlType={MysqlTypeList ?? []} form={form} />
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
                  code: '',
                  tableFieldId: parseInt(oGetRandomNumberString(11)),
                  flagNotNull: 0,
                  flagKey: 0,
                  type: 'varchar',
                  length: 255,
                } as TableFieldDetailVo])}
        ><PlusOutlined />添加字段</Button>
      </Form>
    </div>
  );
};

export default App;