
import React from 'react';
import { SystemStats, Soldier } from '../types';
import { BarChartIcon, CpuIcon, DatabaseIcon, ZapIcon } from './Icons';

interface StatsPanelProps {
    stats: SystemStats;
    soldiers: Soldier[];
    activeEntities: number;
    queueSize: number;
}

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode; color: string }> = ({ title, value, icon, color }) => (
    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 flex items-center space-x-4">
        <div className={`p-3 rounded-full ${color}`}>
            {icon}
        </div>
        <div>
            <p className="text-sm text-gray-400">{title}</p>
            <p className="text-2xl font-bold text-white">{value}</p>
        </div>
    </div>
);

const StatsPanel: React.FC<StatsPanelProps> = ({ stats, soldiers, activeEntities, queueSize }) => {
    return (
        <div className="space-y-6">
            <div>
                <h2 className="text-xl font-bold text-cyan-300 mb-4">⚙️ إحصائيات النظام (System Information)</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    <StatCard title="الكيانات النشطة" value={activeEntities} icon={<BarChartIcon className="w-6 h-6"/>} color="bg-blue-500/20 text-blue-300" />
                    <StatCard title="متوسط القوة" value={stats.averagePower.toFixed(4)} icon={<ZapIcon className="w-6 h-6"/>} color="bg-green-500/20 text-green-300" />
                    <StatCard title="الوثائق المعالجة" value={stats.documentsProcessed} icon={<DatabaseIcon className="w-6 h-6"/>} color="bg-yellow-500/20 text-yellow-300" />
                    <StatCard title="قائمة الانتظار" value={queueSize} icon={<CpuIcon className="w-6 h-6"/>} color="bg-purple-500/20 text-purple-300" />
                </div>
            </div>
            
            <div>
                <h2 className="text-xl font-bold text-cyan-300 mb-4">🔮 إحصائيات الكيانات (Entity Statistics)</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <p className="text-lg text-green-400">إجمالي المنشأة</p>
                        <p className="text-3xl font-bold">{stats.totalCreated}</p>
                    </div>
                    <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <p className="text-lg text-red-400">إجمالي المدمرة</p>
                        <p className="text-3xl font-bold">{stats.totalDestroyed}</p>
                    </div>
                     <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                        <p className="text-lg text-blue-400">صافي الكيانات</p>
                        <p className="text-3xl font-bold">{stats.totalCreated - stats.totalDestroyed}</p>
                    </div>
                </div>
            </div>

            <div>
                <h2 className="text-xl font-bold text-cyan-300 mb-4">🎯 أداء الجنود (Soldier Performance)</h2>
                <div className="bg-gray-800/50 p-4 rounded-lg border border-gray-700">
                    <ul className="space-y-3">
                        {soldiers.map(soldier => (
                            <li key={soldier.name} className="flex justify-between items-center text-sm">
                                <span className="font-semibold">{soldier.name}</span>
                                <div className="flex items-center space-x-4">
                                    <span>{soldier.operations} عملية</span>
                                    <span className={soldier.active ? "text-green-400" : "text-red-400"}>
                                        {soldier.active ? "🟢 نشط" : "🔴 متوقف"}
                                    </span>
                                </div>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default StatsPanel;
