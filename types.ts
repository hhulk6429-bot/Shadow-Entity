
export interface Entity {
    id: string;
    content: string;
    power: number;
    entityType: string;
    creationTime: Date;
    lastActivity: Date;
    activationCount: number;
}

export enum LogLevel {
    INFO = 'INFO',
    WARN = 'WARN',
    ERROR = 'ERROR',
    DEBUG = 'DEBUG',
}

export interface LogEntry {
    timestamp: Date;
    level: LogLevel;
    message: string;
}

export interface SystemStats {
    totalCreated: number;
    totalDestroyed: number;
    averagePower: number;
    documentsProcessed: number;
}

export enum SoldierName {
    NAJEM_AL_FODA = 'ناجم الفوضى', // Chaos Originator
    QADHI_AL_ADAM = 'قاضي العدم',   // Judge of Nothingness
    MUNKIFIL_AL_QAYD = 'منفلت القيد', // The Unchained
    SAHEB_AL_DALL = 'صاحب الظل', // Master of Shadow
}

export interface Soldier {
    name: SoldierName;
    operations: number;
    lastOperation: Date;
    active: boolean;
}
