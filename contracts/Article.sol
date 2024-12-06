// SPDX-License-Identifier: MIT
pragma solidity >= 0.7.0 < 0.9.0;
import "./Author.sol";

contract Articles {
    Authors private authorsContract;
    uint public noOfArticles = 0;

    constructor(address _authorAddress) {
        authorsContract = Authors(_authorAddress);
    }

    struct Article {
        string title;
        string metadataId;
        address authorAddress;
        bool exists;
    }

    struct Gift {
        uint256 amount;
        uint256 articleIndex;
        string articleTitle;
        address sender;
    }

    Article[] public articles;
    mapping(address => Gift[]) public authorGifts;
    mapping(string => uint256) public metadataToIndex;

    event ArticleAdded(string title, string metadataId, address authorAddress);
    event GiftSent(address indexed sender, address indexed recipient, uint256 amount, string metadataId, string articleTitle);
    event ArticleDeleted(address indexed author, string metadataId, string articleTitle);

    function addArticle(string memory _title, string memory _metadataId) public {
        Authors.Author memory author = authorsContract.getAuthor(msg.sender);
        require(author.exists, "Only registered authors can add articles");
        articles.push(Article(_title, _metadataId, msg.sender, true));
        uint256 articleIndex = articles.length - 1;
        metadataToIndex[_metadataId] = articleIndex;

        emit ArticleAdded(_title, _metadataId, msg.sender);
    }

    function sendGift(string memory _metadataId) public payable {
        uint256 articleIndex = metadataToIndex[_metadataId];
        require(articleIndex < articles.length, "Article does not exist");
        
        Article memory article = articles[articleIndex];
        require(article.authorAddress != address(0), "Invalid author address");

        // Transfer the gift to the author
        (bool success, ) = article.authorAddress.call{ value: msg.value }("");
        require(success, "Gift transfer failed");

        authorGifts[article.authorAddress].push(Gift({
            amount: msg.value,
            articleIndex: articleIndex,
            articleTitle: article.title,
            sender: msg.sender
        }));

        emit GiftSent(msg.sender, article.authorAddress, msg.value, _metadataId, article.title);
    }

    function getAllArticles() public view returns (Article[] memory) {
        return articles;
    }

    function getAllActiveArticles() public view returns (Article[] memory) {
        uint activeCount = 0;
        
        // Count the number of active articles
        for (uint i = 0; i < articles.length; i++) {
            if (articles[i].exists) {
                activeCount++;
            }
        }
        
        // Create a new array to hold active articles
        Article[] memory activeArticles = new Article[](activeCount);
        uint index = 0;
        for (uint i = 0; i < articles.length; i++) {
            if (articles[i].exists) {
                activeArticles[index] = articles[i];
                index++;
            }
        }
    
        return activeArticles;
    }

    function getArticle(string memory _metadataId) public view returns (string memory, string memory, address) {
        uint256 articleIndex = metadataToIndex[_metadataId];
        require(articleIndex < articles.length, "Article does not exist");

        Article memory article = articles[articleIndex];
        return (article.title, article.metadataId, article.authorAddress);
    }

    function deleteArticle(string memory _metadataId) public {
        uint256 articleIndex = metadataToIndex[_metadataId];
        require(articleIndex < articles.length, "Article does not exist");

        Article storage article = articles[articleIndex];
        require(article.authorAddress == msg.sender, "Only the author can delete the article");

        // Mark the article as deleted
        article.exists = false;

        emit ArticleDeleted(msg.sender, _metadataId, article.title);
    }

    function getAuthorGifts(address _author) public view returns (Gift[] memory) {
        return authorGifts[_author];
    }
}
