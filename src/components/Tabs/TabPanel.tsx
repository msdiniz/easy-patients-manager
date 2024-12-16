import React, { useState } from 'react';
import styles from './TabPanel.module.css'; // Import the CSS module

interface TabPanelProps {
  tabs: { label: string; content: React.ReactNode }[];
}

const TabPanel: React.FC<TabPanelProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className={styles.tabPanel}>
      <div className={styles.tabHeader}>
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={activeTab === index ? styles.tabButtonActive : styles.tabButton}
            onClick={() => setActiveTab(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <div className={styles.tabContent}>
        {tabs[activeTab].content}
      </div>
    </div>
  );
};

export default TabPanel;
