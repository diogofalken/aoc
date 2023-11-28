import { readFileSync } from "node:fs";
import path from "node:path";

function part_1() {
  const file = readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");
  const input = file.split("\n");

  let acc = 0;
  for (let i = 0; i < input.length; i++) {
    const fullRange = input[i].split(",");
    const [first, second]: [number, number][] = fullRange.map((r) => {
      const cur = r.split("-").map((c) => Number(c));
      return [cur[0], cur[1]];
    });

    if (
      (isContained(first, second[0]) && isContained(first, second[1])) ||
      (isContained(second, first[0]) && isContained(second, first[1]))
    ) {
      acc += 1;
    }
  }

  console.log(`Part 1: ${acc}`);
}

function part_2() {
  const file = readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");
  const input = file.split("\n");

  let acc = 0;
  for (let i = 0; i < input.length; i++) {
    const fullRange = input[i].split(",");
    const [first, second]: [number, number][] = fullRange.map((r) => {
      const cur = r.split("-").map((c) => Number(c));
      return [cur[0], cur[1]];
    });

    if (isContained(first, second[0]) || isContained(second, first[0])) {
      acc += 1;
    }
  }

  console.log(`Part 2: ${acc}`);
}

function isContained([min, max]: [number, number], value: number) {
  return min <= value && max >= value;
}

part_1();
part_2();
