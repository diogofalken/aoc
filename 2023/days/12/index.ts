import { readFileSync } from "node:fs";
import path from "node:path";
import { argv } from "node:process";

const cache = new Map<string, number>();

function count(record: string, specs: number[]) {
  if (record === "") {
    return specs.length === 0 ? 1 : 0;
  }

  if (specs.length === 0) {
    return record.includes("#") ? 0 : 1;
  }

  let key = [record, specs].join("");
  if (cache.has(key)) {
    return cache.get(key)!;
  }

  let result = 0;

  if (record[0] === "." || record[0] === "?") {
    result += count(record.slice(1), specs);
  }

  if (["#", "?"].includes(record[0])) {
    if (
      specs[0] <= record.length &&
      !record.slice(0, specs[0]).includes(".") &&
      (specs[0] === record.length || record[specs[0]] !== "#")
    ) {
      result += count(record.slice(specs[0] + 1), specs.slice(1));
    }
  }

  cache.set(key, result);
  return result;
}

function part_1() {
  const file = readFileSync(path.resolve(__dirname, argv[2]), "utf-8");
  const input = file.split("\n");

  let acc = 0;
  for (let i = 0; i < input.length; i++) {
    const [record, spec] = input[i].split(" ");
    const specs = spec.split(",").map(Number);
    acc += count(record, specs);
  }

  console.log(`Part 1: ${acc}`);
}

function part_2() {
  const file = readFileSync(path.resolve(__dirname, argv[2]), "utf-8");
  const input = file.split("\n");

  let acc = 0;
  for (let i = 0; i < input.length; i++) {
    const [rawRecord, rawSpec] = input[i].split(" ");

    let record = "";
    const specs = [];
    for (let j = 0; j < 5; j++) {
      specs.push(...rawSpec.split(",").map(Number));
      record += j === 0 ? rawRecord : "?" + rawRecord;
    }

    acc += count(record, specs);
  }
  console.log(`Part 2: ${acc}`);
}

part_1();
part_2();
