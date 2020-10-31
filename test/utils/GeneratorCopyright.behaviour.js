function shouldBehaveLikeGeneratorCopyright () {
  describe('should have', function () {
    const _builtOn = {
      generator: 'https://vittominacori.github.io/erc20-generator',
      version: 'v4.0.0',
    };

    it('a generator value', async function () {
      _builtOn.generator.should.be.equal(await this.instance.generator());
    });

    it('a version value', async function () {
      _builtOn.version.should.be.equal(await this.instance.version());
    });
  });
}

module.exports = {
  shouldBehaveLikeGeneratorCopyright,
};
