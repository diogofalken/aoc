import { readFileSync } from "node:fs";
import path from "node:path";
import { argv } from "node:process";

const MaxValues: Record<string, number> = { red: 12, green: 13, blue: 14 };

function part_1() {
  const file = readFileSync(path.resolve(__dirname, argv[2]), "utf-8");
  const input = file.split("\n");

  let acc = 0;
  for (let i = 0; i < input.length; i++) {
    let [game, ...rawPlays] = input[i]
      .split(/[:;,]/)
      .map((item) => item.trim());

    const plays: Record<string, number> = { red: 0, green: 0, blue: 0 };

    let valid = true;
    for (let j = 0; j < rawPlays.length; j++) {
      const [number, color] = rawPlays[j].split(" ");
      plays[color] += Number(number);

      if (Number(number) > MaxValues[color]) {
        valid = false;
        break;
      }
    }
    const gameNumber = game.match(/\d+/)![0];
    if (valid) {
      acc += Number(gameNumber);
    }
  }

  console.log(`Part 1: ${acc}`);
}

function part_2() {
  const file = readFileSync(path.resolve(__dirname, argv[2]), "utf-8");
  const input = file.split("\n");

  let acc = 0;
  for (let i = 0; i < input.length; i++) {
    let [_, ...rawPLays] = input[i].split(/[:;,]/).map((item) => item.trim());

    const plays: Record<string, number[]> = { red: [], green: [], blue: [] };

    for (let j = 0; j < rawPLays.length; j++) {
      const [number, color] = rawPLays[j].split(" ");
      plays[color].push(Number(number));
    }

    acc +=
      Math.max(...plays["red"]) *
      Math.max(...plays["green"]) *
      Math.max(...plays["blue"]);
  }

  console.log(`Part 2: ${acc}`);
}

part_1();
part_2();
