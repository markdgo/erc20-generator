import TokenArtifact from '../abi/BaseToken.json';

import config from '../config';

export default {
  data() {
    return {
      testnet: false,
      web3: null,
      web3Provider: null,
      etherscanLink: config.blockchain.etherscanLink,
      metamask: {
        installed: false,
        netId: null,
      },
      network: {
        expectedId: config.blockchain.networkId,
        expectedName: config.blockchain.networkName,
        names: {
          1: 'Main Ethereum Network',
          3: 'Ropsten Test Network',
          4: 'Rinkeby Test Network',
        }
      },
      contracts: {
        token: null,
      }
    };
  },
  async mounted() {
    await this.initWeb3(true);
    this.initToken();
    this.web3Ready();
  },
  methods: {
    initWeb3(checkWeb3) {
      return new Promise((resolve) => {
        if (checkWeb3 && typeof web3 !== 'undefined') {
          console.log('injected web3');
          this.web3Provider = web3.currentProvider;
          this.web3 = new Web3(this.web3Provider);
          this.metamask.installed = true;
          this.web3.version.getNetwork((err, netId) => {
            this.metamask.netId = netId;
            this.testnet = this.metamask.netId !== "1";

            if (netId !== config.blockchain.networkId) {
              this.initWeb3(false).then(resolve);
            } else {
              resolve();
            }
          });
        } else {
          console.log('provided web3');
          // set the provider you want from Web3.providers
          this.web3Provider = new Web3.providers.HttpProvider(config.blockchain.web3Provider);
          this.web3 = new Web3(this.web3Provider);

          resolve();
        }
      });
    },
    initToken() {
      this.contracts.token = this.web3.eth.contract(TokenArtifact.abi);
    },
    web3Ready() {
      // Placeholder function.
      // Create one like this on your component if you want to do fun stuff with web3!
    },
  },
};
