async function part1() {
  const file = await Deno.readTextFile("./input.txt");
  const input = file.split("\n").filter((i) => i != "");

  let out = 0;
  for (const line of input) {
    for (const match of line.match(/mul\(\d+,\d+\)/gm)) {
      const [x, y] = match.match(/\d+/g);
      out += x * y;
    }
  }
  console.log(`Part 1: ${out}`);
}

async function part2() {
  const file = await Deno.readTextFile("./input.txt");
  const input = file.split("\n").filter((i) => i != "");

  let out = 0;
  let multiply = true;
  for (const line of input) {
    for (const match of line.match(/(mul\(\d+,\d+\)|do\(\)|don\'t\(\))/gm)) {
      if (match.includes("mul")) {
        if (multiply) {
          const [x, y] = match.match(/\d+/g);
          out += x * y;
        }
        continue;
      }

      multiply = match === "do()";
    }
  }
  console.log(`Part 2: ${out}`);
}

part1();
part2();
