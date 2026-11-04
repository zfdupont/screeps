import { runBuilder } from './builder';
import { runHarvester } from './harvester';
import { runUpgrader } from './upgrader';

export const roles: Record<Role, (creep: Creep) => void> = {
  harvester: runHarvester,
  upgrader: runUpgrader,
  builder: runBuilder,
};
