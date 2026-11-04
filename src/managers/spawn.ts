import { buildBody } from '../utils/body';

/** Desired creep count per role, in spawn priority order. */
export const ROLE_TARGETS: Record<Role, number> = { harvester: 2, upgrader: 2, builder: 1 };

const WORKER_PATTERN: BodyPartConstant[] = [WORK, CARRY, MOVE];

export function countRoles(): Record<Role, number> {
  const counts: Record<Role, number> = { harvester: 0, upgrader: 0, builder: 0 };
  for (const creep of Object.values(Game.creeps)) counts[creep.memory.role]++;
  return counts;
}

export function nextRole(counts: Record<Role, number>): Role | undefined {
  return (Object.keys(ROLE_TARGETS) as Role[]).find((role) => counts[role] < ROLE_TARGETS[role]);
}

export function runSpawns(): void {
  const counts = countRoles();
  for (const spawn of Object.values(Game.spawns)) {
    if (spawn.spawning) continue;
    const role = nextRole(counts);
    if (!role) return;
    // With no harvesters nothing refills the spawn, so build whatever is affordable now.
    const energy =
      counts.harvester === 0 ? spawn.room.energyAvailable : spawn.room.energyCapacityAvailable;
    const body = buildBody(WORKER_PATTERN, energy);
    if (body.length === 0) continue;
    const result = spawn.spawnCreep(body, `${role}-${String(Game.time)}`, {
      memory: { role, working: false },
    });
    if (result === OK) counts[role]++;
  }
}
