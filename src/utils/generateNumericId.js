async function generateNumericId() {
  return new Promise((resolve) => {
    if (!global.numericCounter) {
      global.numericCounter = 0;
    }
    global.numericCounter += 1;
    resolve(`${global.numericCounter}`);
  });
}

module.exports = generateNumericId;
