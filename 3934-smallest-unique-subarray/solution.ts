// solved [x] 2026-11-25

function smallestUniqueSubarray(nums: number[]): number {
  const n = nums.length;

  const makeHash = (base: number) => {
    const prefix = new Uint32Array(n + 1);
    const powers = new Uint32Array(n + 1);
    powers[0] = 1;

    for (let i = 0; i < n; i++) {
      prefix[i + 1] = Math.imul(prefix[i], base) + nums[i];
      powers[i + 1] = Math.imul(powers[i], base);
    }

    return (start: number, length: number) =>
      (prefix[start + length] - Math.imul(prefix[start], powers[length])) >>> 0;
  };

  const hash1 = makeHash(911382323);
  const hash2 = makeHash(972663749);

  const hasUniqueWindow = (length: number) => {
    const counts = new Map<string, number>();

    for (let start = 0; start + length <= n; start++) {
      const key = `${hash1(start, length)},${hash2(start, length)}`;
      counts.set(key, (counts.get(key) ?? 0) + 1);
    }

    for (const count of counts.values()) {
      if (count === 1) return true;
    }
    return false;
  };

  let low = 1;
  let high = n;

  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (hasUniqueWindow(mid)) high = mid;
    else low = mid + 1;
  }

  return low;
}
