import React from 'react';
interface TabPanelProps {
    tabs: {
        label: string;
        content: React.ReactNode;
    }[];
}
declare const TabPanel: React.FC<TabPanelProps>;
export default TabPanel;
