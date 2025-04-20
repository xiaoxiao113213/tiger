import React, { useState } from 'react';
import { DragDropContext, Draggable, Droppable } from 'react-beautiful-dnd';
import Title from 'antd/lib/typography/Title';

// Initial control options
const initialControls = [
  { id: 'input-1', content: 'Input Field' },
  { id: 'select-1', content: 'Select Field' },
  { id: 'textarea-1', content: 'Textarea' },
];

// Initial form design is empty
const initialFormDesign = [];

const FormBuilder = () => {
  const [controls] = useState(initialControls); // Keep controls static
  const [formDesign, setFormDesign] = useState(initialFormDesign);

  // Helper function to create unique IDs
  const generateId = (baseId) => `${baseId}-${new Date().getTime()}`;

  // Handler for drag end
  const onDragEnd = (result) => {
    const { source, destination } = result;

    // Do nothing if dropped outside a droppable area
    if (!destination) return;

    // If dragging from controls to form design
    if (source.droppableId === 'controls' && destination.droppableId === 'formDesign') {
      const draggedControl = controls[source.index];
      const newControl = { ...draggedControl, id: generateId(draggedControl.id) };
      const updatedFormDesign = [...formDesign];
      updatedFormDesign.splice(destination.index, 0, newControl);
      setFormDesign(updatedFormDesign);
    }

    // If rearranging within form design
    if (source.droppableId === 'formDesign' && destination.droppableId === 'formDesign') {
      const reorderedFormDesign = Array.from(formDesign);
      const [removed] = reorderedFormDesign.splice(source.index, 1);
      reorderedFormDesign.splice(destination.index, 0, removed);
      setFormDesign(reorderedFormDesign);
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px' }}>
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
                  background: '#f0f0f0',
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
                        {control.content}
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>

          {/* Form design area */}
          <Droppable droppableId="formDesign">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                style={{
                  width: '100%',
                  padding: 10,
                  background: '#e8f5e9',
                  margin: '0 20px',
                  borderRadius: '4px',
                }}
              >
                <Title level={4} style={{ textAlign: 'center' }}>表单</Title>
                {formDesign.length > 0 ? (
                  formDesign.map((field, index) => (
                    <Draggable key={field.id} draggableId={field.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={{
                            padding: 10,
                            marginTop: 10,
                            background: '#fff',
                            border: '1px solid #ccc',
                            borderRadius: '4px',
                            ...provided.draggableProps.style,
                          }}
                        >
                          {field.content}
                        </div>
                      )}
                    </Draggable>
                  ))
                ) : (
                  <p>拖拽控件到这里</p>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>

      {/* Property configuration area */}
      <div
        style={{
          width: 200,
          padding: 10,
          background: '#f9f9f9',
          border: '1px solid #ccc',
          borderRadius: '4px',
        }}
      >
        <h3>属性展示</h3>
        <p>在这里配置选中的控件属性</p>
      </div>
    </div>
  );
};

export default FormBuilder;
