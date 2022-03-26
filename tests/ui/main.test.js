const { execSync } = require("child_process");

test("Assert that help message output when is required", () => {
  const msg = "WOTD is a binary that look for and downloads the word of the day from the selected dictionary.";
  const stdout = execSync("binaries/wotd-macos -h").toString();

  expect(stdout).toContain(msg);
});

test("Assert that execution returns any result in english", () => {
  const msgs = [
    "The word of the day is:", 
    "There was an error while retrieving the word of the day."
  ];
  const stdout = execSync("binaries/wotd-macos").toString();

  expect(msgs.find(msg => stdout.includes(msg))).toBeDefined();
}, 10000);

test("Assert that execution returns any result in spanish", () => {
  const msgs = [
    "La palabra del día es:",
    "Ha ocurrido un error al recuperar la palabra del día.",
  ];
  const stdout = execSync("binaries/wotd-macos -l es").toString();

  expect(msgs.find((msg) => stdout.includes(msg))).toBeDefined();
}, 10000);