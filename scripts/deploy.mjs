import { readFile } from 'node:fs/promises';

const {
  SCREEPS_TOKEN,
  SCREEPS_BRANCH = 'default',
  SCREEPS_SERVER = 'https://screeps.com',
} = process.env;

if (!SCREEPS_TOKEN) {
  console.error('SCREEPS_TOKEN is not set. Copy .env.example to .env and fill it in.');
  process.exit(1);
}

const main = await readFile('dist/main.js', 'utf8');

const res = await fetch(`${SCREEPS_SERVER}/api/user/code`, {
  method: 'POST',
  headers: { 'Content-Type': 'application/json; charset=utf-8', 'X-Token': SCREEPS_TOKEN },
  body: JSON.stringify({ branch: SCREEPS_BRANCH, modules: { main } }),
});

const body = await res.text();
// The API can report errors with a 200 status, so also require `ok: 1` in the body.
let ok = false;
try {
  ok = JSON.parse(body).ok === 1;
} catch {
  // Non-JSON body counts as a failure.
}
if (!res.ok || !ok) {
  console.error(`Upload failed (${String(res.status)}): ${body}`);
  process.exit(1);
}
console.log(`Uploaded dist/main.js to branch "${SCREEPS_BRANCH}" on ${SCREEPS_SERVER}`);
