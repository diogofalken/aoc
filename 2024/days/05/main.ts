async function part1() {
  const [orderingRules, updates] = await parsetInput();

  let out = 0;
  for (const update of updates) {
    let failed = false;

    for (let i = 0; i < update.length; i++) {
      const before = orderingRules.get(update[i]) ?? [];
      failed = Array.from(update.slice(i + 1)).some((i) => before.includes(i));
      if (failed) break;
    }

    if (!failed) {
      out += update[Math.floor(update.length / 2)];
    }
  }

  console.log(`Part 1: ${out}`);
}

async function part2() {
  const [orderingRules, updates] = await parsetInput();

  let out = 0;
  for (const update of updates) {
    let failed = false;

    for (let i = 0; i < update.length; i++) {
      const before = orderingRules.get(update[i]) ?? [];
      failed = Array.from(update.slice(i + 1)).some((i) => before.includes(i));
      if (failed) break;
    }

    if (failed) {
      update.sort((a, b) => {
        if ((orderingRules.get(a) ?? []).includes(b)) {
          return -1;
        } else if ((orderingRules.get(b) ?? []).includes(a)) {
          return 1;
        }
        return 0;
      });

      out += update[Math.floor(update.length / 2)];
    }
  }

  console.log(`Part 2: ${out}`);
}

async function parsetInput(): Promise<[Map<number, number[]>, number[][]]> {
  const file = await Deno.readTextFile("./input.txt");
  const input = file.split("\n");

  const orderingRules = new Map<number, number[]>();
  const updates: number[][] = [];

  for (const cur of input) {
    if (cur.includes("|")) {
      const [x, y] = cur.split("|").map(Number);
      if (!orderingRules.has(y)) {
        orderingRules.set(y, []);
      }
      orderingRules.get(y)?.push(x);
    } else if (cur !== "") {
      updates.push(cur.split(",").map(Number));
    }
  }
  return [orderingRules, updates];
}

part1();
part2();
