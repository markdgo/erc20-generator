import config from '../config';
import TokenArtifact from '../abi/BaseToken.json';

export default {
  data () {
    return {
      legacy: false,
      web3: null,
      web3Provider: null,
      metamask: {
        installed: false,
        netId: null,
      },
      network: {
        default: config.defaultNetwork,
        current: null,
        map: {
          1: 'mainnet',
          3: 'ropsten',
          4: 'rinkeby',
          42: 'kovan',
        },
        list: {
          mainnet: {
            web3Provider: 'https://mainnet.infura.io/v3/12ca5f4d25964a428951747cf4cd5660',
            etherscanLink: 'https://etherscan.io',
            id: '1',
            name: 'Main Ethereum Network',
          },
          ropsten: {
            web3Provider: 'https://ropsten.infura.io/v3/12ca5f4d25964a428951747cf4cd5660',
            etherscanLink: 'https://ropsten.etherscan.io',
            id: '3',
            name: 'Ropsten Test Network',
          },
          rinkeby: {
            web3Provider: 'https://rinkeby.infura.io/v3/12ca5f4d25964a428951747cf4cd5660',
            etherscanLink: 'https://rinkeby.etherscan.io',
            id: '4',
            name: 'Rinkeby Test Network',
          },
          kovan: {
            web3Provider: 'https://kovan.infura.io/v3/12ca5f4d25964a428951747cf4cd5660',
            etherscanLink: 'https://kovan.etherscan.io',
            id: '42',
            name: 'Kovan Test Network',
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
      if (!this.network.list.hasOwnProperty(network)) {
        throw new Error(`Failed initializing network ${network}. Allowed values are mainnet, ropsten and rinkeby.`);
      }

      return new Promise((resolve) => {
        if (checkWeb3 && (typeof window.ethereum !== 'undefined' || typeof window.web3 !== 'undefined')) {
          if (window.ethereum) {
            console.log('injected web3');
            this.web3Provider = window.ethereum;
          } else {
            console.log('injected web3 (legacy)');
            this.web3Provider = window.web3.currentProvider;
            this.legacy = true;
          }

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
