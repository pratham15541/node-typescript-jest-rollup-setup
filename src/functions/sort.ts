export async function sort(...args: number[]) {
    return args.sort((a, b) => a - b);
}