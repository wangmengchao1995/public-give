let fs = require('fs')

let solc = require('solc')
//编译文件过程:
// 1. 读取文件
// 2. 使用solc进行编译: bytecode， abi
// 3. 导出bytecode和abi

//我们只是手动部署FundingFactory合约，funding我们会在运行中动态加载
let sourceInfo = fs.readFileSync('./contracts/allContracts.sol')

// console.log(sourceInfo.toString())

let compiledInfo = solc.compile(sourceInfo.toString(), 1)
// console.log('compileInfo :', compiledInfo)

// module.exports = compiledInfo['contracts']['SimpleStorage']
module.exports = compiledInfo['contracts'][':FundingFactory']
