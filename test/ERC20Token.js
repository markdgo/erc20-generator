import assertRevert from './helpers/assertRevert';

const BigNumber = web3.BigNumber;

require('chai')
    .use(require('chai-as-promised'))
    .use(require('chai-bignumber')(BigNumber))
    .should();

const ERC20Token = artifacts.require('ERC20Token');

contract('ERC20Token', function ([_, owner, tester, recipient, anotherAccount]) {

    const _name = 'TestToken';
    const _symbol = 'TEST';
    const _decimals = 18;
    const _initialAmount = 0;

    const amount = 100;

    const ZERO_ADDRESS = '0x0000000000000000000000000000000000000000';

    beforeEach(async function () {
        this.token = await ERC20Token.new(_name, _symbol, _decimals, _initialAmount, { from: owner });
    });

    describe('has details', async function () {
        it('has a name', async function () {
            const name = await this.token.name();
            name.should.be.equal(_name);
        });

        it('has a symbol', async function () {
            const symbol = await this.token.symbol();
            symbol.should.be.equal(_symbol);
        });

        it('has an amount of decimals', async function () {
            const decimals = await this.token.decimals();
            decimals.should.be.bignumber.equal(_decimals);
        });
    });

    describe('setting the initial amount', function () {
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

            it('balance of owner should be zero', async function () {
                const balance = await this.token.balanceOf(owner);

                assert.equal(balance, 0);
            });
        });
    });

    describe('total supply', function () {
        beforeEach(async function () {
            this.token = await ERC20Token.new(_name, _symbol, _decimals, _initialAmount, { from: owner });
            await this.token.mint(owner, amount, { from: owner });
        });

        it('returns the total amount of tokens', async function () {
            const totalSupply = await this.token.totalSupply();

            assert.equal(totalSupply, amount);
        });
    });

    describe('balanceOf', function () {
        beforeEach(async function () {
            await this.token.mint(owner, amount, { from: owner });
        });

        describe('when the requested account has no tokens', function () {
            it('returns zero', async function () {
                const balance = await this.token.balanceOf(anotherAccount);

                assert.equal(balance, 0);
            });
        });

        describe('when the requested account has some tokens', function () {
            it('returns the total amount of tokens', async function () {
                const balance = await this.token.balanceOf(owner);

                assert.equal(balance, 100);
            });
        });
    });

    describe('minting finished', function () {
        describe('when the token is not finished', function () {
            it('returns false', async function () {
                const mintingFinished = await this.token.mintingFinished();
                assert.equal(mintingFinished, false);
            });
        });

        describe('when the token is finished', function () {
            beforeEach(async function () {
                await this.token.finishMinting({ from: owner });
            });

            it('returns true', async function () {
                const mintingFinished = await this.token.mintingFinished.call();
                assert.equal(mintingFinished, true);
            });
        });
    });

    describe('finish minting', function () {
        describe('when the sender is the token owner', function () {
            const from = owner;

            describe('when the token was not finished', function () {
                it('finishes token minting', async function () {
                    await this.token.finishMinting({ from });

                    const mintingFinished = await this.token.mintingFinished();
                    assert.equal(mintingFinished, true);
                });

                it('emits a mint finished event', async function () {
                    const { logs } = await this.token.finishMinting({ from });

                    assert.equal(logs.length, 1);
                    assert.equal(logs[0].event, 'MintFinished');
                });
            });

            describe('when the token was already finished', function () {
                beforeEach(async function () {
                    await this.token.finishMinting({ from });
                });

                it('reverts', async function () {
                    await assertRevert(this.token.finishMinting({ from }));
                });
            });
        });

        describe('when the sender is not the token owner', function () {
            const from = anotherAccount;

            describe('when the token was not finished', function () {
                it('reverts', async function () {
                    await assertRevert(this.token.finishMinting({ from }));
                });
            });

            describe('when the token was already finished', function () {
                beforeEach(async function () {
                    await this.token.finishMinting({ from: owner });
                });

                it('reverts', async function () {
                    await assertRevert(this.token.finishMinting({ from }));
                });
            });
        });
    });

    describe('mint', function () {
        describe('when the sender is the token owner', function () {
            const from = owner;

            describe('when the token was not finished', function () {
                it('mints the requested amount', async function () {
                    await this.token.mint(owner, amount, { from });

                    const balance = await this.token.balanceOf(owner);
                    assert.equal(balance, amount);
                });

                it('emits a mint finished event', async function () {
                    const { logs } = await this.token.mint(owner, amount, { from });

                    assert.equal(logs.length, 2);
                    assert.equal(logs[0].event, 'Mint');
                    assert.equal(logs[0].args.to, owner);
                    assert.equal(logs[0].args.amount, amount);
                    assert.equal(logs[1].event, 'Transfer');
                });
            });

            describe('when the token minting is finished', function () {
                beforeEach(async function () {
                    await this.token.finishMinting({ from });
                });

                it('reverts', async function () {
                    await assertRevert(this.token.mint(owner, amount, { from }));
                });
            });
        });

        describe('when the sender is not the token owner', function () {
            const from = anotherAccount;

            describe('when the token was not finished', function () {
                it('reverts', async function () {
                    await assertRevert(this.token.mint(owner, amount, { from }));
                });
            });

            describe('when the token was already finished', function () {
                beforeEach(async function () {
                    await this.token.finishMinting({ from: owner });
                });

                it('reverts', async function () {
                    await assertRevert(this.token.mint(owner, amount, { from }));
                });
            });
        });
    });

    describe('transfer', function () {
        beforeEach(async function () {
            await this.token.mint(owner, amount, { from: owner });
        });

        describe('when the recipient is not the zero address', function () {
            const to = recipient;

            describe('when the sender does not have enough balance', function () {
                const moreThanAmount = amount + 1;

                it('reverts', async function () {
                    await assertRevert(this.token.transfer(to, moreThanAmount, { from: owner }));
                });
            });

            describe('when the sender has enough balance', function () {
                it('transfers the requested amount', async function () {
                    await this.token.transfer(to, amount, { from: owner });

                    const senderBalance = await this.token.balanceOf(owner);
                    assert.equal(senderBalance, 0);

                    const recipientBalance = await this.token.balanceOf(to);
                    assert.equal(recipientBalance, amount);
                });

                it('emits a transfer event', async function () {
                    const { logs } = await this.token.transfer(to, amount, { from: owner });

                    assert.equal(logs.length, 1);
                    assert.equal(logs[0].event, 'Transfer');
                    assert.equal(logs[0].args.from, owner);
                    assert.equal(logs[0].args.to, to);
                    assert(logs[0].args.value.eq(amount));
                });
            });
        });

        describe('when the recipient is the zero address', function () {
            const to = ZERO_ADDRESS;

            it('reverts', async function () {
                await assertRevert(this.token.transfer(to, 100, { from: owner }));
            });
        });
    });

    describe('approve', function () {
        beforeEach(async function () {
            await this.token.mint(owner, amount, { from: owner });
        });

        describe('when the spender is not the zero address', function () {
            const spender = recipient;

            describe('when the sender has enough balance', function () {
                it('emits an approval event', async function () {
                    const { logs } = await this.token.approve(spender, amount, { from: owner });

                    assert.equal(logs.length, 1);
                    assert.equal(logs[0].event, 'Approval');
                    assert.equal(logs[0].args.owner, owner);
                    assert.equal(logs[0].args.spender, spender);
                    assert(logs[0].args.value.eq(amount));
                });

                describe('when there was no approved amount before', function () {
                    it('approves the requested amount', async function () {
                        await this.token.approve(spender, amount, { from: owner });

                        const allowance = await this.token.allowance(owner, spender);
                        assert.equal(allowance, amount);
                    });
                });

                describe('when the spender had an approved amount', function () {
                    beforeEach(async function () {
                        await this.token.approve(spender, 1, { from: owner });
                    });

                    it('approves the requested amount and replaces the previous one', async function () {
                        await this.token.approve(spender, amount, { from: owner });

                        const allowance = await this.token.allowance(owner, spender);
                        assert.equal(allowance, amount);
                    });
                });
            });

            describe('when the sender does not have enough balance', function () {
                const moreThanAmount = amount + 1;

                it('emits an approval event', async function () {
                    const { logs } = await this.token.approve(spender, moreThanAmount, { from: owner });

                    assert.equal(logs.length, 1);
                    assert.equal(logs[0].event, 'Approval');
                    assert.equal(logs[0].args.owner, owner);
                    assert.equal(logs[0].args.spender, spender);
                    assert(logs[0].args.value.eq(moreThanAmount));
                });

                describe('when there was no approved amount before', function () {
                    it('approves the requested amount', async function () {
                        await this.token.approve(spender, moreThanAmount, { from: owner });

                        const allowance = await this.token.allowance(owner, spender);
                        assert.equal(allowance, moreThanAmount);
                    });
                });

                describe('when the spender had an approved amount', function () {
                    beforeEach(async function () {
                        await this.token.approve(spender, 1, { from: owner });
                    });

                    it('approves the requested amount and replaces the previous one', async function () {
                        await this.token.approve(spender, moreThanAmount, { from: owner });

                        const allowance = await this.token.allowance(owner, spender);
                        assert.equal(allowance, moreThanAmount);
                    });
                });
            });
        });

        describe('when the spender is the zero address', function () {
            const spender = ZERO_ADDRESS;

            it('approves the requested amount', async function () {
                await this.token.approve(spender, amount, { from: owner });

                const allowance = await this.token.allowance(owner, spender);
                assert.equal(allowance, amount);
            });

            it('emits an approval event', async function () {
                const { logs } = await this.token.approve(spender, amount, { from: owner });

                assert.equal(logs.length, 1);
                assert.equal(logs[0].event, 'Approval');
                assert.equal(logs[0].args.owner, owner);
                assert.equal(logs[0].args.spender, spender);
                assert(logs[0].args.value.eq(amount));
            });
        });
    });

    describe('transfer from', function () {
        const spender = recipient;

        beforeEach(async function () {
            await this.token.mint(owner, amount, { from: owner });
        });

        describe('when the recipient is not the zero address', function () {
            const to = anotherAccount;

            describe('when the spender has enough approved balance', function () {
                beforeEach(async function () {
                    await this.token.approve(spender, 100, { from: owner });
                });

                describe('when the owner has enough balance', function () {
                    it('transfers the requested amount', async function () {
                        await this.token.transferFrom(owner, to, amount, { from: spender });

                        const senderBalance = await this.token.balanceOf(owner);
                        assert.equal(senderBalance, 0);

                        const recipientBalance = await this.token.balanceOf(to);
                        assert.equal(recipientBalance, amount);
                    });

                    it('decreases the spender allowance', async function () {
                        await this.token.transferFrom(owner, to, amount, { from: spender });

                        const allowance = await this.token.allowance(owner, spender);
                        assert(allowance.eq(0));
                    });

                    it('emits a transfer event', async function () {
                        const { logs } = await this.token.transferFrom(owner, to, amount, { from: spender });

                        assert.equal(logs.length, 1);
                        assert.equal(logs[0].event, 'Transfer');
                        assert.equal(logs[0].args.from, owner);
                        assert.equal(logs[0].args.to, to);
                        assert(logs[0].args.value.eq(amount));
                    });
                });

                describe('when the owner does not have enough balance', function () {
                    const moreThanAmount = amount + 1;

                    it('reverts', async function () {
                        await assertRevert(this.token.transferFrom(owner, to, moreThanAmount, { from: spender }));
                    });
                });
            });

            describe('when the spender does not have enough approved balance', function () {
                beforeEach(async function () {
                    await this.token.approve(spender, 99, { from: owner });
                });

                describe('when the owner has enough balance', function () {
                    it('reverts', async function () {
                        await assertRevert(this.token.transferFrom(owner, to, amount, { from: spender }));
                    });
                });

                describe('when the owner does not have enough balance', function () {
                    const moreThanAmount = amount + 1;

                    it('reverts', async function () {
                        await assertRevert(this.token.transferFrom(owner, to, moreThanAmount, { from: spender }));
                    });
                });
            });
        });

        describe('when the recipient is the zero address', function () {
            const to = ZERO_ADDRESS;

            beforeEach(async function () {
                await this.token.approve(spender, amount, { from: owner });
            });

            it('reverts', async function () {
                await assertRevert(this.token.transferFrom(owner, to, amount, { from: spender }));
            });
        });
    });

    describe('decrease approval', function () {
        beforeEach(async function () {
            await this.token.mint(owner, amount, { from: owner });
        });

        describe('when the spender is not the zero address', function () {
            const spender = recipient;

            describe('when the sender has enough balance', function () {
                it('emits an approval event', async function () {
                    const { logs } = await this.token.decreaseApproval(spender, amount, { from: owner });

                    assert.equal(logs.length, 1);
                    assert.equal(logs[0].event, 'Approval');
                    assert.equal(logs[0].args.owner, owner);
                    assert.equal(logs[0].args.spender, spender);
                    assert(logs[0].args.value.eq(0));
                });

                describe('when there was no approved amount before', function () {
                    it('keeps the allowance to zero', async function () {
                        await this.token.decreaseApproval(spender, amount, { from: owner });

                        const allowance = await this.token.allowance(owner, spender);
                        assert.equal(allowance, 0);
                    });
                });

                describe('when the spender had an approved amount', function () {
                    beforeEach(async function () {
                        await this.token.approve(spender, amount + 1, { from: owner });
                    });

                    it('decreases the spender allowance subtracting the requested amount', async function () {
                        await this.token.decreaseApproval(spender, amount, { from: owner });

                        const allowance = await this.token.allowance(owner, spender);
                        assert.equal(allowance, 1);
                    });
                });
            });

            describe('when the sender does not have enough balance', function () {
                const moreThanAmount = amount + 1;

                it('emits an approval event', async function () {
                    const { logs } = await this.token.decreaseApproval(spender, moreThanAmount, { from: owner });

                    assert.equal(logs.length, 1);
                    assert.equal(logs[0].event, 'Approval');
                    assert.equal(logs[0].args.owner, owner);
                    assert.equal(logs[0].args.spender, spender);
                    assert(logs[0].args.value.eq(0));
                });

                describe('when there was no approved amount before', function () {
                    it('keeps the allowance to zero', async function () {
                        await this.token.decreaseApproval(spender, moreThanAmount, { from: owner });

                        const allowance = await this.token.allowance(owner, spender);
                        assert.equal(allowance, 0);
                    });
                });

                describe('when the spender had an approved amount', function () {
                    beforeEach(async function () {
                        await this.token.approve(spender, moreThanAmount + 1, { from: owner });
                    });

                    it('decreases the spender allowance subtracting the requested amount', async function () {
                        await this.token.decreaseApproval(spender, moreThanAmount, { from: owner });

                        const allowance = await this.token.allowance(owner, spender);
                        assert.equal(allowance, 1);
                    });
                });
            });
        });

        describe('when the spender is the zero address', function () {
            const spender = ZERO_ADDRESS;

            it('decreases the requested amount', async function () {
                await this.token.decreaseApproval(spender, amount, { from: owner });

                const allowance = await this.token.allowance(owner, spender);
                assert.equal(allowance, 0);
            });

            it('emits an approval event', async function () {
                const { logs } = await this.token.decreaseApproval(spender, amount, { from: owner });

                assert.equal(logs.length, 1);
                assert.equal(logs[0].event, 'Approval');
                assert.equal(logs[0].args.owner, owner);
                assert.equal(logs[0].args.spender, spender);
                assert(logs[0].args.value.eq(0));
            });
        });
    });

    describe('increase approval', function () {
        beforeEach(async function () {
            await this.token.mint(owner, amount, { from: owner });
        });

        describe('when the spender is not the zero address', function () {
            const spender = recipient;

            describe('when the sender has enough balance', function () {
                it('emits an approval event', async function () {
                    const { logs } = await this.token.increaseApproval(spender, amount, { from: owner });

                    assert.equal(logs.length, 1);
                    assert.equal(logs[0].event, 'Approval');
                    assert.equal(logs[0].args.owner, owner);
                    assert.equal(logs[0].args.spender, spender);
                    assert(logs[0].args.value.eq(amount));
                });

                describe('when there was no approved amount before', function () {
                    it('approves the requested amount', async function () {
                        await this.token.increaseApproval(spender, amount, { from: owner });

                        const allowance = await this.token.allowance(owner, spender);
                        assert.equal(allowance, amount);
                    });
                });

                describe('when the spender had an approved amount', function () {
                    beforeEach(async function () {
                        await this.token.approve(spender, 1, { from: owner });
                    });

                    it('increases the spender allowance adding the requested amount', async function () {
                        await this.token.increaseApproval(spender, amount, { from: owner });

                        const allowance = await this.token.allowance(owner, spender);
                        assert.equal(allowance, amount + 1);
                    });
                });
            });

            describe('when the sender does not have enough balance', function () {
                const moreThanAmount = amount + 1;

                it('emits an approval event', async function () {
                    const { logs } = await this.token.increaseApproval(spender, moreThanAmount, { from: owner });

                    assert.equal(logs.length, 1);
                    assert.equal(logs[0].event, 'Approval');
                    assert.equal(logs[0].args.owner, owner);
                    assert.equal(logs[0].args.spender, spender);
                    assert(logs[0].args.value.eq(moreThanAmount));
                });

                describe('when there was no approved amount before', function () {
                    it('approves the requested amount', async function () {
                        await this.token.increaseApproval(spender, moreThanAmount, { from: owner });

                        const allowance = await this.token.allowance(owner, spender);
                        assert.equal(allowance, moreThanAmount);
                    });
                });

                describe('when the spender had an approved amount', function () {
                    beforeEach(async function () {
                        await this.token.approve(spender, 1, { from: owner });
                    });

                    it('increases the spender allowance adding the requested amount', async function () {
                        await this.token.increaseApproval(spender, moreThanAmount, { from: owner });

                        const allowance = await this.token.allowance(owner, spender);
                        assert.equal(allowance, moreThanAmount + 1);
                    });
                });
            });
        });

        describe('when the spender is the zero address', function () {
            const spender = ZERO_ADDRESS;

            it('approves the requested amount', async function () {
                await this.token.increaseApproval(spender, amount, { from: owner });

                const allowance = await this.token.allowance(owner, spender);
                assert.equal(allowance, amount);
            });

            it('emits an approval event', async function () {
                const { logs } = await this.token.increaseApproval(spender, amount, { from: owner });

                assert.equal(logs.length, 1);
                assert.equal(logs[0].event, 'Approval');
                assert.equal(logs[0].args.owner, owner);
                assert.equal(logs[0].args.spender, spender);
                assert(logs[0].args.value.eq(amount));
            });
        });
    });

    describe('burn', function () {
        const from = owner;

        const initialAmount = 10 * amount;

        beforeEach(async function () {
            await this.token.mint(owner, initialAmount, { from: owner });
        });

        describe('when the given amount is not greater than balance of the sender', function () {
            const amount = 100;

            it('burns the requested amount', async function () {
                await this.token.burn(amount, { from });

                const balance = await this.token.balanceOf(from);
                assert.equal(balance, 900);
            });

            it('emits a burn event', async function () {
                const { logs } = await this.token.burn(amount, { from });
                assert.equal(logs.length, 2);
                assert.equal(logs[0].event, 'Burn');
                assert.equal(logs[0].args.burner, owner);
                assert.equal(logs[0].args.value, amount);

                assert.equal(logs[1].event, 'Transfer');
                assert.equal(logs[1].args.from, owner);
                assert.equal(logs[1].args.to, ZERO_ADDRESS);
                assert.equal(logs[1].args.value, amount);
            });
        });

        describe('when the given amount is greater than the balance of the sender', function () {
            it('reverts', async function () {
                await assertRevert(this.token.burn(initialAmount + 1, { from }));
            });
        });
    });
});