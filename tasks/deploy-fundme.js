const{ task } = require("hardhat/config")
task("deploy-fundme","部署合约").setAction(async(TASK_COMPILE_GET_REMAPPINGS,hre)=>{
  // create factory 
    // 要使用 await 关键字，不然fundMeFactory可能为空值
    const fundMeFactory =await ethers.getContractFactory("FundMe")
    console.log(`开始部署合约`)
    // deploy contract from factory
    // FundMe构造函数入参为10
    const fundMe = await fundMeFactory.deploy(300)


    await fundMe.waitForDeployment()
    console.log(`合约部署成功,地址为${fundMe.target}`)
    if (hre.network.config.chainId==11155111 && process.env.ETHERSCAN_KEY){
        console.log(`等待5个出块确认`)
        await fundMe.deploymentTransaction().wait(5)
        await verifyFundMe(fundMe.target,[300])
    }else{
        console.log("跳过验证合约")
    }
})

async function verifyFundMe(fundMeAddr,args) {
    await hre.run("verify:verify", {
        address:fundMeAddr,
        constructorArguments: args,
      });
    
}
module.exports={}