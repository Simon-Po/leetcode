// solved [x]
function longestMonotonicSubarray(nums: number[]): number {
  let w = windows(nums);
  return w
    .map((win) => {
      return {
        length: win.length,
        increasing: isStrictlyIncreasing(win),
        decreasing: isStrictlyDecreasing(win),
      };
    })
    .filter((w) => w.decreasing || w.increasing)
    .sort((a, b) => b.length - a.length)[0].length;
}

function windows<T>(nums: T[]): Array<Array<T>> {
  return nums.flatMap((_, start) =>
    Array.from({ length: nums.length - start }, (_, i) =>
      nums.slice(start, start + i + 1),
    ),
  );
}

function isStrictlyIncreasing(nums: number[]): boolean {
  return nums.every((num, i) => i === 0 || nums[i - 1] < num);
}

function isStrictlyDecreasing(nums: number[]): boolean {
  return nums.every((num, i) => i === 0 || nums[i - 1] > num);
}
