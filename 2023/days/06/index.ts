import { readFileSync } from "node:fs";
import path from "node:path";
import { argv } from "node:process";

function part_1() {
  const file = readFileSync(path.resolve(__dirname, argv[2]), "utf-8");
  const [timeLine, distanceLine] = file.split("\n");

  const time = timeLine.split(":")[1].trim().split(" ").filter(c => c !== '').map(Number);
  const distance = distanceLine.split(":")[1].trim().split(" ").filter(c => c !== '').map(Number);

  let acc = 1;
  for (let i = 0; i < time.length; i++) {
    const availableTime = time[i];
    const winningDistance = distance[i];

    let wins = 0;
    for (let h = 0; h < availableTime; h++) {
      const distance = h * (availableTime - h);
      if (distance > winningDistance) {
        wins++;
      }
    }

    acc *= wins;
  }

  console.log(`Part 1: ${acc}`);
}

function part_2() {
  const file = readFileSync(path.resolve(__dirname, argv[2]), "utf-8");
  const [timeLine, distanceLine] = file.split("\n");

  const time = timeLine.split(":")[1].replaceAll(" ", "");
  const distance = distanceLine.split(":")[1].replaceAll(" ", "");

  const availableTime = Number(time);
  const winningDistance = Number(distance);

  let acc = 1;
  let wins = 0;
  for (let h = 0; h < availableTime; h++) {
    const distance = h * (availableTime - h);
    if (distance > winningDistance) {
      wins++;
    }
  }

  acc *= wins;

  console.log(`Part 2: ${acc}`);
}

part_1();
part_2();
