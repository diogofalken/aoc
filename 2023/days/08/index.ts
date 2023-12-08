import { readFileSync } from "node:fs";
import path from "node:path";
import { argv } from "node:process";

function part_1() {
  const { instructions, network } = parseInput();

  let steps = 0;
  let current = "AAA";
  for (let i = 0; i < instructions.length; i++) {
    steps++;
    current = network.get(current)![instructions[i]];
    if (current === "ZZZ") {
      break;
    }
    if (i === instructions.length - 1) {
      i = -1;
    }
  }

  console.log(`Part 1: ${steps}`);
}

function part_2() {
  const { instructions, network } = parseInput();

  let nodes = [...network.keys()].filter((n) => n.endsWith("A"));
  const nodesSteps = [];

  for (const node of nodes) {
    let current = node;

    let steps = 0;
    let stepsOfNode = [];
    let firstMatch = null;

    for (let i = 0; i < instructions.length; i++) {
      steps++;
      current = network.get(current)![instructions[i]];
      if (current.endsWith("Z")) {
        stepsOfNode.push(steps);
        if (current === firstMatch) {
          break;
        }
        if (firstMatch === null) {
          firstMatch = current;
        }
      }

      if (i === instructions.length - 1) {
        i = -1;
      }
    }

    nodesSteps.push(stepsOfNode);
  }

  const nums = nodesSteps.map((s) => s[0]);
  const lcm = nums.reduce(
    (lcm, num) => (lcm * num) / gcd(lcm, num),
    nums.pop()!
  );

  console.log(`Part 2: ${lcm}`);
}

function parseInput() {
  const file = readFileSync(path.resolve(__dirname, argv[2]), "utf-8");
  const [instructionsRaw, nodesInstructionsRaw] = file.split("\n\n");

  const instructions = instructionsRaw
    .split("")
    .map((i) => (i === "L" ? 0 : 1));
  const nodesInstructions = nodesInstructionsRaw.split("\n");

  const network = new Map<string, [string, string]>();
  for (let i = 0; i < nodesInstructions.length; i++) {
    const [source, rest] = nodesInstructions[i].split(" = ");
    const [left, right] = rest.replaceAll(/[()]/g, "").split(", ");
    network.set(source, [left, right]);
  }

  return { instructions, network };
}

function gcd(a: number, b: number) {
  if (!b) return a;
  return gcd(b, a % b);
}

part_1();
part_2();
