import { createContext, useContext } from 'react';

interface AppContextType {
  userMsg: UserMsg;
  setChat: (boolean: boolean) => void; // 是否打开聊天窗口 打开了则不会弹出消息
}

const defaultValue: AppContextType = {
  userMsg: {
    type: 0,
  },
  setChat: (boolean) => {},
};

export const AppContext = createContext<AppContextType>(defaultValue);

export const useAppContext = () => useContext(AppContext);

export type UserMsg = {
  // 1有新的聊天内容  2：有新的ai的消息 sse
  type: number;
  message?: string;
};

export const DefaultUserMsg = {
  type: 0,
  message: '',
};
