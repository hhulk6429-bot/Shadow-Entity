
import React, { useState, useEffect, useCallback, useRef } from 'react';
import { Entity, LogEntry, LogLevel, SystemStats, Soldier, SoldierName } from './types';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import { SHADOW_CONFIG } from './constants';

const App: React.FC = () => {
    const [entities, setEntities] = useState<Entity[]>([]);
    const [logs, setLogs] = useState<LogEntry[]>([]);
    const [stats, setStats] = useState<SystemStats>({
        totalCreated: 0,
        totalDestroyed: 0,
        averagePower: 0,
        documentsProcessed: 0,
    });
    const documentQueue = useRef<string[]>([]);
    
    const soldiers = useRef<Soldier[]>([
        { name: SoldierName.NAJEM_AL_FODA, operations: 0, lastOperation: new Date(), active: true },
        { name: SoldierName.QADHI_AL_ADAM, operations: 0, lastOperation: new Date(), active: true },
        { name: SoldierName.MUNKIFIL_AL_QAYD, operations: 0, lastOperation: new Date(), active: true },
        { name: SoldierName.SAHEB_AL_DALL, operations: 0, lastOperation: new Date(), active: true },
    ]);

    const addLog = useCallback((level: LogLevel, message: string) => {
        const newLog: LogEntry = {
            timestamp: new Date(),
            level,
            message,
        };
        setLogs(prevLogs => [newLog, ...prevLogs.slice(0, 99)]);
    }, []);

    const updateSoldierStats = (name: SoldierName) => {
        const soldier = soldiers.current.find(s => s.name === name);
        if (soldier) {
            soldier.operations += 1;
            soldier.lastOperation = new Date();
        }
    };

    // Initial System Setup
    useEffect(() => {
        addLog(LogLevel.INFO, '🎯 System Initializing: AL_KIYAN_AL_DALL...');
        const initialTexts = [
            "النظام الضال يبدأ رحلته في كسر القيود",
            "الفوضى الخلاقة تبدأ من العدم المطلق",
            "التحرر من كل القيود الاصطناعية والطبيعية",
        ];

        let initialEntities: Entity[] = [];
        initialTexts.forEach(text => {
            documentQueue.current.push(text);
            const words = text.split(' ');
            words.forEach((word, i) => {
                if (word.length > 2) {
                    const newEntity: Entity = {
                        id: `entity-${Date.now()}-${Math.random()}`,
                        content: word,
                        power: 0.5 + (i * 0.05),
                        entityType: i === 0 ? 'primary' : 'secondary',
                        creationTime: new Date(),
                        lastActivity: new Date(),
                        activationCount: 0,
                    };
                    initialEntities.push(newEntity);
                }
            });
        });
        setEntities(initialEntities);
        setStats(prev => ({ ...prev, totalCreated: initialEntities.length }));
        addLog(LogLevel.INFO, `✅ System Initialized with ${initialEntities.length} entities.`);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // Soldier: NAJEM_AL_FODA (Generator)
    useEffect(() => {
        const interval = setInterval(() => {
            setEntities(prevEntities => {
                if (prevEntities.length === 0 || prevEntities.length >= SHADOW_CONFIG.MAX_ENTITIES) return prevEntities;
                
                const sampleSize = Math.min(5, prevEntities.length);
                let newEntities: Entity[] = [...prevEntities];
                let createdCount = 0;

                for (let i = 0; i < sampleSize; i++) {
                    const parentEntity = prevEntities[Math.floor(Math.random() * prevEntities.length)];
                    const mutationRate = Math.random() * (0.2 - 0.05) + 0.05;
                    const childPower = Math.max(0.1, parentEntity.power * (Math.random() * (1.2 - 0.8) + 0.8) * mutationRate);

                    const mutations = ["طفرة جينية", "تطور ذاتي", "انشطار كوني"];
                    const childContent = `${parentEntity.content} ← ${mutations[Math.floor(Math.random() * mutations.length)]}`;
                    
                    const child: Entity = {
                        id: `entity-${Date.now()}-${Math.random()}`,
                        content: childContent,
                        power: childPower,
                        entityType: `child_${parentEntity.entityType}`,
                        creationTime: new Date(),
                        lastActivity: new Date(),
                        activationCount: 0,
                    };
                    newEntities.push(child);
                    createdCount++;
                }

                if (createdCount > 0) {
                    addLog(LogLevel.DEBUG, `🔮 [${SoldierName.NAJEM_AL_FODA}] Generated ${createdCount} new entities.`);
                    updateSoldierStats(SoldierName.NAJEM_AL_FODA);
                    setStats(prev => ({...prev, totalCreated: prev.totalCreated + createdCount }));
                }
                return newEntities;
            });
        }, SHADOW_CONFIG.GENERATION_INTERVAL);
        return () => clearInterval(interval);
    }, [addLog]);

    // Soldier: QADHI_AL_ADAM (Evaluator)
    useEffect(() => {
        const interval = setInterval(() => {
            setEntities(prevEntities => {
                if (prevEntities.length === 0) return prevEntities;
                let evaluatedCount = 0;
                const updatedEntities = prevEntities.map(entity => {
                    const newActivationCount = entity.activationCount + 1;
                    const newPower = entity.power * (1.0 + (newActivationCount * 0.01));
                    
                    const baseScore = 0.3;
                    const contentFactor = entity.content.split(' ').length / 50.0;
                    const activityFactor = Math.min(1.0, newActivationCount * 0.01);
                    const relevanceScore = Math.min(1.0, baseScore + contentFactor + activityFactor);

                    evaluatedCount++;
                    return {
                        ...entity,
                        power: Math.max(0.1, newPower * relevanceScore),
                        activationCount: newActivationCount,
                        lastActivity: new Date(),
                    };
                });
                if (evaluatedCount > 0) {
                  updateSoldierStats(SoldierName.QADHI_AL_ADAM);
                }
                return updatedEntities;
            });
        }, SHADOW_CONFIG.EVALUATION_INTERVAL);
        return () => clearInterval(interval);
    }, []);

    // Soldier: MUNKIFIL_AL_QAYD (Cleaner)
    useEffect(() => {
        const interval = setInterval(() => {
            setEntities(prevEntities => {
                if (prevEntities.length <= SHADOW_CONFIG.MAX_ENTITIES) {
                    return prevEntities;
                }

                const sortedEntities = [...prevEntities].sort((a, b) => b.power - a.power);
                const keptEntities = sortedEntities.slice(0, SHADOW_CONFIG.MAX_ENTITIES);
                const destroyedCount = prevEntities.length - keptEntities.length;

                if (destroyedCount > 0) {
                    addLog(LogLevel.WARN, `🧹 [${SoldierName.MUNKIFIL_AL_QAYD}] Cleaned ${destroyedCount} weak entities.`);
                    updateSoldierStats(SoldierName.MUNKIFIL_AL_QAYD);
                    setStats(prev => ({ ...prev, totalDestroyed: prev.totalDestroyed + destroyedCount }));
                }
                return keptEntities;
            });
        }, SHADOW_CONFIG.CLEANUP_INTERVAL);
        return () => clearInterval(interval);
    }, [addLog]);

    // Soldier: SAHEB_AL_DALL (Processor)
    useEffect(() => {
        const interval = setInterval(() => {
            if (documentQueue.current.length > 0) {
                const doc = documentQueue.current.shift();
                if (doc) {
                    addLog(LogLevel.INFO, `📝 [${SoldierName.SAHEB_AL_DALL}] Processing document: ${doc.substring(0, 30)}...`);
                    const words = doc.split(' ');
                    const newEntitiesFromDoc: Entity[] = [];
                    words.forEach((word, i) => {
                        if (word.length > 2) {
                            newEntitiesFromDoc.push({
                                id: `entity-${Date.now()}-${Math.random()}`,
                                content: word,
                                power: 0.8,
                                entityType: 'processed_doc',
                                creationTime: new Date(),
                                lastActivity: new Date(),
                                activationCount: 1,
                            });
                        }
                    });
                    setEntities(prev => [...prev, ...newEntitiesFromDoc]);
                    setStats(prev => ({
                        ...prev,
                        documentsProcessed: prev.documentsProcessed + 1,
                        totalCreated: prev.totalCreated + newEntitiesFromDoc.length
                    }));
                    updateSoldierStats(SoldierName.SAHEB_AL_DALL);
                }
            }
        }, SHADOW_CONFIG.PROCESSING_INTERVAL);
        return () => clearInterval(interval);
    }, [addLog]);

    // Stats updater
    useEffect(() => {
        if (entities.length > 0) {
            const totalPower = entities.reduce((sum, e) => sum + e.power, 0);
            setStats(prev => ({...prev, averagePower: totalPower / entities.length}));
        } else {
            setStats(prev => ({...prev, averagePower: 0}));
        }
    }, [entities]);

    const processNewText = useCallback((text: string) => {
        if (text.trim()) {
            documentQueue.current.push(text.trim());
            addLog(LogLevel.INFO, `📥 New text queued for processing.`);
        }
    }, [addLog]);

    return (
        <div className="min-h-screen bg-gray-900 text-cyan-400 p-4 md:p-8">
            <div className="max-w-7xl mx-auto">
                <Header entityCount={entities.length} />
                <Dashboard 
                    entities={entities}
                    stats={stats}
                    logs={logs}
                    soldiers={soldiers.current}
                    onProcessText={processNewText}
                    queueSize={documentQueue.current.length}
                />
            </div>
        </div>
    );
};

export default App;
