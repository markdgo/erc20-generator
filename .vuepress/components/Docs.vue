<template>
    <b-row>
        <b-col lg="10" offset-lg="1" class="mt-4 p-0" v-if="!loading">
            <b-card bg-variant="light" title="Token Details">
                <ul>
                    <li>
                        Source Code:
                        <b-link :href="sourceCode"
                                target="_blank">
                            <b>ERC20Token.dist.sol</b>
                        </b-link>
                    </li>
                    <li>Contract Name: <b>{{ contracts.token.contractName }}</b></li>
                    <li>Compiler: <b>{{ contracts.token.compiler.version }}</b></li>
                    <li>Optimization: <b>Yes</b></li>
                    <li>Runs (Optimizer): <b>200</b></li>
                    <li>Constructor Arguments: <b>your ABI-encoded arguments</b></li>
                </ul>
                <div class="form-group">
                    <label><b>ABI</b></label>
                    <textarea class="form-control"
                              readonly="readonly" rows="5"
                              v-model="contracts.token.stringifiedAbi"></textarea>
                </div>
            </b-card>
            <b-card bg-variant="light" title="Token documentation" class="mt-4">
                <b-card-text>
                    Your token will have the following properties: <br><br>
                    <ul>
                        <li><b>Detailed ERC20 Token</b>: <br>your token will be fully compliant with ERC20
                            definition and compatible with any ERC20 wallet all around the world.
                            It will have a name, a symbol and a decimals amount.
                        </li>
                        <li><b>ERC1363 Payable Token</b>: <br>the ERC1363 is an ERC20 compatible token that
                            can make a callback on the receiver contract to notify token transfers or token approvals.
                            <b-link target="_blank" href="https://vittominacori.github.io/erc1363-payable-token">
                                Discover more
                            </b-link>
                        </li>
                        <li><b>Mintable Token</b>: <br>you will be able to generate tokens by minting them.
                            Only people (or smart contract) with <i>Minter</i> role will be able to do that,
                            and you can also add or remove the Minter role to addresses.
                        </li>
                        <li><b>Capped Token</b>: <br>you can’t be able to mint more than the defined token cap.
                            This ensure people that you will not generate more tokens than declared.
                        </li>
                        <li><b>Burnable Token</b>: <br>your token can be burnt. It means that you can choose to
                            reduce the circulating supply by destroying some of your tokens.
                        </li>
                        <li><b>Token Recover</b>: <br>it allows the contract owner to recover any ERC20 token
                            sent into the contract for error.
                        </li>
                    </ul>
                    <b-alert show variant="warning">
                        <strong>
                            NOTE: If you don't enable transfer during  deploy, tokens won't be transferable
                            until you call the <i>enableTransfer</i> function.
                        </strong><br>
                        Only people (or smart contract) with <i>Operator</i> role will be able to transfer tokens.<br>
                        Contract creator will be Operator by default, so he can transfer tokens also when transfer
                        is not enabled.<br>You can also add or remove the Operator role to addresses.<br>
                        This is because, by business choices, you may decide not to enable transfer until a
                        specific time.
                    </b-alert>
                </b-card-text>
            </b-card>
            <b-card bg-variant="light" title="Methods" class="mt-4">
                <b-card v-for="(method, methodName) in contracts.token.devdoc.methods" :title="methodName"
                        :sub-title="method.details" :key="methodName" class="mt-4">
                    <b-card-text v-if="method.return">
                        <b>Returns:</b> {{ method.return }}
                    </b-card-text>
                    <b-card-text v-if="method.params">
                        <b>Params:</b>
                        <ul>
                            <li v-for="(param, paramName) in method.params" :key="paramName">
                                <b>{{ paramName }}:</b> {{ param }}
                            </li>
                        </ul>
                    </b-card-text>
                </b-card>
            </b-card>
        </b-col>
    </b-row>
</template>

<script>
  import dapp from '../mixins/dapp';

  export default {
    name: 'Docs',
    mixins: [
      dapp,
    ],
    data () {
      return {
        sourceCode: 'https://github.com/vittominacori/erc20-generator/blob/v2.4.3/dist/ERC20Token.dist.sol',
        loading: true,
        currentNetwork: null,
      };
    },
    mounted () {
      this.currentNetwork = this.network.default;
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
    },
  };
</script>
