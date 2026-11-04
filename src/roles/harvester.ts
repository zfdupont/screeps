import { gatherEnergy, PATH_STYLE, updateWorking, upgrade } from './common';

/** Fills spawns and extensions; upgrades the controller when they are full. */
export function runHarvester(creep: Creep): void {
  updateWorking(creep);
  if (!creep.memory.working) {
    gatherEnergy(creep);
    return;
  }
  const target = creep.pos.findClosestByPath(FIND_MY_STRUCTURES, {
    filter: (s): s is StructureSpawn | StructureExtension =>
      (s.structureType === STRUCTURE_SPAWN || s.structureType === STRUCTURE_EXTENSION) &&
      s.store.getFreeCapacity(RESOURCE_ENERGY) > 0,
  });
  if (!target) {
    upgrade(creep);
    return;
  }
  if (creep.transfer(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
    creep.moveTo(target, PATH_STYLE);
  }
}
