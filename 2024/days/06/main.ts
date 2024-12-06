type Coordinates = [number, number];
type Direction = "U" | "D" | "R" | "L";
const DIR: Record<Direction, Coordinates> = {
  U: [-1, 0],
  D: [1, 0],
  R: [0, 1],
  L: [0, -1],
};
const NEXT_DIR_MAPPING: Record<Direction, Direction> = {
  U: "R",
  D: "L",
  R: "D",
  L: "U",
};

async function part1() {
  const file = await Deno.readTextFile("./test.txt");
  const grid = file
    .split("\n")
    .map((l) => l.split(""))
    .filter((g) => g.length !== 0);

  const cur: Coordinates = findStartingPos(grid);
  const visited = findGuardPath(grid, cur);

  console.log(`Part 1: ${visited.size}`);
}

async function part2() {
  const file = await Deno.readTextFile("./test.txt");
  const grid = file
    .split("\n")
    .map((l) => l.split(""))
    .filter((g) => g.length !== 0);

  const cur: Coordinates = findStartingPos(grid);
  const visited = findGuardPath(grid, cur);

  let out = 0;
  for (const [r, c] of visited.values().map((v) => v.split(":").map(Number))) {
    if (grid[r][c] !== ".") continue;
    grid[r][c] = "#";
    if (isInLoop(grid, cur)) {
      out++;
    }
    grid[r][c] = ".";
  }

  console.log(`Part 2: ${out}`);
}

function isInLoop(grid: string[][], cur: Coordinates): boolean {
  let dir: Direction = "U";

  const visited = new Set([[...cur, dir].join(":")]);
  while (true) {
    const next = getNextPos(grid, cur, DIR[dir]);
    if (!next) return false;

    const nextValue = grid[next[0]][next[1]];
    if (visited.has([...next, dir].join(":"))) {
      return true;
    }

    if (nextValue === "#") {
      dir = NEXT_DIR_MAPPING[dir];
      continue;
    }

    cur = next;
    visited.add([...cur, dir].join(":"));
  }
}

function findGuardPath(grid: string[][], cur: Coordinates): Set<string> {
  let dir: Direction = "U";

  const visited = new Set([cur.join(":")]);
  while (true) {
    const next = getNextPos(grid, cur, DIR[dir]);
    if (!next) break;
    const nextValue = grid[next[0]][next[1]];

    if (nextValue === "#") {
      dir = NEXT_DIR_MAPPING[dir];
      continue;
    }

    cur = next;
    visited.add(cur.join(":"));
  }

  return visited;
}

function getNextPos(
  grid: string[][],
  [r, c]: Coordinates,
  [dr, dc]: Coordinates,
): Coordinates | null {
  const next: Coordinates = [r + dr, c + dc];
  if (isInsideTheGrid(grid, next)) {
    return next;
  }
  return null;
}

function isInsideTheGrid(grid: string[][], [r, c]: [number, number]) {
  return r >= 0 && r < grid.length && c >= 0 && c < grid[0].length;
}

function findStartingPos(grid: string[][]): [number, number] {
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === "^") {
        return [r, c];
      }
    }
  }
  return [0, 0];
}

part1();
part2();
