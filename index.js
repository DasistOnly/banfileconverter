const fs = require("fs");

const input = fs.readFileSync("./input.json", "utf8");
const data = JSON.parse(input);
const output = {};

data.forEach((entry, index) => {
  const identifiers = {};

  entry.identifiers.forEach((identifier) => {
    const [type, value] = identifier.split(":");

    identifiers[type] = value;
  });

  const tokens = [];

  const possible_tokens = ["3", "4", "5", "2"];

  possible_tokens.forEach((signature) => {
    if (identifiers[signature]) {
      tokens.push(signature + ":" + identifiers[signature]);
    }
  });

  output[index + 1] = {
    license: "license:" + identifiers.license || "",
    tokens: tokens,
    discord: identifiers.discord || "",
    manual: false,
    fg_ts: {},
    reason: entry.reason || "",
    name: entry.name || "",
    steam: "steam:" + identifiers.steam || "",
    live: identifiers.live ? "live:" + identifiers.live : "",
    xbl: identifiers.xbl ? "xbl:" + identifiers.xbl : "",
    ip: identifiers.ip || "",
  };
});

fs.writeFileSync("./output.json", JSON.stringify(output));