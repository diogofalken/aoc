import { readFileSync } from "node:fs";
import path from "node:path";
import { argv } from "node:process";

// destination, source, range
type LineMap = [number, number, number];

function part_1() {
  const file = readFileSync(path.resolve(__dirname, argv[2]), "utf-8");
  const [seedsLine, ...input] = file.split("\n").filter(i => i !== '');

  const [_, numbers] = seedsLine.split(": ");
  const seeds = numbers.trim().split(' ').map(Number);

  const almanac = getAlmanac(input);

  let acc = Number.MAX_SAFE_INTEGER;
  for (const seed of seeds) {
    const currentValue = searchLocationBySeed(almanac, seed);
    if (currentValue < acc) {
      acc = currentValue;
    }
  }

  console.log(`Part 1: ${acc}`);
}

function part_2() {
  const file = readFileSync(path.resolve(__dirname, argv[2]), "utf-8");
  const [seedsLine, ...input] = file.split("\n").filter(i => i !== '');

  const [_, numbers] = seedsLine.split(": ");
  const seeds = numbers.trim().split(' ').map(Number);

  const seedRanges: [number, number][] = [];
  for (let i = 0; i < seeds.length - 1; i += 2) {
    seedRanges.push([seeds[i], seeds[i] + seeds[i + 1]]);
  }

  const almanac = getAlmanac(input);

  // Get only the locations mapping
  const locations = almanac[almanac.length - 1];

  let acc = Number.MAX_SAFE_INTEGER;
  for (const location of locations) {
    const [destination] = location;

    const seed = searchSeedByLocation(almanac, destination);
    for (const [min, max] of seedRanges) {
      if (isContained([min, max], seed) && destination < acc) {
        acc = destination;
      }
    }
  }

  console.log(`Part 2: ${acc}`);
}

function isContained([min, max]: [number, number], value: number) {
  return min <= value && max >= value;
}

function searchLocationBySeed(almanac: LineMap[][], seed: number) {
  let currentValue = seed;
  for (let r = 0; r < almanac.length; r++) {
    for (let c = 0; c < almanac[r].length; c++) {
      const [destination, source, range] = almanac[r][c];
      if (isContained([source, source + range], currentValue)) {
        currentValue = currentValue + (destination - source);
        break;
      }
    }
  }
  return currentValue;
};

function searchSeedByLocation(almanac: LineMap[][], location: number) {
  let currentValue = location;
  for (let r = almanac.length - 1; r >= 0; r--) {
    for (let c = 0; c < almanac[r].length; c++) {
      const [destination, source, range] = almanac[r][c];
      if (isContained([destination, destination + range - 1], currentValue)) {
        currentValue = currentValue + (source - destination);
        break;
      }
    }
  }
  return currentValue;
}

function getAlmanac(input: string[]) {
  const rules: LineMap[][] = [];

  let curRules: any = [];
  for (let i = 0; i < input.length; i++) {
    const line = input[i];

    if (line.includes('map') || i === input.length - 1) {
      if (i === input.length - 1) {
        const [destination, source, range] = new Array(...line.matchAll(/\d+/g)).map(v => Number(v[0]));
        curRules.push([destination, source, range]);
      }

      if (curRules.length > 0) {
        rules.push(curRules);
      }
      curRules = [];
      continue;
    }

    const [destination, source, range] = new Array(...line.matchAll(/\d+/g)).map(v => Number(v[0]));
    curRules.push([destination, source, range]);
  }

  return rules;
}

part_1();
part_2();