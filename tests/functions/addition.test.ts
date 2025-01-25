import { addition } from '../../src/functions/addition';

describe('addition function', () => {

  it('should correctly sum two positive numbers', () => {
    const sum = addition(1, 2);
    expect(sum).toBe(3);
  });

  it('should correctly sum larger positive numbers', () => {
    const sum = addition(5, 10);
    expect(sum).toBe(15);
  });

  it('should return 0 when no arguments are passed', () => {
    expect(addition()).toBe(0);
  });

  it('should correctly sum two negative numbers', () => {
    const sum = addition(-5, -10);
    expect(sum).toBe(-15);
  });

  it('should correctly sum one negative and one positive number', () => {
    const sum = addition(-5, 10);
    expect(sum).toBe(5);
  });

  it('should handle large numbers correctly', () => {
    const sum = addition(1e6, 1e6);
    expect(sum).toBe(2e6);  // 2 million
  });

  it('should handle floating point numbers correctly', () => {
    const sum = addition(0.1, 0.2);
    expect(sum).toBeCloseTo(0.3, 5);  // 0.1 + 0.2 should be close to 0.3
  });
});
