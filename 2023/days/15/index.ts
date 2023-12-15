import { readFileSync } from "node:fs";
import path from "node:path";
import { argv } from "node:process";

function hash(str: string) {
  return str
    .split("")
    .reduce((hash, cur) => ((hash + cur.charCodeAt(0)) * 17) % 256, 0);
}

function part_1() {
  const file = readFileSync(path.resolve(__dirname, argv[2]), "utf-8");
  const input = file.split(",");

  const sum = input.reduce((sum, cur) => sum + hash(cur), 0);

  console.log(`Part 1: ${sum}`);
}

function part_2() {
  const file = readFileSync(path.resolve(__dirname, argv[2]), "utf-8");
  const input = file.split(",");

  const boxes = new Map<number, string[]>();

  for (let str of input) {
    const [label, focal] = str.split(/[=-]/g);
    const operation = focal ? 1 : 0; // 1 - ADD; 0 - REMOVE
    const box = hash(label);

    let current = [...(boxes.get(box) ?? [])];
    const id = `${label} ${focal}`;
    if (operation) {
      const exists = current.findIndex((c) => c.includes(label));
      if (exists !== -1) {
        current.splice(exists, 1, id);
      } else {
        current.push(id);
      }
    } else {
      current = current.filter((c) => c.split(" ")[0] !== label);
    }

    boxes.set(box, current);
  }

  const sum = [...boxes.entries()].reduce(
    (acc, [box, lenses]) =>
      acc +
      lenses.reduce(
        (sum, cur, index) =>
          sum + (box + 1) * (index + 1) * Number(cur.split(" ")[1]),
        0
      ),
    0
  );

  console.log(`Part 2: ${sum}`);
}

part_1();
part_2();
