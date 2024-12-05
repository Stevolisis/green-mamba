// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 < 0.9.0;

contract Authors{
    uint public noOfAuthors = 0;
    address[] public authorAddresses;

    struct Author{
        string name;
        string title;
        bool exists;
    }

    mapping (address => Author) public authors;
    event AuthorAdded(address indexed authorAddress, string name, string skills);

    function addAuthor(string memory _name, string memory _title) public {
        require(!authors[msg.sender].exists, "Author already exists");
        noOfAuthors ++;
        authors[msg.sender] = Author(_name,_title, true);
        authorAddresses.push(msg.sender);
        emit AuthorAdded(msg.sender, _name, _title);
    }

    function getAuthor(address _authorAddress) public view returns(Author memory){
        require(authors[_authorAddress].exists, "Author does not exist");
        Author memory author = authors[_authorAddress];
        return author;
    }

    function getAllAuthors() public view returns (address[] memory) {
        return authorAddresses;
    }
}