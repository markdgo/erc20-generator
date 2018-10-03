const { shouldBehaveLikeDetailedERC20Token } = require('./token/ERC20/DetailedERC20.behaviour');
const { shouldBehaveLikeMintableToken } = require('./token/ERC20/MintableToken.behaviour');
const { shouldBehaveLikeRBACMintableToken } = require('./token/ERC20/RBACMintableToken.behaviour');
const { shouldBehaveLikeBurnableToken } = require('./token/ERC20/BurnableToken.behaviour');
const { shouldBehaveLikeStandardToken } = require('./token/ERC20/StandardToken.behaviour');
const { shouldBehaveLikeERC1363BasicToken } = require('./token/ERC1363/ERC1363BasicToken.behaviour');

const { shouldBehaveLikeTokenRecover } = require('./safe/TokenRecover.behaviour');

const BigNumber = web3.BigNumber;

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

const BaseToken = artifacts.require('BaseToken');

contract('BaseToken', function ([owner, anotherAccount, minter, recipient, thirdParty]) {
  const _name = 'BaseToken';
  const _symbol = 'BASE';
  const _decimals = 18;

  beforeEach(async function () {
    this.token = await BaseToken.new(_name, _symbol, _decimals, { from: owner });
  });

  context('like a DetailedERC20 token', function () {
    shouldBehaveLikeDetailedERC20Token(_name, _symbol, _decimals);
  });

  context('like a MintableToken', function () {
    beforeEach(async function () {
      await this.token.addMinter(minter, { from: owner });
    });
    shouldBehaveLikeMintableToken([owner, anotherAccount, minter]);
  });

  context('like a RBACMintableToken', function () {
    beforeEach(async function () {
      await this.token.addMinter(minter, { from: owner });
    });
    shouldBehaveLikeRBACMintableToken([owner, anotherAccount, minter]);
  });

  context('like a BurnableToken', function () {
    const initialBalance = 1000;

    beforeEach(async function () {
      await this.token.addMinter(minter, { from: owner });
      await this.token.mint(owner, initialBalance, { from: minter });
    });
    shouldBehaveLikeBurnableToken([owner], initialBalance);
  });

  context('like a StandardToken', function () {
    const initialBalance = 1000;

    beforeEach(async function () {
      await this.token.addMinter(minter, { from: owner });
      await this.token.mint(owner, initialBalance, { from: minter });
      await this.token.finishMinting({ from: owner });
    });
    shouldBehaveLikeStandardToken([owner, anotherAccount, recipient], initialBalance);
  });

  context('like a ERC1363BasicToken', function () {
    const initialBalance = 1000;

    beforeEach(async function () {
      await this.token.addMinter(minter, { from: owner });
      await this.token.mint(owner, initialBalance, { from: minter });
      await this.token.finishMinting({ from: owner });
    });
    shouldBehaveLikeERC1363BasicToken([owner, anotherAccount, recipient], initialBalance);
  });

  context('like a deployed BaseToken', function () {
    it('owner should have the "minter" role', async function () {
      const hasRole = await this.token.hasRole(owner, 'minter');
      assert.equal(hasRole, true);
    });
  });

  context('like a TokenRecover', function () {
    beforeEach(async function () {
      this.instance = this.token;
    });

    shouldBehaveLikeTokenRecover([owner, thirdParty]);
  });
});
