import { sort } from '../../src/functions/sort';

describe('sort function', () => {
  it('should return a sorted array when numbers are passed', async () => {
    const sortedArray1 = await sort(23, 32, 3, 54, 56, 5, 76, 76);
    expect(sortedArray1).toEqual([3, 5, 23, 32, 54, 56, 76, 76]);

    const sortedArray2 = await sort(5, 10, 15, 20, 25);
    expect(sortedArray2).toEqual([5, 10, 15, 20, 25]);
  });

  it('should handle an empty array correctly', async () => {
    const sortedArray = await sort();
    expect(sortedArray).toEqual([]);  // Assuming `sort` handles empty input
  });

  it('should handle negative numbers correctly', async () => {
    const sortedArray = await sort(-5, -10, -1, -20);
    expect(sortedArray).toEqual([-20, -10, -5, -1]);
  });

  it('should handle single-element array correctly', async () => {
    const sortedArray = await sort(42);
    expect(sortedArray).toEqual([42]);
  });
});
