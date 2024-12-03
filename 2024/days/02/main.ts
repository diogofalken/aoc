async function part1() {
  const file = await Deno.readTextFile("./input.txt");
  const input = file.split("\n").filter((i) => i != "");

  let out = 0;
  for (const report of input) {
    const levels = report.split(" ").map(Number);

    let failed = false;
    const order = levels[0] > levels[1] ? "DESC" : "ASC";

    for (let i = 0; i < levels.length - 1; i++) {
      const diff = Math.abs(levels[i] - levels[i + 1]);
      if (
        (order === "DESC" && levels[i] < levels[i + 1]) ||
        (order === "ASC" && levels[i] > levels[i + 1]) ||
        diff < 1 ||
        diff > 3
      ) {
        failed = true;
        break;
      }
    }

    if (!failed) {
      out++;
    }
  }

  console.log(`Part 1: ${out}`);
}

async function part2() {
  const file = await Deno.readTextFile("./input.txt");
  const input = file.split("\n").filter((i) => i != "");

  let out = 0;
  const reports = input.map((report) => report.split(" ").map(Number));
  for (const level of reports) {
    const levelsToTry = [level];

    for (let i = 0; i < level.length; i++) {
      levelsToTry.push(level.filter((_, idx: number) => idx !== i));
    }

    for (const curLevel of levelsToTry) {
      let failed = 0;
      const order = curLevel[0] > curLevel[1] ? "DESC" : "ASC";
      for (let i = 0; i < curLevel.length - 1; i++) {
        const diff = Math.abs(curLevel[i] - curLevel[i + 1]);
        if (
          (order === "DESC" && curLevel[i] < curLevel[i + 1]) ||
          (order === "ASC" && curLevel[i] > curLevel[i + 1]) ||
          diff < 1 ||
          diff > 3
        ) {
          failed++;
          break;
        }
      }

      if (failed === 0) {
        out++;
        break;
      }
    }
  }

  console.log(`Part 2: ${out}`);
}

part1();
part2();
