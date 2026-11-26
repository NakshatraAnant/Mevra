import fs from 'node:fs'; import path from 'node:path'; import { fileURLToPath } from 'node:url'; import { randomBytes } from 'node:crypto';
export const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const f = path.join(ROOT, '.env.local');
// First run: create a private local env file. Never committed (.gitignore).
if (!fs.existsSync(f)) {
  fs.writeFileSync(f, `# Local development only. Generated on first run. Do not commit.\nDATABASE_URL=postgres://mevra:mevra_local@127.0.0.1:5434/mevra\nEMBEDDED_POSTGRES=1\nPORT=3100\nNEXT_PUBLIC_SITE_URL=http://localhost:3100\nADMIN_EMAIL=owner@mevra.local\nADMIN_PASSWORD=${randomBytes(9).toString('base64url')}\n`);
}
for (const line of fs.readFileSync(f, 'utf8').split(/\r?\n/)) { const m = line.match(/^([A-Z_0-9]+)=(.*)$/); if (m && process.env[m[1]] === undefined) process.env[m[1]] = m[2]; }
export const env = process.env;
