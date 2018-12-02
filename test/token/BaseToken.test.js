const { shouldBehaveLikeBaseToken } = require('./BaseToken.behaviour');

const BaseToken = artifacts.require('BaseToken');

contract('BaseToken', function ([owner, anotherAccount, minter, operator, recipient, thirdParty]) {
  const _name = 'BaseToken';
  const _symbol = 'ERC20';
  const _decimals = 18;
  const _initialBalance = 1000;

  context('testing behaviours', function () {
    beforeEach(async function () {
      this.token = await BaseToken.new(_name, _symbol, _decimals, 0, { from: owner });
    });

    shouldBehaveLikeBaseToken(
      [owner, anotherAccount, minter, operator, recipient, thirdParty],
      [_name, _symbol, _decimals, _initialBalance]
    );
  });

  context('like a BaseToken', function () {
    beforeEach(async function () {
      this.token = await BaseToken.new(_name, _symbol, _decimals, _initialBalance, { from: owner });
    });

    describe('once deployed', function () {
      it('total supply should be initial balance', async function () {
        (await this.token.totalSupply()).should.be.bignumber.equal(_initialBalance);
      });

      it('should mint initial balance of tokens to owner', async function () {
        (await this.token.balanceOf(owner)).should.be.bignumber.equal(_initialBalance);
      });
    });
  });
});
