import { gatherEnergy, updateWorking, upgrade } from './common';

export function runUpgrader(creep: Creep): void {
  updateWorking(creep);
  if (creep.memory.working) upgrade(creep);
  else gatherEnergy(creep);
}
