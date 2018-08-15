const { shouldBehaveLikeDetailedERC20Token } = require('./behaviours/DetailedERC20.behaviour');
const { shouldBehaveLikeMintableToken } = require('./behaviours/MintableToken.behaviour');
const { shouldBehaveLikeRBACMintableToken } = require('./behaviours/RBACMintableToken.behaviour');
const { shouldBehaveLikeBurnableToken } = require('./behaviours/BurnableToken.behaviour');
const { shouldBehaveLikeStandardToken } = require('./behaviours/StandardToken.behaviour');

const BigNumber = web3.BigNumber;

require('chai')
  .use(require('chai-as-promised'))
  .use(require('chai-bignumber')(BigNumber))
  .should();

const ERC20Token = artifacts.require('ERC20Token');

contract('ERC20Token', function ([owner, anotherAccount, minter, recipient]) {
  const _name = 'ERC20Token';
  const _symbol = 'ERC20';
  const _decimals = 18;

  beforeEach(async function () {
    this.token = await ERC20Token.new(_name, _symbol, _decimals, { from: owner });
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

  context('like a deployed ERC20Token', function () {
    it('owner should have the "minter" role', async function () {
      let hasRole = await this.token.hasRole(owner, 'minter');
      assert.equal(hasRole, true);
    });
  });

  describe('safe functions', function () {
    it('should safe transfer any ERC20 sent for error into the contract', async function () {
      const anotherERC20 = await ERC20Token.new(_name, _symbol, _decimals, { from: owner });

      const tokenAmount = 1000;

      await anotherERC20.addMinter(minter, { from: owner });
      await anotherERC20.mint(this.token.address, tokenAmount, { from: minter });
      await anotherERC20.finishMinting({ from: owner });

      const contractPre = await anotherERC20.balanceOf(this.token.address);
      assert.equal(contractPre, tokenAmount);
      const ownerPre = await anotherERC20.balanceOf(owner);
      assert.equal(ownerPre, 0);

      await this.token.transferAnyERC20Token(anotherERC20.address, tokenAmount, { from: owner });

      const contractPost = await anotherERC20.balanceOf(this.token.address);
      assert.equal(contractPost, 0);
      const ownerPost = await anotherERC20.balanceOf(owner);
      assert.equal(ownerPost, tokenAmount);
    });
  });
});
