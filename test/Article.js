const { expect } = require("chai");
const { ethers } = require("hardhat");

// Setting Up the Test Environment
describe("Article Contract",()=>{
    let Authors, authorsContract, Articles, articlesContract;
    let deployer, user1, user2;
    beforeEach(async () => {
        Authors = await ethers.getContractFactory("Authors");
        [deployer, user1, user2] = await ethers.getSigners();
        authorsContract = await Authors.deploy(); // Deploy Authors contract

        Articles = await ethers.getContractFactory("Articles");
        articlesContract = await Articles.deploy(authorsContract.target); // Deploy Articles contract

        const name = "Steven Joseph";
        const title = "Software Engineer";
        const tx = await authorsContract.connect(user1).addAuthor(name, title);
        await tx.wait();
    });
    
    // Registered User should add Article
    it("Allow author to add article", async()=>{
        const title = "Blockchain for Beginners";
        const metadataId = "metadataId123";

        await expect(articlesContract.connect(user1).addArticle(title, metadataId))
        .to.emit(articlesContract, "ArticleAdded")
        .withArgs(title, metadataId, user1.address);

        const articles = await articlesContract.getAllArticles();
        expect(articles.length).to.equal(1);

        const articleIndex = await articlesContract.metadataToIndex(metadataId);
        expect(articleIndex).to.equal(0);

        const article = await articlesContract.getArticle(metadataId);
        expect(article[0]).to.equal(title);
        expect(article[1]).to.equal(metadataId);
        expect(article[2]).to.equal(user1.address);
    });

    // Unregistered user should not add article
    it("Unregistered user should not add article", async()=>{
        const title = "Blockchain for Beginners";
        const metadataId = "metadataId123";

        await expect(articlesContract.connect(user2).addArticle(title, metadataId))
        .to.revertedWith("Author does not exist");
    });

    // Users should send gifts to authors
    it("Users should send gifts to authors", async()=>{
        const title = "Blockchain for Beginners";
        const metadataId = "metadataId123";
        await articlesContract.connect(user1).addArticle(title, metadataId);

        const giftAmount = ethers.parseEther("1");
        await expect(articlesContract.connect(user2).sendGift(metadataId, { value: giftAmount }))
        .to.emit(articlesContract, "GiftSent")
        .withArgs(user2.address, user1.address, giftAmount, metadataId, title);

        const authorGifts = await articlesContract.getAuthorGifts(user1.address);
        expect(authorGifts.length).to.equal(1);
        expect(authorGifts[0].amount).to.equal(giftAmount);
        expect(authorGifts[0].sender).to.equal(user2.address);
    });

    // Should revert if sending a gift for a non-existent article
    it("Should revert if sending a gift for a non-existent article", async () => {
        const nonExistentMetadataHash = "nonExistentMetadataHash";
        const giftAmount = ethers.parseEther("1");
    
        await expect(articlesContract.connect(user2).sendGift(nonExistentMetadataHash, { value: giftAmount })).
        to.be.revertedWith("Article does not exist");
    });

    // Test Deleting an Article
    it("Should allow an author to delete their article", async () => {
        const title = "Blockchain for Beginners";
        const metadataId = "metadataId123";
        await articlesContract.connect(user1).addArticle(title, metadataId);

        await expect(articlesContract.connect(user1).deleteArticle(metadataId))
        .to.emit(articlesContract, "ArticleDeleted")
        .withArgs(user1.address, metadataId, title);

        const article = await articlesContract.getArticle(metadataId);
        expect(article[0]).to.equal(title);
        expect(article[1]).to.equal(metadataId);
        expect(article[2]).to.equal(user1.address);
    });

    // Should not allow a non-author to delete an article
    it("Should not allow a non-author to delete an article", async () => {
        const title = "Blockchain for Beginners";
        const metadataHash = "metadataHash123";
        await articlesContract.connect(user1).addArticle(title, metadataHash);
    
        await expect(
          articlesContract.connect(user2).deleteArticle(metadataHash)
        ).to.be.revertedWith("Only the author can delete the article");
    });

    // Test Getting Author's Gifts
    it("Should return the gifts sent to the author", async () => {
        const title = "Blockchain for Beginners";
        const metadataId = "metadataId123";
        await articlesContract.connect(user1).addArticle(title, metadataId);

        const giftAmount = ethers.parseEther("1");
        await articlesContract.connect(user2).sendGift(metadataId, { value: giftAmount });

        const gifts = await articlesContract.getAuthorGifts(user1.address);
        expect(gifts.length).to.equal(1);
        expect(gifts[0].amount).to.equal(giftAmount);
        expect(gifts[0].sender).to.equal(user2.address);
    });

    // Get only active articles
    it("Get only active articles", async () => {
        const title = "Blockchain for Beginners";
        const metadataId = "metadataId123";
        const title2 = "Blockchain for Beginners";
        const metadataId2 = "metadataId123";
        await articlesContract.connect(user1).addArticle(title, metadataId);
        await articlesContract.connect(user1).addArticle(title2, metadataId2);

        await expect(articlesContract.connect(user1).deleteArticle(metadataId));

        const getAllArticles = await articlesContract.getAllArticles();
        const getAllActiveArticles = await articlesContract.getAllActiveArticles();
        expect(getAllArticles.length).to.equal(2);
        expect(getAllActiveArticles.length).to.equal(1);
    });
});