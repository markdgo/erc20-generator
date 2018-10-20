import TokenArtifact from '../abi/BaseToken.json';

export default {
  data () {
    return {
      web3: null,
      web3Provider: null,
      metamask: {
        installed: false,
        netId: null,
      },
      network: {
        current: null,
        map: {
          1: 'mainnet',
          3: 'ropsten',
          4: 'rinkeby',
        },
        list: {
          mainnet: {
            web3Provider: 'https://mainnet.infura.io',
            etherscanLink: 'https://etherscan.io',
            id: '1',
            name: 'Main Ethereum Network',
          },
          ropsten: {
            web3Provider: 'https://ropsten.infura.io',
            etherscanLink: 'https://ropsten.etherscan.io',
            id: '3',
            name: 'Ropsten Test Network',
          },
          rinkeby: {
            web3Provider: 'https://rinkeby.infura.io',
            etherscanLink: 'https://rinkeby.etherscan.io',
            id: '4',
            name: 'Rinkeby Test Network',
          },
        },
      },
      contracts: {
        token: null,
      },
    };
  },
  methods: {
    initWeb3 (network, checkWeb3) {
      return new Promise((resolve) => {
        if (checkWeb3 && typeof web3 !== 'undefined') {
          console.log('injected web3');
          this.web3Provider = web3.currentProvider;
          this.web3 = new Web3(this.web3Provider);
          this.metamask.installed = true;
          this.web3.version.getNetwork(async (err, netId) => {
            if (err) {
              console.log(err);
            }
            this.metamask.netId = netId;
            if (netId !== this.network.list[network].id) {
              this.network.current = this.network.list[this.network.map[netId]];
              await this.initWeb3(network, false);
            }
            resolve();
          });
        } else {
          console.log('provided web3');
          this.network.current = this.network.list[network];
          this.web3Provider = new Web3.providers.HttpProvider(this.network.list[network].web3Provider);
          this.web3 = new Web3(this.web3Provider);

          resolve();
        }
      });
    },
    initToken () {
      this.contracts.token = this.web3.eth.contract(TokenArtifact.abi);
      this.contracts.token.bytecode = TokenArtifact.bytecode;
      this.contracts.token.stringifiedAbi = JSON.stringify(TokenArtifact.abi);
    },
  },
};
