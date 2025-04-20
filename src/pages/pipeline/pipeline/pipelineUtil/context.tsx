import { createContext, useContext } from 'react';
import { OperateEnum } from '@/utils/enum.ts';

interface PipelineContextType {
  nodeClickFn: (buttonName: string, nodeId: string) => void;
  pipelineOpenType: OperateEnum;
}

const defaultValue: PipelineContextType = {
  nodeClickFn: (buttonName: string, nodeId: string) => {
  },
  pipelineOpenType: OperateEnum.close,
};

export const PipelineContext = createContext<PipelineContextType>(defaultValue);

export const usePipelineContext = () => useContext(PipelineContext);

