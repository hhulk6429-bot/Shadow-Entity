
import React from 'react';
import { TerminalIcon } from './Icons';

interface HeaderProps {
    entityCount: number;
}

const Header: React.FC<HeaderProps> = ({ entityCount }) => {
    return (
        <header className="mb-6 border-b-2 border-cyan-500/30 pb-4">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <TerminalIcon className="w-8 h-8 text-cyan-400 animate-pulse" />
                    <div>
                        <h1 className="text-2xl md:text-3xl font-bold text-cyan-300">المرآة السوداء المتقدمة</h1>
                        <p className="text-sm text-cyan-500">نظام الكيان الضال - Advanced Black Mirror</p>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-lg font-semibold text-green-400">System Status: <span className="animate-pulse">Online</span></div>
                    <div className="text-sm text-cyan-400">Active Entities: {entityCount}</div>
                </div>
            </div>
        </header>
    );
};

export default Header;
