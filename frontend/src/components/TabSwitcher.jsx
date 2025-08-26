import React from 'react';

export const TabSwitcher = ({ tabs, active, onTabChange }) => {
    return (
        <div className="flex space-x-4 border-b overflow-x-auto scrollbar">
            {tabs.map(tab => (
                <button
                    key={tab.key}
                    onClick={() => onTabChange(tab.key)}
                    className={`pb-2 text-sm font-medium ${active === tab.key
                            ? 'border-b-2 border-blue-500 text-blue-600'
                            : 'text-gray-500 hover:text-gray-700'
                        }`}
                >
                    {tab.label}
                </button>
            ))}
        </div>
    );
};