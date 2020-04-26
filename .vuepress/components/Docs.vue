<template>
    <div>
        <b-row>
            <b-col lg="10" offset-lg="1" class="mt-4 p-0" v-if="!loading">
                <b-card :title="$site.title" bg-variant="transparent" border-variant="0">
                    <p class="card-text">
                        {{ $site.description }}
                    </p>
                    <b-card bg-variant="light"
                            header="Token Details"
                            header-bg-variant="dark"
                            header-text-variant="white">
                        <ul>
                            <li>
                                Source Code:
                                <b-link :href="sourceCode"
                                        target="_blank">
                                    <b>BaseToken.dist.sol</b>
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
                    <b-card bg-variant="light"
                            header="Token Documentation"
                            header-bg-variant="dark"
                            header-text-variant="white"
                            class="mt-3">
                        <b-card-text>
                            Your token will have the following properties: <br><br>
                            <ul>
                                <li><b>Detailed ERC20 Token</b>: <br>your token will be fully compliant with ERC20
                                    definition and compatible with any ERC20 wallet all around the world.
                                    It will have a name, a symbol and a decimals amount.
                                </li>
                                <li><b>ERC1363 Payable Token</b>: <br>the ERC1363 is an ERC20 compatible token that
                                    can make a callback on the receiver contract to notify token transfers or token
                                    approvals.<br>
                                    <b-link target="_blank" href="https://vittominacori.github.io/erc1363-payable-token">
                                        Discover more
                                    </b-link>
                                </li>
                                <li><b>Mintable</b>: <br>you will be able to generate tokens by minting them.
                                    Only people (or smart contract) with <i>MINTER</i> role will be able to do that,
                                    and you can also add or remove the Minter role to addresses.
                                </li>
                                <li><b>Capped</b>: <br>you can’t be able to mint more than the defined token cap.
                                    This ensure people that you will not generate more tokens than declared.
                                </li>
                                <li><b>Burnable</b>: <br>your token can be burnt. It means that you can choose to
                                    reduce the circulating supply by destroying some of your tokens.
                                </li>
                                <li><b>Token Recover</b>: <br>it allows the contract owner to recover any ERC20 token
                                    sent into the contract for error.
                                </li>
                            </ul>
                        </b-card-text>
                    </b-card>
                    <b-card bg-variant="light"
                            header="Methods"
                            header-bg-variant="dark"
                            header-text-variant="white"
                            class="mt-3">
                        <b-card v-for="(method, key) in contracts.token.abi"
                                :header="method.name || 'constructor'"
                                :sub-title="`Type: ${method.type}`"
                                :key="key"
                                class="mt-4">
                            <b-card-text v-if="method.stateMutability">
                                State Mutability: {{ method.stateMutability }}
                            </b-card-text>
                            <b-card-text v-if="method.inputs && method.inputs.length > 0">
                                <p>Inputs:</p>
                                <ul>
                                    <li v-for="(param, key) in method.inputs" :key="key">
                                        <b>{{ param.type }}</b> {{ param.name }}
                                    </li>
                                </ul>
                            </b-card-text>
                            <b-card-text v-if="method.outputs && method.outputs.length > 0">
                                <p>Outputs:</p>
                                <ul>
                                    <li v-for="(param, key) in method.outputs" :key="key">
                                        <b>{{ param.type }}</b> {{ param.name }}
                                    </li>
                                </ul>
                            </b-card-text>
                        </b-card>
                    </b-card>
                </b-card>
            </b-col>
        </b-row>
    </div>
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
        sourceCode: 'https://github.com/vittominacori/erc20-generator/blob/v3.0.4/dist/BaseToken.dist.sol',
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
          console.log(e);
          this.makeToast(
            'Some error occurred',
            e,
            'danger',
          );
          // document.location.href = this.$withBase('/');
        }
      },
    },
  };
</script>
