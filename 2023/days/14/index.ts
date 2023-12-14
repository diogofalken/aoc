import { readFileSync } from "node:fs";
import path from "node:path";
import { argv } from "node:process";

function transpose(matrix: string[][]) {
  return matrix[0].map((col, i) => matrix.map((row) => row[i]));
}

function part_1() {
  const file = readFileSync(path.resolve(__dirname, argv[2]), "utf-8");
  const input = file.split("\n").map((l) => l.split(""));

  const grid = transpose(input);
  const rolled = grid
    .map((_, i) =>
      grid[i]
        .join("")
        .split("#")
        .map((c) => c.split("").sort().reverse().join(""))
        .join("#")
    )
    .map((l) => l.split(""));

  let acc = transpose(rolled).reduce(
    (acc, line, index) =>
      acc + line.filter((c) => c === "O").length * (rolled.length - index),
    0
  );

  console.log(`Part 1: ${acc}`);
}

function part_2() {
  const file = readFileSync(path.resolve(__dirname, argv[2]), "utf-8");

  let grid = file.split("\n").map((l) => l.split(""));
  let gridId = grid.join("");

  const seen = new Map<string, number>([[gridId, 0]]);
  const iterations = [gridId];

  let i = 0;
  while (true) {
    i++;
    const { id, matrix, count } = cycle(grid);

    if (seen.has(id)) {
      gridId = id;
      break;
    }

    seen.set(id, count);
    iterations.push(id);
    grid = matrix;
  }

  const first = iterations.indexOf(gridId);
  const beginCycleIndex = ((1000000000 - first) % (i - first)) + first;
  const total = seen.get(iterations[beginCycleIndex]);

  console.log(`Part 2: ${total}`);
}

function cycle(matrix: string[][]) {
  for (let i = 0; i < 4; i++) {
    matrix = transpose(matrix);
    matrix = matrix
      .map((_, i) =>
        matrix[i]
          .join("")
          .split("#")
          .map((c) => c.split("").sort().reverse().join(""))
          .join("#")
      )
      .map((l) => l.split("").reverse());
  }

  return {
    id: matrix.map((r) => r.join("")).join(""),
    matrix,
    count: matrix.reduce(
      (acc, line, index) =>
        acc + line.filter((c) => c === "O").length * (matrix.length - index),
      0
    ),
  };
}

part_1();
part_2();
