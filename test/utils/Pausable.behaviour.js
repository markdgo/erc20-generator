const { expectEvent, expectRevert } = require('@openzeppelin/test-helpers');

function shouldBehaveLikePausable (pauser) {
  context('when unpaused', function () {
    it('paused should be false', async function () {
      expect(await this.pausable.paused()).to.equal(false);
    });

    context('when paused', function () {
      beforeEach(async function () {
        ({ logs: this.logs } = await this.pausable.pause({ from: pauser }));
      });

      it('emits a Paused event', function () {
        expectEvent.inLogs(this.logs, 'Paused', { account: pauser });
      });

      it('paused should be true', async function () {
        expect(await this.pausable.paused()).to.equal(true);
      });

      it('reverts when re-pausing', async function () {
        await expectRevert(this.pausable.pause({ from: pauser }), 'Pausable: paused');
      });

      describe('unpausing', function () {
        it('is unpausable by the pauser', async function () {
          await this.pausable.unpause({ from: pauser });
          expect(await this.pausable.paused()).to.equal(false);
        });

        context('when unpaused', function () {
          beforeEach(async function () {
            ({ logs: this.logs } = await this.pausable.unpause({ from: pauser }));
          });

          it('emits an Unpaused event', function () {
            expectEvent.inLogs(this.logs, 'Unpaused', { account: pauser });
          });

          it('reverts when re-unpausing', async function () {
            await expectRevert(this.pausable.unpause({ from: pauser }), 'Pausable: not paused');
          });
        });
      });
    });
  });
}

module.exports = {
  shouldBehaveLikePausable,
};
