function minChanges(s: string): number {
  if (
    s.split("").every((x) => x === "0") ||
    s.split("").every((x) => x === "1")
  ) {
    return 0;
  }
  const chars = s.split("");
  let out = 0;
  for (let i = 0; i < s.length; i += 2) {
    const first = chars[i];
    const second = chars[i + 1];

    if (first !== second) {
      out++;
    }
  }

  return out;
}
