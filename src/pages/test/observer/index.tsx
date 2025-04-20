import React, { useEffect, useRef } from 'react';

const Index = () => {
  const targetRefs = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          console.log('Target is visible:', entry.target);
        } else {
          console.log('Target is not visible:', entry.target);
        }
      });
    });

    targetRefs.current.forEach((ref) => {
      if (ref) {
        observer.observe(ref); // 观察每个目标元素
      }
    });

    return () => {
      targetRefs.current.forEach((ref) => {
        if (ref) {
          observer.unobserve(ref); // 停止观察每个目标元素
        }
      });
      observer.disconnect(); // 停止观察所有元素
    };
  }, []);

  return (
    <div>
      <div ref={(el) => targetRefs.current[0] = el}>Target Element 1</div>
      <div ref={(el) => targetRefs.current[1] = el}>Target Element 2</div>
      <div ref={(el) => targetRefs.current[2] = el}>Target Element 3</div>
    </div>
  );
};

export default Index;
