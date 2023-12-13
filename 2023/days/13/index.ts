import { readFileSync } from "node:fs";
import path from "node:path";
import { argv } from "node:process";

function transpose(matrix: string[][]) {
  return matrix[0].map((col, i) => matrix.map((row) => row[i]));
}

function scanRow([min, max]: [number, number], block: string[][]) {
  let diff = 0;
  for (let r = 0; r < block.length; r++) {
    if (block[r][min] !== block[r][max]) {
      diff++;
    }
  }
  return diff;
}

function findReflexion(block: string[][], allowedDifferences = 0) {
  const firstRow = block[0];
  for (let i = 0; i < firstRow.length - 1; i++) {
    let min = i;
    let max = i + 1;

    let differences = 0;
    while (min >= 0 && max <= firstRow.length - 1) {
      differences += scanRow([min, max], block);
      min--;
      max++;
    }

    if (differences === allowedDifferences) {
      return i + 1;
    }
  }

  return 0;
}

function part_1() {
  const file = readFileSync(path.resolve(__dirname, argv[2]), "utf-8");
  const blocks = file
    .split("\n\n")
    .map((c) => c.split("\n").map((c) => c.split("")));

  let acc = 0;
  for (const block of blocks) {
    const rowReflexion = findReflexion(block);
    acc += rowReflexion;

    const colReflexion = findReflexion(transpose(block));
    acc += colReflexion * 100;
  }

  console.log(`Part 1: ${acc}`);
}

function part_2() {
  const file = readFileSync(path.resolve(__dirname, argv[2]), "utf-8");
  const blocks = file
    .split("\n\n")
    .map((c) => c.split("\n").map((c) => c.split("")));

  let acc = 0;
  for (const block of blocks) {
    const rowReflexion = findReflexion(block, 1);
    acc += rowReflexion;

    const colReflexion = findReflexion(transpose(block), 1);
    acc += colReflexion * 100;
  }

  console.log(`Part 2: ${acc}`);
}

part_1();
part_2();
