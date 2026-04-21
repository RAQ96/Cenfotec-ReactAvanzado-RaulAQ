import React, { createContext, useState, ReactNode } from 'react';

export type FilterValues = {
  priority: string | null;
  assignee: string | null;
};

export type FiltersContextType = {
  filters: FilterValues;
  setFilters: (filters: FilterValues) => void;
  clearFilters: () => void;
};

export const FiltersContext = createContext<FiltersContextType | undefined>(undefined);

export const FiltersProvider = ({ children }: { children: ReactNode }) => {
  const [filters, setFilters] = useState<FilterValues>({ priority: null, assignee: null });

  const clearFilters = () => setFilters({ priority: null, assignee: null });

  return (
    <FiltersContext.Provider value={{ filters, setFilters, clearFilters }}>
      {children}
    </FiltersContext.Provider>
  );
};
