const path = require("path");
const fs = require("fs");

module.exports = {
  getMock: (mockName) => {
    return fs.readFileSync(
      path.join(process.cwd(), "tests/mocks", mockName),
      { encoding: "utf-8" }
    );
  }
}