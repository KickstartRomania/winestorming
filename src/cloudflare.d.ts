declare module "cloudflare:workers" {
  interface D1Result {
    success: boolean;
    meta: { last_row_id?: number | null; [key: string]: unknown };
  }

  interface D1PreparedStatement {
    bind(...values: unknown[]): D1PreparedStatement;
    run(): Promise<D1Result>;
  }

  interface D1Database {
    prepare(query: string): D1PreparedStatement;
  }

  export const env: {
    DB?: D1Database;
    [key: string]: unknown;
  };
}
