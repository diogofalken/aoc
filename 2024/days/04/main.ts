async function part1() {
  const file = await Deno.readTextFile("./test.txt");
  const input: string[][] = file
    .split("\n")
    .filter((i) => i != "")
    .map((i) => i.split(""));

  const m = input;

  let out = 0;
  for (let r = 0; r < m.length; r++) {
    const line = m[r];
    for (let c = 0; c <= m[0].length; c++) {
      const tries = [];

      // Line
      if (c <= m[0].length - 4) {
        tries.push(line.slice(c, c + 4));
      }

      // Column
      if (r <= m.length - 4) {
        const cols = Array.from([0, 1, 2, 3]).map((i) => m[r + i][c]);
        tries.push(cols);
      }

      // Left Diagonal
      if (r <= m.length - 4 && c <= m[0].length - 4) {
        tries.push(Array.from([0, 1, 2, 3]).map((i) => m[r + i][c + i]));
      }
      // Right Diagonal
      if (r <= m.length - 4 && c >= 3) {
        tries.push(Array.from([0, 1, 2, 3]).map((i) => m[r + i][c - i]));
      }

      for (const cur of tries.map((t) => t.join(""))) {
        if (cur === "XMAS" || cur === "SAMX") {
          out++;
        }
      }
    }
  }
  console.log(`Part 1: ${out}`);
}

async function part2() {
  const file = await Deno.readTextFile("./test.txt");
  const input: string[][] = file
    .split("\n")
    .filter((i) => i != "")
    .map((i) => i.split(""));

  const m = input;

  let out = 0;
  for (let r = 0; r < m.length; r++) {
    for (let c = 0; c < m[0].length; c++) {
      if (m[r][c] === "A" && r > 0 && r < m.length - 1) {
        const dig1 = [m[r - 1][c - 1], m[r][c], m[r + 1][c + 1]].join("");
        const dig2 = [m[r - 1][c + 1], m[r][c], m[r + 1][c - 1]].join("");
        if (
          (dig1 === "MAS" || dig1 === "SAM") &&
          (dig2 === "MAS" || dig2 === "SAM")
        ) {
          out++;
        }
      }
    }
  }

  console.log(`Part 2: ${out}`);
}

part1();
part2();
