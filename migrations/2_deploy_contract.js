const ERC20Token = artifacts.require('ERC20Token');

module.exports = function (deployer) {
  const _name = 'ERC20Token';
  const _symbol = 'ERC20';
  const _decimals = 18;

  deployer.deploy(ERC20Token, _name, _symbol, _decimals);
};
