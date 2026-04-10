import {
  createContext,
  useContext,
  useState,
  Children,
  cloneElement,
} from "react";
import type { ReactNode, ReactElement, FC } from "react";

type TabsContextType = {
  activeId: string | null;
  setActiveId: (id: string) => void;
};

const TabsContext = createContext<TabsContextType | null>(null);

type TabsProps = {
  children: ReactNode;
  defaultId?: string;
};

export const Tabs: FC<TabsProps> & {
  Header: typeof Header;
  Tab: typeof Tab;
  Content: typeof Content;
} = ({ children, defaultId }) => {
  let firstTabId: string | null = null;
  Children.forEach(children, (child: any) => {
    if (child?.type?.displayName === "Tabs.Header") {
      Children.forEach(child.props.children, (tabChild: any) => {
        if (!firstTabId && tabChild?.props?.id) {
          firstTabId = tabChild.props.id;
        }
      });
    }
  });
  const [activeId, setActiveId] = useState<string | null>(defaultId || firstTabId);

  return (
    <TabsContext.Provider value={{ activeId, setActiveId }}>
      <div className="w-full">{children}</div>
    </TabsContext.Provider>
  );
};

type HeaderProps = {
  children: ReactNode;
};

function Header({ children }: HeaderProps) {
  return (
    <div className="flex border-b mb-4">
      {Children.map(children, (child) =>
        cloneElement(child as ReactElement<any>, { ...((child as ReactElement<any>).props) })
      )}
    </div>
  );
}
Header.displayName = "Tabs.Header";

type TabProps = {
  id: string;
  children: ReactNode;
};

function Tab({ id, children }: TabProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error("Tabs.Tab must be used within a Tabs provider");
  const { activeId, setActiveId } = context;
  const isActive = activeId === id;
  return (
    <button
      className={`py-2 px-4 -mb-px font-semibold border-b-2 transition-colors duration-200 ${
        isActive
          ? "border-blue-500 text-blue-600"
          : "border-transparent text-gray-500 hover:text-blue-500"
      }`}
      onClick={() => setActiveId(id)}
      type="button"
    >
      {children}
    </button>
  );
}
Tab.displayName = "Tabs.Tab";

type ContentProps = {
  id: string;
  children: ReactNode;
};

function Content({ id, children }: ContentProps) {
  const context = useContext(TabsContext);
  if (!context) throw new Error("Tabs.Content must be used within a Tabs provider");
  const { activeId } = context;
  if (activeId !== id) return null;
  return <div className="p-4 text-gray-700">{children}</div>;
}
Content.displayName = "Tabs.Content";

Tabs.Header = Header;
Tabs.Tab = Tab;
Tabs.Content = Content;

export default Tabs;