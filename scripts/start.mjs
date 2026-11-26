import { spawn } from 'node:child_process'; import path from 'node:path'; import fs from 'node:fs'; import { ROOT, env } from './env.mjs'; import { ensureDb } from './pg.mjs'; import { migrate } from './migrate.mjs'; import { seed } from './seed.mjs';
const mode = process.argv[2] || 'dev'; const stop = await ensureDb(); await migrate(); await seed();
if (mode === 'start' && !fs.existsSync(path.join(ROOT, '.next/BUILD_ID'))) { console.error('No production build found. Run: npm run build'); await stop(); process.exit(1); }
const port = env.PORT || '3100'; console.log(`\n  MEVRA  http://localhost:${port}   admin: http://localhost:${port}/admin  (credentials in .env.local)\n`);
const child = spawn(process.execPath, [path.join(ROOT, 'node_modules/next/dist/bin/next'), mode, '-p', port], { cwd: ROOT, stdio: 'inherit', env });
let down = false; const bye = async (c = 0) => { if (down) return; down = true; child.kill(); await stop().catch(() => { }); process.exit(c); };
child.on('exit', c => bye(c ?? 0)); process.on('SIGINT', () => bye()); process.on('SIGTERM', () => bye());
