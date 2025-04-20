import React, { useContext } from 'react';



interface DataBaseContextType {
  reloadTableData: (tableId: number) => void;
  deleteTable: (tableId: number) => void;
  setOpenDrawer: (open: boolean) => void;
}


export const MyDataBaseContext = React.createContext<DataBaseContextType>(
  {
    reloadTableData: (tableId?: number) => {
    },
    setOpenDrawer: (open: boolean) => {

    },
    deleteTable: (tableId: number) => {

    },
  },
);

export const useDataBaseContext = () => useContext(MyDataBaseContext);