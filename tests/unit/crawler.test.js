const { getEpoch } = require("../helpers/date.helper");
const { Crawler } = require("../../compiled/utils/crawler");

test("Assert that the crawler waits its default value", async () => {
  const start = getEpoch();
  await Crawler.delay();
  const end = getEpoch();

  expect(end - start).toBe(3);
});

test("Assert that the crawler waits a received value", async () => {
  const start = getEpoch();
  await Crawler.delay(5);
  const end = getEpoch();

  expect(end - start).toBe(5);
}, 7000);