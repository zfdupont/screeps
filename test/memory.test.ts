import { describe, expect, it } from 'vitest';
import { cleanCreepMemory } from '../src/utils/memory';

describe('cleanCreepMemory', () => {
  it('removes memory of creeps that no longer exist', () => {
    const alive = { role: 'harvester', working: false } satisfies CreepMemory;
    Object.assign(globalThis, {
      Game: { creeps: { alive: {} } },
      Memory: { creeps: { alive, dead: { role: 'builder', working: true } } },
    });

    cleanCreepMemory();

    expect(Memory.creeps).toEqual({ alive });
  });
});
