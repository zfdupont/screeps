type Role = 'harvester' | 'upgrader' | 'builder';

interface CreepMemory {
  role: Role;
  /** True while spending energy, false while gathering it. */
  working: boolean;
}

/** The engine provides console.log but @types/screeps does not declare it. */
declare const console: { log(...args: unknown[]): void };
