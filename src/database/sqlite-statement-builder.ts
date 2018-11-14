import { SqlComposer } from './sql-composer';
import { ISqlStatementBuilder } from './statement-builder';

export class SqliteStatementBuilder implements ISqlStatementBuilder {
    private QueryById = (id: string | number): string => `Id = ${id}`;

    SelectAll(table: string): string {
        let composer = new SqlComposer();
        return composer.Select(table).End();
    }
    SelectById(table: string, id: string | number): string {
        let composer = new SqlComposer();
        return composer.Select(table)
            .Where(this.QueryById(id))
            .End();
    }
    SelectColumnsWhere(table: string, columns: string, conditions: string, order?: string, group?: string): string {
        let composer = new SqlComposer();
        let sql = composer.Select(table, columns)
            .Where(conditions)
            .OrderBy(order)
            .GroupBy(group)
            .End();

        return sql;
    }
    SelectWhere(table: string, conditions: string, order?: string, group?: string): string {
        let composer = new SqlComposer();
        let sql = composer.Select(table)
            .Where(conditions)
            .OrderBy(order)
            .GroupBy(group)
            .End();

        return sql;
    }
    SelectPage(table: string, conditions: string, order: string, page: number, pageSize: number): string {
        let composer = new SqlComposer();
        let sql = composer.Select(table)
            .Where(conditions)
            .OrderBy(order)
            .Append(`LIMIT ${pageSize} OFFSET ${page}`)
            .End();
        return sql;
    }
    DeleteWhere(table: string, conditions: string): string {
        let composer = new SqlComposer();
        return composer.Delete(table).Where(conditions).End();
    }
    DeleteById(table: string, id: string | number): string {
        let composer = new SqlComposer();
        return composer.Delete(table).Where(this.QueryById(id)).End();
    }
    UpdateWhere(table: string, valuesUpdate: string, conditions: string): string {
        let composer = new SqlComposer();
        return composer.Update(table, valuesUpdate).Where(conditions).End();
    }
    UpdateById(table: string, valuesUpdate: string, id: string | number): string {
        let composer = new SqlComposer();
        return composer.Update(table, valuesUpdate).Where(this.QueryById(id)).End();
    }
    Insert(table: string, columns: string, values: string): string {
        let composer = new SqlComposer();
        return composer.Insert(table, columns, values).End();
    }
}