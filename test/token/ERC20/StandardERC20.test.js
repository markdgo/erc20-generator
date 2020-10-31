const { BN, ether, expectRevert } = require('@openzeppelin/test-helpers');

const { shouldBehaveLikeERC20 } = require('./behaviours/ERC20.behaviour');

const StandardERC20 = artifacts.require('StandardERC20');
const ServiceReceiver = artifacts.require('ServiceReceiver');

contract('StandardERC20', function ([owner, recipient, thirdParty]) {
  const _name = 'StandardERC20';
  const _symbol = 'ERC20';
  const _decimals = new BN(8);
  const _initialSupply = new BN(100000000);

  const fee = ether('0.1');

  beforeEach(async function () {
    this.serviceReceiver = await ServiceReceiver.new({ from: owner });
    await this.serviceReceiver.setPrice('StandardERC20', fee);
  });

  context('creating valid token', function () {
    describe('as a StandardERC20', function () {
      describe('without initial supply', function () {
        it('should fail', async function () {
          await expectRevert(
            StandardERC20.new(
              _name,
              _symbol,
              _decimals,
              0,
              this.serviceReceiver.address,
              {
                from: owner,
                value: fee,
              },
            ),
            'StandardERC20: supply cannot be zero',
          );
        });
      });

      describe('with initial supply', function () {
        beforeEach(async function () {
          this.token = await StandardERC20.new(
            _name,
            _symbol,
            _decimals,
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

  context('StandardERC20 token behaviours', function () {
    beforeEach(async function () {
      this.token = await StandardERC20.new(
        _name,
        _symbol,
        _decimals,
        _initialSupply,
        this.serviceReceiver.address,
        {
          from: owner,
          value: fee,
        },
      );
    });

    context('like a ERC20', function () {
      shouldBehaveLikeERC20(
        _name, _symbol, _decimals, [owner, recipient, thirdParty], _initialSupply,
      );
    });
  });
});
