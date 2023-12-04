import { readFileSync } from "node:fs";
import path from "node:path";
import { argv } from "node:process";

function part_1() {
  const file = readFileSync(path.resolve(__dirname, argv[2]), "utf-8");
  const input = file.split("\n");

  const games = getGamesWins(input);

  const acc = Object.values(games)
    .filter((c) => c > 0)
    .reduce((acc, cur) => acc + 2 ** (cur - 1), 0);

  console.log(`Part 1: ${acc}`);
}

function part_2() {
  const file = readFileSync(path.resolve(__dirname, argv[2]), "utf-8");
  const input = file.split("\n");

  const games = getGamesWins(input);

  const counts = new Array(Object.keys(games).length).fill(1);
  for (let i = 0; i < Object.keys(games).length; i++) {
    const values = games[i + 1];

    for (let j = 1; j <= values; j++) {
      counts[j + i] += counts[i];
    }
  }

  const acc = counts.reduce((acc, cur) => acc + cur, 0);

  console.log(`Part 2: ${acc}`);
}

function getGamesWins(input: string[]) {
  const games: { [key in string]: number } = {};
  for (let i = 0; i < input.length; i++) {
    const [game, ...rest] = input[i].split(":");

    const [winning, plays] = rest
      .join("")
      .split(" | ")
      .map((c) => c.split(" ").filter((c) => c !== ""));

    let wins = 0;
    for (const cur of winning) {
      if (plays.includes(cur)) {
        wins++;
      }
    }

    const [gameNumber] = game.match(/\d+/)!;
    games[gameNumber] = wins;
  }
  return games;
}

part_1();
part_2();
