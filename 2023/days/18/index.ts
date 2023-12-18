import { readFileSync } from "node:fs";
import path from "node:path";
import { argv } from "node:process";

type Coordinates = [number, number];
const DIR: Record<string, Coordinates> = {
  U: [-1, 0],
  D: [1, 0],
  R: [0, 1],
  L: [0, -1],
};

const DIR_TRANSLATION: Record<string, string> = {
  "3": "U",
  "1": "D",
  "0": "R",
  "2": "L",
};

// Shoelace
function getArea(points: Coordinates[]) {
  let area = 0;
  for (let i = 0; i < points.length; i++) {
    const [_pr, pc] = points.at(i - 1)!;
    const [cr] = points.at(i)!;
    const [_nr, nc] = points.at((i + 1) % points.length)!;
    area += cr * (pc - nc);
  }
  return Math.abs(area) / 2;
}

function getInsideVertices(area: number, boundaries: number) {
  return area - boundaries / 2 + 1;
}

function getBoundaries(input: string[]) {
  const points: Coordinates[] = [[0, 0]];
  let boundaries = 0;

  for (let line of input) {
    const [dir, num] = line.split(" ");
    const [dr, dc] = DIR[dir];
    const n = Number(num);
    boundaries += n;
    const [lr, lc] = points[points.length - 1];
    points.push([lr + dr * n, lc + dc * n]);
  }

  return { points, boundaries };
}

function part_1() {
  const file = readFileSync(path.resolve(__dirname, argv[2]), "utf-8");
  const input = file.split("\n");

  const { points, boundaries } = getBoundaries(input);

  const area = getArea(points);
  const inside = getInsideVertices(area, boundaries);
  const cubic = boundaries + inside;

  console.log(`Part 1: ${cubic}`);
}

function part_2() {
  const file = readFileSync(path.resolve(__dirname, argv[2]), "utf-8");
  const input = file.split("\n").map((l) => {
    const hex = l
      .match(/\((.*?)\)/)![0]
      .replaceAll(/[()#]/g, "")
      .split("");
    const dir = DIR_TRANSLATION[hex.pop()!];
    return [dir, Number(parseInt(hex.join(""), 16))].join(" ");
  });

  const { points, boundaries } = getBoundaries(input);

  const area = getArea(points);
  const inside = getInsideVertices(area, boundaries);
  const cubic = boundaries + inside;

  console.log(`Part 2: ${cubic}`);
}

part_1();
part_2();
