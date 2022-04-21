const MyToken = artifacts.require("MyToken");
const chai = require("./setupChai.js");
const expect = chai.expect;
const BN = web3.utils.BN;
require("dotenv").config({path: "../.env"});

contract("Token Test", async accounts => {

    const [deployerAccount, recipient, anotherAccount] = accounts;

    //Hook che viene eseguito prima di ogni test
    beforeEach(async() => {
        this.myToken = await MyToken.new(process.env.INITIAL_TOKENS);
    });

    it("all tokens sould be in my account", async () => {
        //instance è lo smart contract deployato dal migration file
        //let instance = await MyToken.deployed();
        //instance è lo smart contract definito dal beforeEach
        let instance = this.myToken;
        let totalSupply = await instance.totalSupply();
        //let balance = await instance.balanceOf(accounts[0]);
        //assert.equal(balance.valueOf(), initialSupply.valueOf, "The balance is not the same");
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
    });

    it("is possible to send tokens between accounts", async () => {
        const sendTokens = 1;
        let instance = this.myToken;
        let totalSupply = await instance.totalSupply();
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply);
        expect(instance.transfer(recipient, sendTokens)).to.eventually.be.fulfilled;
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(totalSupply.sub(new BN(sendTokens)));
        expect(instance.balanceOf(recipient)).to.eventually.be.a.bignumber.equal(new BN(sendTokens));
    });
/*
    it("is not possible to send more tokens then available in total", async () => {
        let instance = this.myToken;
        let balanceOfDeployer = await instance.balanceOf(deployerAccount);

        expect(instance.transfer(recipient, new BN(balanceOfDeployer + 100))).to.eventually.be.rejected;
        expect(instance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceOfDeployer);
    });*/
});