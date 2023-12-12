import { readFileSync } from "node:fs";
import path from "node:path";
import { argv } from "node:process";

type Coordinates = [number, number];

class Queue<T> {
  elements: T[];

  constructor(starting?: T[]) {
    this.elements = starting ?? [];
  }

  enqueue(element: T) {
    this.elements.push(element);
  }

  dequeue() {
    return this.elements.shift();
  }

  isEmpty() {
    return this.elements.length === 0;
  }
}

function part_1() {
  const { loop } = parseInput();

  const farthest = loop.size / 2;

  console.log(`Part 1: ${farthest}`);
}

function part_2() {
  const { tiles, loop } = parseInput();

  const outside = new Set();
  for (let r = 0; r < tiles.length; r++) {
    let within = false;
    let up = null;
    for (let c = 0; c < tiles[r].length; c++) {
      const tile = tiles[r][c];
      if (tile === "|") {
        within = !within;
      } else if (["L", "F"].includes(tile)) {
        up = tile === "L";
      } else if (["7", "J"].includes(tile)) {
        if (tile !== (up ? "J" : "7")) {
          within = !within;
        }
        up = null;
      }

      if (!within) {
        outside.add([r, c].join());
      }
    }
  }

  const total =
    tiles.length * tiles[0].length - new Set([...outside, ...loop]).size;

  console.log(`Part 2: ${total}`);
}

function parseInput() {
  const file = readFileSync(path.resolve(__dirname, argv[2]), "utf-8");
  const input = file.split("\n");

  let tiles = [];
  for (let i = 0; i < input.length; i++) {
    tiles.push([...input[i]]);
  }

  let startPos: Coordinates = [0, 0];
  for (let r = 0; r < tiles.length; r++) {
    for (let c = 0; c < tiles[r].length; c++) {
      if (tiles[r][c] === "S") {
        startPos = [r, c];
        break;
      }
    }
  }

  const loop = new Set([startPos.join()]);
  const queue = new Queue<Coordinates>([startPos]);

  let startValue = ["|", "-", "J", "L", "7", "F"];

  while (!queue.isEmpty()) {
    const [r, c] = queue.dequeue()!;
    const tile = tiles[r][c];

    // North
    if (
      r > 0 &&
      ["S", "|", "J", "L"].includes(tile) &&
      ["|", "7", "F"].includes(tiles[r - 1][c]) &&
      !loop.has([r - 1, c].join())
    ) {
      queue.enqueue([r - 1, c]);
      loop.add([r - 1, c].join());
      if (tile === "S") {
        startValue = startValue.filter((v) => ["|", "J", "L"].includes(v));
      }
    }

    // South
    if (
      r < tiles.length &&
      ["S", "|", "7", "F"].includes(tile) &&
      ["|", "L", "J"].includes(tiles[r + 1][c]) &&
      !loop.has([r + 1, c].join())
    ) {
      queue.enqueue([r + 1, c]);
      loop.add([r + 1, c].join());
      if (tile === "S") {
        startValue = startValue.filter((v) => ["|", "7", "F"].includes(v));
      }
    }

    // West
    if (
      c > 0 &&
      ["S", "-", "J", "7"].includes(tile) &&
      ["-", "L", "F"].includes(tiles[r][c - 1]) &&
      !loop.has([r, c - 1].join())
    ) {
      queue.enqueue([r, c - 1]);
      loop.add([r, c - 1].join());
      if (tile === "S") {
        startValue = startValue.filter((v) => ["-", "J", "7"].includes(v));
      }
    }

    // East
    if (
      c < tiles[0].length &&
      ["S", "-", "L", "F"].includes(tile) &&
      ["-", "J", "7"].includes(tiles[r][c + 1]) &&
      !loop.has([r, c + 1].join())
    ) {
      queue.enqueue([r, c + 1]);
      loop.add([r, c + 1].join());
      if (tile === "S") {
        startValue = startValue.filter((v) => ["-", "L", "F"].includes(v));
      }
    }
  }

  // Cleanup uneeded positions and change the S to the right symbol
  for (let r = 0; r < tiles.length; r++) {
    for (let c = 0; c < tiles[r].length; c++) {
      if (!loop.has([r, c].join())) {
        tiles[r][c] = ".";
      }
      if (tiles[r][c] === "S") {
        tiles[r][c] = startValue[0];
      }
    }
  }

  return { tiles, loop, startPos };
}

part_1();
part_2();
