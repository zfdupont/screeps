import { runSpawns } from './managers/spawn';
import { roles } from './roles';
import { cleanCreepMemory } from './utils/memory';

export function loop(): void {
  cleanCreepMemory();
  runSpawns();

  for (const creep of Object.values(Game.creeps)) {
    if (creep.spawning) continue;
    // One broken creep should not stop the rest of the tick.
    try {
      roles[creep.memory.role](creep);
    } catch (err) {
      console.log(
        `[${creep.name}] ${err instanceof Error ? (err.stack ?? err.message) : String(err)}`,
      );
    }
  }
}
