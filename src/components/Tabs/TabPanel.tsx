import React, { useState } from 'react';

interface TabPanelProps {
  tabs: { label: string; content: React.ReactNode }[];
}

const TabPanel: React.FC<TabPanelProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="tab-panel">
      <div className="tab-header">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={activeTab === index ? 'active' : ''}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className="tab-content">
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default TabPanel;