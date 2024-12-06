const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ArticleModule", (m) => {
  const articleContract = m.contract("Articles",["0xBEd40172ACaaBBcE4562C0f0fd66FC3a94eD8B7B"]);
  return { articleContract };
});
