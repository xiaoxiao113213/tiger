import { Button } from 'antd';
import React, { useMemo, useState } from 'react';

function App() {
  const [a, setA] = useState(1);
  const [b, setB] = useState(1);
  const [c, setC] = useState(1);

  // 使用 useMemo 进行计算
  const memoizedValue = useMemo(() => {
    console.log('Computing value...');
    return a + b;
  }, [a, b]);

  console.log('Memoized value:', memoizedValue);

  return (
    <div>
      <div>
        <Button onClick={() => setA(1)}>Set A to 1</Button>
        <Button onClick={() => setB(1)}>Set B to 1</Button>
        <Button onClick={() => setB(2)}>Set B to 2</Button>
        <Button onClick={() => setC(c + 1)}>Set C</Button>
      </div>
      <div>
        A: {a}, B: {b} , C: {c}
      </div>
      <div>
        Memoized Value: {memoizedValue}
      </div>
    </div>
  );
}

export default App;
