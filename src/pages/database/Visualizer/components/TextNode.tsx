import React, { FC, useState, useEffect, useRef } from 'react';
import { NodeProps, useStore } from '@xyflow/react';
import '../style/table-node.css';
import { tableUpdateApi } from '@/pages/database/databaseBoard/api/table/api.tsx';

export const TextNode: FC<NodeProps> = (node) => {
  const { data, id } = node;
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(data.remarks || '双击编辑文字');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Get current zoom level from React Flow
  const zoom = useStore((state) => state.transform[2]);

  // Switch to edit mode
  const handleDoubleClick = () => {
    setIsEditing(true);
  };

  // Update text content
  const handleInputChange = (event) => {
    setText(event.target.value);
  };

  // Resize textarea based on content
  const resizeTextarea = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto'; // Reset height to calculate new size
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Adjust to content height
    }
  };

  // Exit edit mode and save content
  const handleBlur = () => {
    setIsEditing(false);
    tableUpdateApi({ tableId: id, remarks: text });
  };

  // Resize the textarea when text changes or edit mode is active
  useEffect(() => {
    if (isEditing) {
      resizeTextarea();
    }
  }, [text, isEditing]);

  return (
    <div
      onDoubleClick={handleDoubleClick}
      style={{
        padding: '10px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        backgroundColor: '#fff',
        transform: `scale(${1 / zoom})`, // Reverse scaling
        transformOrigin: 'center', // Keep scaling centered
        fontSize: '14px',
        fontStyle: 'italic',
        fontWeight: 'bold',
      }}
    >
      {isEditing ? (
        <textarea
          ref={textareaRef}
          value={text}
          onChange={handleInputChange}
          onBlur={handleBlur}
          autoFocus

          style={{
            minWidth: '266px',
            width: '100%',
            border: 'none',
            outline: 'none',
            resize: 'none', // Disable manual resize
            overflow: 'hidden', // Hide overflow for smooth resizing
          }}
        />
      ) : (
        <span>
          {text.split('\n').map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </span>
      )}
    </div>
  );
};
