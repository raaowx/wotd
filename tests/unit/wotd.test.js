const { WOTD } = require("../../compiled/model/wotd");

test("Assert that an WOTD object is created", () => {
  const wotd = new WOTD("foo", "https://foo.bar");

  expect(typeof wotd).toBe("object");
});

test("Assert that an WOTD object returns its data", () => {
  const wotd = new WOTD("foo", "https://foo.bar");

  expect(wotd.getName()).not.toBeNull();
  expect(wotd.getUrl()).not.toBeNull();
});