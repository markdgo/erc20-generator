<template>
    <div>
        <b-jumbotron text-variant="white"
                     header="ERC20 Token Documentation"
                     class="mb-0 peach-gradient"
                     fluid>
            <template #lead>
                ERC20 Token Generator Documentation.
                <br>
                Discover more details about different ERC20 Token Types, ABI, source code and analysis report.
            </template>
        </b-jumbotron>
        <b-row id="token-docs" class="mx-0">
            <b-col lg="10" offset-lg="1" class="mb-3 p-0">
                <div v-if="loading" class="text-center p-5">
                    <ui--loader :loading="true"></ui--loader>
                </div>
                <b-card v-if="!loading" bg-variant="transparent" border-variant="0">
                    <b-row>
                        <b-col lg="8">
                            <b-card header="Token Type"
                                    header-bg-variant="dark"
                                    header-text-variant="white"
                                    class="mt-3">
                                <b-form-group
                                    description="Choose your Token."
                                    label="Token Type *"
                                    label-for="tokenType">
                                    <b-form-select id="tokenType"
                                                   v-model="tokenType"
                                                   size="lg"
                                                   @input="loadToken">
                                        <option v-for="(n, k) in tokenList" :value="k">{{ n.contractName }}</option>
                                    </b-form-select>
                                </b-form-group>
                            </b-card>
                            <b-card no-body
                                    bg-variant="light"
                                    header="Token Details"
                                    header-bg-variant="dark"
                                    header-text-variant="white"
                                    class="mt-3">
                                <b-list-group flush>
                                    <b-list-group-item class="py-4">
                                        <b-link :href="`https://github.com/vittominacori/erc20-generator/blob/v${token.version}/dist/${contracts.token.contractName}.dist.sol`"
                                                target="_blank">
                                            <b-img :src="`https://img.shields.io/badge/version-${token.version}-blue`"></b-img>
                                        </b-link>
                                        <b-link href="https://github.com/vittominacori/erc20-generator/actions" target="_blank">
                                            <b-img src="https://github.com/vittominacori/erc20-generator/workflows/CI/badge.svg?branch=master"></b-img>
                                        </b-link>
                                        <b-link href="https://coveralls.io/github/vittominacori/erc20-generator?branch=master" target="_blank">
                                            <b-img src="https://coveralls.io/repos/github/vittominacori/erc20-generator/badge.svg?branch=master"></b-img>
                                        </b-link>
                                        <b-link href="https://github.com/vittominacori/erc20-generator/blob/master/LICENSE" target="_blank">
                                            <b-img src="https://img.shields.io/github/license/vittominacori/erc20-generator.svg"></b-img>
                                        </b-link>
                                    </b-list-group-item>
                                    <b-list-group-item class="py-4">
                                        Contract Name: <b>{{ contracts.token.contractName }}</b>
                                    </b-list-group-item>
                                    <b-list-group-item class="py-4">
                                        Compiler: <b>{{ contracts.token.compiler.version }}</b>
                                    </b-list-group-item>
                                    <b-list-group-item class="py-4">
                                        Optimization: <b>Yes</b>
                                    </b-list-group-item>
                                    <b-list-group-item class="py-4">
                                        Runs (Optimizer): <b>200</b>
                                    </b-list-group-item>
                                    <b-list-group-item class="py-4">
                                        Control Flow:
                                        <b-link :href="controlFlow"
                                                target="_blank">
                                            <b>{{ contracts.token.contractName }}.png</b>
                                        </b-link>
                                    </b-list-group-item>
                                    <b-list-group-item class="py-4">
                                        Inheritance Tree:
                                        <b-link :href="inheritanceTree"
                                                target="_blank">
                                            <b>{{ contracts.token.contractName }}.png</b>
                                        </b-link>
                                    </b-list-group-item>
                                    <b-list-group-item class="py-4">
                                        UML:
                                        <b-link :href="uml"
                                                target="_blank">
                                            <b>{{ contracts.token.contractName }}.svg</b>
                                        </b-link>
                                    </b-list-group-item>
                                    <b-list-group-item class="py-4">
                                        <div class="form-group">
                                            <label>ABI:</label>
                                            <b-form-textarea readonly
                                                             no-resize
                                                             rows="10"
                                                             v-model="contracts.token.stringifiedAbi">
                                            </b-form-textarea>
                                        </div>
                                    </b-list-group-item>
                                </b-list-group>
                            </b-card>
                        </b-col>
                        <b-col lg="4">
                            <b-card no-body
                                    bg-variant="light"
                                    header="Token Features"
                                    header-bg-variant="dark"
                                    header-text-variant="white"
                                    class="mt-3">
                                <b-list-group flush>
                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <div>
                                            ERC20 Compliant<br>
                                            <small class="text-muted">
                                                Your Token will be compliant with the ERC20 Standard.
                                            </small>
                                        </div>
                                        <ui--checkmark :value="token.standard"></ui--checkmark>
                                    </b-list-group-item>

                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <div>
                                            Verified Source Code<br>
                                            <small class="text-muted">
                                                Your Token Source Code will be automatically verified on Etherscan.
                                            </small>
                                        </div>
                                        <ui--checkmark :value="token.verified"></ui--checkmark>
                                    </b-list-group-item>

                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <div>
                                            Detailed<br>
                                            <small class="text-muted">
                                                Your Token will have name, symbol and decimal amount.
                                            </small>
                                        </div>
                                        <ui--checkmark :value="token.detailed"></ui--checkmark>
                                    </b-list-group-item>

                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <div>
                                            Customizable Decimals<br>
                                            <small class="text-muted">
                                                You can customize the decimal amount. 18 otherwise.
                                            </small>
                                        </div>
                                        <ui--checkmark :value="token.customizeDecimals"></ui--checkmark>
                                    </b-list-group-item>

                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <div>
                                            Remove Copyright<br>
                                            <small class="text-muted">
                                                Remove the link pointing to this page from your contract.
                                            </small>
                                        </div>
                                        <ui--checkmark :value="token.removeCopyright"></ui--checkmark>
                                    </b-list-group-item>

                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <div>
                                            Supply Type<br>
                                            <small class="text-muted">
                                                Choose between Fixed, Unlimited or Capped.
                                            </small>
                                        </div>
                                        <b-badge :variant="token.supplyType === 'Capped' ? 'success' : (token.supplyType === 'Unlimited' ? 'info' : 'warning')">
                                            {{ token.supplyType }}
                                        </b-badge>
                                    </b-list-group-item>

                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <div>
                                            Accesss Type<br>
                                            <small class="text-muted">
                                                Choose between None, Ownable or Role Based.
                                            </small>
                                        </div>
                                        <b-badge :variant="token.accessType === 'Role Based' ? 'success' : (token.accessType === 'Ownable' ? 'info' : 'warning')">
                                            {{ token.accessType }}
                                        </b-badge>
                                    </b-list-group-item>

                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <div>
                                            Transfer Type<br>
                                            <small class="text-muted">
                                                Choose between Always Enabled or Pausable.
                                            </small>
                                        </div>
                                        <b-badge :variant="token.transferType === 'Always Enabled' ? 'success' : 'warning'">
                                          {{ token.transferType }}
                                        </b-badge>
                                    </b-list-group-item>

                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <div>
                                            Burnable<br>
                                            <small class="text-muted">
                                                Your Token can be burnt.
                                            </small>
                                        </div>
                                        <ui--checkmark :value="token.burnable"></ui--checkmark>
                                    </b-list-group-item>

                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <div>
                                            Mintable<br>
                                            <small class="text-muted">
                                                You will be able to generate tokens by minting them.
                                            </small>
                                        </div>
                                        <ui--checkmark :value="token.mintable"></ui--checkmark>
                                    </b-list-group-item>

                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <div>
                                            ERC1363<br>
                                            <small class="text-muted">
                                                The ERC1363 is an ERC20 compatible Token that can make a callback on
                                                the receiver contract.
                                            </small>
                                        </div>
                                        <ui--checkmark :value="token.erc1363"></ui--checkmark>
                                    </b-list-group-item>

                                    <b-list-group-item class="d-flex justify-content-between align-items-center">
                                        <div>
                                            Token Recover<br>
                                            <small class="text-muted">
                                                It allows the contract owner to recover any ERC20 token sent into the
                                                contract for error.
                                            </small>
                                        </div>
                                        <ui--checkmark :value="token.tokenRecover"></ui--checkmark>
                                    </b-list-group-item>

                                    <b-list-group-item
                                            variant="warning"
                                            :to="{ path: '/create-token/', query: { tokenType: token.name }}"
                                            class="justify-content-between align-items-center text-center py-3">
                                        Create
                                    </b-list-group-item>
                                </b-list-group>
                            </b-card>
                        </b-col>
                        <b-col lg="12">
                            <b-card header="Methods"
                                    header-bg-variant="dark"
                                    header-text-variant="white"
                                    class="mt-3">
                                <b-card v-for="(method, key) in contracts.token.abi"
                                        :key="key"
                                        v-if="method.name"
                                        no-body
                                        bg-variant="light"
                                        class="mt-4">
                                    <b-card-header>
                                        <a v-b-toggle
                                           :href="`#method-${key}`"
                                           @click.prevent
                                           class="stretched-link text-reset text-decoration-none">
                                            {{ method.name }}
                                        </a>
                                    </b-card-header>
                                    <b-collapse :id="`method-${key}`" class="p-4">
                                        <b-card-sub-title>
                                            Type: {{ method.type }}
                                        </b-card-sub-title>
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
                                    </b-collapse>
                                </b-card>
                            </b-card>
                        </b-col>
                    </b-row>
                </b-card>
            </b-col>
        </b-row>
        <b-row class="bg-light text-dark mx-0">
            <b-col lg="10" offset-lg="1" class="mb-3 text-center">
                <h2 class="pt-5 mb-4 font-weight-lighter text-dark">Ready to deploy your ERC20 Token?</h2>
                <p class="font-weight-light">
                    Try building your ERC20 Token in less than a minute. You can try on Test Network before to go live.
                </p>
                <b-button to="/create-token/" size="lg" variant="success" class="my-5 py-3 px-5 text-uppercase">
                    Create ERC20 Token
                </b-button>
            </b-col>
        </b-row>
    </div>
</template>

<script>
  import dapp from '../mixins/dapp';
  import tokenDetails from '../mixins/tokenDetails';

  export default {
    name: 'Docs',
    mixins: [
      dapp,
      tokenDetails,
    ],
    data () {
      return {
        loading: true,
        currentNetwork: null,
        tokenType: 'SimpleERC20',
        token: {},
      };
    },
    computed: {
      controlFlow: function () {
        return `https://github.com/vittominacori/erc20-generator/blob/v${this.token.version}/analysis/control-flow/${this.contracts.token.contractName}.png`;
      },
      inheritanceTree: function () {
        return `https://github.com/vittominacori/erc20-generator/blob/v${this.token.version}/analysis/inheritance-tree/${this.contracts.token.contractName}.png`;
      },
      uml: function () {
        return `https://github.com/vittominacori/erc20-generator/blob/v${this.token.version}/analysis/uml/${this.contracts.token.contractName}.svg`;
      },
    },
    mounted () {
      this.initDapp();
    },
    methods: {
      async initDapp () {
        try {
          await this.loadToken();
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
      async loadToken () {
        this.initToken(this.tokenType);

        this.token = this.tokenDetails.find((elem) => elem.name === this.tokenType);

        this.loading = false;
      },
    },
  };
</script>
