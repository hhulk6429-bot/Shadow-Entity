
import React, { useState } from 'react';
import { Entity, SystemStats, LogEntry, Soldier } from '../types';
import EntitiesTable from './EntitiesTable';
import StatsPanel from './StatsPanel';
import LogPanel from './LogPanel';
import ControlPanel from './ControlPanel';

interface DashboardProps {
    entities: Entity[];
    stats: SystemStats;
    logs: LogEntry[];
    soldiers: Soldier[];
    onProcessText: (text: string) => void;
    queueSize: number;
}

type Tab = 'entities' | 'stats' | 'logs' | 'control';

const Dashboard: React.FC<DashboardProps> = ({ entities, stats, logs, soldiers, onProcessText, queueSize }) => {
    const [activeTab, setActiveTab] = useState<Tab>('entities');

    const renderTabContent = () => {
        switch (activeTab) {
            case 'entities':
                return <EntitiesTable entities={entities} />;
            case 'stats':
                return <StatsPanel stats={stats} soldiers={soldiers} activeEntities={entities.length} queueSize={queueSize} />;
            case 'logs':
                return <LogPanel logs={logs} />;
            case 'control':
                return <ControlPanel onProcessText={onProcessText} />;
            default:
                return null;
        }
    };

    const getTabClass = (tabName: Tab) => {
        return `px-4 py-2 text-sm font-medium transition-all duration-300 border-b-2
            ${activeTab === tabName 
                ? 'text-cyan-300 border-cyan-400 bg-gray-800/50' 
                : 'text-gray-400 border-transparent hover:bg-gray-800/30 hover:text-cyan-400'
            }`;
    };

    return (
        <div className="bg-gray-900/50 border border-gray-700 rounded-lg shadow-2xl shadow-cyan-500/5 backdrop-blur-sm">
            <div className="flex border-b border-gray-700">
                <button onClick={() => setActiveTab('entities')} className={getTabClass('entities')}>الكيانات النشطة (Active Entities)</button>
                <button onClick={() => setActiveTab('stats')} className={getTabClass('stats')}>إحصائيات النظام (System Stats)</button>
                <button onClick={() => setActiveTab('logs')} className={getTabClass('logs')}>سجل الأنشطة (Activity Log)</button>
                <button onClick={() => setActiveTab('control')} className={getTabClass('control')}>التحكم بالنظام (Control Panel)</button>
            </div>
            <div className="p-4 min-h-[600px]">
                {renderTabContent()}
            </div>
        </div>
    );
};

export default Dashboard;
