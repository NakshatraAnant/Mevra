import 'server-only';
import postgres from 'postgres';

const make = (schema: string) => postgres(process.env.DATABASE_URL!, { max: 8, idle_timeout: 60, onnotice: () => {}, connection: { search_path: schema, timezone: 'Asia/Kolkata' } });
type Sql = ReturnType<typeof make>;
const g = globalThis as unknown as { __mv?: { live?: Sql; demo?: Sql } };
g.__mv ||= {};
/** Live business data. The only connection the storefront ever uses. */
export const live = (): Sql => (g.__mv!.live ||= make('public'));
/** Isolated demonstration dataset (separate schema, clearly labelled wherever it appears). */
export const demo = (): Sql => (g.__mv!.demo ||= make('demo'));
export type DB = Sql;
export type Tx = postgres.TransactionSql;
export type AnySql = Sql | Tx;
