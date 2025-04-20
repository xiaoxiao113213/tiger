import { DragSortTable, EditableFormInstance, EditableProTable, ProColumns } from '@ant-design/pro-components';
import React, { useEffect, useRef, useState } from 'react';
import { Button, Checkbox } from 'antd';
import MysqlTypeDic from '@/components/Dic/MysqlTypeDic';
import { TableFieldDetailVo } from '@/pages/database/databaseBoard/api/tableField/ApiBo';
import { FlagNotNullCheckbox, MyInput, TableFormTypeEnum } from '@/pages/database/databaseBoard/table/component/TableFieldForm';
import { getDefaultFieldListApi, tableSaveDefaultFieldListApi } from '@/pages/database/databaseBoard/api/table/api';
import { checkApiRst, oGetRandomNumberString } from '@/utils/utils.ts';
import { OperateEnum } from '@/utils/enum.ts';

const defaultValueDic = [
  { value: 'emptyString', label: 'empty string' },
  { value: 'CURRENT_TIMESTAMP', label: 'now' },
  { value: 'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP', label: 'now and update now' },
];
type Props = {
  databaseBoardId: number;
  setDefaultFieldModalFn: React.Dispatch<React.SetStateAction<OperateEnum>>,
}
const DefaultTableField = (props: Props) => {
  const [editableKeys, setEditableRowKeys] = useState<React.Key[]>([]);
  const [fieldList, setFieldList] = useState<TableFieldDetailVo[]>([]);
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [tableFormType, setTableFormType] = useState<TableFormTypeEnum>(TableFormTypeEnum.编辑);
  const editorFormRef = useRef<EditableFormInstance<TableFieldDetailVo>>();
  const { MysqlTypeList, MysqlTypeValueEnum } = MysqlTypeDic();
  const [defaultValueEnum, setDefaultValue] = useState<{}>({
    'emptyString': { text: 'empty string' },
    'CURRENT_TIMESTAMP': { text: 'now' },
    'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP': { text: 'now and update now' },
  });

  // 新增加行了
  const setDataSource = (fieldList: TableFieldDetailVo[]) => {
    setFieldList(fieldList);
    // props.table.fieldList = fieldList
    // props.setTable({...props.table})
    // console.log(1213, props.table.fieldList)
  };
  // 删除行
  const delField = (id: string) => {
    setFieldList(pre => {
      return pre.filter((item) => item.id != id);
    });
  };

  useEffect(() => {
    getDefaultFieldListApi({ databaseBoardId: props.databaseBoardId }).then(rst => {  // 获取默认字段   也就是数据库的字段
      if (checkApiRst(rst)) {
        return;
      }
      rst.data.forEach((item, index) => {
        item.id = oGetRandomNumberString(9);
      });
      setFieldList(rst.data);
    });
    return () => {
    };
  }, []); // 第二个参数表示依赖项

  useEffect(() => {
    // 在组件挂载或更新后执行操作
    let editableKeys1 = fieldList.map(value => {
      return value.id;
    });
    setEditableRowKeys(editableKeys1);
    return () => {
    };
  }, [fieldList]); // 第二个参数表示依赖项


  useEffect(() => {
    const handleKeyDown = async (event: KeyboardEvent) => {
      const isMac = /Mac|iPod|iPhone|iPad/.test(window.navigator.platform);
      const ctrlKeyForPlatform = isMac ? event.metaKey : event.ctrlKey;

      if (ctrlKeyForPlatform) {
        switch (event.key) {
          case 'c': {
            // event.preventDefault(); // 阻止默认行为，比如浏览器本身的保存页面功能
            // console.log('Detected Ctrl+C or ⌘+C');
            // 复制逻辑

            if (!selectedRowKeys) return;
            let fields = fieldList.filter(item => {
              return selectedRowKeys.includes(item.id);
            });
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
              // console.log("复制的数据", json)
              // let fieldList = JSON.parse(JSON.stringify(fieldList))
              for (let field of json.fields) {
                let tmp = fieldList.find(i => i.code === field.code);
                if (!tmp) {
                  fieldList.push(field);
                }
              }
              setFieldList(JSON.parse(JSON.stringify(fieldList)));
              // editorFormRef.current?.resetFields()
              setFieldList(pre => {
                setTableFormType(TableFormTypeEnum.排序);
                setTimeout(() => {
                  setTableFormType(TableFormTypeEnum.编辑);
                }, 250);
                return pre;
              });
              // 这里处理粘贴内容
            }).catch(err => {
              console.error('粘贴失败:', err);
            });
            break;
          }
          case 's':
            event.preventDefault(); // 阻止默认行为，比如浏览器本身的保存页面功能
            // 在这里处理保存逻辑
            break;
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
  }, [selectedRowKeys, fieldList]); // 空依赖数组意味着仅在挂载时执行一次
  const setTableForm = () => {
    console.log(tableFormType);
    if (tableFormType === TableFormTypeEnum.编辑) {
      setTableFormType(TableFormTypeEnum.排序);
    } else {
      setTableFormType(TableFormTypeEnum.编辑);
    }
  };

  let button = <div style={{ display: 'flex', alignItems: 'center' }}>
    <span style={{ flexGrow: 1 }}>名</span>
    <Button type={'link'}
            onClick={setTableForm}
    >
      {
        tableFormType === TableFormTypeEnum.编辑 && '排序模式'
      }
      {
        tableFormType === TableFormTypeEnum.排序 && '编辑模式'
      }
    </Button>
  </div>;

  const handleDragSortEnd = (
    beforeIndex: number,
    afterIndex: number,
    newDataSource: any,
  ) => {
    // console.log('排序后的数据', newDataSource);
    setDataSource(newDataSource);
    // message.success('修改列表排序成功');
  };


  const saveFields = async () => {
    console.log('要保存的数据', fieldList);
    let rst = await tableSaveDefaultFieldListApi({ databaseBoardId: props.databaseBoardId, fieldList: fieldList });
    if (checkApiRst(rst)) {
      return;
    }
    props.setDefaultFieldModalFn(OperateEnum.close);
  };


  const columns: ProColumns<TableFieldDetailVo>[] = [
    {
      title: button,
      dataIndex: 'code',
      width: 180,
      formItemProps: {
        rules: [
          {
            required: true,
            whitespace: true,
            message: '此项是必填项',
          },
        ],
      },
      renderFormItem: () => {
        return <MyInput></MyInput>;
      },

    },
    {
      title: '类型',
      key: 'type',
      dataIndex: 'type',
      valueType: 'select',
      fieldProps: {
        showSearch: true,
      },
      width: '200px',
      valueEnum: MysqlTypeValueEnum,
    },
    {
      title: '长度',
      valueType: 'digit',
      width: '100px',
      dataIndex: 'length',
    },
    {
      title: '小数点',
      valueType: 'digit',
      width: '100px',
      dataIndex: 'decimal',
    },
    {
      title: '不空',
      // valueType: 'switch',
      dataIndex: 'flagNotNull',
      width: '50px',
      renderFormItem: (row) => {
        // console.log("row", row.entity)
        return <FlagNotNullCheckbox ifShow={true}
        ></FlagNotNullCheckbox>;
      },
      // 不编辑的时候 状态
      render: (_, row) => {
        return <Checkbox checked={row.flagNotNull == 1}></Checkbox>;
      },
    },
    {
      title: '主键',
      dataIndex: 'flagKey',
      width: '50px',
      renderFormItem: (row) => {
        // console.log("row", row.entity)
        return <FlagNotNullCheckbox ifShow={true}
        ></FlagNotNullCheckbox>;
      },
      // 不编辑的时候 状态
      render: (_, row) => {
        return <Checkbox checked={row.flagKey == 1}></Checkbox>;
      },
    },
    {
      title: '默认值',
      // valueType: 'text',
      dataIndex: 'defaultValue',
      valueType: 'select',
      fieldProps: {
        // showSearch: true,
        mode: 'tags',
        maxCount: 1,
      },
      valueEnum: defaultValueEnum,
    },
    {
      title: '描述',
      valueType: 'text',
      dataIndex: 'desc',
      renderFormItem: () => {
        return <MyInput></MyInput>;
      },
    },
    {
      title: '自动递增',
      dataIndex: 'flagAutoIncrement',
      width: '50px',
      renderFormItem: (row) => {
        if (!row?.entity?.type) return '';
        // console.log("row", row.entity)
        return <FlagNotNullCheckbox
          ifShow={row.entity.type == 'bigint' ||
            row.entity.type == 'int' ||
            row.entity.type == 'integer'
          }
        ></FlagNotNullCheckbox>;
      },
      // 不编辑的时候 状态
      render: (_, row) => {
        return <Checkbox checked={row.flagAutoIncrement == 1}></Checkbox>;
      },
    },
    {
      title: '无符号',
      dataIndex: 'flagUnsigned',
      width: '50px',
      renderFormItem: (row) => {
        // console.log("row", row.entity)
        if (!row?.entity?.type) return '';
        return <FlagNotNullCheckbox
          ifShow={row.entity.type == 'bigint' ||
            row.entity.type == 'int' ||
            row.entity.type == 'integer'
          }
        >
        </FlagNotNullCheckbox>;
      },
      // 不编辑的时候 状态
      render: (_, row) => {
        return <Checkbox checked={row.flagUnsigned == 1}></Checkbox>;
      },
    },
    {
      title: '操作',
      valueType: 'option',
      width: 50,
      render: (text, record, _, action) => [
        <a
          key="delete"
          onClick={() => {
            // setDataSource(dataSource.filter((item) => item.id !== record.id));
            delField(record.id);
          }}
        >
          删除
        </a>,
      ],

    }
    ,
  ];
  const columnsSort: ProColumns<TableFieldDetailVo>[] = [
    {
      title: '排序',
      dataIndex: 'sort',
      width: 60,
      className: 'drag-visible',
    },
    {
      title: button,
      dataIndex: 'code',
      width: 180,
      formItemProps: {
        rules: [
          {
            required: true,
            whitespace: true,
            message: '此项是必填项',
          },
        ],
      },
      renderFormItem: () => {
        return <MyInput></MyInput>;
      },

    },
    {
      title: '类型',
      key: 'type',
      dataIndex: 'type',
      valueType: 'select',
      fieldProps: {
        showSearch: true,
      },
      width: '200px',
      valueEnum: MysqlTypeValueEnum,
    },
    {
      title: '长度',
      valueType: 'digit',
      width: '100px',
      dataIndex: 'length',
    },
    {
      title: '小数点',
      valueType: 'digit',
      width: '100px',
      dataIndex: 'decimal',
    },
    {
      title: '不空',
      // valueType: 'switch',
      dataIndex: 'flagNotNull',
      width: '50px',
      renderFormItem: (row) => {
        // console.log("row", row.entity)
        return <FlagNotNullCheckbox ifShow={true}
        ></FlagNotNullCheckbox>;
      },
      // 不编辑的时候 状态
      render: (_, row) => {
        return <Checkbox checked={row.flagNotNull == 1}></Checkbox>;
      },
    },
    {
      title: '主键',
      dataIndex: 'flagKey',
      width: '50px',
      renderFormItem: (row) => {
        // console.log("row", row.entity)
        return <FlagNotNullCheckbox ifShow={true}
        ></FlagNotNullCheckbox>;
      },
      // 不编辑的时候 状态
      render: (_, row) => {
        return <Checkbox checked={row.flagKey == 1}></Checkbox>;
      },
    },
    {
      title: '默认值',
      // valueType: 'text',
      dataIndex: 'defaultValue',
      valueType: 'select',
      fieldProps: {
        // showSearch: true,
        mode: 'tags',
        maxCount: 1,
      },
      valueEnum: defaultValueEnum,
    },
    {
      title: '描述',
      valueType: 'text',
      dataIndex: 'desc',
      renderFormItem: () => {
        return <MyInput></MyInput>;
      },
    },
    {
      title: '自动递增',
      dataIndex: 'flagAutoIncrement',
      width: '50px',
      renderFormItem: (row) => {
        if (!row?.entity?.type) return '';
        // console.log("row", row.entity)
        return <FlagNotNullCheckbox
          ifShow={row.entity.type == 'bigint' ||
            row.entity.type == 'int' ||
            row.entity.type == 'integer'
          }
        ></FlagNotNullCheckbox>;
      },
      // 不编辑的时候 状态
      render: (_, row) => {
        return <Checkbox checked={row.flagAutoIncrement == 1}></Checkbox>;
      },
    },
    {
      title: '无符号',
      dataIndex: 'flagUnsigned',
      width: '50px',
      renderFormItem: (row) => {
        // console.log("row", row.entity)
        if (!row?.entity?.type) return '';
        return <FlagNotNullCheckbox
          ifShow={row.entity.type == 'bigint' ||
            row.entity.type == 'int' ||
            row.entity.type == 'integer'
          }
        >
        </FlagNotNullCheckbox>;
      },
      // 不编辑的时候 状态
      render: (_, row) => {
        return <Checkbox checked={row.flagUnsigned == 1}></Checkbox>;
      },
    },
    {
      title: '操作',
      valueType: 'option',
      width: 50,
      render: (text, record, _, action) => [
        <a
          key="delete"
          onClick={() => {
            // setDataSource(dataSource.filter((item) => item.id !== record.id));
            delField(record.id);
          }}
        >
          删除
        </a>,
      ],

    }
    ,
  ];
  return (
    <>
      <div style={{ marginBottom: 10 }}><Button type={'primary'} onClick={saveFields}>保存</Button></div>
      {
        tableFormType === TableFormTypeEnum.编辑 &&
        <EditableProTable<TableFieldDetailVo>
          size="small"
          rowKey="id"
          headerTitle=""
          // maxLength={5}
          editableFormRef={editorFormRef}
          scroll={{
            x: 960,
          }}
          recordCreatorProps={{
            newRecordType: 'dataSource',
            record: () => ({
              code: '',
              id: oGetRandomNumberString(9),
              flagNotNull: 0,
              flagKey: 0,
            }),
          }}
          controlled={true}
          loading={false}
          columns={columns}
          value={fieldList}
          // dataSource={fieldList}
          editable={{
            type: 'multiple',
            editableKeys,
            actionRender: (row, config, defaultDoms) => {
              return [<a
                key="delete"
                onClick={() => {
                  // setDataSource(dataSource.filter((item) => item.id !== row.id));
                  delField(row.id);
                }}
              >
                删除
              </a>];
            },
            onValuesChange: (record, recordList) => {
              console.log('变更的数据', record, recordList, fieldList);
              if (record) {
                let row = recordList.find(item => item.id == record.id)!!;
                if (record?.flagKey === 1) {
                  row.flagNotNull = 1;
                }
                if (row.defaultValue && Array.isArray(row.defaultValue)) {
                  if (row.defaultValue.length >= 1) {
                    row.defaultValue = row.defaultValue[0];
                  } else {
                    row.defaultValue = null;
                  }
                }
              }
              setDataSource(recordList);
            },
            onChange: setEditableRowKeys,
          }}
          tableAlertRender={false}
          rowSelection={{
            selectedRowKeys,
            onChange: setSelectedRowKeys,
            // hideSelectAll: true,
            columnWidth: 60,

          }}

        />
      }

      {
        tableFormType === TableFormTypeEnum.排序 &&
        <DragSortTable
          size="small"
          headerTitle=""
          columns={columnsSort}
          rowKey="id"
          pagination={false}
          search={false}
          options={false}
          dataSource={fieldList}
          dragSortKey="sort"
          onDragSortEnd={handleDragSortEnd}
        />
      }

    </>
  );
};

export default DefaultTableField;