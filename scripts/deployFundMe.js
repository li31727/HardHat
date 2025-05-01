// import ethers.js
// create main function
// execute main function

const  { ethers } =require("hardhat")

async function main(){
    // 要使用 await 关键字，不然fundMeFactory可能为空值
    const fundMeFactory =await ethers.getContractFactory("FundMe")
    const fundMe=fundMeFactory.attach("0x822D637c2c22319d5527141f8A5540f9D8dc1fbE")

    // - 初始化2个账户
    const [firstAccount,secondAccount]=await ethers.getSigners()
    // 查看合约账户信息
    const firstAccountBalanceOfFundMe = await fundMe.fundersToAmount(firstAccount.address)
    const secondAccountBalanceOfFundMe = await fundMe.fundersToAmount(secondAccount.address)
    console.log(`firstAccountBalanceOfFundMe:${firstAccountBalanceOfFundMe}`)
    console.log(`secondAccountBalanceOfFundMe:${secondAccountBalanceOfFundMe}`)

   // 查看合约余额
   const fundMeBalance=  await ethers.provider.getBalance(fundMe.target)
   console.log(`fundMeBalance:${fundMeBalance}`)

   // 退还
    const firstAccountBalance=  await ethers.provider.getBalance(firstAccount)
    console.log(`firstAccountBalance:${firstAccountBalance}`)
    fundMe.refund()
    // 直接查看余额可能还没更新需要等待
    fundMe.deploymentTransaction().wait(2)
    const firstAccountBalance1=  await ethers.provider.getBalance(firstAccount)
    console.log(`firstAccountBalance1:${firstAccountBalance1}`)

    const secondAccountBalance=  await ethers.provider.getBalance(secondAccount)
    console.log(`secondAccountBalance:${secondAccountBalance}`)
    fundMe.connect(secondAccount).refund()
    fundMe.deploymentTransaction().wait(2)
    const secondAccountBalance1=  await ethers.provider.getBalance(secondAccount)
    console.log(`secondAccountBalance1:${secondAccountBalance1}`)


}

async function verifyFundMe(fundMeAddr,args) {
    await hre.run("verify:verify", {
        address:fundMeAddr,
        constructorArguments: args,
      });
    
}
main().then().catch((error)=>{
    // 打印错误
    console.error(error)
    process.exit(1)
})