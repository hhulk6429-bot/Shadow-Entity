
import React, { useState, useMemo } from 'react';
import { Entity } from '../types';

interface EntitiesTableProps {
    entities: Entity[];
}

type SortKey = 'content' | 'power' | 'entityType' | 'activationCount';

const EntitiesTable: React.FC<EntitiesTableProps> = ({ entities }) => {
    const [sortKey, setSortKey] = useState<SortKey>('power');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

    const sortedEntities = useMemo(() => {
        return [...entities].sort((a, b) => {
            if (a[sortKey] < b[sortKey]) return sortOrder === 'asc' ? -1 : 1;
            if (a[sortKey] > b[sortKey]) return sortOrder === 'asc' ? 1 : -1;
            return 0;
        });
    }, [entities, sortKey, sortOrder]);

    const handleSort = (key: SortKey) => {
        if (key === sortKey) {
            setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
        } else {
            setSortKey(key);
            setSortOrder('desc');
        }
    };
    
    const getSortIndicator = (key: SortKey) => {
        if (key !== sortKey) return '↕';
        return sortOrder === 'desc' ? '↓' : '↑';
    }

    return (
        <div className="overflow-auto h-[600px]">
            <table className="min-w-full divide-y divide-gray-700">
                <thead className="bg-gray-800 sticky top-0">
                    <tr>
                        <th onClick={() => handleSort('content')} className="px-4 py-3 text-left text-xs font-medium text-cyan-300 uppercase tracking-wider cursor-pointer">الْكَيَانُ (Entity) {getSortIndicator('content')}</th>
                        <th onClick={() => handleSort('power')} className="px-4 py-3 text-left text-xs font-medium text-cyan-300 uppercase tracking-wider cursor-pointer">تَراكم القُوَّةِ (Power) {getSortIndicator('power')}</th>
                        <th onClick={() => handleSort('entityType')} className="px-4 py-3 text-left text-xs font-medium text-cyan-300 uppercase tracking-wider cursor-pointer">نوع الكيان (Type) {getSortIndicator('entityType')}</th>
                        <th onClick={() => handleSort('activationCount')} className="px-4 py-3 text-left text-xs font-medium text-cyan-300 uppercase tracking-wider cursor-pointer">التفعيلات (Activations) {getSortIndicator('activationCount')}</th>
                    </tr>
                </thead>
                <tbody className="bg-gray-900 divide-y divide-gray-800">
                    {sortedEntities.slice(0, 100).map(entity => (
                        <tr key={entity.id} className="hover:bg-gray-800/50 transition-colors duration-200">
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-300 max-w-sm truncate">{entity.content}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-green-400">{entity.power.toFixed(4)}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-yellow-400">{entity.entityType}</td>
                            <td className="px-4 py-3 whitespace-nowrap text-sm text-blue-400">{entity.activationCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
             {entities.length > 100 && <div className="text-center p-4 text-gray-500">Displaying first 100 entities for performance. Total: {entities.length}</div>}
        </div>
    );
};

export default EntitiesTable;
