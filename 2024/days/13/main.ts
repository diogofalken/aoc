async function part1() {
  const file = await Deno.readTextFile("./test.txt");
  const input = file
    .split("\n\n")
    .map((l) => l.match(/\d+/g) ?? [])
    .map((l) => l.map(Number));

  let out = 0;
  for (const [ax, ay, bx, by, px, py] of input) {
    let min = Number.MAX_SAFE_INTEGER;
    for (let i = 0; i < 100; i++) {
      for (let j = 0; j < 100; j++) {
        if (ax * i + bx * j === px && ay * i + by * j === py) {
          min = Math.min(min, 3 * i + j);
        }
      }
    }
    if (min !== Number.MAX_SAFE_INTEGER) out += min;
  }

  console.log(`Part 1: ${out}`);
}

// After checking this great explanation: https://www.youtube.com/watch?v=-5J-DAsWuJc&t=236s
async function part2() {
  const file = await Deno.readTextFile("./test.txt");
  const input = file
    .split("\n\n")
    .map((l) => l.match(/\d+/g) ?? [])
    .map((l) => l.map(Number));

  let out = 0;
  for (let [ax, ay, bx, by, px, py] of input) {
    px += 10000000000000;
    py += 10000000000000;

    const ac = (px * by - py * bx) / (ax * by - ay * bx);
    const bc = (px - ax * ac) / bx;
    if (ac % 1 === 0 && bc % 1 === 0) {
      out += Number(ac * 3 + bc);
    }
  }

  console.log(`Part 2: ${out}`);
}

part1();
part2();
