import React, { useRef, useState } from 'react';
import './App.css';

const App = () => {
  const resizableRef = useRef(null);
  const [width, setWidth] = useState(200);

  const onMouseDown = (e, direction) => {
    e.preventDefault();
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);

    function onMouseMove(event) {
      const resizable = resizableRef.current;
      const rect = resizable.getBoundingClientRect();
      console.log(rect, event.movementX, event.movementY, direction);
      if (direction.includes('right')) {
        // resizable.style.width = `${rect.width + event.movementX}px`;
        setWidth(rect.width + event.movementX);
      }
      if (direction.includes('bottom')) {
        resizable.style.height = `${rect.height + event.movementY}px`;
      }
      if (direction.includes('left')) {
        resizable.style.width = `${rect.width - event.movementX}px`;
      }
      if (direction.includes('top')) {
        resizable.style.height = `${rect.height - event.movementY}px`;
      }
    }

    function onMouseUp() {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }
  };

  return (
    <div className="App">
      <div ref={resizableRef} className="resizable" style={{ width: `${width}px`, height: '100%' }}>
        <div className="resizer top-left" onMouseDown={(e) => onMouseDown(e, 'top left')} />
        <div className="resizer top-right" onMouseDown={(e) => onMouseDown(e, 'top right')} />
        <div className="resizer bottom-left" onMouseDown={(e) => onMouseDown(e, 'bottom left')} />
        <div className="resizer bottom-right" onMouseDown={(e) => onMouseDown(e, 'bottom right')} />
        <div className="resizer top" onMouseDown={(e) => onMouseDown(e, 'top')} />
        <div className="resizer right" onMouseDown={(e) => onMouseDown(e, 'right')} />
        <div className="resizer bottom" onMouseDown={(e) => onMouseDown(e, 'bottom')} />
        <div className="resizer left" onMouseDown={(e) => onMouseDown(e, 'left')} />
      </div>
      <div style={{ height: 400, width: `calc(100% - ${width}px)`, backgroundColor: 'lightgreen' }}>
        dfgsdf
      </div>
    </div>
  );
};

export default App;
