// import { input_3068 as input } from "./input.js";

const input = require("fs").readFileSync("/dev/stdin", "utf8");

const lines = input.split("\n");

let currentLine = 0;
let testCase = 0;
let x1, y1, x2, y2, testingPoints, innerPoints, x, y;

while (lines.length) {
  [x1, y1, x2, y2] = lines[currentLine].split(" ").map(Number);
  currentLine++;

  if ((x1 | y1 | x2 | y2) == 0) {
    break;
  }

  testCase++;
  innerPoints = 0;

  testingPoints = Number(lines[currentLine]);
  currentLine++;

  while (testingPoints) {
    [x, y] = lines[currentLine].split(" ").map(Number);
    currentLine++;

    if (x1 <= x && x2 >= x && y1 >= y && y2 <= y) {
      innerPoints++;
    }

    testingPoints--;
  }

  console.log(`Teste ${testCase}\n${innerPoints}`);
}
