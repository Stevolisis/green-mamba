require("@nomicfoundation/hardhat-toolbox");
require("@nomicfoundation/hardhat-ignition");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.24",
  networks:{
    // fantomtest:{
    //   url: process.env.FANTOM_PROVIDER_URL,
    //   accounts:[`0x${process.env.FANTOM_PRIVATE_KEY}`]
    // },
    // amoy:{
    //   url: "https://polygon-amoy.infura.io/v3/92f7d1a479bf40ada16cc4d7d17d33ea",
    //   accounts: ["23f8f70fd11981e4abbbaf19fb28e7a73a80f8a7a7d0569496d808c44bbb1b1e"]
    // }
    sepolia:{
      url: "https://sepolia.infura.io/v3/92f7d1a479bf40ada16cc4d7d17d33ea",
      accounts: ["23f8f70fd11981e4abbbaf19fb28e7a73a80f8a7a7d0569496d808c44bbb1b1e"]
    }
  }
};
//faucet.fantom.network
//npx hardhat ignition deploy ignition/modules/Author.js --network fantomtest
//npx hardhat ignition deploy ignition/modules/Author.js --sepolis --reset      //if inconsistency detected
//0xb3B6eb860768574A7817889E9167ED1A080E647e   //Author
//0xFa21d4aeff75F5BB587362dAf38E54BC7A8d9880   //Article
//npx hardhat test test/Article.js
