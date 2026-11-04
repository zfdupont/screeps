import { gatherEnergy, PATH_STYLE, updateWorking, upgrade } from './common';

/** Builds construction sites; upgrades the controller when there are none. */
export function runBuilder(creep: Creep): void {
  updateWorking(creep);
  if (!creep.memory.working) {
    gatherEnergy(creep);
    return;
  }
  const site = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES);
  if (!site) {
    upgrade(creep);
    return;
  }
  if (creep.build(site) === ERR_NOT_IN_RANGE) creep.moveTo(site, PATH_STYLE);
}
