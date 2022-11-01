pragma solidity ^0.4.17;

contract CampaignFactory {

    address[] public deployedCampaigns;

    function createCampaign(uint minimumContr) public {
        address newCampaign = new Campaign(minimumContr, msg.sender);
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[]) {
        return deployedCampaigns;
    }

}

contract Campaign {

    struct Request {
        string description;
        uint value;
        address recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    address public manager;
    uint public minimumContribution;
    Request[] public requests;
    mapping(address => bool) public approvers;
    uint public approversCount;

    modifier managerRestricted() {
        require(msg.sender == manager);
        _;
    }

    constructor(uint minimumContr, address creator) public {
        manager = creator;
        minimumContribution = minimumContr;
    }

    function contribute() public payable {
        require(msg.value > minimumContribution);
        if (!approvers[msg.sender]) {
            approvers[msg.sender] = true;
            approversCount += 1;
        }
    }

    function createRequest(string description, uint value, address recipient) public managerRestricted {
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });

        requests.push(newRequest);
    }
    
    function approveRequest(uint idx) public {
        Request storage curRequest = requests[idx];

        // ensure sender has donated
        require(approvers[msg.sender]);
        // ensure sender has not voted before
        require(!curRequest.approvals[msg.sender]);

        curRequest.approvals[msg.sender] = true;
        curRequest.approvalCount += 1;
    }

    function finalizeRequest(uint idx) public managerRestricted {
        Request storage curRequest = requests[idx];
        require(!curRequest.complete);
        require(curRequest.approvalCount > (approversCount / 2));

        curRequest.recipient.transfer(curRequest.value); 
        curRequest.complete = true;
    }

    function getSummary() public view returns (uint, uint, uint, uint, address) {
        return (
            minimumContribution,
            address(this).balance,
            requests.length,
            approversCount,
            manager
        );
    }

    function getRequestsCount() public view returns (uint) {
        return requests.length;
    }

}