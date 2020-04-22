const { BN, constants, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const { ZERO_ADDRESS } = constants;

const { shouldBehaveLikeTokenRecover } = require('eth-token-recover/test/TokenRecover.behaviour');
const { shouldBehaveLikeERC1363 } = require('erc-payable-token/test/token/ERC1363/ERC1363.behaviour');

const { shouldBehaveLikeERC20 } = require('./ERC20.behaviour');
const { shouldBehaveLikeERC20Capped } = require('./ERC20Capped.behaviour');
const { shouldBehaveLikeERC20Burnable } = require('./ERC20Burnable.behaviour');

function shouldBehaveLikeBaseToken (
  [owner, anotherAccount, minter, operator, recipient, thirdParty],
  [_name, _symbol, _decimals, _cap, _initialSupply],
) {
  context('like a ERC20', function () {
    beforeEach(async function () {
      await this.token.grantRole((await this.token.MINTER_ROLE()), minter, { from: owner });
    });
    shouldBehaveLikeERC20(_name, _symbol, _decimals, [owner, anotherAccount, recipient], _initialSupply);
  });

  context('like a ERC20Capped', function () {
    beforeEach(async function () {
      await this.token.grantRole((await this.token.MINTER_ROLE()), minter, { from: owner });

      // NOTE: burning initial supply to test cap
      await this.token.burn(_initialSupply, { from: owner });
    });
    shouldBehaveLikeERC20Capped(minter, [anotherAccount], _cap);
  });

  context('like a ERC20Burnable', function () {
    shouldBehaveLikeERC20Burnable(owner, _initialSupply, [owner]);
  });

  context('like a ERC1363', function () {
    shouldBehaveLikeERC1363([owner, anotherAccount, recipient], _initialSupply);
  });

  context('BaseToken token behaviours', function () {
    beforeEach(async function () {
      await this.token.grantRole((await this.token.MINTER_ROLE()), minter, { from: owner });
      await this.token.grantRole((await this.token.OPERATOR_ROLE()), operator, { from: owner });
    });

    context('as a mintable token', function () {
      describe('mint', function () {
        const amount = new BN(100);

        context('when the sender has minting permission', function () {
          const from = minter;

          context('for a zero amount', function () {
            shouldMint(new BN(0));
          });

          context('for a non-zero amount', function () {
            shouldMint(amount);
          });

          function shouldMint (amount) {
            beforeEach(async function () {
              ({ logs: this.logs } = await this.token.mint(anotherAccount, amount, { from }));
            });

            it('mints the requested amount', async function () {
              (await this.token.balanceOf(anotherAccount)).should.be.bignumber.equal(amount);
            });

            it('emits a mint and a transfer event', async function () {
              expectEvent.inLogs(this.logs, 'Transfer', {
                from: ZERO_ADDRESS,
                to: anotherAccount,
                value: amount,
              });
            });
          }
        });

        context('when the sender doesn\'t have minting permission', function () {
          const from = anotherAccount;

          it('reverts', async function () {
            await expectRevert(
              this.token.mint(anotherAccount, amount, { from }),
              'Roles: caller does not have the MINTER role',
            );
          });
        });
      });
    });

    context('before finish minting', function () {
      beforeEach(async function () {
        await this.token.mint(thirdParty, _initialSupply, { from: minter });
      });

      it('mintingFinished should be false', async function () {
        (await this.token.mintingFinished()).should.be.equal(false);
      });

      describe('if transfer are not enabled', function () {
        it('transferEnabled should be false', async function () {
          (await this.token.transferEnabled()).should.be.equal(false);
        });

        describe('if it is not an operator', function () {
          it('should fail transfer', async function () {
            await expectRevert(
              this.token.transfer(recipient, _initialSupply, { from: thirdParty }),
              'BaseToken: transfer is not enabled or from does not have the OPERATOR role',
            );
          });

          it('should fail transferFrom', async function () {
            await this.token.approve(anotherAccount, _initialSupply, { from: thirdParty });
            await expectRevert(
              this.token.transferFrom(thirdParty, recipient, _initialSupply, { from: anotherAccount }),
              'BaseToken: transfer is not enabled or from does not have the OPERATOR role',
            );
          });
        });

        describe('if it is an operator', function () {
          beforeEach(async function () {
            await this.token.grantRole((await this.token.OPERATOR_ROLE()), thirdParty, { from: owner });
          });

          it('should transfer', async function () {
            await this.token.transfer(thirdParty, _initialSupply, { from: thirdParty });
          });

          it('should transferFrom', async function () {
            await this.token.approve(anotherAccount, _initialSupply, { from: thirdParty });
            await this.token.transferFrom(thirdParty, recipient, _initialSupply, { from: anotherAccount });
          });
        });
      });

      describe('if transfer are enabled', function () {
        beforeEach(async function () {
          ({ logs: this.logs } = await this.token.enableTransfer({ from: owner }));
        });

        it('should emit TransferEnabled', async function () {
          expectEvent.inLogs(this.logs, 'TransferEnabled');
        });

        it('transferEnabled should be true', async function () {
          (await this.token.transferEnabled()).should.be.equal(true);
        });

        describe('if it is not an operator', function () {
          it('should transfer', async function () {
            await this.token.transfer(thirdParty, _initialSupply, { from: thirdParty });
          });

          it('should transferFrom', async function () {
            await this.token.approve(anotherAccount, _initialSupply, { from: thirdParty });
            await this.token.transferFrom(thirdParty, recipient, _initialSupply, { from: anotherAccount });
          });
        });

        describe('if it is an operator', function () {
          beforeEach(async function () {
            await this.token.grantRole((await this.token.OPERATOR_ROLE()), thirdParty, { from: owner });
          });

          it('should transfer', async function () {
            await this.token.transfer(thirdParty, _initialSupply, { from: thirdParty });
          });

          it('should transferFrom', async function () {
            await this.token.approve(anotherAccount, _initialSupply, { from: thirdParty });
            await this.token.transferFrom(thirdParty, recipient, _initialSupply, { from: anotherAccount });
          });
        });
      });
    });

    context('after finish minting', function () {
      beforeEach(async function () {
        ({ logs: this.logs } = await this.token.finishMinting({ from: owner }));
      });

      it('should emit MintFinished', async function () {
        expectEvent.inLogs(this.logs, 'MintFinished');
      });

      it('mintingFinished should be true', async function () {
        (await this.token.mintingFinished()).should.be.equal(true);
      });

      it('shouldn\'t mint more tokens', async function () {
        await expectRevert(
          this.token.mint(thirdParty, 1, { from: minter }),
          'BaseToken: minting is finished',
        );
      });
    });

    context('like a TokenRecover', function () {
      beforeEach(async function () {
        this.instance = this.token;
      });

      shouldBehaveLikeTokenRecover([owner, thirdParty]);
    });
  });
}

module.exports = {
  shouldBehaveLikeBaseToken,
};
