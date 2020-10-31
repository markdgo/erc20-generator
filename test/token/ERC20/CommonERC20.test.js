const { BN, constants, ether, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const { ZERO_ADDRESS } = constants;

const { shouldBehaveLikeOwnable } = require('eth-token-recover/test/access/Ownable.behavior');

const { shouldBehaveLikeERC20 } = require('./behaviours/ERC20.behaviour');
const { shouldBehaveLikeERC20Burnable } = require('./behaviours/ERC20Burnable.behaviour');
const { shouldBehaveLikeERC20Capped } = require('./behaviours/ERC20Capped.behaviour');
const { shouldBehaveLikeERC20Mintable } = require('./behaviours/ERC20Mintable.behaviour');

const CommonERC20 = artifacts.require('CommonERC20');
const ServiceReceiver = artifacts.require('ServiceReceiver');

contract('CommonERC20', function ([owner, anotherAccount, recipient, thirdParty]) {
  const _name = 'CommonERC20';
  const _symbol = 'ERC20';
  const _decimals = new BN(8);
  const _cap = new BN(200000000);
  const _initialSupply = new BN(100000000);

  const fee = ether('0.1');

  beforeEach(async function () {
    this.serviceReceiver = await ServiceReceiver.new({ from: owner });
    await this.serviceReceiver.setPrice('CommonERC20', fee);
  });

  context('creating valid token', function () {
    describe('as a ERC20Capped', function () {
      it('requires a non-zero cap', async function () {
        await expectRevert(
          CommonERC20.new(
            _name,
            _symbol,
            _decimals,
            0,
            _initialSupply,
            this.serviceReceiver.address,
            {
              from: owner,
              value: fee,
            },
          ),
          'ERC20Capped: cap is 0',
        );
      });
    });

    describe('as a CommonERC20', function () {
      describe('without initial supply', function () {
        beforeEach(async function () {
          this.token = await CommonERC20.new(
            _name,
            _symbol,
            _decimals,
            _cap,
            0,
            this.serviceReceiver.address,
            {
              from: owner,
              value: fee,
            },
          );
        });

        describe('once deployed', function () {
          it('total supply should be equal to zero', async function () {
            (await this.token.totalSupply()).should.be.bignumber.equal(new BN(0));
          });

          it('owner balance should be equal to zero', async function () {
            (await this.token.balanceOf(owner)).should.be.bignumber.equal(new BN(0));
          });
        });
      });

      describe('with initial supply', function () {
        beforeEach(async function () {
          this.token = await CommonERC20.new(
            _name,
            _symbol,
            _decimals,
            _cap,
            _initialSupply,
            this.serviceReceiver.address,
            {
              from: owner,
              value: fee,
            },
          );
        });

        describe('once deployed', function () {
          it('total supply should be equal to initial supply', async function () {
            (await this.token.totalSupply()).should.be.bignumber.equal(_initialSupply);
          });

          it('owner balance should be equal to initial supply', async function () {
            (await this.token.balanceOf(owner)).should.be.bignumber.equal(_initialSupply);
          });
        });
      });
    });
  });

  context('CommonERC20 token behaviours', function () {
    beforeEach(async function () {
      this.token = await CommonERC20.new(
        _name,
        _symbol,
        _decimals,
        _cap,
        _initialSupply,
        this.serviceReceiver.address,
        {
          from: owner,
          value: fee,
        },
      );
    });

    context('like a ERC20', function () {
      shouldBehaveLikeERC20(_name, _symbol, _decimals, [owner, anotherAccount, recipient], _initialSupply);
    });

    context('like a ERC20Capped', function () {
      beforeEach(async function () {
        // NOTE: burning initial supply to test cap
        await this.token.burn(_initialSupply, { from: owner });
      });
      shouldBehaveLikeERC20Capped(owner, [anotherAccount], _cap);
    });

    context('like a ERC20Mintable', function () {
      shouldBehaveLikeERC20Mintable(owner, anotherAccount, recipient, _initialSupply);
    });

    context('like a ERC20Burnable', function () {
      shouldBehaveLikeERC20Burnable(owner, _initialSupply, [owner]);
    });

    context('like a CommonERC20', function () {
      describe('mint', function () {
        const amount = new BN(100);

        context('when the sender has minting permission', function () {
          const from = owner;

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

            it('emits a transfer event', async function () {
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
              'Ownable: caller is not the owner',
            );
          });
        });
      });

      context('before finish minting', function () {
        it('mintingFinished should be false', async function () {
          (await this.token.mintingFinished()).should.be.equal(false);
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
            this.token.mint(thirdParty, 1, { from: owner }),
            'CommonERC20: minting is finished',
          );
        });
      });
    });

    context('like a Ownable', function () {
      beforeEach(async function () {
        this.ownable = this.token;
      });

      shouldBehaveLikeOwnable(owner, [thirdParty]);
    });
  });
});
