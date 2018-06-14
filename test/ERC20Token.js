import shouldBehaveLikeDetailedERC20Token from './DetailedERC20.behaviour';
import shouldBehaveLikeMintableToken from './MintableToken.behaviour';
import shouldBehaveLikeRBACMintableToken from './RBACMintableToken.behaviour';
import shouldBehaveLikeBurnableToken from './BurnableToken.behaviour';
import shouldBehaveLikeStandardToken from './StandardToken.behaviour';
import shouldBehaveERC827Token from './ERC827Token.behaviour';

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
  const _initialAmount = 0;

  beforeEach(async function () {
    this.token = await ERC20Token.new(_name, _symbol, _decimals, _initialAmount, { from: owner });
  });

  context('setting the initial amount', function () {
    describe('when initial amount is set', function () {
      let initialAmount = 1000000;

      beforeEach(async function () {
        this.token = await ERC20Token.new(_name, _symbol, _decimals, initialAmount, { from: owner });
      });

      it('total supply should be the initial amount', async function () {
        const totalSupply = await this.token.totalSupply();
        assert.equal(totalSupply, initialAmount * Math.pow(10, _decimals));
      });

      it('balance of owner should be the initial amount', async function () {
        const balance = await this.token.balanceOf(owner);
        assert.equal(balance, initialAmount * Math.pow(10, _decimals));
      });
    });

    describe('when initial amount is zero', function () {
      beforeEach(async function () {
        this.token = await ERC20Token.new(_name, _symbol, _decimals, _initialAmount, { from: owner });
      });

      it('total supply should be zero', async function () {
        const totalSupply = await this.token.totalSupply();
        assert.equal(totalSupply, 0);
      });

      it('owner\'s balance should be zero', async function () {
        const balance = await this.token.balanceOf(owner);
        assert.equal(balance, 0);
      });
    });
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

  context('like a ERC827Token', function () {
    const initialBalance = 100;

    beforeEach(async function () {
      await this.token.addMinter(minter, { from: owner });
      await this.token.mint(owner, initialBalance, { from: minter });
      await this.token.finishMinting({ from: owner });
    });
    shouldBehaveERC827Token([owner, anotherAccount, minter, recipient]);
  });

  describe('safe functions', function () {
    it('should safe transfer any ERC20 sent for error into the contract', async function () {
      const anotherERC20 = await ERC20Token.new(_name, _symbol, _decimals, _initialAmount, { from: owner });

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
