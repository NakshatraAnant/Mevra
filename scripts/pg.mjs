import fs from 'node:fs'; import path from 'node:path'; import net from 'node:net'; import { spawnSync, spawn } from 'node:child_process'; import { ROOT, env } from './env.mjs';
const pkg = `${process.platform === 'win32' ? 'windows' : process.platform}-${process.arch}`;
const bin = n => path.join(ROOT, 'node_modules/@embedded-postgres', pkg, 'native/bin', n + (process.platform === 'win32' ? '.exe' : ''));
const open = p => new Promise(r => { const s = net.connect(p, '127.0.0.1'); s.on('connect', () => { s.destroy(); r(true); }); s.on('error', () => r(false)); });
const sleep = ms => new Promise(r => setTimeout(r, ms));
/** Starts the bundled local PostgreSQL through pg_ctl (own log file, survives a crashed parent) unless it already runs or DATABASE_URL is external. */
export async function ensureDb() {
  if (env.EMBEDDED_POSTGRES !== '1') return async () => { };
  const u = new URL(env.DATABASE_URL), port = +u.port, dir = path.join(ROOT, '.pgdata'); if (await open(port)) return async () => { };
  const { default: postgres } = await import('postgres');
  if (!fs.existsSync(path.join(dir, 'PG_VERSION'))) {
    const pw = path.join(ROOT, '.pgpw'); fs.writeFileSync(pw, u.password + '\n');
    const r = spawnSync(bin('initdb'), [`--pgdata=${dir}`, `--username=${u.username}`, `--pwfile=${pw}`, '--auth=password', '--encoding=UTF8', '--locale=C'], { encoding: 'utf8' }); fs.rmSync(pw); if (r.status !== 0) throw new Error('initdb failed: ' + r.stderr);
  }
  // detached with ignored stdio, so the server never blocks on a dead parent's pipe
  spawn(bin('pg_ctl'), ['start', '-D', dir, '-l', path.join(dir, 'server.log'), '-o', `-p ${port} -c listen_addresses=127.0.0.1`], { detached: true, stdio: 'ignore', windowsHide: true }).unref();
  for (let i = 0; i < 120 && !(await open(port)); i++) await sleep(250);
  const admin = postgres(env.DATABASE_URL.replace(/\/[^/]*$/, '/postgres'), { max: 1, onnotice: () => { } });
  for (let i = 0; ; i++) { try { if (!(await admin`SELECT 1 FROM pg_database WHERE datname = ${u.pathname.slice(1)}`).length) await admin.unsafe(`CREATE DATABASE ${u.pathname.slice(1)}`); break; } catch (e) { if (i > 20) throw e; await sleep(500); } }
  await admin.end();
  return async () => { spawnSync(bin('pg_ctl'), ['stop', '-D', dir, '-m', 'fast', '-w', '-t', '15'], { stdio: 'ignore', windowsHide: true }); };
}
