import { permutationsWithReplacement } from "https://deno.land/x/combinatorics@1.1.2/permutations_with_replacement.ts";

async function part1() {
  const file = await Deno.readTextFile("./test.txt");
  const input = file.split("\n").filter((l) => l !== "");

  const out = calculateCalibrationResult(input, ["+", "*"]);

  console.log(`Part 1: ${out}`);
}

async function part2() {
  const file = await Deno.readTextFile("./test.txt");
  const input = file.split("\n").filter((l) => l !== "");

  const out = calculateCalibrationResult(input, ["+", "*", "||"]);

  console.log(`Part 2: ${out}`);
}

function calculateCalibrationResult(input: string[], operators: string[]) {
  let calibratrion = 0;
  for (const line of input) {
    const [result, raw] = line.split(": ");

    const equation = raw.split(" ").map(Number);

    for (const ops of Array.from(
      permutationsWithReplacement(operators, equation.length - 1),
    )) {
      let curCalibration = equation[0];
      for (let i = 1; i < equation.length; i++) {
        const op = ops.shift();
        switch (op) {
          case "+":
            curCalibration += equation[i];
            break;
          case "*":
            curCalibration *= equation[i];
            break;
          case "||":
            curCalibration = Number(
              String(curCalibration) + String(equation[i]),
            );
            break;
        }
      }

      if (curCalibration === Number(result)) {
        calibratrion += Number(result);
        break;
      }
    }
  }
  return calibratrion;
}

part1();
part2();
