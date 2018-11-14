
import { IDatabaseAdapter } from './database-adapter';
import { ISqlStatementBuilder } from './statement-builder';
import { SqliteStatementBuilder } from './sqlite-statement-builder';
import * as sqlite from 'sqlite';
import { Logger } from '../logging/logger';

export class SqliteAdapter implements IDatabaseAdapter {
    private db: sqlite.Database;
    private logger: Logger;

    Builder: ISqlStatementBuilder = new SqliteStatementBuilder();

    constructor(private filePath: string) {
        this.logger = new Logger('Sqlite Adapter:');
    }
    async Query(sql: string) {
        let items: any[];
        try {
            this.logger.Debug(`Query sql: ${sql}`);
            await this.Initialize();
            items = await this.db.all(sql);
        } catch (err) {
            this.logger.Error(`Query error: ${sql}`).Error(err);
        } finally {
            await this.Close();
        }
        return items;
    }
    async Exec(sql: string) {
        // this.logger.Debug(`Execute sql:  ${sql}`);
        let result: any;
        try {
            await this.Initialize();
            result = await this.db.exec(sql);
        } catch (err) {
            this.logger.Error(`Exec error: ${sql}`).Error(err);
        } finally {
            await this.Close();
        }
        return result;
    }
    async First(sql: string) {
        let result: any;
        try {
            this.logger.Debug(`Find first: ${sql}`);
            await this.Initialize();
            result = await this.db.get(sql);
        } catch (err) {
            this.logger.Error(`First error: ${sql}`).Error(err);
        } finally {
            await this.Close();
        }
        return result;
    }
    async Run(sql: string) {
        let result: any;
        try {
            this.logger.Debug(`Run sql: ${sql}`);
            await this.Initialize();
            result = await this.db.run(sql);
        } catch (err) {
            this.logger.Error(`Run error: ${sql}`).Error(err);
        } finally {
            await this.Close();
        }
        return result;
    }

    private async Initialize() {
        if (!this.db) {
            try {
                this.logger.Debug(`Initialize database from file: ${this.filePath}`);
                this.db = await sqlite.open(this.filePath);
            } catch (error) {
                this.logger.Debug('Open database error');
                this.logger.Debug(error);
            }
        }
    }

    async Close() {
        if (this.db) {
            await this.db.close();
            this.db = null;
            this.logger.Warn(`Database closed. ${this.filePath}`);
        }
    }
}