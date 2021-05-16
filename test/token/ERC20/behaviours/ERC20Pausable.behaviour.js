const { BN, expectRevert } = require('@openzeppelin/test-helpers');

const { shouldBehaveLikePausable } = require('../../../utils/Pausable.behaviour');

const { expect } = require('chai');

function shouldBehaveLikeERC20Pausable (initialBalance, [ owner, other, thirdParty ]) {
  describe('transfer', function () {
    it('allows to transfer when unpaused', async function () {
      await this.token.transfer(other, initialBalance, { from: owner });

      expect(await this.token.balanceOf(owner)).to.be.bignumber.equal('0');
      expect(await this.token.balanceOf(other)).to.be.bignumber.equal(initialBalance);
    });

    it('allows to transfer when paused and then unpaused', async function () {
      await this.token.pause();
      await this.token.unpause();

      await this.token.transfer(other, initialBalance, { from: owner });

      expect(await this.token.balanceOf(owner)).to.be.bignumber.equal('0');
      expect(await this.token.balanceOf(other)).to.be.bignumber.equal(initialBalance);
    });

    it('reverts when trying to transfer when paused', async function () {
      await this.token.pause();

      await expectRevert(this.token.transfer(other, initialBalance, { from: owner }),
        'ERC20Pausable: token transfer while paused',
      );
    });
  });

  describe('transfer from', function () {
    const allowance = new BN(40);

    beforeEach(async function () {
      await this.token.approve(thirdParty, allowance, { from: owner });
    });

    it('allows to transfer from when unpaused', async function () {
      await this.token.transferFrom(owner, other, allowance, { from: thirdParty });

      expect(await this.token.balanceOf(other)).to.be.bignumber.equal(allowance);
      expect(await this.token.balanceOf(owner)).to.be.bignumber.equal(initialBalance.sub(allowance));
    });

    it('allows to transfer when paused and then unpaused', async function () {
      await this.token.pause();
      await this.token.unpause();

      await this.token.transferFrom(owner, other, allowance, { from: thirdParty });

      expect(await this.token.balanceOf(other)).to.be.bignumber.equal(allowance);
      expect(await this.token.balanceOf(owner)).to.be.bignumber.equal(initialBalance.sub(allowance));
    });

    it('reverts when trying to transfer from when paused', async function () {
      await this.token.pause();

      await expectRevert(this.token.transferFrom(
        owner, other, allowance, { from: thirdParty }), 'ERC20Pausable: token transfer while paused',
      );
    });
  });

  context('like a Pausable', function () {
    beforeEach(async function () {
      this.pausable = this.token;
    });

    shouldBehaveLikePausable(owner);
  });
}

module.exports = {
  shouldBehaveLikeERC20Pausable,
};
