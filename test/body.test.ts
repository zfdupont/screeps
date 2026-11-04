import { describe, expect, it } from 'vitest';
import { buildBody } from '../src/utils/body';

describe('buildBody', () => {
  const pattern: BodyPartConstant[] = [WORK, CARRY, MOVE];

  it('returns an empty body when the pattern is unaffordable', () => {
    expect(buildBody(pattern, 150)).toEqual([]);
  });

  it('repeats the pattern as many times as energy allows', () => {
    expect(buildBody(pattern, 450)).toEqual([WORK, CARRY, MOVE, WORK, CARRY, MOVE]);
  });

  it('caps the body at MAX_CREEP_SIZE parts', () => {
    expect(buildBody(pattern, 100_000)).toHaveLength(48);
  });
});
