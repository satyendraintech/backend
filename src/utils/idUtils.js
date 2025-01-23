const { v4: uuidv4 } = require("uuid");

let numericCounter = 0;

async function generateUniqueId() {
  numericCounter += 1;
  const uuid = uuidv4();
  const uniqueId = `${uuid}${numericCounter}`;
  return uniqueId;
}

module.exports = generateUniqueId;
