const App = {
  web3: null,
  web3Provider: null,
  etherscanLink: '',
  metamask: {
    installed: false,
    netId: null
  },
  artifacts: {},
  contracts: {},

  setTestnet () {
    web3Provider = rinkeby_web3Provider;
    etherscanLink = rinkeby_etherscanLink;
    networkId = rinkeby_networkId;
    networkName = rinkeby_networkName;
  },
  init () {
    App.initWeb3(true);
  },
  initWeb3 (checkWeb3) {
    App.etherscanLink = etherscanLink;
    if (checkWeb3 && typeof web3 !== 'undefined') {
      App.web3Provider = web3.currentProvider;
      App.web3 = new Web3(App.web3Provider);
      App.metamask.installed = true;
      App.web3.version.getNetwork(function (err, netId) {
        App.metamask.netId = netId;
        if (netId !== networkId) {
          App.initWeb3(false);
        }
      });
    } else {
      // set the provider you want from Web3.providers
      App.web3Provider = new Web3.providers.HttpProvider(web3Provider);
      App.web3 = new Web3(App.web3Provider);
    }
  },
  async initToken () {
    return $.getJSON(abiPath + 'ERC20Token.json', function (data) {
      App.artifacts.ERC20Token = data;
      App.contracts.ERC20Token = App.web3.eth.contract(App.artifacts.ERC20Token.abi);
    });
  },
  async builder () {
    App.init();

    Vue.use(VeeValidate);
    await App.initToken();

    new Vue({
      el: '#token-generator',
      data: {
        testnet: networkId !== "1",
        networkName: networkName,
        hasMetaMask: App.metamask.installed,
        trxHash: '',
        makingTransaction: false,
        formDisabled: false,
        token: {
          stringifiedAbi: JSON.stringify(App.contracts.ERC20Token.abi)
        }
      },
      created () {
        this.$validator.extend('eth_address', {
          getMessage: field => 'Insert a valid Ethereum wallet address.',
          validate: value => App.web3.isAddress(value)
        });
      },
      methods: {
        generateToken () {
          if (!App.metamask.installed) {
            alert("To create a Token please install the MetaMask extension!");
            return;
          } else {
            if (App.metamask.netId !== networkId) {
              alert("Your MetaMask extension in on the wrong network. Please switch on " + networkName + " and try again!");
              return;
            }
          }

          this.$validator.validateAll().then(async (result) => {
            if (result) {
              const name = this.token.name;
              const symbol = this.token.symbol.toUpperCase();
              const decimals = new App.web3.BigNumber(this.token.decimals);

              try {
                this.trxHash = '';
                this.formDisabled = true;
                this.makingTransaction = true;

                App.contracts.ERC20Token.new(
                  name,
                  symbol,
                  decimals,
                  {
                    from: App.web3.eth.coinbase,
                    data: App.artifacts.ERC20Token.bytecode,
                  }, (e, tokenContract) => {
                    // NOTE: The callback will fire twice!
                    // Once the contract has the transactionHash property
                    // set and once its deployed on an address.
                    if (!tokenContract.address) {
                      this.trxHash = tokenContract.transactionHash;
                      this.trxLink = App.etherscanLink + "/tx/" + this.trxHash;
                    } else {
                      this.token.address = tokenContract.address;
                      this.token.link = App.etherscanLink + "/token/" + this.token.address;
                      this.$forceUpdate();
                    }
                  }
                );
              } catch (e) {
                this.makingTransaction = false;
                this.formDisabled = false;
                alert("Some error occurred. Maybe you rejected the transaction or you have MetaMask locked!");
              }
            } else {
              console.log("some errors");
            }
          });
        }
      }
    });
  },
};

(function($) {
  switch (page) {
    case "rinkeby":
      App.setTestnet();
      App.builder();
      break;
    case "": //home
      App.builder();
      break;
  }

})(jQuery);
