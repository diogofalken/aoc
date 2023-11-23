import { readFileSync } from "fs";
import path from "path";

const EMPTY_CHAR = "";

function part_1() {
  const file = readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");
  const input = file.split("\n");

  const elfs = getElfsCalories(input);

  const output = Math.max(...elfs.values());
  console.log(`Part 1: ${output}`);
}

function part_2() {
  const file = readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");
  const input = file.split("\n");

  const elfs = getElfsCalories(input);

  const output = [...elfs.values()]
    .splice(0, 3)
    .reduce((acc, cur) => acc + cur, 0);
  console.log(`Part 2: ${output}`);
}

function getElfsCalories(calories: string[]): Map<number, number> {
  const elfsCalories = new Map<number, number>();

  let acc = 0;
  let i = 0;
  for (const cal of calories) {
    if (cal === EMPTY_CHAR) {
      elfsCalories.set(i++, acc);
      acc = 0;
    } else {
      acc += Number(cal);
    }
  }

  return new Map([...elfsCalories].sort((a, b) => b[1] - a[1]));
}

part_1();
part_2();
