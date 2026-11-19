function minimizeSum(nums: number[]): number {
  const sorted = nums.sort((a, b) => a - b);
  const n = sorted.length;
  const first = sorted[n - 1] - sorted[2];
  const second = sorted[n - 2] - sorted[1];
  const third = sorted[n - 3] - sorted[0];

  return Math.min(first, second, third);
}
