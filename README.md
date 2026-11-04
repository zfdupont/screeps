# screeps

A TypeScript bot for [Screeps](https://screeps.com), built with esbuild and uploaded through the Screeps HTTP API.

## Setup

```bash
npm install
cp .env.example .env   # then fill in the values
```

## Environment variables

| Variable         | Purpose                                                                        |
| ---------------- | ------------------------------------------------------------------------------ |
| `SCREEPS_TOKEN`  | Auth token from your account settings (Auth Tokens). Needs code upload access. |
| `SCREEPS_BRANCH` | Code branch to upload to. Defaults to `default`.                               |
| `SCREEPS_SERVER` | Server base URL. Defaults to `https://screeps.com`.                            |

## Commands

| Command             | What it does                                        |
| ------------------- | --------------------------------------------------- |
| `npm run build`     | Bundle `src/main.ts` into `dist/main.js`            |
| `npm run watch`     | Rebuild on change                                   |
| `npm run deploy`    | Build and upload `dist/main.js` to `SCREEPS_BRANCH` |
| `npm test`          | Run unit tests (Vitest)                             |
| `npm run typecheck` | Type-check with `tsc`                               |
| `npm run lint`      | Lint with ESLint                                    |
| `npm run format`    | Format with Prettier                                |

## What the bot does

Each tick it clears memory of dead creeps, keeps 2 harvesters, 2 upgraders and 1 builder alive, and runs each creep's role:

- **harvester** fills spawns and extensions, and upgrades the controller when they are full
- **upgrader** upgrades the room controller
- **builder** builds construction sites, and upgrades when there are none
