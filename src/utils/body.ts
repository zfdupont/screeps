/** Repeats `pattern` as many times as `energy` allows, capped at MAX_CREEP_SIZE parts. */
export function buildBody(pattern: BodyPartConstant[], energy: number): BodyPartConstant[] {
  const cost = pattern.reduce((sum, part) => sum + BODYPART_COST[part], 0);
  const repeats = Math.min(Math.floor(energy / cost), Math.floor(MAX_CREEP_SIZE / pattern.length));
  const body: BodyPartConstant[] = [];
  for (let i = 0; i < repeats; i++) body.push(...pattern);
  return body;
}
