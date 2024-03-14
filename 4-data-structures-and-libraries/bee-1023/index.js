const input = `3
3 22
2 11
3 39
5
1 25
2 20
3 31
2 40
6 70
2
1 1
3 2
0 `;
// const input = require("fs").readFileSync("/dev/stdin", "utf8");
const lines = input.split("\n");

const parseProperty = (property) => {
  let [residents, consumption] = property.split(" ");

  residents = parseInt(residents);
  consumption = parseInt(consumption);

  return {
    residents,
    consumption,
    avgConsumption: Math.floor(consumption / residents),
  };
};

const parseCases = (index, amount, caseNum) => {
  const nextCaseIndex = index + amount + 1;
  const [start, end] = [index + 1, index + 1 + amount];

  const properties = lines
    .slice(start, end)
    .map((property) => parseProperty(property))
    .sort((p1, p2) => p1.avgConsumption - p2.avgConsumption);

  const city = properties.reduce(
    (city, property) => {
      city.propertiesAvgAsString.push(`${property.residents}-${property.avgConsumption}`);
      city.residents += property.residents;
      city.consumption += property.consumption;
      city.avgConsumption = city.consumption / city.residents;

      return city;
    },
    {
      propertiesAvgAsString: [],
      residents: 0,
      consumption: 0,
      avgConsumption: 0,
    }
  );

  console.log(`Cidade# ${caseNum}:`);
  console.log(city.propertiesAvgAsString.join(" "));

  if (city.avgConsumption.toString().includes(".")) {
    console.log(`Consumo medio: ${city.avgConsumption.toString().match(/^\d+(?:\.\d{0,2})?/)} m3.`);
  } else {
    console.log(`Consumo medio: ${city.avgConsumption}.00 m3.`);
  }

  return nextCaseIndex;
};

let caseNum = 0;
let currCaseIndex = 0;
let numProperties = parseInt(lines[currCaseIndex]);

while (numProperties > 0) {
  caseNum = caseNum + 1;
  currCaseIndex = parseCases(currCaseIndex, numProperties, caseNum);
  numProperties = parseInt(lines[currCaseIndex]);

  if (numProperties === 0) {
    break;
  }

  console.log();
}
