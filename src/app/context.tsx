"use client";

import React from "react";

const TagContext = React.createContext<
  [string[], React.Dispatch<React.SetStateAction<string[]>>] | undefined
>(undefined);

export function TagProvider({ children }: { children: React.ReactNode }) {
  const [tags, setTags] = React.useState([]);
  return (
    <TagContext.Provider value={[tags, setTags]}>
      {children}
    </TagContext.Provider>
  );
}
