import { expect } from "chai";


//Setting Up the Test Environment
describe("Authors Contract",()=>{
    let Authors, authorsContract, deployer, user1, user2;

    beforeEach(async()=>{
        Authors = await ethers.getContractFactory("Authors");
        [ deployer, user1, user2 ] = await ethers.getSigners();

        authorsContract = await Authors.deploy();
        await authorsContract.deployed();
    });

        
    //Contract Initialization
    it("Should intialize contract with no authors",()=>{
        const noOfAuthors = authorsContract.noOfAuthors();
        expect(noOfAuthors).to.equal(0);

        const allAuthors = authorsContract.getAllAuthors();
        expect(allAuthors.length).to.equal(0);
    });

    //Add Author
    it("Should add a user as Author",async()=>{
        const name = "Steven Joseph";
        const title = "Software Engineer";

        const tx = await authorsContract.connect(user1).addAuthor(name, title);
        tx.wait();

        const noOfAuthors = authorsContract.noOfAuthors();
        expect(noOfAuthors).to.equal(1);
        
        const allAuthors = authorsContract.getAllAuthors();
        expect(allAuthors).to.include(user1.address);

        const author = await authorsContract.getAuthor(user1.address);
        expect(author.name).to.equal(name);
        expect(author.title).to.equal(title);
        expect(author.exists).to.be.true;
    });

    


});

