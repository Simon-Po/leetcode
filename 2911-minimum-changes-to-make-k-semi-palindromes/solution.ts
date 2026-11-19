function minimumChanges(s: string, k: number): number {
  const memo = new Map<string, number>();
  const pieceCosts = new Map<string, number>();

  const cost = (piece: string): number => {
    if (!pieceCosts.has(piece)) {
      pieceCosts.set(piece, findMinimumCostPerPiece(piece));
    }
    return pieceCosts.get(piece)!;
  };

  const search = (start: number, piecesLeft: number): number => {
    const key = `${start}:${piecesLeft}`;
    if (memo.has(key)) return memo.get(key)!;

    if (piecesLeft === 1) {
      return cost(s.slice(start));
    }

    let cheapest = Infinity;
    const lastEnd = s.length - 2 * (piecesLeft - 1);

    for (let end = start + 2; end <= lastEnd; end++) {
      const candidate = cost(s.slice(start, end)) + search(end, piecesLeft - 1);

      cheapest = Math.min(cheapest, candidate);
    }

    memo.set(key, cheapest);
    return cheapest;
  };

  return search(0, k);
}

function howManyReplacementsToMakeAPalindrom(piece: string) {
  const half = Math.floor(piece.length / 2);
  const part1 = piece.slice(0, half).split("");
  const part2 = piece
    .slice(Math.ceil(piece.length / 2))
    .split("")
    .reverse();
  let out = 0;
  for (const [left, right] of zip(part1, part2)) {
    if (left !== right) out++;
  }
  return out;
}

/*
 * Pair elements at matching indexes, stopping at the shorter array.
 * zip([1, 2, 3], ["a", "b"]);
 * [[1, "a"], [2, "b"]]
 */
const zip = <A, B>(left: A[], right: B[]): [A, B][] => {
  return Array.from(
    { length: Math.min(left.length, right.length) },
    (_, i) => [left[i], right[i]] as [A, B],
  );
};

/*
 * Split a string into chunks of at most by characters.
 * chunkString("abcde", 2);
 * ["ab", "cd", "e"]
 */
const chunkString = (inp: string, by: number): string[] => {
  return Array.from({ length: Math.ceil(inp.length / by) }, (_, i) =>
    inp.slice(i * by, (i + 1) * by),
  );
};

function lanes(piece: string, d /*spacing*/ : number): string[] {
  // "abcabc"
  //  d = 2
  //  a b
  //  c a
  //  b c
  let out = [];
  for (let j = 0; j < d; j++) {
    let current = "";
    for (let i = j; i < piece.length; i += d) {
      current = current + piece[i];
    }
    out.push(current);
  }
  return out;
}

const everyOneAPalindrom = (inp: string[]): boolean =>
  inp.every((x) => x.split("").reverse().join("") === x);

const validspacings = (piece: string) => {
  let out = [];
  for (let i = 1; i < piece.length; i++) {
    if (piece.length % i == 0) {
      out.push(i);
    }
  }
  return out;
};

const findMinimumCostPerPiece = (piece: string): number => {
  const spacings = validspacings(piece);
  return Math.min(
    ...spacings
      .map((s) => lanes(piece, s))
      .map((p) =>
        p.map(howManyReplacementsToMakeAPalindrom).reduce((a, b) => a + b, 0),
      ),
  );
};
