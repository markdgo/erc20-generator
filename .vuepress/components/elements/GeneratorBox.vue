<template>
    <div class="card bg-light">
        <div class="card-body">
            <h5 class="card-title">{{ $site.title }}</h5>
            <p class="card-text">{{ $site.description }}</p>
            <small v-if="!metamask.installed">You need the <a href="https://metamask.io/" target="_blank">MetaMask</a> extension.</small>

            <div class="alert alert-success mt-3" role="alert" v-if="makingTransaction">
                <div>Making transaction.</div>
                <div v-if="!trxHash">Please wait...</div>
                <div v-else>
                    <b>Well! Transaction done!</b><br>
                    Transaction id <a :href="trxLink" target="_blank"><span v-html="trxHash"></span></a><br>

                    Retrieving Token.
                    <div v-if="!token.address">Please wait...</div>
                    <div v-else>
                        <b>Your Token</b> <a :href="token.link" target="_blank"><span v-html="token.address"></span></a><br><br>
                        <div class="form-group">
                            <label>ABI</label>
                            <textarea class="form-control"
                                      readonly="readonly" rows="5"
                                      v-model="this.contracts.token.abi"></textarea>
                        </div>
                        <div>
                            <b>Note: To Verify your Token on Etherscan use:</b>
                            <ul>
                                <li>Source Code: <a href="https://github.com/vittominacori/erc20-generator/blob/master/dist/BaseToken.sol" target="_blank"><b>BaseToken.sol</b></a></li>
                                <li>Contract Name: <b>BaseToken</b></li>
                                <li>Compiler: <b>v0.4.24+commit.e67f0147</b></li>
                                <li>Optimization: <b>Yes</b></li>
                                <li>Runs (Optimizer): <b>200</b></li>
                                <li>Constructor Arguments: <b>your ABI-encoded arguments</b></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <form v-on:submit.prevent="generateToken" class="mt-3" v-if="!makingTransaction">
                <fieldset :disabled="formDisabled">
                    <div class="card mb-3">
                        <div class="card-body">
                            <div class="row">
                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <label class="col-form-label" for="tokenName">Token name *</label>
                                        <input type="text" class="form-control"
                                               v-validate="'required'"
                                               :class="{'is-invalid': errors.has('tokenName')}"
                                               v-model="token.name"
                                               id="tokenName"
                                               name="tokenName"
                                               maxlength="20"
                                               placeholder="Your token name">
                                        <small class="form-text text-muted">
                                            Choose a name for your token
                                        </small>
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <label class="col-form-label" for="tokenSymbol">Token symbol *</label>
                                        <input type="text" class="form-control"
                                               v-validate="'required'"
                                               :class="{'is-invalid': errors.has('tokenSymbol')}"
                                               v-model="token.symbol"
                                               id="tokenSymbol"
                                               name="tokenSymbol"
                                               maxlength="5"
                                               placeholder="Your token symbol">
                                        <small class="form-text text-muted">
                                            Choose a 3 to 5 chars symbol for your token
                                        </small>
                                    </div>
                                </div>
                                <div class="col-lg-12">
                                    <div class="form-group">
                                        <label class="col-form-label" for="tokenDecimals">Token decimals *</label>
                                        <input type="number" class="form-control"
                                               v-validate="'required|numeric'"
                                               :class="{'is-invalid': errors.has('tokenDecimals')}"
                                               v-model="token.decimals"
                                               id="tokenDecimals"
                                               name="tokenDecimals"
                                               min="0"
                                               max="36"
                                               step="1"
                                               placeholder="Your token decimals">
                                        <small class="form-text text-muted">
                                            Insert the decimal precision of your token. If you don't know what to insert, use 18
                                        </small>
                                    </div>
                                </div>
                            </div>
                            <div class="text-right">
                                <input type="submit" value="Create Token" class="btn btn-success btn-xl">
                            </div>
                        </div>
                    </div>
                </fieldset>
            </form>

            <span class="badge p-2 mr-3" :class="testnet ? 'badge-warning' : 'badge-success'" v-html="network.names[metamask.netId]"></span>
            <br class="d-block d-md-none">
            <small v-if="!testnet">Want to try on <a href="#">Rinkeby Test Network</a>?</small>
            <small v-if="testnet">Want to really deploy your token on <a href="#">Main Ethereum Network</a>?</small>
        </div>
    </div>
</template>

<script>
  import dapp from '../../mixins/dapp';

  export default {
    mixins: [
      dapp
    ],
    data() {
      return {
        trxHash: '',
        makingTransaction: false,
        formDisabled: false,
        token: {}
      }
    },
    created () {
      this.$validator.extend('eth_address', {
        getMessage: field => 'Insert a valid Ethereum wallet address.',
        validate: value => this.web3.isAddress(value)
      });
    },
    methods: {
      generateToken () {
        if (!this.metamask.installed) {
          alert("To create a Token please install the MetaMask extension!");
          return;
        } else {
          if (this.metamask.netId !== this.network.expectedId) {
            alert("Your MetaMask extension in on the wrong network. Please switch on " + this.network.expectedName + " and try again!");
            return;
          }
        }

        this.$validator.validateAll().then(async (result) => {
          if (result) {
            const name = this.token.name;
            const symbol = this.token.symbol.toUpperCase();
            const decimals = new this.web3.BigNumber(this.token.decimals);

            try {
              this.trxHash = '';
              this.formDisabled = true;
              this.makingTransaction = true;

              this.contracts.BaseToken.new(
                name,
                symbol,
                decimals,
                {
                  from: this.web3.eth.coinbase,
                  data: this.artifacts.BaseToken.bytecode,
                }, (e, tokenContract) => {
                  // NOTE: The callback will fire twice!
                  // Once the contract has the transactionHash property
                  // set and once its deployed on an address.
                  if (!tokenContract.address) {
                    this.trxHash = tokenContract.transactionHash;
                    this.trxLink = this.etherscanLink + "/tx/" + this.trxHash;
                  } else {
                    this.token.address = tokenContract.address;
                    this.token.link = this.etherscanLink + "/token/" + this.token.address;
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
  }
</script>
