import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Title from 'antd/lib/typography/Title';
import { CustomerFieldBo, FormFieldTypeEnum } from '@/pages/flow/process/process/form/form/Bo.tsx';
import { getRandomString, oGetRandomNumberString } from '@/utils/utils.ts';
import SubmitForm from '@/pages/flow/process/process/form/form/submitForm';
import { Button, Card, Divider, Form, Input, message, Popover } from 'antd';
import CustomerFieldNew from '@/pages/flow/process/process/form/form/addForm/customerFieldNew.tsx';
import { DeleteOutlined } from '@ant-design/icons';

interface Control {
  id: string;
  name: string;
  type: FormFieldTypeEnum;
  value?: any;
}

// Initial control options
const initialControls: Control[] = [
  { id: 'input-1', name: '文本框', type: FormFieldTypeEnum.text, value: '' },
  { id: 'select-1', name: '数字框', type: FormFieldTypeEnum.number, value: '' },
  { id: 'textarea-1', name: '文本域', type: FormFieldTypeEnum.textArea, value: '' },
  { id: 'select-2', name: '下拉单选', type: FormFieldTypeEnum.select, value: '' },
  { id: 'select-3', name: '下拉多选', type: FormFieldTypeEnum.mutSelect, value: [] },
  { id: 'file-1', name: '文件', type: FormFieldTypeEnum.file, value: { fileList: [] } },
  { id: 'date-1', name: '时间', type: FormFieldTypeEnum.date, value: undefined },
  // { id: 'password-1', name: '密码', type: FormFieldTypeEnum.password },
  // { id: 'account-1', name: '账号', type: FormFieldTypeEnum.account },
];

type Props = {
  excludedControls?: FormFieldTypeEnum[];
  initFormDesign?: CustomerFieldBo[];
  showScope?: boolean;
  isEditScope?: boolean; // 是否可以编辑scope 的操作，当流水线全局参数的时候 不可以编辑插件中带出来的全局参数
};

export interface FormBuilderRef {
  getFieldList: () => CustomerFieldBo[];
}

const FormBuilder = forwardRef<FormBuilderRef, Props>((props: Props, ref) => {
  const { excludedControls } = props;
  const showScope = props.showScope ?? false;
  const isEditScope = props.isEditScope ?? true;
  const [controls] = useState<Control[]>(initialControls.filter(control => !(excludedControls ?? []).includes(control.type))); // Keep controls static
  const [formFields, setFormFields] = useState<CustomerFieldBo[]>([]);
  useEffect(() => {
    if (props.initFormDesign) {
      props.initFormDesign.forEach((item) => {
        item.formFieldId = oGetRandomNumberString(10);
      }); // 重新生成formFieldId 让表单能够重新渲染
      setFormFields(props.initFormDesign);
    }
  }, []);

  const [formRef] = Form.useForm();
  const [updateFormRef] = Form.useForm();
  const [selected, setSelectedFn] = useState<CustomerFieldBo>();

  // Handler for drag end
  const onDragEnd = (result) => {
    const { source, destination } = result;

    // Do nothing if dropped outside a droppable area
    if (!destination) return;

    // If dragging from controls to form design
    if (source.droppableId === 'controls' && destination.droppableId === 'formDesign') {
      const draggedControl = controls[source.index];
      let scope = undefined;
      if (showScope) {
        scope = 0;
      }
      const newControl: CustomerFieldBo = {
        keyName: getRandomString(),
        optional: [],
        desc: '',
        notNull: 1,
        scope: scope, // 当这个值为 undefined 的时候 设置这个属性的不显示
        dateType: 0,
        unit: undefined,
        ...draggedControl,
        id: oGetRandomNumberString(10),
        formFieldId: oGetRandomNumberString(10),
      };
      const updatedFormDesign = [...formFields];
      updatedFormDesign.splice(destination.index, 0, newControl);
      setFormFields(updatedFormDesign);
    }

    // If rearranging within form design
    if (source.droppableId === 'formDesign' && destination.droppableId === 'formDesign') {
      const reorderedFormDesign = Array.from(formFields);
      const [removed] = reorderedFormDesign.splice(source.index, 1);
      reorderedFormDesign.splice(destination.index, 0, removed);
      setFormFields(reorderedFormDesign);
    }
  };
  useImperativeHandle(ref, () => ({
    getFieldList: () => {
      return formFields;
    },

  }));
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between',
      padding: '20px', backgroundColor: '#f0f0f0',
      // height: '100%',
      minHeight: '500px',
    }}>
      <DragDropContext onDragEnd={onDragEnd}>
        <div style={{ display: 'flex', justifyContent: 'space-between', flex: 1 }}>
          {/* Control area */}
          <Droppable droppableId="controls" isDropDisabled={true}>
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  width: 200,
                  padding: 10,
                  backgroundColor: '#f8f8f8',
                  borderRadius: '4px',
                }}
              >
                <Title level={4} style={{ textAlign: 'center', marginBottom: '20px' }}>控件选项</Title>
                {controls.map((control, index) => (
                  <Draggable key={control.id} draggableId={control.id} index={index}>
                    {(provided) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        style={{
                          padding: 10,
                          margin: '0 0 10px 0',
                          background: '#fff',
                          border: '1px solid #ccc',
                          borderRadius: '4px',
                          ...provided.draggableProps.style,
                        }}
                      >
                        {control.name}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
          {/* Form design area */}
          <Card style={{ width: '100%', margin: '0 20px', background: '#f8f8f8' }}>
            <Droppable droppableId="formDesign">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  style={{
                    width: '100%',
                    // height: '100%',
                    // padding: 10,
                    paddingLeft: 10,
                    paddingRight: 10,
                    background: 'rgba(255, 255, 255, 0.8)',
                    borderRadius: '4px',
                  }}
                >
                  <Form form={formRef}
                        key={'addFrom'}
                        validateTrigger="false"
                        style={{ width: '100%', height: '100%', marginBottom: '20px' }}
                        onValuesChange={(changedValues, allValues) => {
                          // console.log('变动值了', changedValues, allValues);
                          formFields.forEach((item) => {
                            // 如何验证是否有这个key
                            if (changedValues.hasOwnProperty(item.id)) {
                              item.value = changedValues[item.id];
                            }
                          });
                          setFormFields(formFields);
                        }
                        }
                  >
                    <Title level={4} style={{ textAlign: 'center' }}>表单</Title>
                    {formFields.length > 0 ? (
                      formFields.map((field, index) => (
                        <Draggable key={field.formFieldId} draggableId={field.formFieldId} index={index}>
                          {(provided) => (
                            <Popover trigger={'contextMenu'}
                                     placement={'rightTop'}
                                     content={
                                       <Button icon={<DeleteOutlined />}
                                               onClick={() => {
                                                 const item = formFields.find(item => item.id === field.id);
                                                 if (item && item.scope && !isEditScope) {
                                                   message.error('插件全局参数不允许删除');
                                                   return;
                                                 }
                                                 const newFormDesign = formFields.filter(item => item.id !== field.id);
                                                 setFormFields(newFormDesign);
                                               }}
                                       ></Button>
                                     }>
                              <div
                                onClick={() => {
                                  const item = formFields.find(item => item.id === field.id);
                                  if (item && item.scope && !isEditScope) { // 有了scope 但是不能编辑scope类型的数据
                                    return;
                                  }
                                  setSelectedFn(field);
                                  updateFormRef?.setFieldsValue(field);
                                }}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                                style={{
                                  borderLeft: selected?.id === field.id ? '5px solid #8AA6EA' : 'none',
                                  borderRight: selected?.id === field.id ? '5px solid #8AA6EA' : 'none',
                                  borderTop: 'none',
                                  borderBottom: 'none',
                                  // border: selectedDraggable === field.id ? '0.1px solid #8AA6EA' : 'none',
                                  // 当前拖拽的元素添加阴影
                                  // boxShadow: selectedDraggable === field.id ? '0 0 25px #8AA6EA' : 'none',
                                  borderRadius: 5,
                                  ...provided.draggableProps.style,
                                }}
                              >
                                <SubmitForm
                                  key={field.id}
                                  initFieldBo={field}
                                ></SubmitForm>

                              </div>
                            </Popover>
                          )}
                        </Draggable>
                      ))
                    ) : (
                      <p>拖拽控件到这里</p>
                    )}
                  </Form>
                  <Divider></Divider>
                  {provided.placeholder}
                </div>
              )}
            </Droppable>


          </Card>
        </div>
      </DragDropContext>

      {/* Property configuration area */}
      <div
        style={{
          width: 300,
          padding: 10,
          background: '#f8f8f8',
          border: '1px solid #ccc',
          borderRadius: '4px',
          overflowY: 'auto',
        }}
      >
        <h3>属性展示</h3>
        {
          selected && (
            <Form form={updateFormRef}
                  key={'updateForm'}
                  validateTrigger="false"
                  style={{ width: '100%', height: '100%' }}
                  onValuesChange={(changedValues, allValues) => {
                    console.log('变动值了', changedValues, allValues);
                    const fieldList = [...formFields];
                    const id = allValues.id;
                    const item = fieldList.find(item => item.id === id);
                    if (item) {
                      for (let itemKey in item) {
                        if (changedValues.hasOwnProperty(itemKey)) {
                          item[itemKey] = allValues[itemKey];
                        }
                      }
                      // 重新生成formFieldId 让表单能够重新渲染
                      item.formFieldId = oGetRandomNumberString(10);
                    }
                    setFormFields(fieldList);

                    const value = {};
                    formFields.forEach((item) => {
                      value[item.id] = item.value;
                    });
                    formRef.setFieldsValue(value);
                  }
                  }
            >
              <Form.Item
                label="id" name="id"
                rules={[{ required: true, message: 'Please input' }]}
                hidden={true}
              >
                <Input />
              </Form.Item>
              <CustomerFieldNew initFieldBo={selected} isEditScope={isEditScope}></CustomerFieldNew>
            </Form>
          )
        }
      </div>
    </div>
  );
});

export default FormBuilder;
