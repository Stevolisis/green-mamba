// SPDX-License-Identifier: MIT

pragma solidity >=0.7.0 <0.9.0;

contract Author{
    uint public no_of_authors = 0;
    address[] public authorAddresses;

    struct User{
        address userAddress;
        string name;
        string title; 
        string description;
        uint balance;
        uint256 createdAt;
    }

    mapping (address => User) public authors;

    function createAuthor() public payable {
        require(authors[msg.sender].userAddress == address(0), "User already exist");
        no_of_authors ++;
        authors[msg.sender] = User(msg.sender,"","","",0, block.timestamp);
        authorAddresses.push(msg.sender);
    }

    function setProfile( 
        address _userAddress, 
        string memory _name,
        string memory _title,
        string memory _description
    ) public {
        require(authors[_userAddress].userAddress != address(0), "User does not exist");
        authors[_userAddress].name = _name;
        authors[_userAddress].title = _title;
        authors[_userAddress].description = _description;
    }

    function incrementAuthorBalance(address _authorAddress, uint _amount) public payable  {
        require(authors[_authorAddress].userAddress != address(0), "Author does not exist");
        require(msg.value == _amount, "Ether sent does not match the amount");

        ( bool success, ) = _authorAddress.call{ value: msg.value }("");
        require(success, "Transfer failed.");

        User storage user = authors[_authorAddress];
        user.balance += _amount;
    }

    function getAuthors() public view returns (User[] memory) {
        User[] memory authorList = new User[](no_of_authors);

        for (uint i = 0; i < no_of_authors; i++) {
            User storage user = authors[authorAddresses[i]];
            authorList[i] = user;
        }

        return  authorList;
    }

    function getAuthor(address userAddress) public view returns (User memory) {
        require(userAddress != address(0), "Invalid Address");
        User memory user = authors[userAddress];
        return user;
    }

}



