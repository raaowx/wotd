const { Utils } = require("../../compiled/utils/utils");
const remote = "3.5.7";

test("Assert updated with same version", () => {
  expect(Utils.isUpdated("3.5.7", remote)).toBeTruthy();
});

test("Assert not updated with remote mayor version", () => {
  expect(Utils.isUpdated("2.0.0", remote)).not.toBeTruthy();
});

test("Assert not updated with remote minor version", () => {
  expect(Utils.isUpdated("3.4.0", remote)).not.toBeTruthy();
});

test("Assert not updated with remote patch version", () => {
  expect(Utils.isUpdated("3.5.6", remote)).not.toBeTruthy();
});

test("Assert updated with future version", () => {
  expect(Utils.isUpdated("4.0.0", remote)).toBeTruthy();
  expect(Utils.isUpdated("3.6.0", remote)).toBeTruthy();
  expect(Utils.isUpdated("3.5.8", remote)).toBeTruthy();
});