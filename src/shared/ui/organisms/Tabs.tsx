'use client'; // Client Component — usa useContext y useState
import { createContext, useContext, useState, type ReactNode } from 'react';

// Interfaces definition
interface TabsContextType {
  activeId: string | null;
  setActiveId: (id: string) => void;
}
const TabsContext = createContext<TabsContextType | null>(null);

interface TabsProps {
  children: ReactNode;
  defaultId: string;
  activeId?: string;
}

interface HeaderProps {
  children: ReactNode;
}

interface TabProps {
  id: string;
  children: ReactNode;
}

type ContentProps = {
  id: string;
  children: ReactNode;
};

function Tabs({
  children,
  defaultId,
  activeId: controlledActiveId,
}: TabsProps & { activeId?: string }) {
  const [internalActiveId, setInternalActiveId] = useState<string>(defaultId);
  const activeId = controlledActiveId ?? internalActiveId;
  const setActiveId = controlledActiveId ? () => {} : setInternalActiveId;

  return (
    <TabsContext.Provider value={{ activeId, setActiveId }}>
      <div className="w-full">{children}</div>
    </TabsContext.Provider>
  );
}

function Header({ children }: HeaderProps) {
  return <div className="flex border-b mb-4">{children}</div>;
}

function Tab({ id, children }: TabProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Tabs.Tab must be used within a Tabs provider');
  const { activeId, setActiveId } = context;
  const isActive = activeId === id;
  return (
    <button
      className={`py-2 px-4 -mb-px font-semibold border-b-2 transition-colors duration-200 ${
        isActive
          ? 'border-blue-500 text-blue-600'
          : 'border-transparent text-gray-500 hover:text-blue-500'
      }`}
      onClick={() => setActiveId(id)}
      type="button"
    >
      {children}
    </button>
  );
}

function Content({ id, children }: ContentProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error('Tabs.Content must be used within a Tabs provider');

  const { activeId } = context;
  if (activeId !== id) return null;

  return <div className="p-4 text-gray-700">{children}</div>;
}

Tabs.Header = Header;
Tabs.Tab = Tab;
Tabs.Content = Content;

export { Tabs };
