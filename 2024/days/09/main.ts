async function part1() {
  const file = await Deno.readTextFile("./input.txt");
  const [diskMap] = file
    .split("\n")
    .filter((l) => l !== "")
    .map((l) => l.split("").map(Number));

  const compacted: string[] = [];
  let id = 0;
  for (let i = 0; i < diskMap.length; i += 2) {
    const fileLength = diskMap[i];
    const freeSpace = diskMap[i + 1];

    for (let k = 0; k < fileLength; k++) {
      compacted.push(String(id));
    }

    for (let k = 0; k < freeSpace; k++) {
      compacted.push(".");
    }

    id++;
  }

  const nNumbers = compacted.filter((n) => n !== ".").length;
  let nextEmpty = compacted.findIndex((n) => n === ".");
  while (nextEmpty < nNumbers) {
    const nextToSwap = compacted.findLastIndex((n) => n !== ".");

    compacted[nextEmpty] = compacted[nextToSwap];
    compacted[nextToSwap] = ".";

    nextEmpty = compacted.findIndex((n) => n === ".");
  }

  const out = compacted
    .filter((v) => v !== ".")
    .reduce((p, v, i) => p + Number(v) * i, 0);

  console.log(`Part 1: ${out}`);
}

async function part2() {
  const file = await Deno.readTextFile("./input.txt");
  const [diskMap] = file
    .split("\n")
    .filter((l) => l !== "")
    .map((l) => l.split(""));

  const compressed = compress(diskMap);

  // Reversing because we want to start from right to left
  const needingSpace = compressed.filter((n) => !n.includes("E")).reverse();

  for (const cur of needingSpace) {
    const [repetition] = cur.split(":");
    const toSwapIdx = compressed.findIndex((cur) => {
      const [space, id] = cur.split(":");
      return id === "E" && Number(repetition) <= Number(space);
    });
    const needingSpaceIndex = compressed.findLastIndex((v) => v === cur);
    if (
      toSwapIdx !== -1 &&
      needingSpaceIndex !== -1 &&
      toSwapIdx < needingSpaceIndex
    ) {
      const [toSwapSpace] = compressed[toSwapIdx];
      if (toSwapSpace === repetition) {
        compressed[toSwapIdx] = compressed[needingSpaceIndex];
        compressed[needingSpaceIndex] = repetition + ":E";
      } else {
        // This is needed since we are compressing the empty spaces.
        // Imagine that we are moving 3 9's into an empty space of 4, we have to add the remainder of empty spaces right after.
        // [..., 4:E, ...] => [..., 3:9, 1:E, ...]
        const remainingSpace = Number(toSwapSpace) - Number(repetition);
        compressed[toSwapIdx] = compressed[needingSpaceIndex];
        compressed[needingSpaceIndex] = repetition + ":E";
        compressed.splice(toSwapIdx + 1, 0, `${remainingSpace}:E`);
      }
    }
  }

  const out = decompress(compressed).reduce(
    (acc, cur, idx) => (cur !== "." ? acc + idx * Number(cur) : acc),
    0,
  );

  console.log(`Part 2: ${out}`);
}

/**
 * This function compresses the string into the following format:
 * Before: 2333
 * After: 2:0,3:E,3:1,3:3
 *
 * {amount}:{id}
 * - id === "E" represents that is a empty space
 */
function compress(diskMap: string[]): string[] {
  const compressed: string[] = [];
  let id = 0;
  for (let i = 0; i < diskMap.length; i += 2) {
    const fileLength = diskMap[i];
    const freeSpace = diskMap[i + 1];

    compressed.push(`${fileLength}:${id}`);

    if (freeSpace) {
      compressed.push(`${freeSpace}:E`);
    }

    id++;
  }
  return compressed;
}

function decompress(compressed: string[]): string[] {
  const decompressed = [];
  for (const cur of compressed) {
    const [repetitions, id] = cur.split(":");
    for (let i = 0; i < Number(repetitions); i++) {
      decompressed.push(id === "E" ? "." : id);
    }
  }
  return decompressed;
}

part1();
part2();
