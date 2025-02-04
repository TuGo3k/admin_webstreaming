import { useState, createContext, useContext } from "react";

// Create a context to share activeTab state
const TabsContext = createContext();

export function Tabs({ defaultValue, children }) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div>{children}</div>
    </TabsContext.Provider>
  );
}

export function TabsList({ children }) {
  return <div className="flex space-x-2 border-b pb-2">{children}</div>;
}

export function TabsTrigger({ value, children }) {
  const { activeTab, setActiveTab } = useContext(TabsContext);

  return (
    <button
      onClick={() => setActiveTab(value)}
      className={`px-4 py-2 ${
        activeTab === value ? "text-black font-bold" : "text-gray-600"
      } hover:text-black`}
    >
      {children}
    </button>
  );
}

export function TabsContent({ value, children }) {
  const { activeTab } = useContext(TabsContext);

  return activeTab === value ? <div>{children}</div> : null;
}
