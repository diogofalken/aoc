import { readFileSync } from "node:fs";
import path from "node:path";
import { argv } from "node:process";

function part_1() {
  const { galaxies, emptyColumns, emptyRows } = parseInput();

  let acc = 0;
  for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      const [r1, c1] = galaxies[i];
      const [r2, c2] = galaxies[j];

      for (let ii = Math.min(r1, r2); ii < Math.max(r1, r2); ii++) {
        acc += emptyRows.includes(ii) ? 2 : 1;
      }
      for (let jj = Math.min(c1, c2); jj < Math.max(c1, c2); jj++) {
        acc += emptyColumns.includes(jj) ? 2 : 1;
      }
    }
  }

  console.log(`Part 1: ${acc}`);
}

function part_2() {
  const { galaxies, emptyColumns, emptyRows } = parseInput();

  let acc = 0;
  for (let i = 0; i < galaxies.length; i++) {
    for (let j = i + 1; j < galaxies.length; j++) {
      const [r1, c1] = galaxies[i];
      const [r2, c2] = galaxies[j];

      for (let ii = Math.min(r1, r2); ii < Math.max(r1, r2); ii++) {
        acc += emptyRows.includes(ii) ? 1000000 : 1;
      }
      for (let jj = Math.min(c1, c2); jj < Math.max(c1, c2); jj++) {
        acc += emptyColumns.includes(jj) ? 1000000 : 1;
      }
    }
  }

  console.log(`Part 2: ${acc}`);
}

function parseInput() {
  const file = readFileSync(path.resolve(__dirname, argv[2]), "utf-8");
  const input = file.split("\n");

  const emptyRows = [];
  for (let r = 0; r < input.length; r++) {
    if (!input[r].includes("#")) {
      emptyRows.push(r);
    }
  }

  const emptyColumns = [];
  for (let c = 0; c < input[0].length; c++) {
    if (!input.some((_, r) => input[r][c] === "#")) {
      emptyColumns.push(c);
    }
  }

  const galaxies = [];
  for (let r = 0; r < input.length; r++) {
    for (let c = 0; c < input[r].length; c++) {
      if (input[r][c] === "#") {
        galaxies.push([r, c]);
      }
    }
  }

  return { emptyRows, emptyColumns, galaxies };
}

part_1();
part_2();
