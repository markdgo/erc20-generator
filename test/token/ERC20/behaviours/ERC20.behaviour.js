const { BN, constants, expectEvent, expectRevert } = require('@openzeppelin/test-helpers');
const { ZERO_ADDRESS } = constants;

function shouldBehaveLikeERC20 (_name, _symbol, _decimals, [owner, recipient, anotherAccount], initialBalance) {
  it('has a name', async function () {
    (await this.token.name()).should.be.equal(_name);
  });

  it('has a symbol', async function () {
    (await this.token.symbol()).should.be.equal(_symbol);
  });

  it('has an amount of decimals', async function () {
    (await this.token.decimals()).should.be.bignumber.equal(_decimals);
  });

  describe('total supply', function () {
    it('returns the total amount of tokens', async function () {
      (await this.token.totalSupply()).should.be.bignumber.equal(initialBalance);
    });
  });

  describe('balanceOf', function () {
    describe('when the requested account has no tokens', function () {
      it('returns zero', async function () {
        (await this.token.balanceOf(anotherAccount)).should.be.bignumber.equal(new BN(0));
      });
    });

    describe('when the requested account has some tokens', function () {
      it('returns the total amount of tokens', async function () {
        (await this.token.balanceOf(owner)).should.be.bignumber.equal(initialBalance);
      });
    });
  });

  describe('transfer', function () {
    describe('when the recipient is not the zero address', function () {
      const to = recipient;

      describe('when the sender does not have enough balance', function () {
        const amount = initialBalance.addn(1);

        it('reverts', async function () {
          await expectRevert(
            this.token.transfer(to, amount, { from: owner }),
            'ERC20: transfer amount exceeds balance',
          );
        });
      });

      describe('when the sender has enough balance', function () {
        const amount = initialBalance;

        it('transfers the requested amount', async function () {
          await this.token.transfer(to, amount, { from: owner });

          (await this.token.balanceOf(owner)).should.be.bignumber.equal(new BN(0));

          (await this.token.balanceOf(to)).should.be.bignumber.equal(amount);
        });

        it('emits a transfer event', async function () {
          const { logs } = await this.token.transfer(to, amount, { from: owner });

          expectEvent.inLogs(logs, 'Transfer', {
            from: owner,
            to: to,
            value: amount,
          });
        });
      });
    });

    describe('when the recipient is the zero address', function () {
      const to = ZERO_ADDRESS;

      it('reverts', async function () {
        await expectRevert(
          this.token.transfer(to, initialBalance, { from: owner }),
          'ERC20: transfer to the zero address',
        );
      });
    });
  });

  describe('approve', function () {
    describe('when the spender is not the zero address', function () {
      const spender = recipient;

      describe('when the sender has enough balance', function () {
        const amount = initialBalance;

        it('emits an approval event', async function () {
          const { logs } = await this.token.approve(spender, amount, { from: owner });

          expectEvent.inLogs(logs, 'Approval', {
            owner: owner,
            spender: spender,
            value: amount,
          });
        });

        describe('when there was no approved amount before', function () {
          it('approves the requested amount', async function () {
            await this.token.approve(spender, amount, { from: owner });

            (await this.token.allowance(owner, spender)).should.be.bignumber.equal(amount);
          });
        });

        describe('when the spender had an approved amount', function () {
          beforeEach(async function () {
            await this.token.approve(spender, 1, { from: owner });
          });

          it('approves the requested amount and replaces the previous one', async function () {
            await this.token.approve(spender, amount, { from: owner });

            (await this.token.allowance(owner, spender)).should.be.bignumber.equal(amount);
          });
        });
      });

      describe('when the sender does not have enough balance', function () {
        const amount = initialBalance.addn(1);

        it('emits an approval event', async function () {
          const { logs } = await this.token.approve(spender, amount, { from: owner });

          expectEvent.inLogs(logs, 'Approval', {
            owner: owner,
            spender: spender,
            value: amount,
          });
        });

        describe('when there was no approved amount before', function () {
          it('approves the requested amount', async function () {
            await this.token.approve(spender, amount, { from: owner });

            (await this.token.allowance(owner, spender)).should.be.bignumber.equal(amount);
          });
        });

        describe('when the spender had an approved amount', function () {
          beforeEach(async function () {
            await this.token.approve(spender, 1, { from: owner });
          });

          it('approves the requested amount and replaces the previous one', async function () {
            await this.token.approve(spender, amount, { from: owner });

            (await this.token.allowance(owner, spender)).should.be.bignumber.equal(amount);
          });
        });
      });
    });

    describe('when the spender is the zero address', function () {
      const amount = initialBalance;
      const spender = ZERO_ADDRESS;

      it('reverts', async function () {
        await expectRevert(
          this.token.approve(spender, amount, { from: owner }),
          'ERC20: approve to the zero address',
        );
      });
    });
  });

  describe('transfer from', function () {
    const spender = recipient;

    describe('when the recipient is not the zero address', function () {
      const to = anotherAccount;

      describe('when the spender has enough approved balance', function () {
        beforeEach(async function () {
          await this.token.approve(spender, initialBalance, { from: owner });
        });

        describe('when the owner has enough balance', function () {
          const amount = initialBalance;

          it('transfers the requested amount', async function () {
            await this.token.transferFrom(owner, to, amount, { from: spender });

            (await this.token.balanceOf(owner)).should.be.bignumber.equal(new BN(0));

            (await this.token.balanceOf(to)).should.be.bignumber.equal(amount);
          });

          it('decreases the spender allowance', async function () {
            await this.token.transferFrom(owner, to, amount, { from: spender });

            (await this.token.allowance(owner, spender)).should.be.bignumber.equal(new BN(0));
          });

          it('emits a transfer event', async function () {
            const { logs } = await this.token.transferFrom(owner, to, amount, { from: spender });

            expectEvent.inLogs(logs, 'Transfer', {
              from: owner,
              to: to,
              value: amount,
            });
          });
        });

        describe('when the owner does not have enough balance', function () {
          const amount = initialBalance.addn(1);

          it('reverts', async function () {
            await expectRevert(
              this.token.transferFrom(owner, to, amount, { from: spender }),
              'ERC20: transfer amount exceeds balance',
            );
          });
        });
      });

      describe('when the spender does not have enough approved balance', function () {
        beforeEach(async function () {
          await this.token.approve(spender, 99, { from: owner });
        });

        describe('when the owner has enough balance', function () {
          const amount = initialBalance;

          it('reverts', async function () {
            await expectRevert(
              this.token.transferFrom(owner, to, amount, { from: spender }),
              'ERC20: transfer amount exceeds allowance',
            );
          });
        });

        describe('when the owner does not have enough balance', function () {
          const amount = initialBalance.addn(1);

          it('reverts', async function () {
            await expectRevert(
              this.token.transferFrom(owner, to, amount, { from: spender }),
              'ERC20: transfer amount exceeds balance',
            );
          });
        });
      });
    });

    describe('when the recipient is the zero address', function () {
      const amount = initialBalance;
      const to = ZERO_ADDRESS;

      beforeEach(async function () {
        await this.token.approve(spender, amount, { from: owner });
      });

      it('reverts', async function () {
        await expectRevert(
          this.token.transferFrom(owner, to, amount, { from: spender }),
          'ERC20: transfer to the zero address',
        );
      });
    });
  });

  describe('decrease allowance', function () {
    describe('when the spender is not the zero address', function () {
      const spender = recipient;

      function shouldDecreaseApproval (amount) {
        describe('when there was no approved amount before', function () {
          it('reverts', async function () {
            await expectRevert(
              this.token.decreaseAllowance(spender, amount, { from: owner }),
              'ERC20: decreased allowance below zero',
            );
          });
        });

        describe('when the spender had an approved amount', function () {
          const approvedAmount = amount;

          beforeEach(async function () {
            ({ logs: this.logs } = await this.token.approve(spender, approvedAmount, { from: owner }));
          });

          it('emits an approval event', async function () {
            const { logs } = await this.token.decreaseAllowance(spender, approvedAmount, { from: owner });

            expectEvent.inLogs(logs, 'Approval', {
              owner: owner,
              spender: spender,
              value: new BN(0),
            });
          });

          it('decreases the spender allowance subtracting the requested amount', async function () {
            await this.token.decreaseAllowance(spender, approvedAmount.subn(1), { from: owner });

            (await this.token.allowance(owner, spender)).should.be.bignumber.equal(new BN(1));
          });

          it('sets the allowance to zero when all allowance is removed', async function () {
            await this.token.decreaseAllowance(spender, approvedAmount, { from: owner });
            (await this.token.allowance(owner, spender)).should.be.bignumber.equal(new BN(0));
          });

          it('reverts when more than the full allowance is removed', async function () {
            await expectRevert(
              this.token.decreaseAllowance(spender, approvedAmount.addn(1), { from: owner }),
              'ERC20: decreased allowance below zero',
            );
          });
        });
      }

      describe('when the sender has enough balance', function () {
        const amount = initialBalance;

        shouldDecreaseApproval(amount);
      });

      describe('when the sender does not have enough balance', function () {
        const amount = initialBalance.addn(1);

        shouldDecreaseApproval(amount);
      });
    });

    describe('when the spender is the zero address', function () {
      const amount = initialBalance;
      const spender = ZERO_ADDRESS;

      it('reverts', async function () {
        await expectRevert(
          this.token.decreaseAllowance(spender, amount, { from: owner }),
          'ERC20: decreased allowance below zero',
        );
      });
    });
  });

  describe('increase allowance', function () {
    const amount = initialBalance;

    describe('when the spender is not the zero address', function () {
      const spender = recipient;

      describe('when the sender has enough balance', function () {
        it('emits an approval event', async function () {
          const { logs } = await this.token.increaseAllowance(spender, amount, { from: owner });

          expectEvent.inLogs(logs, 'Approval', {
            owner: owner,
            spender: spender,
            value: amount,
          });
        });

        describe('when there was no approved amount before', function () {
          it('approves the requested amount', async function () {
            await this.token.increaseAllowance(spender, amount, { from: owner });

            (await this.token.allowance(owner, spender)).should.be.bignumber.equal(amount);
          });
        });

        describe('when the spender had an approved amount', function () {
          beforeEach(async function () {
            await this.token.approve(spender, 1, { from: owner });
          });

          it('increases the spender allowance adding the requested amount', async function () {
            await this.token.increaseAllowance(spender, amount, { from: owner });

            (await this.token.allowance(owner, spender)).should.be.bignumber.equal(amount.addn(1));
          });
        });
      });

      describe('when the sender does not have enough balance', function () {
        const amount = initialBalance.addn(1);

        it('emits an approval event', async function () {
          const { logs } = await this.token.increaseAllowance(spender, amount, { from: owner });

          expectEvent.inLogs(logs, 'Approval', {
            owner: owner,
            spender: spender,
            value: amount,
          });
        });

        describe('when there was no approved amount before', function () {
          it('approves the requested amount', async function () {
            await this.token.increaseAllowance(spender, amount, { from: owner });

            (await this.token.allowance(owner, spender)).should.be.bignumber.equal(amount);
          });
        });

        describe('when the spender had an approved amount', function () {
          beforeEach(async function () {
            await this.token.approve(spender, 1, { from: owner });
          });

          it('increases the spender allowance adding the requested amount', async function () {
            await this.token.increaseAllowance(spender, amount, { from: owner });

            (await this.token.allowance(owner, spender)).should.be.bignumber.equal(amount.addn(1));
          });
        });
      });
    });

    describe('when the spender is the zero address', function () {
      const spender = ZERO_ADDRESS;

      it('reverts', async function () {
        await expectRevert(
          this.token.increaseAllowance(spender, amount, { from: owner }),
          'ERC20: approve to the zero address',
        );
      });
    });
  });
}

module.exports = {
  shouldBehaveLikeERC20,
};
