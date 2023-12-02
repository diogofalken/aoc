import { readFileSync } from "node:fs";
import path from "node:path";
import { argv } from "node:process";

const NumbersMatch = {
  one: "1",
  two: "2",
  three: "3",
  four: "4",
  five: "5",
  six: "6",
  seven: "7",
  eight: "8",
  nine: "9",
};

function part_1() {
  const file = readFileSync(path.resolve(__dirname, argv[2]), "utf-8");
  const input = file.split("\n");

  let acc = 0;
  for (let i = 0; i < input.length; i++) {
    const cur = input[i];
    acc += Number(
      findFirstOccurence(getStrArray(cur)) +
        findFirstOccurence(getStrArray(cur, true))
    );
  }

  console.log(`Part 1: ${acc}`);
}

function part_2() {
  const file = readFileSync(path.resolve(__dirname, argv[2]), "utf-8");
  let input = file.split("\n");

  let acc = 0;
  for (let i = 0; i < input.length; i++) {
    const cur = input[i];
    acc += Number(
      findFirstOccurenceWithExtense(cur) +
        findFirstOccurenceWithExtense(getStrArray(cur, true).join(""), true)
    );
  }

  console.log(`Part 2: ${acc}`);
}

function isInExtense(word: string): string | null {
  for (const [key, value] of Object.entries(NumbersMatch)) {
    if (word.includes(key)) {
      return value;
    }
  }
  return null;
}

function findFirstOccurence(line: string[]): string {
  return line.find((c) => !Number.isNaN(Number(c))) ?? "";
}

function findFirstOccurenceWithExtense(line: string, reverse = false): string {
  let subStr = "";
  for (let i = 0; i < line.length; i++) {
    const cur = line[i];
    if (!Number.isNaN(Number(cur))) {
      return cur;
    }

    subStr += cur;
    const extense = isInExtense(getStrArray(subStr, reverse).join(""));
    if (extense) {
      return extense;
    }
  }
  return "";
}

function getStrArray(value: string, reversed = false): string[] {
  const out = value.split("");
  if (reversed) {
    out.reverse();
  }
  return out;
}

part_1();
part_2();
