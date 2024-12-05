const { expect } = require("chai");


// Setting Up the Test Environment
describe("Article Contract",()=>{
    let Authors, authorsContract, Articles, articlesContract;
    let deployer, user1, user2;

    beforeEach(async()=>{
        Authors = await ethers.getContractFactory("Authors");
        [ deployer, user1, user2 ] = await ethers.getSigners();
        authorsContract = await Authors.deploy();

        Articles = await ethers.getContractFactory("Articles");
        articlesContract = await Articles.deploy(authorsContract.address);

        // Register user1 as an author
        const name = "Steven Joseph";
        const title = "Software Engineer";
        await authorsContract.connect(user1).addAuthor(name, title);
    });

    // Adding Article
    it("Allow author to add article",async()=>{
        const title = "Blockchain for Beginners";
        const metadataId = "metadataHash123";

        await expect(articlesContract.connect(user1).addArticle(title, metadataId))
        .to.emit(articlesContract, "ArticleAdded")
        .withArgs(title, metadataId, user1.address);
    });
});