const BaseToken = artifacts.require('BaseToken');

module.exports = function (deployer) {
  const _name = 'BaseToken';
  const _symbol = 'BASE';
  const _decimals = 18;

  deployer.deploy(BaseToken, _name, _symbol, _decimals);
};
