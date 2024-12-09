type Coordinates = [number, number];

async function part1() {
  const file = await Deno.readTextFile("./test.txt");
  const grid = file
    .split("\n")
    .filter((l) => l !== "")
    .map((l) => l.split(""));

  const antinodes = new Map<string, Coordinates[]>();

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      const cur = grid[r][c];
      if (cur !== ".") {
        if (!antinodes.has(cur)) antinodes.set(cur, []);
        antinodes.get(cur)?.push([r, c]);
      }
    }
  }

  const antennas = new Set<string>();
  for (const nodes of antinodes.values()) {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const [r1, c1] = nodes[i];
        const [r2, c2] = nodes[j];

        const [rd, cd] = [r2 - r1, c2 - c1];
        const n1: Coordinates = [r1 - rd, c1 - cd];
        if (isInsideTheGrid(grid, n1)) antennas.add(n1.join(":"));
        const n2: Coordinates = [r2 + rd, c2 + cd];
        if (isInsideTheGrid(grid, n2)) antennas.add(n2.join(":"));
      }
    }
  }

  console.log(`Part 1: ${antennas.size}`);
}

async function part2() {
  const file = await Deno.readTextFile("./test.txt");
  const grid = file
    .split("\n")
    .filter((l) => l !== "")
    .map((l) => l.split(""));

  const antinodes = new Map<string, Coordinates[]>();

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      const cur = grid[r][c];
      if (cur !== ".") {
        if (!antinodes.has(cur)) antinodes.set(cur, []);
        antinodes.get(cur)?.push([r, c]);
      }
    }
  }

  const antennas = new Set<string>();
  for (const nodes of antinodes.values()) {
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const [r1, c1] = nodes[i];
        const [r2, c2] = nodes[j];

        const [rd, cd] = [r2 - r1, c2 - c1];
        let next: Coordinates = [r1, c1];
        while (isInsideTheGrid(grid, next)) {
          antennas.add(next.join(":"));
          next = [next[0] - rd, next[1] - cd];
        }
        next = [r2, c2];
        while (isInsideTheGrid(grid, next)) {
          antennas.add(next.join(":"));
          next = [next[0] + rd, next[1] + cd];
        }
      }
    }
  }

  console.log(`Part 2: ${antennas.size}`);
}

function isInsideTheGrid(grid: string[][], [r, c]: [number, number]) {
  return r >= 0 && r < grid.length && c >= 0 && c < grid[0].length;
}

part1();
part2();
