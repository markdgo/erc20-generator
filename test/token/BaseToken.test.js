const shouldFail = require('openzeppelin-solidity/test/helpers/shouldFail');

const { shouldBehaveLikeBaseToken } = require('./BaseToken.behaviour');

const BigNumber = web3.BigNumber;

const BaseToken = artifacts.require('BaseToken');

contract('BaseToken', function ([owner, anotherAccount, minter, operator, recipient, thirdParty]) {
  const _name = 'BaseToken';
  const _symbol = 'ERC20';
  const _decimals = 18;
  const _cap = new BigNumber(1000000);
  const _initialBalance = 1000;

  context('creating valid token', function () {
    describe('as a ERC20Capped', function () {
      it('requires a non-zero cap', async function () {
        await shouldFail.reverting(
          BaseToken.new(_name, _symbol, _decimals, 0, 0, { from: owner })
        );
      });
    });

    describe('as a BaseToken', function () {
      it('requires cap greater than initial balance', async function () {
        await shouldFail.reverting(
          BaseToken.new(_name, _symbol, _decimals, _cap, _cap.add(1), { from: owner })
        );
      });
    });
  });

  context('testing behaviours', function () {
    beforeEach(async function () {
      this.token = await BaseToken.new(_name, _symbol, _decimals, _cap, 0, { from: owner });
    });

    shouldBehaveLikeBaseToken(
      [owner, anotherAccount, minter, operator, recipient, thirdParty],
      [_name, _symbol, _decimals, _cap, _initialBalance]
    );
  });

  context('like a BaseToken', function () {
    beforeEach(async function () {
      this.token = await BaseToken.new(_name, _symbol, _decimals, _cap, _initialBalance, { from: owner });
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
