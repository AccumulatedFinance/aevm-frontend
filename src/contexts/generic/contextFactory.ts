import React from 'react';

export function createContextWithHook<T>() {
  const context = React.createContext<T | undefined>(undefined);

  function useContext() {
    const ctx = React.useContext(context);
    if (ctx === undefined || ctx === null) {
      throw new Error("Context must be used within its Provider");
    }
    return ctx;
  }
  return [context, useContext] as const;
}