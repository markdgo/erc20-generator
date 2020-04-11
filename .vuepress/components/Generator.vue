<template>
    <b-row>
        <b-col lg="10" offset-lg="1" class="mt-4 p-0">
            <b-card bg-variant="light" v-if="!loading" :title="$site.title">
                <p class="card-text">
                    {{ $site.description }}
                </p>
                <small v-if="!metamask.installed">
                    You need the <a href="https://metamask.io/" target="_blank">MetaMask</a> extension.
                </small>

                <b-alert variant="success" :show="makingTransaction" class="mt-3">
                    <div>Making transaction.</div>
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
                </b-alert>

                <ValidationObserver
                        ref="observer"
                        v-if="!makingTransaction"
                        tag="form"
                        @submit.prevent="generateToken()"
                        class="mt-3">
                    <fieldset :disabled="formDisabled">
                        <b-card>
                            <b-row>
                                <b-col lg="4">
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
                                                    :class="{'is-invalid': errors.length > 0}"
                                                    maxlength="20">
                                            </b-form-input>
                                            <small v-show="errors.length > 0" class="text-danger">
                                                {{ errors[0] }}
                                            </small>
                                        </b-form-group>
                                    </ValidationProvider>
                                </b-col>
                                <b-col lg="4">
                                    <ValidationProvider
                                            name="token symbol"
                                            :rules="{ required: true }"
                                            v-slot="{ errors }">
                                        <b-form-group
                                                description="Choose a symbol for your token (usually 3-4 chars)."
                                                label="Token symbol *"
                                                label-for="tokenSymbol">
                                            <b-form-input
                                                    id="tokenSymbol"
                                                    name="tokenSymbol"
                                                    placeholder="Your token symbol"
                                                    v-model.trim="token.symbol"
                                                    :class="{'is-invalid': errors.length > 0}"
                                                    maxlength="5">
                                            </b-form-input>
                                            <small v-show="errors.length > 0" class="text-danger">
                                                {{ errors[0] }}
                                            </small>
                                        </b-form-group>
                                    </ValidationProvider>
                                </b-col>
                                <b-col lg="4">
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
                                                    :class="{'is-invalid': errors.length > 0}"
                                                    step="1">
                                            </b-form-input>
                                            <small v-show="errors.length > 0" class="text-danger">
                                                {{ errors[0] }}
                                            </small>
                                        </b-form-group>
                                    </ValidationProvider>
                                </b-col>
                            </b-row>
                        </b-card>
                        <b-card class="mt-3">
                            <b-row>
                                <b-col lg="4">
                                    <ValidationProvider
                                            name="token max supply"
                                            :rules="{ required: true, numeric: true, min_value: 1, max_value: 1000000000000000 }"
                                            v-slot="{ errors }">
                                        <b-form-group
                                                description="Insert the maximum number of tokens available."
                                                label="Max supply *"
                                                label-for="tokenCap">
                                            <b-form-input
                                                    id="tokenCap"
                                                    name="tokenCap"
                                                    placeholder="Your token max supply"
                                                    v-model.trim="token.cap"
                                                    :class="{'is-invalid': errors.length > 0}"
                                                    step="1">
                                            </b-form-input>
                                            <small v-show="errors.length > 0" class="text-danger">
                                                {{ errors[0] }}
                                            </small>
                                        </b-form-group>
                                    </ValidationProvider>
                                </b-col>
                                <b-col lg="4">
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
                                                    v-model.trim="token.initialBalance"
                                                    :class="{'is-invalid': errors.length > 0}"
                                                    step="1">
                                            </b-form-input>
                                            <small v-show="errors.length > 0" class="text-danger">
                                                {{ errors[0] }}
                                            </small>
                                        </b-form-group>
                                    </ValidationProvider>
                                </b-col>
                                <b-col lg="4">
                                    <b-form-group
                                            description="Choose your Network."
                                            label="Network *"
                                            label-for="network">
                                        <b-form-select id="network" v-model="currentNetwork" @input="initDapp">
                                            <option v-for="(n, k) in network.list" :value="k">{{ n.name }}</option>
                                        </b-form-select>
                                    </b-form-group>
                                </b-col>
                            </b-row>
                        </b-card>
                        <b-card class="mt-3">
                            <b-row>
                                <b-col lg="12">
                                    <b-form-group
                                            description="Choose to enable transfer during deploy or enable manually later."
                                            label="Enable transfer"
                                            label-for="enableTransfer">
                                        <b-form-select id="network" v-model="enableTransfer">
                                            <option :value="true">Enable transfer during deploy</option>
                                            <option :value="false">Enable transfer manually later</option>
                                        </b-form-select>
                                    </b-form-group>

                                    <b-alert show variant="warning" v-if="enableTransfer === false">
                                        <strong>
                                            NOTE: If you don't enable transfer during deploy, tokens won't be
                                            transferable until you call the <i>enableTransfer</i> function.
                                        </strong><br>
                                        Only people (or smart contract) with <i>Operator</i> role will be able to
                                        transfer tokens.<br>
                                        Contract creator will be Operator by default, so he can transfer tokens also
                                        when transfer is not enabled.<br>
                                        You can also add or remove the Operator role to addresses.<br>
                                        This is because, by business choices, you may decide not to enable transfer
                                        until a specific time.
                                    </b-alert>
                                </b-col>
                            </b-row>
                        </b-card>
                        <b-row class="mt-3">
                            <b-col lg="12">
                                <b-button variant="success" size="lg" type="submit">Create Token</b-button>
                            </b-col>
                        </b-row>
                    </fieldset>
                </ValidationObserver>
            </b-card>
        </b-col>
    </b-row>
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
        makingTransaction: false,
        formDisabled: false,
        token: {},
        enableTransfer: true,
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
                  {
                    from: this.web3.eth.coinbase,
                    data: this.contracts.token.bytecode,
                  }, (e, tokenContract) => {
                    if (e) {
                      this.makingTransaction = false;
                      this.formDisabled = false;
                    } else {
                      // NOTE: The callback will fire twice!
                      // Once the contract has the transactionHash property
                      // set and once its deployed on an address.
                      if (!tokenContract.address) {
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
