import { readFileSync } from "node:fs";
import path from "node:path";
import { argv } from "node:process";

function part_1() {
  const file = readFileSync(path.resolve(__dirname, argv[2]), "utf-8");
  const input = file.split("\n");

  let acc = 0;

  console.log(`Part 1: ${acc}`);
}

function part_2() {
  const file = readFileSync(path.resolve(__dirname, argv[2]), "utf-8");
  const input = file.split("\n");

  let acc = 0;

  console.log(`Part 2: ${acc}`);
}

part_1();
part_2();
