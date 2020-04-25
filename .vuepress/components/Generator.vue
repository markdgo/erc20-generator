<template>
    <div>
        <b-jumbotron bg-variant="dark"
                     text-variant="white"
                     header="ERC20 Token Generator"
                     lead="Create your Token for FREE"
                     class="mb-0"
                     fluid>
            <p>
                <b-link href="https://travis-ci.org/github/vittominacori/erc20-generator" target="_blank">
                    <b-img src="https://travis-ci.org/vittominacori/erc20-generator.svg?branch=master"></b-img>
                </b-link>
                <b-link href="https://coveralls.io/github/vittominacori/erc20-generator" target="_blank">
                    <b-img src="https://coveralls.io/repos/github/vittominacori/erc20-generator/badge.svg?branch=master"></b-img>
                </b-link>
                <b-link href="https://github.com/vittominacori/erc20-generator/blob/master/LICENSE" target="_blank">
                    <b-img src="https://img.shields.io/github/license/vittominacori/erc20-generator.svg"></b-img>
                </b-link>
            </p>
            <p>Easily deploy Smart Contract for a Standard, Capped, Mintable, Burnable ERC20 Token.</p>
            <hr class="my-4">
            <a class="btn btn-lg btn-outline-warning"
               href="#token-generator"
               v-smooth-scroll="{ duration: 1000, offset: -50, updateHistory: false }">
                Create a Token
            </a>
            <b-button to="/docs.html" size="lg" variant="light">
                Documentation
            </b-button>
        </b-jumbotron>
        <b-row>
            <b-col lg="10" offset-lg="1" class="my-3 p-0">
                <b-card v-if="!loading" bg-variant="transparent" border-variant="0">
                    <b-alert show variant="warning" v-if="!metamask.installed">
                        You need <a href="https://metamask.io/" target="_blank">MetaMask</a> extension.
                    </b-alert>

                    <b-card header="Making transaction..."
                            header-bg-variant="info"
                            header-text-variant="white"
                            v-if="makingTransaction || transactionStarted"
                            class="mt-3">
                        <div v-if="!trxHash">Please wait...</div>
                        <div v-else>
                            <b>Well! Transaction done!</b><br>
                            Transaction id <a :href="trxLink" target="_blank"><span v-html="trxHash"></span></a><br>

                            Retrieving Token.
                            <div v-if="!token.address">Please wait...</div>
                            <div v-else>
                                <b>Your Token</b>
                                <b-link :href="token.link" target="_blank"><span v-html="token.address"></span></b-link>
                            </div>
                        </div>
                    </b-card>

                    <ValidationObserver
                            id="token-generator"
                            ref="observer"
                            tag="form"
                            @submit.prevent="generateToken()"
                            v-if="!makingTransaction">
                        <fieldset :disabled="formDisabled">
                            <b-row>
                                <b-col lg="4">
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
                                                    label="Token name *"
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
                                                    label="Token symbol *"
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
                                                name="token decimals"
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
                                                        v-model.trim="token.decimals"
                                                        size="lg"
                                                        :class="{'is-invalid': errors.length > 0}"
                                                        step="1">
                                                </b-form-input>
                                                <small v-show="errors.length > 0" class="text-danger">
                                                    {{ errors[0] }}
                                                </small>
                                            </b-form-group>
                                        </ValidationProvider>

                                        <ValidationProvider
                                                name="token max supply"
                                                :rules="{ required: true, numeric: true, min_value: 1, max_value: 1000000000000000 }"
                                                v-slot="{ errors }">
                                            <b-form-group
                                                    description="Insert the maximum number of tokens available."
                                                    label="Total supply *"
                                                    label-for="tokenCap">
                                                <b-form-input
                                                        id="tokenCap"
                                                        name="tokenCap"
                                                        placeholder="Your token max supply"
                                                        v-model.trim="token.cap"
                                                        size="lg"
                                                        v-on:update="updateInitialBalance"
                                                        :class="{'is-invalid': errors.length > 0}"
                                                        step="1">
                                                </b-form-input>
                                                <small v-show="errors.length > 0" class="text-danger">
                                                    {{ errors[0] }}
                                                </small>
                                            </b-form-group>
                                        </ValidationProvider>

                                        <ValidationProvider
                                                name="token initial supply"
                                                :rules="{ required: true, numeric: true, min_value: 0, max_value: token.cap || 0 }"
                                                v-slot="{ errors }">
                                            <b-form-group
                                                    description="Insert the initial number of tokens available. Will be put in your account."
                                                    label="Initial supply *"
                                                    label-for="tokenInitialBalance">
                                                <b-form-input
                                                        id="tokenInitialBalance"
                                                        name="tokenInitialBalance"
                                                        placeholder="Your token initial supply"
                                                        :disabled="finishMinting"
                                                        v-model.trim="token.initialBalance"
                                                        size="lg"
                                                        :class="{'is-invalid': errors.length > 0}"
                                                        step="1">
                                                </b-form-input>
                                                <small v-show="errors.length > 0" class="text-danger">
                                                    {{ errors[0] }}
                                                </small>
                                            </b-form-group>
                                        </ValidationProvider>
                                    </b-card>
                                </b-col>
                                <b-col lg="8">
                                    <b-card header="Advanced"
                                            header-bg-variant="dark"
                                            header-text-variant="white"
                                            class="mt-3">
                                        <b-row>
                                            <b-col lg="12">
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
                                            </b-col>
                                        </b-row>
                                        <b-row>
                                            <b-col lg="12">
                                                <b-form-group
                                                        description="Choose to enable transfer during deploy or enable manually later."
                                                        label-for="enableTransfer">
                                                    <b-form-checkbox v-model="enableTransfer"
                                                                     size="lg"
                                                                     switch>
                                                        Enable transfer
                                                    </b-form-checkbox>
                                                </b-form-group>

                                                <b-alert show variant="warning" v-if="!enableTransfer">
                                                    <strong>
                                                        Tokens won't be transferable until you call the
                                                        <i>enableTransfer</i> function.
                                                    </strong>
                                                    <hr>
                                                    Only people (or smart contracts) with <i>OPERATOR</i> role will be
                                                    able to transfer tokens.<br>
                                                    Contract creator will be OPERATOR by default, so he can transfer
                                                    tokens also when transfer is not enabled.<br>
                                                    You can also add or remove the OPERATOR role to addresses.<br>
                                                    This is because, by business choices, you may decide not to enable
                                                    transfer until a specific time.
                                                </b-alert>
                                                <b-alert show variant="info" v-if="enableTransfer">
                                                    <strong>
                                                        Everyone will be able to transfer tokens after deploy.
                                                    </strong>
                                                    <hr>
                                                    If you decide not to enable transfer until a specific time,
                                                    disable this option and call the
                                                    <i>enableTransfer</i> function manually later.
                                                </b-alert>
                                            </b-col>
                                        </b-row>
                                        <b-row>
                                            <b-col lg="12">
                                                <b-form-group
                                                        description="Choose to disable minting during deploy or disable manually later."
                                                        label-for="finishMinting">
                                                    <b-form-checkbox v-model="finishMinting"
                                                                     size="lg"
                                                                     v-on:input="updateInitialBalance"
                                                                     switch>
                                                        Disable minting
                                                    </b-form-checkbox>
                                                </b-form-group>

                                                <b-alert show variant="warning" v-if="finishMinting">
                                                    <strong>
                                                        You won't be able to generate other tokens.
                                                    </strong>
                                                    <hr>
                                                    Your initial supply will be equal to total supply.
                                                </b-alert>
                                                <b-alert show variant="info" v-if="!finishMinting">
                                                    <strong>
                                                        You will be able to generate tokens up to your total supply.
                                                    </strong>
                                                    <hr>
                                                    You can add or remove the MINTER role to addresses.<br>
                                                    When you decide to disable minting you must call the
                                                    <i>finishMinting</i> function manually.
                                                </b-alert>
                                            </b-col>
                                        </b-row>
                                    </b-card>

                                    <b-row class="mt-3">
                                        <b-col lg="12" class="text-right">
                                            <b-button variant="warning" size="lg" type="submit">Create Token</b-button>
                                        </b-col>
                                    </b-row>
                                </b-col>
                            </b-row>
                        </fieldset>
                    </ValidationObserver>
                </b-card>
            </b-col>
        </b-row>
    </div>
</template>

<script>
  import dapp from '../mixins/dapp';

  export default {
    name: 'Generator',
    mixins: [
      dapp,
    ],
    data () {
      return {
        loading: true,
        currentNetwork: null,
        trxHash: '',
        transactionStarted: false,
        makingTransaction: false,
        formDisabled: false,
        token: {
          name: '',
          symbol: '',
          decimals: 18,
          cap: '',
          initialBalance: '',
        },
        enableTransfer: true,
        finishMinting: false,
      };
    },
    mounted () {
      this.currentNetwork = this.getParam('network') || this.network.default;
      this.initDapp();
    },
    methods: {
      async initDapp () {
        this.network.current = this.network.list[this.currentNetwork];
        try {
          await this.initWeb3(this.currentNetwork, true);
          this.initToken();
          this.loading = false;
        } catch (e) {
          alert(e);
          document.location.href = this.$withBase('/');
        }
      },
      async generateToken () {
        this.$refs.observer.validate().then(async (result) => {
          if (result) {
            if (!this.metamask.installed) {
              alert('To create a Token please install MetaMask!');
              return;
            } else {
              if (this.metamask.netId !== this.network.current.id) {
                alert(`Your MetaMask in on the wrong network. Please switch on ${this.network.current.name} and try again!`);
                return;
              }
            }

            const name = this.token.name;
            const symbol = this.token.symbol.toUpperCase();
            const decimals = new this.web3.BigNumber(this.token.decimals);
            const cap = new this.web3.BigNumber(this.token.cap).mul(Math.pow(10, this.token.decimals));
            const initialBalance = new this.web3.BigNumber(this.token.initialBalance).mul(Math.pow(10, this.token.decimals)); // eslint-disable-line max-len
            const enableTransfer = this.enableTransfer;
            const finishMinting = this.finishMinting;

            try {
              this.trxHash = '';
              this.formDisabled = true;
              this.makingTransaction = true;

              if (!this.legacy) {
                await this.web3Provider.enable();
              }

              setTimeout(() => {
                this.contracts.token.new(
                  name,
                  symbol,
                  decimals,
                  cap,
                  initialBalance,
                  enableTransfer,
                  finishMinting,
                  {
                    from: this.web3.eth.coinbase,
                    data: this.contracts.token.bytecode,
                  }, (e, tokenContract) => {
                    if (e) {
                      console.log(e); // eslint-disable-line no-console
                      this.makingTransaction = false;
                      this.formDisabled = false;
                      alert('Some error occurred. Inspect console and report.');
                    } else {
                      // NOTE: The callback will fire twice!
                      // Once the contract has the transactionHash property
                      // set and once its deployed on an address.
                      if (!tokenContract.address) {
                        this.transactionStarted = true;
                        this.trxHash = tokenContract.transactionHash;
                        this.trxLink = this.network.current.etherscanLink + '/tx/' + this.trxHash;
                      } else {
                        this.token.address = tokenContract.address;
                        this.token.link = this.network.current.etherscanLink + '/token/' + this.token.address;
                        this.$forceUpdate();
                      }
                    }
                  },
                );
              }, 500);
            } catch (e) {
              this.makingTransaction = false;
              this.formDisabled = false;
              alert('Some error occurred. Maybe you rejected the transaction or you have MetaMask locked!');
            }
          }
        }).catch((e) => {
          console.log(e); // eslint-disable-line no-console
          this.makingTransaction = false;
          alert('Some error occurred.');
        });
      },
      updateInitialBalance () {
        this.token.initialBalance = this.finishMinting ? this.token.cap : this.token.initialBalance;
      },
      getParam (param) {
        const vars = {};
        window.location.href.replace(location.hash, '').replace(
          /[?&]+([^=&]+)=?([^&]*)?/gi, // regexp
          function (m, key, value) { // callback
            vars[key] = value !== undefined ? value : '';
          },
        );

        if (param) {
          return vars[param] ? vars[param] : null;
        }
        return vars;
      },
    },
  };
</script>
