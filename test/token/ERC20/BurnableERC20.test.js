const { BN, ether, expectRevert } = require('@openzeppelin/test-helpers');

const { shouldBehaveLikeERC20 } = require('./behaviours/ERC20.behaviour');
const { shouldBehaveLikeERC20Burnable } = require('./behaviours/ERC20Burnable.behaviour');

const BurnableERC20 = artifacts.require('BurnableERC20');
const ServiceReceiver = artifacts.require('ServiceReceiver');

contract('BurnableERC20', function ([owner, other, thirdParty]) {
  const _name = 'BurnableERC20';
  const _symbol = 'ERC20';
  const _decimals = new BN(8);
  const _initialSupply = new BN(100000000);

  const fee = ether('0.1');

  beforeEach(async function () {
    this.serviceReceiver = await ServiceReceiver.new({ from: owner });
    await this.serviceReceiver.setPrice('BurnableERC20', fee);
  });

  context('creating valid token', function () {
    describe('as a BurnableERC20', function () {
      describe('without initial supply', function () {
        it('should fail', async function () {
          await expectRevert(
            BurnableERC20.new(
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
            'BurnableERC20: supply cannot be zero',
          );
        });
      });

      describe('with initial supply', function () {
        beforeEach(async function () {
          this.token = await BurnableERC20.new(
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

  context('BurnableERC20 token behaviours', function () {
    beforeEach(async function () {
      this.token = await BurnableERC20.new(
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
      shouldBehaveLikeERC20(_name, _symbol, _decimals, _initialSupply, [owner, other, thirdParty]);
    });

    context('like a ERC20Burnable', function () {
      shouldBehaveLikeERC20Burnable(_initialSupply, [owner, thirdParty]);
    });
  });
});
