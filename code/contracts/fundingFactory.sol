pragma solidity ^0.4.24;
import "./funding.sol";


contract FundingFactory {
    // 一、分析所有的众筹结构：
    // 不用关心是谁创建的
    address[ ] allFundings;

    // 二、分析我发起的众筹结构：
    // 1. 每一个人可以发起多个众筹 address[ ]
    // 2. 每一个有自己的众筹集合

    mapping(address => address[])   creatorFundings;

    // 三、分析我参与的众筹结构：
    //mapping(address => address[])   supportorFundings;
    SupportsToFundings s2f;  //To -> 2  //0x0000000...

    address public factoryManager; //工厂管理员

    constructor()public {
        factoryManager = msg.sender;
        s2f = new SupportsToFundings();
    }


    // 创建合约方法（核心方法）
    // 创建合约逻辑分析
    // 1.  new 一个 Funding，传入对应数据："大黄蜂", 400000, 1, 3600
    // 2. 添加到creatorFundings中
    // 3. 添加到allFundings中

    function createFunding(string _projectName, uint256 _targetMoney, uint256 _supportMoney, uint256 _duration) public {


        //把全局唯一的s2f合约，传递给Funding结构
        //在Funding的support函数中调用setFunding方法，从而维护支持的众筹

        address funding = new Funding(_projectName, _targetMoney, _supportMoney, _duration, msg.sender, s2f);

        creatorFundings[msg.sender].push(funding);
        allFundings.push(funding);
    }

    function getAllFundings() public view returns(address[]) {
        return allFundings;
    }

    function getCreatorFundings() public view returns(address[]) {
        return creatorFundings[msg.sender];
    }

    function getSupportorFundings() public view returns(address[]) {
        return s2f.getFunding(msg.sender);
    }
}


//+++++++++++++++++++++++++++++++++++++++++

contract SupportsToFundings {  //SupportsToFundings
    mapping(address=>address[]) supportorFundings;  //众筹参与人的结构， Key是参与人，value是参与合约的集合

    function setFunding(address owner, address funding) public { //参与一次众筹，key是参与人，value参与的众筹地址
        supportorFundings[owner].push(funding);
    }

    function getFunding(address owner) public view returns(address[]){//key是参与人，value是所有参与的众筹的集合
        return supportorFundings[owner];
    }
}




