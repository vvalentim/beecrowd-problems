// const input = `4
// 1 / 2 + 3 / 4
// 1 / 2 - 3 / 4
// 2 / 3 * 6 / 6
// 1 / 2 / 3 / 4`;
const input = require("fs").readFileSync("/dev/stdin", "utf8");
const lines = input.split("\n");

const parseLine = (line) => {
  const [N1, _1, D1, OP, N2, _2, D2] = line.split(" ");

  return { N1, D1, N2, D2, OP };
};

const operations = {
  getResultExpression: (numerator, denominator) => ({
    result: `${numerator} / ${denominator}`,
    numerator: numerator,
    denominator: denominator,
  }),
  "+": function (values) {
    return this.getResultExpression(values.N1 * values.D2 + values.N2 * values.D1, values.D1 * values.D2);
  },
  "-": function (values) {
    return this.getResultExpression(values.N1 * values.D2 - values.N2 * values.D1, values.D1 * values.D2);
  },
  "*": function (values) {
    return this.getResultExpression(values.N1 * values.N2, values.D1 * values.D2);
  },
  "/": function (values) {
    return this.getResultExpression(values.N1 * values.D2, values.N2 * values.D1);
  },
};

const getGcd = (num1, num2, greatest = 1, curr = 2) => {
  if (num1 < curr || num2 < curr) {
    return greatest;
  }

  if (num1 % curr === 0 && num2 % curr === 0) {
    greatest = curr;
  }

  return getGcd(num1, num2, greatest, curr + 1);
};

const simplify = (expression) => {
  const result = operations[expression.OP](expression);
  let { numerator, denominator } = result;
  const numSign = numerator < 0;
  const denSign = denominator < 0;
  let gcd = getGcd(Math.abs(numerator), Math.abs(denominator));

  while (gcd !== 1) {
    numerator = numerator / gcd;
    denominator = denominator / gcd;
    gcd = getGcd(numerator, denominator);
  }

  let simplifiedNumerator = `${numSign ? -Math.abs(numerator) : numerator}`;
  let simplifiedDenominator = `${denSign ? -Math.abs(denominator) : denominator}`;

  return `${result.numerator}/${result.denominator} = ${simplifiedNumerator}/${simplifiedDenominator}`;
};

const numCases = lines[0];

for (let currCase = 1; currCase <= numCases; currCase++) {
  const expression = parseLine(lines[currCase]);
  const result = simplify(expression);

  console.log(result);
}
