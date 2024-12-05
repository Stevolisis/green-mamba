const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("AuthorModule", (m) => {
  const authorContract = m.contract("Authors",[]);
  return { authorContract };
});
