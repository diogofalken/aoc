type Coordinates = [number, number];
const DIRS = [
  [-1, 0],
  [0, 1],
  [1, 0],
  [0, -1],
];

async function part1() {
  const file = await Deno.readTextFile("./test.txt");
  const grid = file
    .split("\n")
    .filter((l) => l !== "")
    .map((l) => l.split("").map(Number));

  const startingPoints: Coordinates[] = [];
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === 0) {
        startingPoints.push([r, c]);
      }
    }
  }

  let trailheads = 0;
  for (const [r, c] of startingPoints) {
    const reached = new Set();
    const visited = new Set<string>([[r, c].join(":")]);

    const nexts = [[r, c]];
    while (nexts.length) {
      const [r, c] = nexts.pop()!;
      visited.add([r, c].join(":"));

      for (const [dr, dc] of DIRS) {
        const [nr, nc] = [r + dr, c + dc];

        if (!isInsideTheGrid(grid, [nr, nc])) continue;
        if (grid[r][c] === 8 && grid[nr][nc] === 9) {
          reached.add([nr, nc].join(":"));
          continue;
        }

        if (
          grid[nr][nc] === grid[r][c] + 1 &&
          !visited.has([nr, nc].join(""))
        ) {
          nexts.push([nr, nc]);
        }
      }
    }

    trailheads += reached.size;
  }

  console.log(`Part 1: ${trailheads}`);
}

async function part2() {
  const file = await Deno.readTextFile("./test.txt");
  const grid = file
    .split("\n")
    .filter((l) => l !== "")
    .map((l) => l.split("").map(Number));

  const startingPoints: Coordinates[] = [];
  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === 0) {
        startingPoints.push([r, c]);
      }
    }
  }

  let trailheads = 0;
  for (const [r, c] of startingPoints) {
    let curTrailheads = 0;
    const visited = new Set<string>([[r, c].join(":")]);

    const nexts = [[r, c]];
    while (nexts.length) {
      const [r, c] = nexts.pop()!;
      visited.add([r, c].join(":"));

      for (const [dr, dc] of DIRS) {
        const [nr, nc] = [r + dr, c + dc];
        if (!isInsideTheGrid(grid, [nr, nc])) continue;
        if (grid[r][c] === 8 && grid[nr][nc] === 9) {
          curTrailheads++;
          continue;
        }

        if (
          grid[nr][nc] === grid[r][c] + 1 &&
          !visited.has([nr, nc].join(""))
        ) {
          nexts.push([nr, nc]);
        }
      }
    }

    trailheads += curTrailheads;
  }

  console.log(`Part 2: ${trailheads}`);
}

function isInsideTheGrid(grid: unknown[][], [r, c]: [number, number]) {
  return r >= 0 && r < grid.length && c >= 0 && c < grid[0].length;
}

part1();
part2();
