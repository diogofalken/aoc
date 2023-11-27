import { readFileSync } from "node:fs";
import path from "node:path";

const priorities = [
  "a",
  "b",
  "c",
  "d",
  "e",
  "f",
  "g",
  "h",
  "i",
  "j",
  "k",
  "l",
  "m",
  "n",
  "o",
  "p",
  "q",
  "r",
  "s",
  "t",
  "u",
  "v",
  "w",
  "x",
  "y",
  "z",
  "A",
  "B",
  "C",
  "D",
  "E",
  "F",
  "G",
  "H",
  "I",
  "J",
  "K",
  "L",
  "M",
  "N",
  "O",
  "P",
  "Q",
  "R",
  "S",
  "T",
  "U",
  "V",
  "W",
  "X",
  "Y",
  "Z",
];

function isIncluded(arr: string[], item: string): boolean {
  return arr.filter((cur) => cur.includes(item)).length === arr.length;
}

function part_1() {
  const file = readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");
  const input = file.split("\n");

  let acc = 0;
  for (const sack of input) {
    const first = sack.slice(0, sack.length / 2);
    const second = sack.slice(sack.length / 2);

    for (const item of first) {
      if (isIncluded([second], item)) {
        acc += priorities.indexOf(item) + 1;
        break;
      }
    }
  }
  console.log(`Part 1: ${acc}`);
}

function part_2() {
  const file = readFileSync(path.resolve(__dirname, "input.txt"), "utf-8");
  const input = file.split("\n");

  let acc = 0;
  for (let i = 0; i <= input.length - 3; i += 3) {
    const sack = input[i];
    for (const item of sack) {
      if (isIncluded(input.slice(i + 1, i + 3), item)) {
        acc += priorities.indexOf(item) + 1;
        break;
      }
    }
  }
  console.log(`Part 2: ${acc}`);
}

part_1();
part_2();
