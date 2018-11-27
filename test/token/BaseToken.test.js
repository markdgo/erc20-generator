const { shouldBehaveLikeBaseToken } = require('./BaseToken.behaviour');

const BaseToken = artifacts.require('BaseToken');

contract('BaseToken', function ([owner, anotherAccount, minter, operator, recipient, thirdParty]) {
  const _name = 'BaseToken';
  const _symbol = 'ERC20';
  const _decimals = 18;
  const _initialBalance = 1000;

  beforeEach(async function () {
    this.token = await BaseToken.new(_name, _symbol, _decimals, { from: owner });
  });

  context('like a BaseToken token', function () {
    shouldBehaveLikeBaseToken(
      [owner, anotherAccount, minter, operator, recipient, thirdParty],
      [_name, _symbol, _decimals, _initialBalance]
    );
  });
});
