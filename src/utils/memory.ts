/** Drops memory for creeps that no longer exist. */
export function cleanCreepMemory(): void {
  // The engine only creates Memory.creeps after the first spawn.
  const creeps = Memory.creeps as Record<string, CreepMemory> | undefined;
  if (!creeps) return;
  for (const name of Object.keys(creeps)) {
    if (!(name in Game.creeps)) Reflect.deleteProperty(creeps, name);
  }
}
