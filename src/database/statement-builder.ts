
export interface ISqlStatementBuilder {
    SelectAll(table: string): string;
    SelectById(table: string, id: string | number): string;
    SelectColumnsWhere(table: string, columns: string, conditions: string, order?: string, group?: string): string;
    SelectWhere(table: string, conditions: string, order?: string, group?: string): string;
    SelectPage(table: string, conditions: string, order: string, page: number, pageSize: number): string;
    DeleteWhere(table: string, conditions: string): string;
    DeleteById(table: string, id: string | number): string
    UpdateWhere(table: string, valuesUpdate: string, conditions: string): string;
    UpdateById(table: string, valuesUpdate: string, id: string | number): string;
    Insert(table: string, columns: string, values: string): string;
}