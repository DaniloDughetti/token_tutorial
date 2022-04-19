var MyToken = artifacts.require("./MyToken.sol");

//deployer è l'handle per accedere alla blockchain
module.exports = async function(deployer) {
  await deployer.deploy(MyToken, 10000000);
};
