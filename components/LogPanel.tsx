
import React from 'react';
import { LogEntry, LogLevel } from '../types';

interface LogPanelProps {
    logs: LogEntry[];
}

const getLogLevelClass = (level: LogLevel) => {
    switch (level) {
        case LogLevel.INFO:
            return 'text-blue-400';
        case LogLevel.WARN:
            return 'text-yellow-400';
        case LogLevel.ERROR:
            return 'text-red-500';
        case LogLevel.DEBUG:
            return 'text-purple-400';
        default:
            return 'text-gray-400';
    }
};

const LogPanel: React.FC<LogPanelProps> = ({ logs }) => {
    return (
        <div className="bg-gray-900 p-4 rounded-lg h-[600px] overflow-y-auto border border-gray-800 flex flex-col-reverse">
            <div className="space-y-2">
                {logs.map((log, index) => (
                    <div key={index} className="flex items-start text-xs">
                        <span className="text-gray-500 mr-2">{log.timestamp.toLocaleTimeString()}</span>
                        <span className={`font-bold mr-2 ${getLogLevelClass(log.level)}`}>[{log.level}]</span>
                        <p className="flex-1 text-gray-300 break-words">{log.message}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LogPanel;
