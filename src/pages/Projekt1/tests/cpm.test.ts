import { expect, describe, it } from 'vitest';
import calculateCPM from '../cpm';
import examples, { results } from '../examples';

describe('Critical path method', () => {
  it('should calculate test case 1 correctly', async () => {
    const result = calculateCPM(examples[0]);
    expect(result).toEqual(results[0]);
  });
  it.concurrent('should calculate test case 2 correctly', async () => {
    const result = calculateCPM(examples[1]);
    expect(result).toEqual(results[1]);
  });
  it.concurrent('should calculate test case 3 correctly', async () => {
    const result = calculateCPM(examples[2]);
    expect(result).toEqual(results[2]);
  });
});
