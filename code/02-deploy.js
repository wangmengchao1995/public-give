let {bytecode, interface} = require('./01-compile')

//FundingFactory的bytecode和abi
// console.log('bytecode :', bytecode)
// console.log('interface :', interface)

//1. 导入web3， 导入的是web3类型，并不是实例, 需要我们自己new一下
let Web3 = require('web3')

//2. 创建一个web3的实例
let web3 = new Web3()

//3. 设置网络: 巧克力
web3.setProvider('http://127.0.0.1:7545')

//不再写成固定的地址，而是使用方法动态获取
// let account = '0xd5957914c31E1d785cCC58237d065Dd25C61c4D0'

//4. 准备部署的信息: bytecode， interface
let contract = new web3.eth.Contract(JSON.parse(interface))

let deploy = async () => {
    try {

        let accounts = await web3.eth.getAccounts()

        let res = await contract.deploy({
            data: bytecode, //合约二进制码
            //FundingFactory合约构造函数没有参数，不需要arguments字段
            // arguments: ["hello world"]  //这是合约的构造函数参数，使用数组格式, 注意不要拼写错误
        }).send({
            //5. 执行真正的部署动作（发起一笔交易）
            //交易发起人，gas上限，value，gasprice
            from: accounts[0], //部署的账户
            gas: '3000000', //gas上限, 这个字段必须写，默认的gas上限不足以部署，部署失败
            value: 0, //构造函数未指定payable，不要写数字
        })

        console.log("合约地址为: ", res.options.address)
    } catch (e) {
        console.log("部署合约失败， 错误信息为:", e)
    }
}

deploy()

