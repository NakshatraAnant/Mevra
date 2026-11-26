import postgres from 'postgres'; import fs from 'node:fs'; import path from 'node:path'; import { pathToFileURL } from 'node:url'; import { ROOT, env } from './env.mjs'; import { ensureDb } from './pg.mjs';
const dir = path.join(ROOT, 'db/migrations');
const each = async fn => { for (const schema of ['public', 'demo']) { const sql = postgres(env.DATABASE_URL, { max: 1, onnotice: () => { }, connection: { search_path: schema } }); try { await fn(sql, schema); } finally { await sql.end(); } } };
export async function migrate() {
  await each(async (sql, schema) => {
    await sql.unsafe(`CREATE SCHEMA IF NOT EXISTS ${schema}`); await sql.unsafe('CREATE TABLE IF NOT EXISTS schema_migrations (name text PRIMARY KEY, at timestamptz DEFAULT now())');
    const done = new Set((await sql`SELECT name FROM schema_migrations`).map(r => r.name));
    for (const f of fs.readdirSync(dir).filter(x => x.endsWith('.sql')).sort()) if (!done.has(f)) { await sql.begin(async t => { await t.unsafe(fs.readFileSync(path.join(dir, f), 'utf8')); await t`INSERT INTO schema_migrations (name) VALUES (${f})`; }); console.log('migrated', schema, f); }
  });
}
/** node scripts/migrate.mjs down 004_v2.sql — runs the matching file in db/migrations/down. Back up first: npm run db:backup */
export async function down(f) { await each(async (sql, schema) => { await sql.begin(async t => { await t.unsafe(fs.readFileSync(path.join(dir, 'down', f), 'utf8')); await t`DELETE FROM schema_migrations WHERE name = ${f}`; }); console.log('reverted', schema, f); }); }
if (import.meta.url === pathToFileURL(process.argv[1]).href) { const stop = await ensureDb(); if (process.argv[2] === 'down') await down(path.basename(process.argv[3])); else await migrate(); await stop(); process.exit(0); }
