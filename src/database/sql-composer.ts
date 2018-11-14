import { StringBuilder } from '../string/index';

export class SqlComposer {
    private builder = new StringBuilder();

    Select(table: string, columns: string = '*'): SqlComposer {
        this.AppendStatement(`SELECT ${columns} FROM ${table}`)
        return this;
    }
    Delete(table: string): SqlComposer {
        this.AppendStatement(`DELETE FROM ${table} `);
        return this;
    }
    Update(table: string, values: string): SqlComposer {
        this.AppendStatement(`UPDATE ${table} SET ${values}`);
        return this;
    }
    Insert(table: string, columns: string, values: string): SqlComposer {
        this.AppendStatement(`INSERT INTO ${table} (${columns}) VALUES (${values})`);
        return this;
    }

    Where(value: string): SqlComposer {
        if (value) {
            this.AppendStatement(` WHERE ${value} `);
        }
        return this;
    }
    OrderBy(value: string): SqlComposer {
        if (value) {
            this.AppendStatement(` ORDER BY ${value} `);
        }
        return this;
    }
    GroupBy(value: string): SqlComposer {
        if (value) {
            this.AppendStatement(` GROUP BY ${value} `);
        }
        return this;
    }
    Append(value: string): SqlComposer {
        if (value) {
            this.AppendStatement(` ${value} `);
        }
        return this;
    }
    End(): string {
        this.AppendStatement(';');
        return this.builder.ToString();
    }

    private AppendStatement(value: string) {
        this.builder.Append(`${value} `);
    }
}