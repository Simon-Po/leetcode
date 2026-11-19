// solved [x]
function digitSum(s: string, k: number): string {
  let temp = s;
  while (temp.length > k) {
    temp = chunk(temp, k).map(toSum).join("");
  }
  return temp;
}

function toSum(s: string): string {
  return s
    .split("")
    .map(Number)
    .reduce((a, x) => a + x, 0)
    .toString();
}

function chunk(s: string, by: number): string[] {
  const chunkedArray: string[] = [];
  let members = s.split("");
  while (members.length > 0) {
    chunkedArray.push(members.splice(0, by).join(""));
  }

  return chunkedArray;
}
/*
 * Split an array into chunks of at most `by` elements.
 * chunk([1, 2, 3, 4, 5], 2);
 * [[1, 2], [3, 4], [5]]
 */
const chunk = <T>(inp: T[], by: number): T[][] =>
  Array.from({ length: Math.ceil(inp.length / by) }, (_, i) =>
    inp.slice(i * by, (i + 1) * by),
  );
