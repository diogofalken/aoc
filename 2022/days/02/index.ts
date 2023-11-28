import { readFileSync } from "node:fs";
import path from "node:path";
import { argv } from "node:process";

type Play = "ROCK" | "PAPER" | "SCISSORS";
type Result = "LOSE" | "DRAW" | "WIN";

const TRANSLATION: Record<string, Play> = {
  A: "ROCK",
  X: "ROCK",
  B: "PAPER",
  Y: "PAPER",
  C: "SCISSORS",
  Z: "SCISSORS",
};

const LOSER_WINNER_PLAYS: Record<Play, Play> = {
  ROCK: "PAPER",
  PAPER: "SCISSORS",
  SCISSORS: "ROCK",
};

const POINTS: Record<Play | Result, number> = {
  ROCK: 1,
  PAPER: 2,
  SCISSORS: 3,
  LOSE: 0,
  DRAW: 3,
  WIN: 6,
};

function getResult(a: Play, b: Play): Result {
  if (a === b) {
    return "DRAW";
  }
  return LOSER_WINNER_PLAYS[a] === b ? "WIN" : "LOSE";
}

function getPlay(play: string): Play {
  return TRANSLATION[play];
}

function calculatePoints(play: Play, result: Result) {
  return POINTS[play] + POINTS[result];
}

function part_1(opponent: string, you: string): number {
  const result = getResult(getPlay(opponent), getPlay(you));
  return calculatePoints(getPlay(you), result);
}

function part_2(opponent: string, you: string): number {
  let yourPlay = getPlay(opponent); // Default is draw
  switch (you) {
    case "X":
      yourPlay = Object.entries(LOSER_WINNER_PLAYS).find(
        ([_, winner]) => winner === yourPlay
      )![0] as Play;
      break;
    case "Z":
      yourPlay = LOSER_WINNER_PLAYS[getPlay(opponent)];
      break;
  }

  const result = getResult(getPlay(opponent), yourPlay);
  return calculatePoints(yourPlay, result);
}

function main(part: 1 | 2) {
  const file = readFileSync(path.resolve(__dirname, argv[2]), "utf-8");
  const input = file.split("\n");

  let acc = 0;
  for (const play of input) {
    const [opponent, you] = play.split(" ");
    const result = getResult(getPlay(opponent), getPlay(you));
    acc += part === 1 ? part_1(opponent, you) : part_2(opponent, you);
  }
  console.log(`Part ${part}: ${acc}`);
}

main(1);
main(2);
