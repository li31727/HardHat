const{ task } = require("hardhat/config")
task("interact-fundme","合约交互")
    .addParam("addr","fundme 合约地址")
    .setAction(async(taskArgs,hre)=>{

        const fundMeFactory =await ethers.getContractFactory("FundMe")
        const fundMe=fundMeFactory.attach(taskArgs.addr)
        // - 初始化2个账户
        const [firstAccount,secondAccount]=await ethers.getSigners()
            // - 转账到合约
            //     - 第一个账户转账并查看合约余额
            //       默认是使用第一个账户
        const firstAccointTx=await fundMe.fund({value:ethers.parseEther("0.1")})
        await firstAccointTx.wait()
        
        //           查看合约余额
        const fundMeBalance=  await ethers.provider.getBalance(fundMe.target)
        console.log(`fundMeBalance:${fundMeBalance}`)
        
         //     - 第二个账户转账并查看合约余额
        const secondAccointTx=await fundMe.connect(secondAccount).fund({value:ethers.parseEther("0.1")})
        await secondAccointTx.wait()
        
        //           查看合约余额
        const fundMeBalanceSecond=  await ethers.provider.getBalance(fundMe.target)
        console.log(`fundMeBalance:${fundMeBalanceSecond}`)
        
        // 查看合约账户信息
        const firstAccountBalanceOfFundMe = await fundMe.fundersToAmount(firstAccount.address)
        const secondAccountBalanceOfFundMe = await fundMe.fundersToAmount(secondAccount.address)
        console.log(`firstAccountBalanceOfFundMe:${firstAccountBalanceOfFundMe}`)
        console.log(`secondAccountBalanceOfFundMe:${secondAccountBalanceOfFundMe}`)
        
        // // 退还
        // // 退还要满足退还时间限制 这里等待10个出块时间
        // wait5min(300000)
        // // 第一个账户退款
        // const firstAccountBalance=  await ethers.provider.getBalance(firstAccount)
        // console.log(`firstAccountBalance:${firstAccountBalance}`)

        // const firstAccountRefundTx= await fundMe.refund()
        // // 直接查看余额可能还没更新需要等待
        // const firstAccountBalance1=  await ethers.provider.getBalance(firstAccount)
        // console.log(`firstAccountBalance1:${firstAccountBalance1}`)

        // // 第二个账户退款
        // const secondAccountBalance=  await ethers.provider.getBalance(secondAccount)
        // console.log(`secondAccountBalance:${secondAccountBalance}`)

        // const secondAccountRefundTx= await fundMe.connect(secondAccount).refund()
        // // 直接查看余额可能还没更新需要等待
        // const secondAccountBalance1=  await ethers.provider.getBalance(secondAccount)
        // console.log(`secondAccountBalance1:${secondAccountBalance1}`)

    })
    function wait5min(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }



module.exports={}