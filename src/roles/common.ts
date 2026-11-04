export const PATH_STYLE: MoveToOpts = { visualizePathStyle: { stroke: '#ffaa00' } };

/** Flips `memory.working` when the creep runs empty or fills up. */
export function updateWorking(creep: Creep): void {
  if (creep.memory.working && creep.store[RESOURCE_ENERGY] === 0) {
    creep.memory.working = false;
  } else if (!creep.memory.working && creep.store.getFreeCapacity(RESOURCE_ENERGY) === 0) {
    creep.memory.working = true;
  }
}

/** Picks up dropped energy if any, otherwise harvests the closest active source. */
export function gatherEnergy(creep: Creep): void {
  const dropped = creep.pos.findClosestByPath(FIND_DROPPED_RESOURCES, {
    filter: (r) => r.resourceType === RESOURCE_ENERGY,
  });
  if (dropped) {
    if (creep.pickup(dropped) === ERR_NOT_IN_RANGE) creep.moveTo(dropped, PATH_STYLE);
    return;
  }
  const source = creep.pos.findClosestByPath(FIND_SOURCES_ACTIVE);
  if (source && creep.harvest(source) === ERR_NOT_IN_RANGE) creep.moveTo(source, PATH_STYLE);
}

export function upgrade(creep: Creep): void {
  const controller = creep.room.controller;
  if (controller && creep.upgradeController(controller) === ERR_NOT_IN_RANGE) {
    creep.moveTo(controller, PATH_STYLE);
  }
}
