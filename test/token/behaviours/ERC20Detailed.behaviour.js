const BigNumber = web3.BigNumber;

require('chai')
  .use(require('chai-bignumber')(BigNumber))
  .should();

function shouldBehaveLikeERC20Detailed (_name, _symbol, _decimals) {
  it('has a name', async function () {
    (await this.token.name()).should.be.equal(_name);
  });

  it('has a symbol', async function () {
    (await this.token.symbol()).should.be.equal(_symbol);
  });

  it('has an amount of decimals', async function () {
    (await this.token.decimals()).should.be.bignumber.equal(_decimals);
  });
}

module.exports = {
  shouldBehaveLikeERC20Detailed,
};
