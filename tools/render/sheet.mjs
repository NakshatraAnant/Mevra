import sharp from 'sharp'; import fs from 'node:fs'; import path from 'node:path';
const [,, dir, out, re='.', size='380', cols='4'] = process.argv; const W=+size,C=+cols; const fs_=[]; (function w(d){for(const e of fs.readdirSync(d,{withFileTypes:true})){const p=path.join(d,e.name);e.isDirectory()?w(p):/webp$/.test(p)&&new RegExp(re).test(p)&&fs_.push(p)}})(dir);
const t=await Promise.all(fs_.map(f=>sharp(f).resize(W,W,{fit:'contain',background:'#222'}).toBuffer()));
await sharp({create:{width:W*C,height:W*Math.ceil(t.length/C),channels:3,background:'#222'}}).composite(t.map((b,i)=>({input:b,left:(i%C)*W,top:Math.floor(i/C)*W}))).jpeg({quality:82}).toFile(out); console.log(fs_.map(f=>path.basename(f)).join('\n'));
