module.exports = {
  title: 'ERC20 Token Generator | Build your token for free',
  description: 'Simply deploy Smart Contract for a Standard, Mintable, Burnable, ERC20 Payable Token with Minter Role.',
  blockchain: {
    web3Provider: "https://rinkeby.infura.io",
    etherscanLink: "https://rinkeby.etherscan.io",
    networkId: "4",
    networkName: "Rinkeby Test Network",
  },
  head: [
    ['script', { src: 'assets/js/web3.min.js' }],
  ],
  themeConfig: {
    navbar: false,
    search: false,
    editLinks: false,
  }
};
