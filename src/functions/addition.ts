export function addition(...args: number[]) {
    return args.reduce((acc, val) => acc + val, 0);
  }
