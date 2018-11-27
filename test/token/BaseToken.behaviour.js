const { shouldBehaveLikeERC20Mintable } = require('openzeppelin-solidity/test/token/ERC20/behaviors/ERC20Mintable.behavior'); // eslint-disable-line max-len
const { shouldBehaveLikeERC20Burnable } = require('openzeppelin-solidity/test/token/ERC20/behaviors/ERC20Burnable.behavior'); // eslint-disable-line max-len
const { shouldBehaveLikeERC1363 } = require('erc-payable-token/test/token/ERC1363/ERC1363.behaviour');
const { shouldBehaveLikeTokenRecover } = require('eth-token-recover/test/TokenRecover.behaviour');

const { shouldBehaveLikeERC20Detailed } = require('./behaviours/ERC20Detailed.behaviour');
const { shouldBehaveLikeERC20 } = require('./behaviours/ERC20.behaviour');

const BigNumber = web3.BigNumber;

require('chai')
  .use(require('chai-bignumber')(BigNumber))
  .should();

function shouldBehaveLikeBaseToken (
  [owner, anotherAccount, minter, operator, recipient, thirdParty],
  [_name, _symbol, _decimals, _initialBalance]
) {
  context('like a ERC20Detailed', function () {
    shouldBehaveLikeERC20Detailed(_name, _symbol, _decimals);
  });

  context('like a ERC20Mintable', function () {
    beforeEach(async function () {
      await this.token.addMinter(minter, { from: owner });
    });
    shouldBehaveLikeERC20Mintable(minter, [anotherAccount]);
  });

  context('like a ERC20Burnable', function () {
    beforeEach(async function () {
      await this.token.addMinter(minter, { from: owner });
      await this.token.mint(owner, _initialBalance, { from: minter });
    });
    shouldBehaveLikeERC20Burnable(owner, _initialBalance, [owner]);
  });

  context('like a ERC20', function () {
    beforeEach(async function () {
      await this.token.addMinter(minter, { from: owner });
      await this.token.mint(owner, _initialBalance, { from: minter });
      // await this.token.finishMinting({ from: owner });
    });
    shouldBehaveLikeERC20([owner, anotherAccount, recipient], _initialBalance);
  });

  context('like a ERC1363', function () {
    beforeEach(async function () {
      await this.token.addMinter(minter, { from: owner });
      await this.token.mint(owner, _initialBalance, { from: minter });
      // await this.token.finishMinting({ from: owner });
    });
    shouldBehaveLikeERC1363([owner, anotherAccount, recipient], _initialBalance);
  });

  context('like a TokenRecover', function () {
    beforeEach(async function () {
      this.instance = this.token;
    });

    shouldBehaveLikeTokenRecover([owner, thirdParty]);
  });
}

module.exports = {
  shouldBehaveLikeBaseToken,
};
