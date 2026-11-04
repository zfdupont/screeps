// Minimal stand-ins for the globals the Screeps engine provides.
Object.assign(globalThis, {
  OK: 0,
  WORK: 'work',
  CARRY: 'carry',
  MOVE: 'move',
  MAX_CREEP_SIZE: 50,
  BODYPART_COST: {
    move: 50,
    work: 100,
    attack: 80,
    carry: 50,
    heal: 250,
    ranged_attack: 150,
    tough: 10,
    claim: 600,
  },
  Game: { creeps: {}, spawns: {}, time: 0 },
  Memory: { creeps: {} },
});
