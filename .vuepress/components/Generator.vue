<template>
    <b-container fluid>
        <b-row id="token-generator">
            <b-col lg="10" offset-lg="1" class="mb-3 p-0">
                <div v-if="loading" class="text-center p-5">
                    <ui--loader :loading="true"></ui--loader>
                </div>
                <b-card v-if="!loading" bg-variant="transparent" border-variant="0">
                    <b-alert show variant="danger" v-if="!metamask.installed">
                        <h4 class="alert-heading">Alert</h4>
                        <p>
                            To use this app please install <a href="https://metamask.io/" target="_blank">MetaMask</a>.
                            Use any other wallet at your own risk.
                        </p>
                    </b-alert>

                    <b-card header="Making transaction..."
                            header-bg-variant="info"
                            header-text-variant="white"
                            v-if="makingTransaction || transactionStarted"
                            class="mt-3">
                        <div v-if="!trx.hash">
                            <p>Please wait...</p>
                            <ui--loader :loading="true"></ui--loader>
                        </div>
                        <div v-else>
                            <b class="text-success">Well! Transaction done!</b><br>
                            Transaction Hash:
                            <a :href="trx.link" target="_blank"><span v-html="trx.hash"></span></a><br>
                            <hr>
                            <div v-if="!token.address">
                                <b>Retrieving Token.</b>
                                <p>Please wait...</p>
                                <ui--loader :loading="true"></ui--loader>
                            </div>
                            <div v-else>
                                Your Token address:<br>
                                <h6>{{ token.address }}</h6>
                                <hr>
                                <b-link :href="token.link" target="_blank" class="btn btn-info my-2">
                                    <b-icon-arrow-up-right-circle-fill></b-icon-arrow-up-right-circle-fill>
                                    View on Etherscan
                                </b-link>
                                <b-link @click="addToMetaMask" class="btn btn-success my-2">
                                    <b-icon-plus-circle-fill></b-icon-plus-circle-fill>
                                    Add to MetaMask
                                </b-link>
                            </div>
                        </div>
                    </b-card>

                    <ValidationObserver
                            ref="observer"
                            tag="form"
                            @submit.prevent="generateToken()"
                            v-if="!makingTransaction">
                        <fieldset :disabled="formDisabled">
                            <b-row>
                                <b-col lg="8">
                                    <b-card header="Token Details"
                                            header-bg-variant="dark"
                                            header-text-variant="white"
                                            class="mt-3">
                                        <ValidationProvider
                                                name="token name"
                                                :rules="{ required: true }"
                                                v-slot="{ errors }">
                                            <b-form-group
                                                    description="Choose a name for your token."
                                                    label="Token Name *"
                                                    label-for="tokenName">
                                                <b-form-input
                                                        id="tokenName"
                                                        name="tokenName"
                                                        placeholder="Your token name"
                                                        v-model.trim="token.name"
                                                        size="lg"
                                                        :class="{'is-invalid': errors.length > 0}"
                                                        maxlength="20">
                                                </b-form-input>
                                                <small v-show="errors.length > 0" class="text-danger">
                                                    {{ errors[0] }}
                                                </small>
                                            </b-form-group>
                                        </ValidationProvider>
                                        <ValidationProvider
                                                name="token symbol"
                                                :rules="{ required: true }"
                                                v-slot="{ errors }">
                                            <b-form-group
                                                    description="Choose a symbol for your token (usually 3-5 chars)."
                                                    label="Token Symbol *"
                                                    label-for="tokenSymbol">
                                                <b-form-input
                                                        id="tokenSymbol"
                                                        name="tokenSymbol"
                                                        placeholder="Your token symbol"
                                                        v-model.trim="token.symbol"
                                                        size="lg"
                                                        :class="{'is-invalid': errors.length > 0}"
                                                        maxlength="5">
                                                </b-form-input>
                                                <small v-show="errors.length > 0" class="text-danger">
                                                    {{ errors[0] }}
                                                </small>
                                            </b-form-group>
                                        </ValidationProvider>
                                        <ValidationProvider
                                                name="token Decimals"
                                                :rules="{ required: true, numeric: true, min_value: 0, max_value: 36 }"
                                                v-slot="{ errors }">
                                            <b-form-group
                                                    description="Insert the decimal precision of your token. If you don't know what to insert, use 18."
                                                    label="Token decimals *"
                                                    label-for="tokenDecimals">
                                                <b-form-input
                                                        id="tokenDecimals"
                                                        name="tokenDecimals"
                                                        placeholder="Your token decimals"
                                                        type="number"
                                                        :disabled="!token.customizeDecimals"
                                                        v-model.trim="token.decimals"
                                                        size="lg"
                                                        :class="{'is-invalid': errors.length > 0}"
                                                        min="0"
                                                        step="1">
                                                </b-form-input>
                                                <small v-show="errors.length > 0" class="text-danger">
                                                    {{ errors[0] }}
                                                </small>
                                            </b-form-group>
                                        </ValidationProvider>
                                        <ValidationProvider
                                                name="token initial supply"
                                                :rules="{
                                                    required: true,
                                                    numeric: true,
                                                    min_value: (token.supplyType === 'Fixed' ? 1 : 0),
                                                    max_value: 1000000000000000
                                                }"
                                                v-slot="{ errors }">
                                            <b-form-group
                                                    description="Insert the initial number of tokens available. Will be put in your account."
                                                    label="Initial Supply *"
                                                    label-for="tokenInitialBalance">
                                                <b-form-input
                                                        id="tokenInitialBalance"
                                                        name="tokenInitialBalance"
                                                        placeholder="Your token initial supply"
                                                        type="number"
                                                        v-model.trim="token.initialBalance"
                                                        size="lg"
                                                        v-on:update="updateCap"
                                                        :class="{'is-invalid': errors.length > 0}"
                                                        min="0"
                                                        step="1">
                                                </b-form-input>
                                                <small v-show="errors.length > 0" class="text-danger">
                                                    {{ errors[0] }}
                                                </small>
                                            </b-form-group>
                                        </ValidationProvider>
                                        <ValidationProvider v-if="token.supplyType !== 'Unlimited'"
                                                name="token max supply"
                                                :rules="{
                                                    required: true,
                                                    numeric: true,
                                                    min_value: (token.initialBalance > 0 ? token.initialBalance : 1),
                                                    max_value: 1000000000000000
                                                }"
                                                v-slot="{ errors }">
                                            <b-form-group
                                                    description="Insert the maximum number of tokens available."
                                                    label="Total Supply *"
                                                    label-for="tokenCap">
                                                <b-form-input
                                                        id="tokenCap"
                                                        name="tokenCap"
                                                        placeholder="Your token max supply"
                                                        type="number"
                                                        v-model.trim="token.cap"
                                                        size="lg"
                                                        :disabled="token.supplyType === 'Fixed'"
                                                        :class="{'is-invalid': errors.length > 0}"
                                                        min="1"
                                                        step="1">
                                                </b-form-input>
                                                <small v-show="errors.length > 0" class="text-danger">
                                                    {{ errors[0] }}
                                                </small>
                                            </b-form-group>
                                        </ValidationProvider>
                                    </b-card>
                                    <b-card header="Network"
                                            header-bg-variant="dark"
                                            header-text-variant="white"
                                            class="mt-3">
                                        <b-form-group
                                                description="Choose your Network."
                                                label="Network *"
                                                label-for="network">
                                            <b-form-select id="network"
                                                           v-model="currentNetwork"
                                                           size="lg"
                                                           @input="initDapp">
                                                <option v-for="(n, k) in network.list" :value="k">{{ n.name }}
                                                </option>
                                            </b-form-select>
                                        </b-form-group>

                                        <b-alert show variant="warning" v-if="currentNetwork !== 'mainnet'">
                                            <strong>
                                                You selected a TEST Network.
                                            </strong>
                                            <hr>
                                            To deploy on Main Network you must select Main Ethereum Network.
                                        </b-alert>
                                    </b-card>
                                </b-col>
                                <b-col lg="4">
                                    <b-card header="Token Features"
                                            header-bg-variant="dark"
                                            header-text-variant="white"
                                            class="mt-3">
                                        <b-form-group
                                                description="Choose your Token Type."
                                                label="Token Type *"
                                                label-for="tokenType">
                                            <b-form-select id="tokenType"
                                                           v-model="tokenType"
                                                           size="lg"
                                                           @input="loadToken">
                                                <option v-for="(n, k) in tokenList" :value="k">
                                                    {{ n.contractName }}
                                                </option>
                                            </b-form-select>
                                        </b-form-group>
                                        <b-form-group
                                                description="Your Token Source Code will be automatically verified on Etherscan.">
                                            <b-form-checkbox v-model="token.verified"
                                                             size="sm"
                                                             disabled
                                                             switch>
                                                Verified Source Code
                                            </b-form-checkbox>
                                        </b-form-group>
                                        <b-form-group
                                                description="Your Token Supply Type."
                                                label="Supply Type"
                                                label-for="supplyType">
                                            <b-form-select id="supplyType"
                                                           v-model="token.supplyType"
                                                           disabled
                                                           size="sm">
                                                <option v-for="(n) in ['Fixed', 'Unlimited', 'Capped']" :value="n">
                                                    {{ n }}
                                                </option>
                                            </b-form-select>
                                        </b-form-group>
                                        <b-form-group
                                                description="You will be able to generate tokens by minting them.">
                                            <b-form-checkbox v-model="token.mintable"
                                                             size="sm"
                                                             disabled
                                                             switch>
                                                Mintable
                                            </b-form-checkbox>
                                        </b-form-group>
                                        <b-form-group
                                                description="Your Token can be burnt.">
                                            <b-form-checkbox v-model="token.burnable"
                                                             size="sm"
                                                             disabled
                                                             switch>
                                                Burnable
                                            </b-form-checkbox>
                                        </b-form-group>
                                        <b-form-group
                                                description="The ERC1363 is an ERC20 compatible Token that can make a callback on the receiver contract.">
                                            <b-form-checkbox v-model="token.erc1363"
                                                             size="sm"
                                                             disabled
                                                             switch>
                                                ERC1363
                                            </b-form-checkbox>
                                        </b-form-group>
                                        <b-form-group
                                                description="It allows the contract owner to recover any ERC20 token sent into the contract for error.">
                                            <b-form-checkbox v-model="token.tokenRecover"
                                                             size="sm"
                                                             disabled
                                                             switch>
                                                Token Recover
                                            </b-form-checkbox>
                                        </b-form-group>
                                        <b-form-group
                                                description="Remove the link pointing to this page from your contract.">
                                            <b-form-checkbox v-model="token.removeCopyright"
                                                             size="sm"
                                                             disabled
                                                             switch>
                                                Remove Copyright
                                            </b-form-checkbox>
                                        </b-form-group>
                                    </b-card>
                                    <b-card header="Payment"
                                            header-bg-variant="dark"
                                            header-text-variant="white"
                                            no-body
                                            class="mt-3">
                                        <b-list-group flush class="payment-box">
                                            <b-list-group-item variant="success"
                                                               class="d-flex justify-content-between align-items-center">
                                                Token deployment fee:
                                                <b-badge variant="success">
                                                    {{ web3.utils.fromWei(feeAmount, 'ether') }} ETH
                                                </b-badge>
                                            </b-list-group-item>
                                            <b-list-group-item
                                                    class="d-flex justify-content-between align-items-center">
                                                <small class="text-muted">
                                                    *GAS fee will be added to final amount
                                                </small>
                                            </b-list-group-item>
                                        </b-list-group>
                                    </b-card>
                                    <b-button variant="success"
                                              size="lg"
                                              block
                                              type="submit"
                                              class="mt-3 py-3 px-5 text-uppercase">
                                        Confirm
                                    </b-button>
                                </b-col>
                            </b-row>
                        </fieldset>
                    </ValidationObserver>
                </b-card>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
  import dapp from '../mixins/dapp';
  import tokenDetails from '../mixins/tokenDetails';

  export default {
    name: 'Generator',
    mixins: [
      dapp,
      tokenDetails,
    ],
    data () {
      return {
        loading: true,
        currentNetwork: null,
        tokenType: '',
        trx: {
          hash: '',
          link: '',
        },
        transactionStarted: false,
        makingTransaction: false,
        formDisabled: false,
        feeAmount: '0',
        token: {
          name: '',
          symbol: '',
          decimals: 18,
          cap: '',
          initialBalance: '',
          supplyType: 'Fixed',
          mintable: false,
          burnable: false,
          erc1363: false,
          tokenRecover: false,
          removeCopyright: false,
        },
      };
    },
    mounted () {
      this.tokenType = this.getParam('tokenType') || 'SimpleERC20';
      this.currentNetwork = this.getParam('network') || this.network.default;
      this.initDapp();
    },
    methods: {
      async initDapp () {
        this.network.current = this.network.list[this.currentNetwork];
        try {
          await this.initWeb3(this.currentNetwork, true);
          this.initService(this.currentNetwork);
          await this.loadToken();
        } catch (e) {
          console.log(e); // eslint-disable-line no-console
          this.makeToast(
            'Some errors occurred',
            e,
            'danger',
          );
          // document.location.href = this.$withBase('/');
        }
      },
      async loadToken () {
        if (!Object.prototype.hasOwnProperty.call(this.tokenList, this.tokenType)) {
          this.makeToast(
            'Some errors occurred',
            'Selected token type does not exist!',
            'danger',
          );

          this.tokenType = 'SimpleERC20';
        }

        this.initToken(this.tokenType);

        this.updateTokenDetails();
        this.updateCap();

        try {
          this.feeAmount = await this.promisify(this.contracts.service.methods.getPrice(this.tokenType).call);
        } catch (e) {
          console.log(e.message); // eslint-disable-line no-console

          if (this.currentNetwork !== 'mainnet') {
            this.makeToast(
              'Warning',
              'We are having an issue with Current Network Provider. Please switch Network or try again later.',
              'warning',
            );
            this.feeAmount = this.web3.utils.toWei('0', 'ether');
          } else {
            this.feeAmount = this.web3.utils.toWei(`${this.token.price}`, 'ether');
          }
        }

        this.loading = false;
      },
      async generateToken () {
        this.$refs.observer.validate().then(async (result) => {
          if (result) {
            if (!this.metamask.installed) {
              this.makeToast(
                'Warning',
                'To create a Token please install MetaMask!',
                'danger',
              );
              return;
            } else {
              if (this.metamask.netId !== this.network.current.id) {
                this.makeToast(
                  'Warning',
                  `Your MetaMask in on the wrong network. Please switch on ${this.network.current.name} and try again!`,
                  'warning',
                );
                return;
              }
            }

            try {
              this.trx.hash = '';
              this.trx.link = '';
              this.formDisabled = true;
              this.makingTransaction = true;

              await this.web3Provider.request({ method: 'eth_requestAccounts' });

              const tokenContract = new this.web3.eth.Contract(this.contracts.token.abi);

              tokenContract.deploy({
                data: this.contracts.token.bytecode,
                arguments: this.getDeployArguments(),
              })
                .send(
                  {
                    from: await this.promisify(this.web3.eth.getCoinbase),
                    value: this.feeAmount,
                  })
                .on('error', (error) => {
                  console.log(error.message); // eslint-disable-line no-console

                  this.makingTransaction = false;
                  this.formDisabled = false;

                  this.makeToast(
                    'Error!',
                    error.message,
                    'danger',
                  );
                })
                .on('transactionHash', (transactionHash) => {
                  this.transactionStarted = true;
                  this.trx.hash = transactionHash;
                  this.trx.link = `${this.network.current.etherscanLink}/tx/${this.trx.hash}`;

                  this.gaSend('transaction', `trx_${this.network.current.id}`, this.trx.hash);
                })
                .on('receipt', (receipt) => {
                  this.token.address = receipt.contractAddress;
                  this.token.link = this.network.current.etherscanLink + '/token/' + this.token.address;
                  this.$forceUpdate();
                  this.makeToast(
                    'Well done!',
                    `Your token has been deployed at ${this.token.address}`,
                    'success',
                  );

                  this.gaSend('token', `token_${this.network.current.id}`, this.token.address);
                });
            } catch (e) {
              this.makingTransaction = false;
              this.formDisabled = false;
              this.makeToast(
                'Some error occurred',
                e.message,
                'danger',
              );
            }
          }
        }).catch((e) => {
          console.log(e); // eslint-disable-line no-console
          this.makingTransaction = false;
          this.makeToast(
            'Some error occurred',
            e.message,
            'danger',
          );
        });
      },
      updateTokenDetails () {
        const detail = this.tokenDetails.find((elem) => elem.name === this.tokenType);

        this.token.customizeDecimals = detail.customizeDecimals;
        this.token.verified = detail.verified;
        this.token.supplyType = detail.supplyType;
        this.token.mintable = detail.mintable;
        this.token.burnable = detail.burnable;
        this.token.erc1363 = detail.erc1363;
        this.token.tokenRecover = detail.tokenRecover;
        this.token.removeCopyright = detail.removeCopyright;
        this.token.price = detail.price;

        this.token.decimals = detail.customizeDecimals ? this.token.decimals : 18;
      },
      updateCap () {
        this.token.cap = this.token.supplyType === 'Fixed' ? this.token.initialBalance : this.token.cap;
      },
      getDeployArguments () {
        const name = this.token.name;
        const symbol = this.token.symbol.toUpperCase();
        const decimals = this.web3.utils.toBN(this.token.decimals);
        const cap = this.web3.utils.toBN(this.token.cap).mul(this.web3.utils.toBN(Math.pow(10, this.token.decimals)));
        const initialBalance = this.web3.utils.toBN(this.token.initialBalance).mul(this.web3.utils.toBN(Math.pow(10, this.token.decimals))); // eslint-disable-line max-len

        const params = [name, symbol];

        switch (this.tokenType) {
        case 'SimpleERC20':
          params.push(initialBalance);
          break;
        case 'StandardERC20':
        case 'MintableERC20':
          params.push(decimals);
          params.push(initialBalance);
          break;
        case 'CommonERC20':
        case 'PowerfulERC20':
          params.push(decimals);
          params.push(cap);
          params.push(initialBalance);
          break;
        default:
          throw new Error(
            'Invalid Token Type',
          );
        }

        params.push(this.contracts.service.options.address);

        return params;
      },
      async addToMetaMask () {
        try {
          await this.web3Provider.request({
            method: 'wallet_watchAsset',
            params: {
              type: 'ERC20',
              options: {
                address: this.token.address,
                symbol: this.token.symbol,
                decimals: this.token.decimals,
              },
            },
          });
        } catch (e) {
          console.log(e); // eslint-disable-line no-console
        }
      },
    },
  };
</script>
