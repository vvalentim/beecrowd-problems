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
0`;
// const input = require("fs").readFileSync("/dev/stdin", "utf8");
const lines = input.split("\n");

const parseCases = (totalProperties) => {
  const city = {
    propertyAvgConsumptionKeys: [],
    residents: 0,
    consumption: 0,
    avgConsumption: 0,
  };

  let consumptionMap = new Map();
  let properties = lines.slice(1, totalProperties + 1);

  lines.splice(0, totalProperties + 1);

  for (const property of properties) {
    const values = property.split(" ");
    const residents = parseInt(values[0]);
    const consumption = parseInt(values[1]);
    const avg = Math.floor(consumption / residents);

    if (consumptionMap.has(avg)) {
      consumptionMap.set(avg, consumptionMap.get(avg) + residents);
    } else {
      consumptionMap.set(avg, residents);
      city.propertyAvgConsumptionKeys.push(avg);
    }

    city.residents += residents;
    city.consumption += consumption;
  }

  city.propertyAvgConsumptionKeys = city.propertyAvgConsumptionKeys.sort((a, b) => a - b);
  city.avgConsumption = city.consumption / city.residents;

  return {
    propertiesAvgAsString: city.propertyAvgConsumptionKeys.map((key) => `${consumptionMap.get(key)}-${key}`).join(" "),
    avgConsumption: city.avgConsumption,
  };
};

let caseNum = 1;
let totalProperties = parseInt(lines[0]);

while (totalProperties > 0) {
  const result = parseCases(totalProperties);

  console.log(`Cidade# ${caseNum}:`);
  console.log(result.propertiesAvgAsString);

  if (result.avgConsumption.toString().includes(".")) {
    console.log(`Consumo medio: ${result.avgConsumption.toString().match(/^\d+(?:\.\d{0,2})?/)} m3.`);
  } else {
    console.log(`Consumo medio: ${result.avgConsumption}.00 m3.`);
  }

  totalProperties = parseInt(lines[0]);
  caseNum += 1;

  if (totalProperties === 0) {
    break;
  }

  console.log();
}
