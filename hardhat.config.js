require("@nomicfoundation/hardhat-toolbox");
require("@chainlink/env-enc").config() // 导入.env.enc配置
require("./tasks")
require("hardhat-deploy") // 导入hardhat-deploy


// 获取.env文件配置
SEPOLIA_URL=process.env.SEPOLIA_URL
PRIVATE_KEY=process.env.PRIVATE_KEY
PRIVATE_KEY_1=process.env.PRIVATE_KEY_1

ETHERSCAN_KEY =process.env.ETHERSCAN_KEY


/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.28",
  defaultNetwork:"hardhat",
  mocha:{
    timeout:300000
  },
  networks:{
    sepolia:{
      // Alchemy,Infra,QuickNode,需要在其相应网站设置apikey,
      // 这里使用Infra： https://developer.metamask.io/key/active-endpoints
      // 测试网为 sepolia
      url:SEPOLIA_URL,
      accounts:[PRIVATE_KEY,PRIVATE_KEY_1],
      chainId:11155111
    }
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey: {
      sepolia: ETHERSCAN_KEY
    }
  },
  gasReporter: {
    enabled: false,
  }
};
