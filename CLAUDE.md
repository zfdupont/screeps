# screeps

## Overview

A Screeps bot. Code in `src/` is bundled into a single `dist/main.js` and uploaded to the game, which calls the exported `loop()` once per tick.

## Tech Stack

- Language: TypeScript (strict), types from `@types/screeps`
- Bundler: esbuild (CommonJS output, ES2018 target)
- Tests: Vitest, with engine globals stubbed in `test/setup.ts`
- Lint/format: ESLint (typescript-eslint strict) + Prettier, run by a Husky pre-commit hook
- Database: none (game state lives in the in-game `Memory` object)

## Commands

- `npm run build` - Bundle to `dist/main.js`
- `npm run watch` - Rebuild on change
- `npm run deploy` - Build and upload via the Screeps API (reads `.env`)
- `npm test` - Run tests
- `npm run typecheck` - Type-check
- `npm run lint` - Check code style

## Architecture

- `src/main.ts` - Entry point: `loop()` runs memory cleanup, spawning, then each creep's role
- `src/managers/spawn.ts` - Role population targets and spawn logic
- `src/roles/` - One file per role; `index.ts` maps role names to run functions; `common.ts` holds shared behaviours
- `src/utils/` - Body building and memory helpers
- `src/types.d.ts` - Global `Memory`/`CreepMemory` extensions
- `scripts/deploy.mjs` - Uploads the bundle with `POST /api/user/code`

Game globals (`Game`, `Memory`, constants like `WORK`) exist only at runtime in the engine; tests must stub any they touch.

## Environment Variables

- `SCREEPS_TOKEN`
- `SCREEPS_BRANCH`
- `SCREEPS_SERVER`
