const { buildModule } = require("@nomicfoundation/hardhat-ignition/modules");

module.exports = buildModule("ArticleModule", (m) => {
  const articleContract = m.contract("Articles",["0xb3B6eb860768574A7817889E9167ED1A080E647e"]);
  return { articleContract };
});
