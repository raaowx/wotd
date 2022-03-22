const { getMock } = require("../helpers/fs.helper");
const { Cherioer } = require("../../compiled/utils/cherioer");

test("Assert that an HTML is successfully loaded", () => {
  const html = getMock("index.html");
  const obj = Cherioer.convert(html);

  expect(obj("h1").text()).toBe("INDEX");
});