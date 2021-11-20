test("markets.json is valid", () => {
  const Ajv = require("ajv");
  const ajv = new Ajv(); // options can be passed, e.g. {allErrors: true}

  const schema = require("../markets.schema.json");

  const validate = ajv.compile(schema);

  const data = require("../markets.json");

  const valid = validate(data);

  if (!valid) console.log(validate.errors);

  expect(valid).toBe(true);
});
test("all tokens are keys in tokens", () => {
  const data = require("../markets.json");
  for (const sourceChain in data.tokenMarkets) {
    for (const targetChain in data.tokenMarkets[sourceChain]) {
      for (const address in data.tokenMarkets[sourceChain][targetChain]) {
        expect(data.tokens[sourceChain][address]).toBeDefined();
      }
    }
  }
});
test("all markets are keys in markets", () => {
  const data = require("../markets.json");
  for (const sourceChain in data.tokenMarkets) {
    for (const targetChain in data.tokenMarkets[sourceChain]) {
      for (const address in data.tokenMarkets[sourceChain][targetChain]) {
        data.tokenMarkets[sourceChain][targetChain][address].markets.forEach(
          (market) => {
            expect(data.markets[market]).toBeDefined();
          }
        );
      }
    }
  }
});
