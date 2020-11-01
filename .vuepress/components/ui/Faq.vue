<template>
    <div class="faq-table">
        <b-row>
            <b-col lg="8" offset-lg="2">
                <b-card bg-variant="light" class="mb-4">
                    <h3 class="font-weight-light">The ERC20 Standard</h3>
                    <p class="font-weight-light">
                        ERC20 provides basic functionality to transfer tokens, as well as allow tokens to be approved so
                        they can be spent by another on-chain third party.
                    </p>
                    <hr class="my-4">
                    <p class="font-weight-light">
                        There are many libraries and tools that provide implementations of standards like ERC20 which
                        you can deploy as-is or extend to suit your needs, as well as Solidity components to build
                        custom contracts and more complex decentralized systems.<br>
                        But you need to learn Solidity, you need to setup your own environment and code and deploy your
                        Token using an Ethereum node.
                        They are a lot of skills and configurations.<br><br>
                        <b>ERC20 Token Generator</b> allows people to think about how their projects can be
                        decentralized (if blockchain would apply to their projects) and not bothering about why
                        node is not syncing, or if Smart Contract is secure and many other blockchain related issues.
                        All of what you have to do is to fill in a simple form and complete the transaction
                        with MetaMask.
                        Nothing else. No login. No setup. No coding required.
                    </p>
                </b-card>
                <b-alert show variant="warning" class="mb-4">
                    <h4 class="alert-heading">DISCLAIMER</h4>
                    <p>
                        GENERATOR'S AUTHOR IS FREE OF ANY LIABILITY REGARDING THE TOKEN AND THE USE THAT IS MADE OF IT.
                    </p>
                    <p>
                        Generator's code is provided under MIT License. Anyone can use it as per their needs.
                        The generator's purpose is to make people able to tokenize their ideas without coding or
                        paying for it. Source code is well tested and continuously updated to reduce risk of bugs and
                        introduce language optimizations. Anyway the purchase of tokens involves a high degree of risk.
                        Before acquiring tokens, it is recommended to carefully weighs all the information and risks
                        detailed in Token owner's Conditions.
                    </p>
                </b-alert>
            </b-col>
        </b-row>
        <b-row>
            <b-col lg="8" offset-lg="2">
                <p class="font-weight-light text-white">
                    About Ethereum Blockchain and Ecosystem
                </p>
                <div class="accordion mb-3" role="tablist">
                    <b-card no-body
                            bg-variant="light"
                            class="mt-3">
                        <b-card-header role="tab">
                            <a v-b-toggle
                               href="#what-is-ethereum"
                               @click.prevent
                               class="btn-block text-reset text-decoration-none">
                                What is Ethereum?
                            </a>
                        </b-card-header>
                        <b-collapse id="what-is-ethereum" class="p-4" accordion="ethereum-accordion">
                            <b-card-text>
                                Ethereum is a decentralized platform that runs smart contracts: applications
                                that run exactly as programmed without any possibility of downtime, censorship,
                                fraud or third-party interference.<br>
                                These apps run on a custom built blockchain, an enormously powerful shared
                                global infrastructure that can move value around and represent the ownership of
                                property.<br>
                                This enables developers to create markets, store registries of debts or
                                promises, move funds in accordance with instructions given long in the past
                                (like a will or a futures contract) and many other things that have not been
                                invented yet, all without a middleman or counterparty risk.
                            </b-card-text>
                            <b-link href="https://www.ethereum.org" class="card-link" target="_blank">
                                Ethereum official website
                            </b-link>
                        </b-collapse>
                    </b-card>
                    <b-card no-body
                            bg-variant="light"
                            class="mt-3">
                        <b-card-header role="tab">
                            <a v-b-toggle
                               href="#explore-ethereum"
                               @click.prevent
                               class="btn-block text-reset text-decoration-none">
                                How to explore the Ethereum blockchain?
                            </a>
                        </b-card-header>
                        <b-collapse id="explore-ethereum" class="p-4" accordion="ethereum-accordion">
                            <b-card-text>
                                A Block Explorer is basically a search engine that allows users to easily
                                lookup, confirm and validate transactions that have taken place on the Ethereum
                                Blockchain.
                            </b-card-text>
                            <b-link href="https://etherscan.io" class="card-link" target="_blank">
                                Etherscan
                            </b-link>
                        </b-collapse>
                    </b-card>
                    <b-card no-body
                            bg-variant="light"
                            class="mt-3">
                        <b-card-header role="tab">
                            <a v-b-toggle
                               href="#what-is-a-dapp"
                               @click.prevent
                               class="btn-block text-reset text-decoration-none">
                                What is a DApp?
                            </a>
                        </b-card-header>
                        <b-collapse id="what-is-a-dapp" class="p-4" accordion="ethereum-accordion">
                            <b-card-text>
                                DApp is an abbreviated form for decentralized application.<br>
                                A DApp has its backend code running on a decentralized peer-to-peer network.
                                Contrast this with an app where the backend code is running on centralized
                                servers.<br>
                                A DApp can have frontend code and user interfaces written in any language (just
                                like an app) that can make calls to its backend. Furthermore, its frontend can
                                be hosted on decentralized storage such as Swarm or IPFS.<br>
                                For an application to be considered a Dapp (pronounced Dee-app, similar to
                                Email) it must meet the following criteria:
                            </b-card-text>
                            <ul>
                                <li>
                                    The application must be completely open-source, it must operate
                                    autonomously, and with no entity controlling the majority of its tokens. The
                                    application may adapt its protocol in response to proposed improvements and
                                    market feedback but all changes must be decided by consensus of its users.
                                </li>
                                <li>
                                    The application's data and records of operation must be cryptographically
                                    stored in a public, decentralized blockchain in order to avoid any central
                                    points of failure.
                                </li>
                                <li>
                                    The application must use a cryptographic token (bitcoin or a token native to
                                    its system) which is necessary for access to the application and any
                                    contribution of value from (miners / farmers) should be rewarded in the
                                    application’s tokens.
                                </li>
                                <li>
                                    The application must generate tokens according to a standard crytptographic
                                    algorithm acting as a proof of the value nodes are contributing to the
                                    application (Bitcoin uses the Proof of Work Algorithm).
                                </li>
                            </ul>
                        </b-collapse>
                    </b-card>
                    <b-card no-body
                            bg-variant="light"
                            class="mt-3">
                        <b-card-header role="tab">
                            <a v-b-toggle
                               href="#what-is-an-erc20-token"
                               @click.prevent
                               class="btn-block text-reset text-decoration-none">
                                What is an ERC20 token?
                            </a>
                        </b-card-header>
                        <b-collapse id="what-is-an-erc20-token" class="p-4" accordion="ethereum-accordion">
                            <b-card-text>
                                The Ethereum token standard (ERC20) defines a common list of rules that an
                                Ethereum token has to implement. Giving developers the ability to program how
                                new tokens will function within the Ethereum ecosystem. This token protocol
                                became popular with crowdfunding companies via initial coin offering (ICO).
                            </b-card-text>
                            <b-link href="https://eips.ethereum.org/EIPS/eip-20" class="card-link" target="_blank">
                                ERC20 Technical specification
                            </b-link>
                        </b-collapse>
                    </b-card>
                    <b-card no-body
                            bg-variant="light"
                            class="mt-3">
                        <b-card-header role="tab">
                            <a v-b-toggle
                               href="#what-is-gas"
                               @click.prevent
                               class="btn-block text-reset text-decoration-none">
                                What is Gas?
                            </a>
                        </b-card-header>
                        <b-collapse id="what-is-gas" class="p-4" accordion="ethereum-accordion">
                            <b-card-text>
                                "Gas" is the name for a special unit used in Ethereum. It measures how much
                                "work" an action or set of actions takes to perform.<br>
                                Every operation that can be performed by a transaction or contract on the
                                Ethereum platform costs a certain number of gas, with operations that require
                                more computational resources costing more gas than operations that require few
                                computational resources.<br>
                                The reason gas is important is that it helps to ensure an appropriate fee is
                                being paid by transactions submitted to the network. By requiring that a
                                transaction pay for each operation it performs (or causes a contract to
                                perform), we ensure that network doesn't become bogged down with performing a
                                lot of intensive work that isn't valuable to anyone.
                            </b-card-text>
                            <b-link href="https://ethereum.stackexchange.com/questions/3/what-is-meant-by-the-term-gas"
                                    class="card-link" target="_blank">
                                Good explanation of Gas
                            </b-link>
                        </b-collapse>
                    </b-card>
                </div>
            </b-col>
        </b-row>
        <b-row>
            <b-col lg="8" offset-lg="2">
                <p class="font-weight-light text-white">
                    About Token Features
                </p>
                <div class="accordion mb-3" role="tablist">
                    <b-card no-body
                            bg-variant="light"
                            class="mt-3">
                        <b-card-header role="tab">
                            <a v-b-toggle
                               href="#what-is-erc1363"
                               @click.prevent
                               class="btn-block text-reset text-decoration-none">
                                What is ERC1363 Payable Token?
                            </a>
                        </b-card-header>
                        <b-collapse id="what-is-erc1363" class="p-4" accordion="features-accordion">
                            <b-card-text>
                                There is no way to execute code after a ERC-20 transfer or approval (i.e. making a
                                payment), so to make an action it is required to send another transaction and pay GAS
                                twice.<br>
                                ERC1363 makes token payments easier and working without the use of any other listener.
                                It allows to make a callback after a transfer or approval in a single transaction.<br>
                                There are many proposed uses of Ethereum smart contracts that can accept ERC-20
                                payments.<br>
                                Examples could be:
                                <ul>
                                    <li>
                                        to create a token payable crowdsale
                                    </li>
                                    <li>
                                        selling services for tokens
                                    </li>
                                    <li>
                                        paying invoices
                                    </li>
                                    <li>
                                        making subscriptions
                                    </li>
                                </ul>
                            </b-card-text>
                            <b-link href="https://eips.ethereum.org/EIPS/eip-1363"
                                    class="card-link" target="_blank">
                                Discover ERC1363
                            </b-link>
                        </b-collapse>
                    </b-card>
                    <b-card no-body
                            bg-variant="light"
                            class="mt-3">
                        <b-card-header role="tab">
                            <a v-b-toggle
                               href="#what-is-token-recover"
                               @click.prevent
                               class="btn-block text-reset text-decoration-none">
                                What is Token Recover?
                            </a>
                        </b-card-header>
                        <b-collapse id="what-is-token-recover" class="p-4" accordion="features-accordion">
                            <b-card-text>
                                There are lots of tokens lost forever into Smart Contracts. Each Ethereum contract is a
                                potential token trap for ERC20 tokens. They can't be recovered so it means money losses
                                for end users.<br>
                                TokenRecover allows the contract owner to recover any ERC20 token sent into the
                                contract for error.
                            </b-card-text>
                            <b-link href="https://vittominacori.github.io/eth-token-recover/"
                                    class="card-link" target="_blank">
                                Discover Token Recover
                            </b-link>
                        </b-collapse>
                    </b-card>
                </div>
            </b-col>
        </b-row>
        <b-row>
            <b-col lg="8" offset-lg="2">
                <p class="font-weight-light text-white">
                    About Token Generator
                </p>
                <div class="accordion mb-3" role="tablist">
                    <b-card no-body
                            bg-variant="light"
                            class="mt-3">
                        <b-card-header role="tab">
                            <a v-b-toggle
                               href="#who-will-be-token-owner"
                               @click.prevent
                               class="btn-block text-reset text-decoration-none">
                                Who will be token owner?
                            </a>
                        </b-card-header>
                        <b-collapse id="who-will-be-token-owner" class="p-4" accordion="erc20-accordion">
                            <b-card-text>
                                Once your token will be deployed you will be the only owner. If you choose Common or
                                Powerful ERC20 you will be able to mint new tokens.
                            </b-card-text>
                        </b-collapse>
                    </b-card>
                    <b-card no-body
                            bg-variant="light"
                            class="mt-3">
                        <b-card-header role="tab">
                            <a v-b-toggle
                               href="#can-i-use-in-exchange"
                               @click.prevent
                               class="btn-block text-reset text-decoration-none">
                                Can I use my token in Exchanges?
                            </a>
                        </b-card-header>
                        <b-collapse id="can-i-use-in-exchange" class="p-4" accordion="erc20-accordion">
                            <b-card-text>
                                Yes, you can use your Token in Exchanges, Dex, Uniswap. It is a ERC20 compliant so you
                                can use for any purpose where ERC20 applies.
                            </b-card-text>
                        </b-collapse>
                    </b-card>
                    <b-card no-body
                            bg-variant="light"
                            class="mt-3">
                        <b-card-header role="tab">
                            <a v-b-toggle
                               href="#can-i-use-for-ico"
                               @click.prevent
                               class="btn-block text-reset text-decoration-none">
                                Can I use my token for ICO?
                            </a>
                        </b-card-header>
                        <b-collapse id="can-i-use-for-ico" class="p-4" accordion="erc20-accordion">
                            <b-card-text>
                                Yes, you can use token for ICO or Crowdsales.
                            </b-card-text>
                        </b-collapse>
                    </b-card>
                    <b-card no-body
                            bg-variant="light"
                            class="mt-3">
                        <b-card-header role="tab">
                            <a v-b-toggle
                               href="#can-token-receive-eth"
                               @click.prevent
                               class="btn-block text-reset text-decoration-none">
                                Can my token receive Ethereum?
                            </a>
                        </b-card-header>
                        <b-collapse id="can-token-receive-eth" class="p-4" accordion="erc20-accordion">
                            <b-card-text>
                                No, token address can't receive Ethereum. If you want to create ICO, you need to
                                develop a Smart Contract to do that.
                            </b-card-text>
                        </b-collapse>
                    </b-card>
                    <b-card no-body
                            bg-variant="light"
                            class="mt-3">
                        <b-card-header role="tab">
                            <a v-b-toggle
                               href="#can-i-verify-source-code"
                               @click.prevent
                               class="btn-block text-reset text-decoration-none">
                                Can I verify source code on Etherscan?
                            </a>
                        </b-card-header>
                        <b-collapse id="can-i-verify-source-code" class="p-4" accordion="erc20-accordion">
                            <b-card-text>
                                Yes, your token should be already verified by Similar Match. It is not an issue, it
                                means that your source code is similar to other tokens deployed using this generator.
                            </b-card-text>
                        </b-collapse>
                    </b-card>
                    <b-card no-body
                            bg-variant="light"
                            class="mt-3">
                        <b-card-header role="tab">
                            <a v-b-toggle
                               href="#can-i-add-logo"
                               @click.prevent
                               class="btn-block text-reset text-decoration-none">
                                Can I add logo and information to my token?
                            </a>
                        </b-card-header>
                        <b-collapse id="can-i-add-logo" class="p-4" accordion="erc20-accordion">
                            <b-card-text>
                                Once your token will be deployed you will be able to add information on Etherscan using
                                their procedure.
                            </b-card-text>
                            <b-link href="https://info.etherscan.com/how-to-update-token-information-on-token-page"
                                    class="card-link" target="_blank">
                                Update Token Information
                            </b-link>
                        </b-collapse>
                    </b-card>
                    <b-card no-body
                            bg-variant="light"
                            class="mt-3">
                        <b-card-header role="tab">
                            <a v-b-toggle
                               href="#will-people-mark-as-scam"
                               @click.prevent
                               class="btn-block text-reset text-decoration-none">
                                Will people mark my token as SCAM?
                            </a>
                        </b-card-header>
                        <b-collapse id="will-people-mark-as-scam" class="p-4" accordion="erc20-accordion">
                            <b-card-text>
                                No, your token is not SCAM. It is well tested, it has verified source code, it is used
                                by thousands of tokens. It will be SCAM if you use as it.<br>
                                ERC20 Token Generator has been FREE for use and there are about 10.000 tokens built on.
                                Maybe someone used it to SCAM but it doesn't mean also you will use for it.
                                Below some links about the project you can share to demonstrate trustability of your
                                token source code (not of your intentions).<br>
                            </b-card-text>
                            <b-link href="https://github.com/vittominacori/erc20-generator"
                                    class="card-link" target="_blank">
                                Smart Contracts
                            </b-link>
                            <b-link href="https://github.com/vittominacori/erc20-generator/tree/dapp"
                                    class="card-link" target="_blank">
                                DAPP
                            </b-link>
                            <b-link href="https://travis-ci.com/github/vittominacori/erc20-generator"
                                    class="card-link" target="_blank">
                                Tests
                            </b-link>
                            <b-link href="https://coveralls.io/github/vittominacori/erc20-generator"
                                    class="card-link" target="_blank">
                                Coverage
                            </b-link>
                        </b-collapse>
                    </b-card>
                </div>
            </b-col>
        </b-row>
    </div>
</template>

<script>
  export default {
    name: 'Faq',
  };
</script>
