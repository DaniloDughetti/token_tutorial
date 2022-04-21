const MyToken = artifacts.require("MyToken");
const MyTokenSale = artifacts.require("MyTokenSale");
const chai = require("./setupChai.js");
const expect = chai.expect;
const BN = web3.utils.BN;

require("dotenv").config({path: "../.env"});

contract("TokenSale Test", async accounts => {

    const [deployerAccount, recipient, anotherAccount] = accounts;
    
    //Qua creiamo i test partendo dal deploy file
    it("should not have any tokens in my deployerAccount", async () => {
        let instance = await MyToken.deployed();
        return expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(new BN(0));
    });
});