const fs = require('fs');
const path = require('path');
const file = fs.readFileSync(path.join(process.cwd(),'client/lib/translations.ts'),'utf8');
const m = file.match(/const translations:[\s\S]*?=\s*\{([\s\S]*)\};\s*export function getTranslations/);
if (!m) {
  console.error('parse failed');
  process.exit(1);
}
const body = '{' + m[1] + '}';
const obj = eval(body);
const en = obj.en;
const langs = ['ar', 'fr'];
function access(o, p) {
  return p.split('.').reduce((a, k) => (a && a[k] !== undefined ? a[k] : undefined), o);
}
function collect(o, p = '') {
  const keys = [];
  for (const k of Object.keys(o)) {
    const path = p ? `${p}.${k}` : k;
    keys.push(path);
    if (o[k] && typeof o[k] === 'object' && !Array.isArray(o[k])) {
      keys.push(...collect(o[k], path));
    }
  }
  return keys;
}
const keys = collect(en);
const issues = [];
for (const lang of langs) {
  const langObj = obj[lang];
  if (!langObj) {
    issues.push({ lang, path: '<all>', reason: 'missing lang' });
    continue;
  }
  for (const path of keys) {
    const val = access(langObj, path);
    if (val === undefined) {
      issues.push({ path, lang, reason: 'missing' });
    } else if (typeof val === 'string' && val === '') {
      issues.push({ path, lang, reason: 'empty' });
    } else if (typeof val === 'string' && val === access(en, path)) {
      issues.push({ path, lang, reason: 'same', val });
    }
  }
}
console.log(JSON.stringify(issues, null, 2));
