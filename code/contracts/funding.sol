pragma solidity ^0.4.24;
import "./fundingFactory.sol";


contract Funding {
    
    // 1. 项目名字
    // 2. 项目筹集目标金额
    // 3. 支持金额
    // 4. 众筹持续时间
    
    // 1. 项目方地址
    // 2. 参与人集合
    
    
    address public manager; //项目发起方
    address[] supporters; //支持人集合
    
    string public projectName; //项目名称
    uint256 public targetMoney; //目标金额
    uint256 public supportMoney; //支持金额
    uint256 public endTime;   //结束时间
    
    //supportorFundings 
    
    SupportsToFundings s2f;
    
    
    constructor(string _projectName, uint256 _targetMoney, uint256 _supportMoney, uint256 _duration, address _creator, SupportsToFundings _s2f) public {
        // manager = msg.sender;
        manager = _creator;
        
        projectName = _projectName;
        targetMoney = _targetMoney;
        supportMoney = _supportMoney;
        endTime = block.timestamp + _duration;  //结束时间 = 当前时间 + 持续时间
        
        s2f = _s2f;  //将FundingFactory中的s2f合约实例传递给Funding的s2f
    }
    
    
    // 参与众筹逻辑：
    // 1. 向合约转钱，转入指定金额（supportMoney）
    // 2. 合约记录支持的投资人，在数组中记录。
    // 3. 限定每个地址只能参与一次
    
    //定义一个mapping，用于记录地址的参与状态
    mapping(address => bool) supporterExistMap;
    
    function support() public payable {
        require(msg.value == supportMoney);
        require(supporterExistMap[msg.sender] == false);
        
        supporters.push(msg.sender);
        supporterExistMap[msg.sender] = true;
        
        //supportorFundings[msg.sender].push(this);
        //supportorFundings[zhangsan] = address[funding1, funding3, funding7]
        //supportorFundings[lisi] = address[funding4, funding10]
        
        //支持的人， 支持的合约地址
        s2f.setFunding(msg.sender, this);
    } 
    
    
    //定义申请结构
    struct Request {
        string description; //花费申请： 吃饭
        uint256 cost; //花费金额： 10wei
        address sellerAddress; //卖家地址
        
        Status status; // Voting, Approved, Completed ，这个申请的当前状态
        uint256 votedCount;  //这个申请赞成的票数
        mapping(address => bool) votedMap; //记录这个申请的投票人的投票状态，如果投过票，就不允许再次投票
    }
    
    enum Status {
        Voting,
        Approved,
        Completed
    }
    
    
    Request[] public requests; //维护所有请求的集合
        
    // 1. 定义一个请求
    // 2. 将请求存放到全局的数组中
    function createRequest(string _description, uint256 _cost, address _sellerAddress) onlyOwner public {
        Request memory req = Request({
            description : _description,
            cost: _cost,
            sellerAddress : _sellerAddress,
            
            status: Status.Voting,
            votedCount: 0
        });
        
        requests.push(req);
    }
    
    
    // 批准逻辑分析
    
    // 1. 首先要确保是投资人
    //     确保没有投过票
    //     确保是投票状态
    
    // 2. 对多个请求逐个进行批准，用下标逐个访问请求
    // 3. 根据下标获取请求请求
    // 4. 进行批准，就是对votedCount进行加1
    // 5. votedMap[投票地址] = true
    function approveRequest(uint256 _index) public {
        // require(supporterExistMap[msg.sender] == true);
        require(supporterExistMap[msg.sender]);
        
        //必须是storage类型的，否则修改不会影响到requests数组中的值
        Request storage req = requests[_index];
        
        //确保没有投过票
        require(req.votedMap[msg.sender] == false);
        
        //确保是投票状态
        require(req.status == Status.Voting);
        
        req.votedCount++;
        
        req.votedMap[msg.sender] = true;
    }
    
        
    // 1. 明确是哪个发给请求，使用下标进行获取
    // 2. 确保赞成人数过半
    // 3. 向卖家进行转账
    // 4. 将这个请求的状态标识为Completed
    
    function finalizeRequest(uint256 _index) onlyOwner public {
        Request storage req = requests[_index];
        
        //require(address(this).balance >= req.cost);
        // 2. 确保赞成人数过半
        require(req.votedCount * 2 > supporters.length);
        
        // 3. 向卖家进行转账
        req.sellerAddress.transfer(req.cost);
    
        // 4. 将这个请求的状态标识为Completed    
        req.status = Status.Completed;
        
        //delete requests[_index]; //可选，删除已经完成的请求
    }
    
    
    
    
    
    //+++++++++++++++++++++++++++++++++++++++
    
    function getBalance() public view returns(uint256) {
        return address(this).balance;
    }
    
    function getSupports() public view returns(address[]) {
        return supporters;
    }
    
    modifier onlyOwner {
        require(msg.sender == manager);
        _;
    }
    
    
    function getSupportersCount() public view returns(uint256) {
        return supporters.length;
    }
    
    function getLeftTime() public view returns(uint256) {
        return endTime - now;
    }
    
	//返回花费请求的数量
    function getRequestCount() public view returns(uint256) {
        return requests.length;
    }
    
	//返回指定请求的详细信息
    function getRequestByIndex(uint256 index) public view returns(string, uint256, address, bool, uint256, uint256) {
        require(index < requests.length);

        Request storage req = requests[index];

        bool isVoted = req.votedMap[msg.sender];
        return (req.description, req.cost, req.sellerAddress, isVoted, req.votedCount, uint(req.status));
    }
    
}













