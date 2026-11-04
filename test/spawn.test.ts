import { describe, expect, it } from 'vitest';
import { nextRole } from '../src/managers/spawn';

describe('nextRole', () => {
  it('returns the first role below its target', () => {
    expect(nextRole({ harvester: 2, upgrader: 0, builder: 0 })).toBe('upgrader');
  });

  it('returns undefined when every target is met', () => {
    expect(nextRole({ harvester: 2, upgrader: 2, builder: 1 })).toBeUndefined();
  });
});
