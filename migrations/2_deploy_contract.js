const ERC20Token = artifacts.require('ERC20Token');

module.exports = function (deployer) {
  const _name = 'TestToken';
  const _symbol = 'TEST';
  const _decimals = 18;
  const _initialAmount = 1000000;

  deployer.deploy(ERC20Token, _name, _symbol, _decimals, _initialAmount);
};
