// SPDX-License-Identifier: MIT

pragma solidity >= 0.7.0 < 0.9.0;
import "./authors.sol";
import "./articles.sol";

contract Gift{
    uint public no_of_gifters = 0;
    Article article;
    Author author;

    struct IGift{
        address userAddress;
        address authorAddress;
        string articleSlug;
        uint amount;
        uint256 createdAt;
    }

    mapping (uint => IGift) public giftCollection;
    mapping (address => mapping (string => bool)) public hasGifted;

    function sendGift(
        string memory _articleSlug,
        uint _amount
    ) public payable {

        require(!hasGifted[msg.sender][_articleSlug], "You have already gifted this article");

        hasGifted[msg.sender][_articleSlug] = true;
        address authorAddress = article.getArticleAuthor(_articleSlug);
        
        author.incrementAuthorBalance{value: _amount}(authorAddress, _amount);
        article.incrementArticleGifts(_articleSlug);

        giftCollection[no_of_gifters] = IGift(
            msg.sender,
            authorAddress,
            _articleSlug,
            _amount,
            block.timestamp
        );

        no_of_gifters ++;

    }

    function getAuthorGifters(address authorAddress) public view returns (IGift[] memory){
        IGift[] memory authorGifts = new IGift[](no_of_gifters);

        for(uint i = 0; i < no_of_gifters; i++){
            if(giftCollection[i].authorAddress == authorAddress){
                authorGifts[i] = giftCollection[i];
            }
        }
        
        return  authorGifts;
    }

    function getGifts() public view returns (IGift[] memory){
        IGift[] memory gifts = new IGift[](no_of_gifters);

        for(uint i = 0; i < no_of_gifters; i++){
                gifts[i] = giftCollection[i];
        }
        
        return  gifts;
    }

    function getGift(uint index) public view returns (IGift memory) {
        require(giftCollection[index].authorAddress != address(0), "Invalid Gift");
        IGift memory gift = giftCollection[index];
        return gift;
    }
}