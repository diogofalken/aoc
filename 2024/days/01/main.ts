async function part1() {
  const input = await readInput();

  const list1 = [];
  const list2 = [];

  for (const [x, y] of input) {
    list1.push(x);
    list2.push(y);
  }
  list1.sort();
  list2.sort();

  let out = 0;
  for (let i = 0; i < list1.length; i++) {
    out += Math.abs(Number(list1[i]) - Number(list2[i]));
  }

  console.log(`Part 1: ${out}`);
}

async function part2() {
  const input = await readInput();

  const list1: number[] = [];
  const list2 = new Map<number, number>();

  for (const [x, y] of input) {
    list1.push(x);
    list2.set(y, (list2.get(y) ?? 0) + 1);
  }

  let out = 0;
  for (let i = 0; i < list1.length; i++) {
    out += list1[i] * (list2.get(list1[i]) ?? 0);
  }

  console.log(`Part 2: ${out}`);
}

async function readInput(): Promise<number[][]> {
  const file = await Deno.readTextFile("./input.txt");
  return file
    .split("\n")
    .map((l) => l.match(/\d+/g)?.map(Number))
    .filter((i) => i !== undefined);
}

part1();
part2();
