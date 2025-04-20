import React, { useMemo, useState } from 'react';
import { Button } from 'antd';


const ChildComponent = () => {
  console.log('Child Component Rendered');
  return (
    <div>
      <h1>Child Component</h1>
    </div>
  );
};


const Index = () => {
  const [num, setNum] = useState(1);
  const memoizedChildComponent = useMemo(() => <ChildComponent />, [num]);
  return <div>
    <h1>Parent Component</h1>
    <Button onClick={() => {
      setNum(num + 1);
    }}>+1</Button>
    <div>{num}</div>
    {memoizedChildComponent}
    {memoizedChildComponent}
    <ChildComponent />
  </div>;
};

export default Index;