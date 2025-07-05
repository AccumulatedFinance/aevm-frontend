import React, { createContext, useContext } from 'react';
import RootStore from './stores/rootStore';

const rootStore = new RootStore();

const StoreProvider = createContext<RootStore>(rootStore);

export const MobxStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <StoreProvider.Provider value={rootStore}>{children}</StoreProvider.Provider>
);

export const useStore = (): RootStore => useContext(StoreProvider);