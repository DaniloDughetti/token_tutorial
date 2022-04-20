var MyToken = artifacts.require("MyToken.sol");
var MyTokenSale = artifacts.require("MyTokenSale");

//deployer è l'handle per accedere alla blockchain
//deploy richiama il costruttore degli smart contract
module.exports = async function(deployer) {
  let addr = await web3.eth.getAccounts();
  await deployer.deploy(MyToken, 10000000);
  await deployer.deploy(MyTokenSale, 1, addr[0], MyToken.address);
  let instance = MyToken.deployed();
  await instance.transfer(MyTokenSale.address, 1000000);
};
