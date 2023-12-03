import { readFileSync } from "node:fs";
import path from "node:path";
import { argv } from "node:process";

function part_1() {
  const file = readFileSync(path.resolve(__dirname, argv[2]), "utf-8");
  const input = file.split("\n");
  const inputWithoutNumbers = [];

  for (const cur of input) {
    inputWithoutNumbers.push(cur.replaceAll(/[0-9]/g, "."));
  }

  let acc = 0;
  for (let r = 0; r < input.length; r++) {
    const numbers = input[r].matchAll(/\d+/g);
    for (const number of numbers) {
      const { cur, start, end } = getMatchInfo(number);

      const { adjacent } = getAdjancentPoints(inputWithoutNumbers, {
        start,
        end,
        row: r,
      });

      if (adjacent.some((p) => p !== ".")) {
        acc += Number(cur);
      }
    }
  }

  console.log(`Part 1: ${acc}`);
}

function part_2() {
  const file = readFileSync(path.resolve(__dirname, argv[2]), "utf-8");
  const input = file.split("\n");

  const threatedInput = [];
  for (let i = 0; i < input.length; i++) {
    const numbers = input[i].matchAll(/\d+/g);
    const curInput = [...input[i]];

    for (const number of numbers) {
      const { start, end } = getMatchInfo(number);

      for (let k = start; k <= end; k++) {
        curInput[k] = number[0];
      }
    }

    threatedInput.push(curInput);
  }

  let acc = 0;
  for (let r = 0; r < input.length; r++) {
    const gears = input[r].matchAll(/[*]/g);

    for (const gear of gears) {
      const { start, end } = getMatchInfo(gear);

      const { adjacent, coordinates } = getAdjancentPoints(input, {
        start,
        end,
        row: r,
      });

      const adjacentNumbers = new Set<number>();
      for (let j = 0; j < adjacent.length; j++) {
        const num = Number(adjacent[j]);
        if (!Number.isNaN(num)) {
          const coordinate = coordinates[j];
          adjacentNumbers.add(
            Number(threatedInput[coordinate[0]][coordinate[1]])
          );
        }
      }

      if (adjacentNumbers.size === 2) {
        acc += [...adjacentNumbers].reduce((acc, cur) => acc * Number(cur), 1);
      }
    }
  }

  console.log(`Part 2: ${acc}`);
}

function getMatchInfo(match: RegExpMatchArray) {
  const cur = match[0];
  const start = match.index ?? 0;
  const end = start + cur.length - 1;

  return { cur, start, end };
}

function isContained([min, max]: [number, number], value: number) {
  return min <= value && max >= value;
}

function getAdjancentPoints(
  input: string[],
  pos: { start: number; end: number; row: number }
) {
  const adjacent: string[] = [];
  const coordinates: number[][] = [];

  for (
    let r = pos.row === 0 ? pos.row : pos.row - 1;
    r <= (pos.row === input.length - 1 ? pos.row : pos.row + 1);
    r++
  ) {
    for (
      let c = pos.start === 0 ? pos.start : pos.start - 1;
      c <= (pos.end === input[0].length - 1 ? pos.end : pos.end + 1);
      c++
    ) {
      if (!(r === pos.row && isContained([pos.start, pos.end], c))) {
        adjacent.push(input[r][c]);
        coordinates.push([r, c]);
      }
    }
  }

  return { adjacent, coordinates };
}

part_1();
part_2();
