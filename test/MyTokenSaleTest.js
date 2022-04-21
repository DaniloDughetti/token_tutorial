const MyToken = artifacts.require("MyToken");
const MyTokenSale = artifacts.require("MyTokenSale");
const MyKycContract = artifacts.require("KycContract");
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

    it("all tokens should be in the TokenSale Smart Contract by default", async() => {
        let instance = await MyToken.deployed();
        let balanceOfSmartContract = await instance.balanceOf(MyTokenSale.address);
        let totalSupply = await instance.totalSupply();
        //qua non ci va eventually perchè le variabili sono già il risultato della await
        //eventually = promise
        expect(balanceOfSmartContract).to.be.a.bignumber.equal(totalSupply);
    });
    
    it("should be possible to buy tokens", async () => {
        let tokenInstance = await MyToken.deployed();
        let tokenSaleInstance = await MyTokenSale.deployed();
        let kycContractInstance = await MyKycContract.deployed();
        let balanceBefore = await tokenInstance.balanceOf(deployerAccount);
        //oltre ai parametri si possono passare info transazioni (equivalente di send in web3)
        await kycContractInstance.setKycCompleted(deployerAccount, {from: deployerAccount});
        expect(tokenSaleInstance.sendTransaction({from: deployerAccount, value: web3.utils.toWei("1", "wei")})).to.be.fulfilled;
        balanceBefore = balanceBefore.add(new BN(1));
        expect(tokenInstance.balanceOf(deployerAccount)).to.eventually.be.a.bignumber.equal(balanceBefore);
    });
});