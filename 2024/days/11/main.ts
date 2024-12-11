async function part1() {
  const file = await Deno.readTextFile("./test.txt");
  const input = file
    .split("\n")
    .filter((l) => l !== "")
    .flatMap((l) => l.split(" ").map(Number));

  const out = countStones(input, 25);

  console.log(`Part 1: ${out}`);
}

async function part2() {
  const file = await Deno.readTextFile("./test.txt");
  const input = file
    .split("\n")
    .filter((l) => l !== "")
    .flatMap((l) => l.split(" ").map(Number));

  const out = countStones(input, 75);

  console.log(`Part 2: ${out}`);
}

function countStones(stones: number[], blinks: number): number {
  const cache = new Map<string, number>();
  const addCache = (stone: number, steps: number, result: number) =>
    cache.set(`${stone}:${steps}`, result);
  const getCache = (stone: number, steps: number) =>
    cache.get(`${stone}:${steps}`);

  const deepCount = (stone: number, steps: number) => {
    if (steps === 0) return 1;

    const cached = getCache(stone, steps);
    if (cached) return cached;

    let counter = 0;
    if (stone === 0) {
      counter = deepCount(1, steps - 1);
    } else if (stone.toString().length % 2 === 0) {
      const strStone = stone.toString();
      counter =
        deepCount(
          Number(strStone.substring(0, strStone.length / 2)),
          steps - 1,
        ) +
        deepCount(
          Number(strStone.substring(strStone.length / 2, strStone.length)),
          steps - 1,
        );
    } else {
      counter = deepCount(stone * 2024, steps - 1);
    }

    addCache(stone, steps, counter);
    return counter;
  };

  return stones.reduce((acc, stone) => acc + deepCount(stone, blinks), 0);
}

part1();
part2();
