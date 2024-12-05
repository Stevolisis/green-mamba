const { expect } = require("chai");


// Setting Up the Test Environment
describe("Authors Contract",()=>{
    let Authors, authorsContract, deployer, user1, user2;

    beforeEach(async()=>{
        Authors = await ethers.getContractFactory("Authors");
        [ deployer, user1, user2 ] = await ethers.getSigners();

        authorsContract = await Authors.deploy();
        
    });

        
    // Contract Initialization
    it("Should intialize contract with no authors",async()=>{
        const noOfAuthors = await authorsContract.noOfAuthors();
        expect(noOfAuthors).to.equal(0);

        const allAuthors = await authorsContract.getAllAuthors();
        expect(allAuthors.length).to.equal(0);
    });

    // Add Author
    it("Should add a user as Author",async()=>{
        const name = "Steven Joseph";
        const title = "Software Engineer";

        const tx = await authorsContract.connect(user1).addAuthor(name, title);
        tx.wait();

        const noOfAuthors = await authorsContract.noOfAuthors();
        expect(noOfAuthors).to.equal(1);
        
        const allAuthors = await authorsContract.getAllAuthors();
        expect(allAuthors).to.include(user1.address);

        const author = await authorsContract.getAuthor(user1.address);
        expect(author.name).to.equal(name);
        expect(author.title).to.equal(title);
        expect(author.exists).to.be.true;
    });

    // Emit Event on Author Addition
    it("Emit even when an author is added",async()=>{
        const name = "Steven Joseph";
        const title = "Software Engineer";

        await expect(authorsContract.connect(user1).addAuthor(name, title))
        .to.emit(authorsContract, "AuthorAdded")
        .withArgs(user1.address, name, title);
    });

    // Prevent Duplicate Author Addition
    it("should not allow the same user to add themselves twice",async()=>{
        const name = "Steven Joseph";
        const title = "Software Engineer";

        await authorsContract.connect(user1).addAuthor(name, title);

        await expect(authorsContract.connect(user1).addAuthor(name, title))
        .to.be.revertedWith("Author already exists");
    });

    //Prevent Retrieval of Non-Existent Author
    it("should not allow retrieving a non-existent author",async()=>{
        await expect(authorsContract.getAuthor(user1.address))
        .to.be.revertedWith("Author does not exist");
    });

    //Retrieve All Authors
    it("should return all authors", async function () {
        await authorsContract.connect(user1).addAuthor("Alice", "Developer");
        await authorsContract.connect(user2).addAuthor("Bob", "Engineer");
      
        const allAuthors = await authorsContract.getAllAuthors();
      
        expect(allAuthors.length).to.equal(2);
        expect(allAuthors).to.include(user1.address);
        expect(allAuthors).to.include(user2.address);
    });
});

