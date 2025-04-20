import React from 'react';
import { BaseEdge, EdgeLabelRenderer, getSmoothStepPath, useReactFlow } from '@xyflow/react';

const arrowMarker = (
  <marker
    id="arrow"
    markerWidth="10"
    markerHeight="10"
    refX="8"
    refY="5"
    orient="auto"
    markerUnits="strokeWidth"
  >
    <path d="M0,0 L0,10 L10,5 z" fill="#cccccc" />
  </marker>
);

export default function CustomEdge({ id, sourceX, sourceY, targetX, targetY, sourcePosition, targetPosition }) {
  const { setEdges } = useReactFlow();
  const [edgePath, labelX, labelY] = getSmoothStepPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  return (
    <>
      <svg>
        <defs>{arrowMarker}</defs>
      </svg>
      <BaseEdge id={id} path={edgePath} markerEnd="url(#arrow)" />
      <EdgeLabelRenderer>
        <div></div>
      </EdgeLabelRenderer>
    </>
  );
}
