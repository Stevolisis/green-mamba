// SPDX-License-Identifier: MIT
pragma solidity >=0.7.0 <0.9.0;

import "./lib/slugify.sol";
import "./authors.sol";

contract Article {
    uint public no_of_articles = 0;
    Author public author;
    string[] public articleSlugs;
    bytes32 private constant HASH_1D = keccak256(abi.encodePacked("1D"));
    bytes32 private constant HASH_1M = keccak256(abi.encodePacked("1M"));
    bytes32 private constant HASH_3M = keccak256(abi.encodePacked("3M"));
    bytes32 private constant HASH_1Y = keccak256(abi.encodePacked("1Y"));

    struct User{
        address userAddress;
        string name;
        string title; 
        string description;
        uint balance;
        uint256 createdAt;
    }
    struct IArticle {
        uint id;
        string imageCID;
        string title;
        string slug;
        string description;
        string[] tags;
        string content;
        string authorName;
        address authorAddress;
        uint gifts;
        uint256 createdAt;
    }

    mapping(string => IArticle) public articles;

    // Constructor to set Author contract address
    constructor(address _authorContractAddress) {
        author = Author(_authorContractAddress);
    }

    function addArticle(
        address _authorAddress,
        string memory _title,
        string memory _imageCID,
        string memory _description,
        string[] memory _tags,
        string memory _content
    ) public payable {
        string memory slugged = Slugify.generateSlug(_title);
        require(articles[slugged].authorAddress == address(0), "Article with this slug already exists");
        Author.User memory getAuthorForName = author.getAuthor(_authorAddress);
        require(bytes(getAuthorForName.name).length > 0, "Author name is missing");
        
        articles[slugged] = IArticle(
            no_of_articles,
            _imageCID,
            _title,
            slugged,
            _description,
            _tags,
            _content,
            getAuthorForName.name,
            _authorAddress,
            0,
            block.timestamp
        );

        articleSlugs.push(slugged);
        no_of_articles++;
    }

    function editArticle(
        address _authorAddress,
        string memory _slug,
        string memory _newTitle,
        string memory _newImageCID,
        string memory _newDescription,
        string[] memory _newTags,
        string memory _newContent
    ) public {
        require(articles[_slug].authorAddress != address(0), "Article with this slug does not exist");
        require(articles[_slug].authorAddress == _authorAddress, "Only the author can edit this article");

        IArticle storage articleToEdit = articles[_slug];

        articleToEdit.title = _newTitle;
        articleToEdit.imageCID = _newImageCID;
        articleToEdit.description = _newDescription;
        articleToEdit.tags = _newTags;
        articleToEdit.content = _newContent;

        string memory newSlug = Slugify.generateSlug(_newTitle);
        if (keccak256(abi.encodePacked(newSlug)) != keccak256(abi.encodePacked(_slug))) {

            require(articles[newSlug].authorAddress == address(0), "An article with the new slug already exists");

            articles[newSlug] = articleToEdit;
            delete articles[_slug];
            articleToEdit.slug = newSlug;

            for (uint i = 0; i < articleSlugs.length; i++) {
                if (keccak256(abi.encodePacked(articleSlugs[i])) == keccak256(abi.encodePacked(_slug))) {
                    articleSlugs[i] = newSlug;
                    break;
                }
            }
        }
    }

    function deleteArticle( string memory _slug) public {
        require(articles[_slug].authorAddress != address(0), "Article with this slug does not exist");
        delete articles[_slug];
            
        for (uint i = 0; i < articleSlugs.length; i++) {
            if (keccak256(abi.encodePacked(articleSlugs[i])) == keccak256(abi.encodePacked(_slug))) {
                articleSlugs[i] = articleSlugs[articleSlugs.length - 1];
                articleSlugs.pop();
                break;
            }
        }

        if (no_of_articles > 0) {
            no_of_articles--;
        }
    }

    function incrementArticleGifts(string memory _articleSlug) public {
        require(articles[_articleSlug].authorAddress != address(0), "Article with this slug does not exist");
        articles[_articleSlug].gifts++;
    }

    function getArticleAuthor(string memory _articleSlug) public view returns (address) {
        require(articles[_articleSlug].authorAddress != address(0), "Article with this slug does not exist");
        return articles[_articleSlug].authorAddress;
    }

    function getArticles(string memory _range) public view returns (IArticle[] memory) {
        bytes32 rangeHash = keccak256(abi.encodePacked(_range));
        uint256 timeRange;

        if( rangeHash == HASH_1D){
            timeRange = 1 * 24 * 60 * 60;
        } else if( rangeHash == HASH_1M){
            timeRange = 1 * 30 * 24 * 60 * 60;
        } else  if( rangeHash == HASH_3M){
            timeRange = 3 * 24 * 60 * 60;
        } else if( rangeHash == HASH_1Y){
            timeRange = 365 * 24 * 60 * 60;
        } else {
            timeRange = 0;
        }

        IArticle[] memory articlesArray = new IArticle[](no_of_articles);
        uint256 currentTime = block.timestamp;

        for (uint i = 0; i < no_of_articles; i++) {
            IArticle storage article = articles[articleSlugs[i]];
            if(timeRange == 0 || (currentTime - article.createdAt) <= timeRange){
                articlesArray[i] = article;
            }
        }

        return articlesArray;
    }

    function getNoOfArticles() public view returns (uint) {
        return no_of_articles;
    }

    function getArticle(string memory _slug) public view returns (IArticle memory) {
        require(articles[_slug].authorAddress != address(0), "Article with this slug does not exist");
        IArticle memory article = articles[_slug];
        return article;
    }
}
