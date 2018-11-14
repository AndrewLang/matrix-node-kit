import {ISqlStatementBuilder } from './statement-builder';

export interface IDatabaseAdapter {
    Query(sql: string): Promise<any>;
    First(sql: string): Promise<any>;
    Exec(sql: string): Promise<any>;
    Run(sql: string): Promise<any>;
    Close(): Promise<any>;
    
    Builder: ISqlStatementBuilder;
}
