// TODO: Define all Supabase schema definitions without business logic
export interface TableSchema {
  name: string;
  columns: Record<string, string>;
}

export const schemas: TableSchema[] = [];

export const registerSchema = (schema: TableSchema): void => {
  schemas.push(schema);
};
