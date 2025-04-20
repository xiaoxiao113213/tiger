import { createContext, useContext } from 'react';

interface AppContextType {
  userMsg: UserMsg;
  setChat: (boolean: boolean) => void;
}

const defaultValue: AppContextType = {

  userMsg: {
    type: 0,
  },
  setChat: (boolean) => {
  },
};

export const AppContext = createContext<AppContextType>(defaultValue);

export const useAppContext = () => useContext(AppContext);


export type UserMsg = {
  // 1有新的聊天内容
  type: number,
  message?: string,
}

export const DefaultUserMsg = {
  type: 0,
  message: '',
};