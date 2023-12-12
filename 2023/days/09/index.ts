import { readFileSync } from "node:fs";
import path from "node:path";
import { argv } from "node:process";

function parseInput() {
  const file = readFileSync(path.resolve(__dirname, argv[2]), "utf-8");
  const input = file.split("\n");

  const allSequences = [];
  for (let i = 0; i < input.length; i++) {
    const numbers = input[i].split(" ").map(Number);
    const sequences: number[][] = [[...numbers]];

    while (sequences[sequences.length - 1].some((s) => s !== 0)) {
      const curSequence = [];
      const cur = sequences[sequences.length - 1];
      for (let j = 0; j < cur.length - 1; j++) {
        curSequence.push(cur[j + 1] - cur[j]);
      }
      sequences.push(curSequence);
    }
    allSequences.push(sequences);
  }

  return allSequences;
}

function part_1() {
  const sequences = parseInput().reverse();

  for (let i = 0; i < sequences.length; i++) {
    let lastValue = 0;
    for (let j = sequences[i].length - 1; j >= 0; j--) {
      const value = lastValue + sequences[i][j][sequences[i][j].length - 1];
      sequences[i][j].push(value);
      lastValue = value;
    }
  }

  const acc = sequences
    .map((c) => c[0])
    .map((c) => c[c.length - 1])
    .reduce((acc, cur) => acc + cur, 0);
  console.log(`Part 1: ${acc}`);
}

function part_2() {
  const sequences = parseInput();

  for (let i = 0; i < sequences.length; i++) {
    const inversedSequence = sequences[i].reverse();
    for (let j = 1; j < inversedSequence.length; j++) {
      inversedSequence[j].unshift(
        inversedSequence[j][0] - inversedSequence[j - 1][0]
      );
    }
    inversedSequence.reverse();
  }

  const acc = sequences
    .map((c) => c[0])
    .map((c) => c[0])
    .reduce((acc, cur) => acc + cur, 0);

  console.log(`Part 2: ${acc}`);
}

part_1();
part_2();
