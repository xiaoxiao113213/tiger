import { createContext, useContext } from 'react';

interface AppContextType {
  nodeClickFn: (buttonName: string, nodeId: string) => void;
}

const defaultValue: AppContextType = {
  nodeClickFn: (buttonName: string, nodeId: string) => {
  },
};

export const PipelineBuildContext = createContext<AppContextType>(defaultValue);

export const usePipelineBuildContext = () => useContext(PipelineBuildContext);

