<template>
    <div class="faq-table" itemscope itemtype="https://schema.org/FAQPage">
        <b-row>
            <b-col>
                <b-card bg-variant="light" class="mb-4">
                    <h3 class="font-weight-light">ERC20 Token Generator</h3>
                    <p class="font-weight-light">
                        Create an ERC20 Token in less than a minute with the most used Smart Contract Generator for
                        ERC20 Token. No login. No setup. No coding required.
                    </p>
                    <hr class="my-4">
                    <h6 class="font-weight-light">The ERC20 Standard</h6>
                    <p class="font-weight-light">
                        ERC20 provides basic functionality to transfer tokens, as well as allow tokens to be approved so
                        they can be spent by another on-chain third party.
                    </p>
                </b-card>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <h5 class="font-weight-light text-white">
                    <a v-b-toggle
                       href="#about-token-features"
                       @click.prevent
                       class="btn-block text-reset text-decoration-none">
                        <b-icon-caret-down-fill></b-icon-caret-down-fill> Token Features
                    </a>
                </h5>
                <b-collapse id="about-token-features" visible accordion="main-accordion" class="mt-4">
                    <div class="accordion mb-3" role="tablist">
                        <b-card no-body
                                bg-variant="light"
                                itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                            <b-card-header role="tab">
                                <a v-b-toggle
                                   href="#difference-between-fixed-capped"
                                   @click.prevent
                                   class="btn-block text-reset text-decoration-none">
                                    <span itemprop="name">
                                        What's the difference between Fixed, Capped and Unlimited Supply?
                                    </span>
                                </a>
                            </b-card-header>
                            <b-collapse id="difference-between-fixed-capped"
                                        class="p-4"
                                        accordion="features-accordion">
                                <b-card-text itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                                    <span itemprop="text">
                                        <b>Fixed Supply</b><br>
                                        The entire token supply will be generated during deploy and sent to Token Owner
                                        wallet. You can't increase or reduce supply later.<br><br>
                                        <b>Capped Supply</b><br>
                                        You can define an initial supply to sent to Token Owner's wallet. You can
                                        increase or reduce supply later by minting or burning tokens (if allowed).
                                        You won't be able to generate more tokens than the defined supply cap.<br><br>
                                        <b>Unlimited Supply</b><br>
                                        You can define an initial supply to sent to Token Owner's wallet. You can
                                        increase or reduce supply later by minting or burning tokens (if allowed).
                                        You will be able to generate unlimited tokens without an upper limit.
                                    </span>
                                </b-card-text>
                            </b-collapse>
                        </b-card>
                        <b-card no-body
                                bg-variant="light"
                                itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                            <b-card-header role="tab">
                                <a v-b-toggle
                                   href="#difference-between-enabled-pausable"
                                   @click.prevent
                                   class="btn-block text-reset text-decoration-none">
                                      <span itemprop="name">
                                          What's the difference between Always Enabled or Pausable Transfer?
                                      </span>
                                </a>
                            </b-card-header>
                            <b-collapse id="difference-between-enabled-pausable"
                                        class="p-4"
                                        accordion="features-accordion">
                                <b-card-text itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                                    <span itemprop="text">
                                        <b>Always Enabled</b><br>
                                        Everyone can always transfer his own tokens. Transfer can't be stopped.<br><br>
                                        <b>Pausable</b><br>
                                        Token owner can stop token transfers. Useful for scenarios such as preventing
                                        trades until the end of an evaluation period, or having an emergency switch for
                                        freezing all token transfers in the event of a large bug.
                                    </span>
                                </b-card-text>
                            </b-collapse>
                        </b-card>
                        <b-card no-body
                                bg-variant="light"
                                itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                            <b-card-header role="tab">
                                <a v-b-toggle
                                   href="#difference-between-access"
                                   @click.prevent
                                   class="btn-block text-reset text-decoration-none">
                                    <span itemprop="name">
                                        What's the difference between None, Ownable and Role Based Access?
                                    </span>
                                </a>
                            </b-card-header>
                            <b-collapse id="difference-between-access" class="p-4" accordion="features-accordion">
                                <b-card-text itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                                    <span itemprop="text">
                                        <b>None</b><br>
                                        Your Token doesn't need an access type because of there are not actions that
                                        needs privileges. <br><br>
                                        <b>Ownable</b><br>
                                        Your Token will have an Owner. The account you use to deploy your Token will be
                                        owner by default and will be able to mint new tokens or call the finish minting
                                        function. You can transfer token ownership to addresses or Smart Contract.
                                        <br><br>
                                        <b>Role Based</b><br>
                                        Your Token will have Roles. Accounts with "MINTER" role will be able to mint new
                                        tokens. Accounts with "ADMIN" role will be able to add or remove roles to
                                        minters or other admins. The account you use to deploy your Token will be ADMIN
                                        and MINTER by default. In addition your Token will have the Ownable behaviour
                                        too.
                                    </span>
                                </b-card-text>
                            </b-collapse>
                        </b-card>
                        <b-card no-body
                                bg-variant="light"
                                itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                            <b-card-header role="tab">
                                <a v-b-toggle
                                   href="#who-can-mint-burn"
                                   @click.prevent
                                   class="btn-block text-reset text-decoration-none">
                                    <span itemprop="name">
                                        Who can mint or burn tokens?
                                    </span>
                                </a>
                            </b-card-header>
                            <b-collapse id="who-can-mint-burn" class="p-4" accordion="features-accordion">
                                <b-card-text itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                                    <span itemprop="text">
                                        <b>Mint</b><br>
                                        It depends on your Token Access Type. If you choose Ownable Access only Token
                                        Owner will be able to mint new tokens. If you choose Role Based Access only
                                        addresses with MINTER role will be able to mint new tokens.
                                        In both cases, if you choose a Capped supply you won't be able to mint more
                                        tokens than the defined cap. By choosing Unlimited supply instead, you will be
                                        able to generate unlimited tokens.<br><br>
                                        <b>Burn</b><br>
                                        Everyone will be able to burn tokens he held. A third party can burn tokens from
                                        other addresses only after an approval. Nobody, not even the Token Owner, will
                                        be able to burn tokens from other addresses without approval.
                                    </span>
                                </b-card-text>
                            </b-collapse>
                        </b-card>
                        <b-card no-body
                                bg-variant="light"
                                itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                            <b-card-header role="tab">
                                <a v-b-toggle
                                   href="#who-can-pause"
                                   @click.prevent
                                   class="btn-block text-reset text-decoration-none">
                                    <span itemprop="name">
                                        Who can pause transfers?
                                    </span>
                                </a>
                            </b-card-header>
                            <b-collapse id="who-can-pause" class="p-4" accordion="features-accordion">
                                <b-card-text itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                                    <span itemprop="text">
                                        If you choose a Pausable token, only token owner will be able to pause and
                                        unpause token transfers.<br>
                                        Note that Pausable is a powerful feature to add emergency stop to smart
                                        contracts. It is a privileged role, so users need to trust the project team.
                                        The project should clearly document what privileged roles they have and under
                                        what circumstances they use them.
                                    </span>
                                </b-card-text>
                            </b-collapse>
                        </b-card>
                        <b-card no-body
                                bg-variant="light"
                                itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                            <b-card-header role="tab">
                                <a v-b-toggle
                                   href="#what-is-erc1363"
                                   @click.prevent
                                   class="btn-block text-reset text-decoration-none">
                                    <span itemprop="name">
                                        What is ERC1363 Payable Token?
                                    </span>
                                </a>
                            </b-card-header>
                            <b-collapse id="what-is-erc1363" class="p-4" accordion="features-accordion">
                                <b-card-text itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                                    <span itemprop="text">
                                        There is no way to execute code after a ERC-20 transfer or approval (i.e.
                                        making a payment), so to make an action it is required to send another
                                        transaction and pay GAS twice. ERC1363 makes token payments easier and working
                                        without the use of any other listener. It allows to make a callback after a
                                        transfer or approval in a single transaction.<br>
                                        There are many proposed uses of Ethereum Smart Contracts that can accept ERC-20
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
                                    </span>
                                </b-card-text>
                                <b-link href="https://eips.ethereum.org/EIPS/eip-1363"
                                        class="card-link" target="_blank">
                                    Discover ERC1363
                                </b-link>
                            </b-collapse>
                        </b-card>
                        <b-card no-body
                                bg-variant="light"
                                itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                            <b-card-header role="tab">
                                <a v-b-toggle
                                   href="#what-is-token-recover"
                                   @click.prevent
                                   class="btn-block text-reset text-decoration-none">
                                    <span itemprop="name">
                                        What is Token Recover?
                                    </span>
                                </a>
                            </b-card-header>
                            <b-collapse id="what-is-token-recover" class="p-4" accordion="features-accordion">
                                <b-card-text itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                                    <span itemprop="text">
                                        There are lots of tokens lost forever into Smart Contracts. Each Ethereum
                                        contract is a potential token trap for ERC20 tokens. They can't be recovered so
                                        it means money losses for end users.<br>
                                        TokenRecover allows the contract owner to recover any ERC20 token sent into the
                                        contract for error.
                                    </span>
                                </b-card-text>
                                <b-link href="https://vittominacori.github.io/eth-token-recover/"
                                        class="card-link" target="_blank">
                                    Discover Token Recover
                                </b-link>
                            </b-collapse>
                        </b-card>
                        <b-card no-body
                                bg-variant="light"
                                itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                            <b-card-header role="tab">
                                <a v-b-toggle
                                   href="#will-copyright-be-an-issue"
                                   @click.prevent
                                   class="btn-block text-reset text-decoration-none">
                                    <span itemprop="name">
                                        Will be having ERC20 Generator Copyright an issue?
                                    </span>
                                </a>
                            </b-card-header>
                            <b-collapse id="will-copyright-be-an-issue" class="p-4" accordion="features-accordion">
                                <b-card-text itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                                    <span itemprop="text">
                                        No. ERC20 Generator code is released under MIT License so, using SimpleERC20 for
                                        FREE, you will have a view method in your Smart Contract named "generator"
                                        showing a link to this page. You will also have a disclaimer in source code. It
                                        is not an issue for you because of your Token will be fully compliant with ERC20
                                        definition. You can use your Token in Exchanges, DEX, Uniswap, any ERC20
                                        compatible wallet, etc. You can remove it by choosing a token type with remove
                                        Copyright feature.
                                    </span>
                                </b-card-text>
                            </b-collapse>
                        </b-card>
                    </div>
                </b-collapse>

                <h5 class="font-weight-light text-white">
                    <a v-b-toggle
                       href="#about-token-behaviours"
                       @click.prevent
                       class="btn-block text-reset text-decoration-none">
                        <b-icon-caret-down-fill></b-icon-caret-down-fill> Token Behaviours
                    </a>
                </h5>
                <b-collapse id="about-token-behaviours" accordion="main-accordion" class="mt-4">
                    <div class="accordion mb-3" role="tablist">
                        <b-card no-body
                                bg-variant="light"
                                itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                            <b-card-header role="tab">
                                <a v-b-toggle
                                   href="#where-is-my-token-address"
                                   @click.prevent
                                   class="btn-block text-reset text-decoration-none">
                                    <span itemprop="name">
                                        Where is my Token address?
                                    </span>
                                </a>
                            </b-card-header>
                            <b-collapse id="where-is-my-token-address" class="p-4" accordion="erc20-accordion">
                                <b-card-text itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                                    <span itemprop="text">
                                        Once you confirm your transaction you will receive transaction hash (first) and
                                        Token address (when transaction is confirmed). If your transaction will take
                                        some time to be confirmed due to network status, you can monitor it and your
                                        Token will be visible in transaction page. Watch the above video tutorial for
                                        details.
                                    </span>
                                </b-card-text>
                            </b-collapse>
                        </b-card>
                        <b-card no-body
                                bg-variant="light"
                                itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                            <b-card-header role="tab">
                                <a v-b-toggle
                                   href="#who-will-be-token-owner"
                                   @click.prevent
                                   class="btn-block text-reset text-decoration-none">
                                    <span itemprop="name">
                                        Who will be Token Owner?
                                    </span>
                                </a>
                            </b-card-header>
                            <b-collapse id="who-will-be-token-owner" class="p-4" accordion="erc20-accordion">
                                <b-card-text itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                                    <span itemprop="text">
                                        Once your Token will be deployed you (your MetaMask address) will be the only
                                        owner.
                                    </span>
                                </b-card-text>
                            </b-collapse>
                        </b-card>
                        <b-card no-body
                                bg-variant="light"
                                itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                            <b-card-header role="tab">
                                <a v-b-toggle
                                   href="#where-token-supply-will-go"
                                   @click.prevent
                                   class="btn-block text-reset text-decoration-none">
                                    <span itemprop="name">
                                        Where will token supply go after deploy?
                                    </span>
                                </a>
                            </b-card-header>
                            <b-collapse id="where-token-supply-will-go" class="p-4" accordion="erc20-accordion">
                                <b-card-text itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                                    <span itemprop="text">
                                        The initial token supply will be held by the address used to deploy the token
                                        (your MetaMask address). This address will be Token Owner and will be able to
                                        generate new tokens (in case you selected a token type with Mintable behaviour).
                                    </span>
                                </b-card-text>
                            </b-collapse>
                        </b-card>
                        <b-card no-body
                                bg-variant="light"
                                itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                            <b-card-header role="tab">
                                <a v-b-toggle
                                   href="#which-wallet-support"
                                   @click.prevent
                                   class="btn-block text-reset text-decoration-none">
                                    <span itemprop="name">
                                        Which wallet will my Token be supported by?
                                    </span>
                                </a>
                            </b-card-header>
                            <b-collapse id="which-wallet-support" class="p-4" accordion="erc20-accordion">
                                <b-card-text itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                                    <span itemprop="text">
                                        Your Token will be a fully ERC20 compatible token. Any ERC20 wallet will support
                                        your Token.
                                    </span>
                                </b-card-text>
                            </b-collapse>
                        </b-card>
                        <b-card no-body
                                bg-variant="light"
                                itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                            <b-card-header role="tab">
                                <a v-b-toggle
                                   href="#how-to-mint-new-tokens"
                                   @click.prevent
                                   class="btn-block text-reset text-decoration-none">
                                    <span itemprop="name">
                                        How to mint new tokens?
                                    </span>
                                </a>
                            </b-card-header>
                            <b-collapse id="how-to-mint-new-tokens" class="p-4" accordion="erc20-accordion">
                                <b-card-text itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                                    <span itemprop="text">
                                        To generate new tokens you must use the "mint" function using token owner
                                        wallet. You can doing this by using the Contract/Write tab on your Etherscan
                                        token page. You can also import ABI from the Docs page in tools like
                                        MyEtherWallet and calling the mint function.<br>
                                        <small>
                                            Note: remember that your tokens has a number of decimals (usually 18), so
                                            you must use the entire number with decimals.<br>I.e. if you need to
                                            generate 500 additional tokens, call the mint function by inserting
                                            500000000000000000000.
                                        </small>
                                    </span>
                                </b-card-text>
                            </b-collapse>
                        </b-card>
                        <b-card no-body
                                bg-variant="light"
                                itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                            <b-card-header role="tab">
                                <a v-b-toggle
                                   href="#can-i-use-in-exchange"
                                   @click.prevent
                                   class="btn-block text-reset text-decoration-none">
                                    <span itemprop="name">
                                        Can I use my token in Exchanges or with DeFi protocols?
                                    </span>
                                </a>
                            </b-card-header>
                            <b-collapse id="can-i-use-in-exchange" class="p-4" accordion="erc20-accordion">
                                <b-card-text itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                                    <span itemprop="text">
                                        Yes, you can use your Token in Exchanges, Dex, or DeFi protocols like Uniswap.
                                        It is a ERC20 compliant so you can use for any purpose where ERC20 applies.
                                    </span>
                                </b-card-text>
                            </b-collapse>
                        </b-card>
                        <b-card no-body
                                bg-variant="light"
                                itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                            <b-card-header role="tab">
                                <a v-b-toggle
                                   href="#can-i-use-for-ico"
                                   @click.prevent
                                   class="btn-block text-reset text-decoration-none">
                                    <span itemprop="name">
                                        Can I use my Token for ICO?
                                    </span>
                                </a>
                            </b-card-header>
                            <b-collapse id="can-i-use-for-ico" class="p-4" accordion="erc20-accordion">
                                <b-card-text itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                                    <span itemprop="text">
                                        Yes, you can use Token for ICO or Crowdsales.<br>
                                        Note: you need to develop an ICO or Crowdsale Smart Contract; Token address
                                        can't receive ETH.
                                    </span>
                                </b-card-text>
                            </b-collapse>
                        </b-card>
                        <b-card no-body
                                bg-variant="light"
                                itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                            <b-card-header role="tab">
                                <a v-b-toggle
                                   href="#can-token-receive-eth"
                                   @click.prevent
                                   class="btn-block text-reset text-decoration-none">
                                    <span itemprop="name">
                                        Can my Token receive Ethereum?
                                    </span>
                                </a>
                            </b-card-header>
                            <b-collapse id="can-token-receive-eth" class="p-4" accordion="erc20-accordion">
                                <b-card-text itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                                    <span itemprop="text">
                                        No, Token address can't receive Ethereum. If you want to create ICO, you need to
                                        develop a Smart Contract able to do that.
                                    </span>
                                </b-card-text>
                            </b-collapse>
                        </b-card>
                        <b-card no-body
                                bg-variant="light"
                                itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                            <b-card-header role="tab">
                                <a v-b-toggle
                                   href="#will-my-token-be-verified"
                                   @click.prevent
                                   class="btn-block text-reset text-decoration-none">
                                    <span itemprop="name">
                                        Will my Token Source Code be verified on Etherscan?
                                    </span>
                                </a>
                            </b-card-header>
                            <b-collapse id="will-my-token-be-verified" class="p-4" accordion="erc20-accordion">
                                <b-card-text itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                                    <span itemprop="text">
                                        Yes, your token source code will be already verified by "Similar Match".
                                        It means that your source code is similar to other tokens deployed using this
                                        generator.
                                    </span>
                                </b-card-text>
                            </b-collapse>
                        </b-card>
                        <b-card no-body
                                bg-variant="light"
                                itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                            <b-card-header role="tab">
                                <a v-b-toggle
                                   href="#can-i-add-logo"
                                   @click.prevent
                                   class="btn-block text-reset text-decoration-none">
                                    <span itemprop="name">
                                        Can I add logo and information to my token on Etherscan?
                                    </span>
                                </a>
                            </b-card-header>
                            <b-collapse id="can-i-add-logo" class="p-4" accordion="erc20-accordion">
                                <b-card-text itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                                    <span itemprop="text">
                                        Once your token will be deployed you will be able to add information on
                                        Etherscan using their procedure.
                                    </span>
                                </b-card-text>
                                <b-link href="https://info.etherscan.com/how-to-update-token-information-on-token-page"
                                        class="card-link" target="_blank">
                                    Update Token Information
                                </b-link>
                            </b-collapse>
                        </b-card>
                        <b-card no-body
                                bg-variant="light"
                                itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                            <b-card-header role="tab">
                                <a v-b-toggle
                                   href="#will-people-mark-as-scam"
                                   @click.prevent
                                   class="btn-block text-reset text-decoration-none">
                                    <span itemprop="name">
                                        Will people mark my token as SCAM?
                                    </span>
                                </a>
                            </b-card-header>
                            <b-collapse id="will-people-mark-as-scam" class="p-4" accordion="erc20-accordion">
                                <b-card-text itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                                    <span itemprop="text">
                                        No, your Token is not SCAM. Code is well tested and updated regularly, token has
                                        verified source code already used by thousands of tokens. It will be SCAM if you
                                        use as it. ERC20 Token Generator is FREE to use and there are about 10.000
                                        tokens built on. Maybe someone used it to SCAM but it doesn't mean you will use
                                        for it too. <b>YOU DON'T.</b>
                                        Below the link to documentation about the project you can share to demonstrate
                                        trustability of your token source code (not of your intentions).
                                    </span>
                                </b-card-text>
                                <b-link to="/docs/" class="card-link">
                                    Documentation
                                </b-link>
                            </b-collapse>
                        </b-card>
                    </div>
                </b-collapse>

                <h5 class="font-weight-light text-white">
                    <a v-b-toggle
                       href="#about-ethereum"
                       @click.prevent
                       class="btn-block text-reset text-decoration-none">
                        <b-icon-caret-down-fill></b-icon-caret-down-fill> Ethereum Blockchain and Ecosystem
                    </a>
                </h5>
                <b-collapse id="about-ethereum" accordion="main-accordion" class="mt-4">
                    <div class="accordion mb-3" role="tablist">
                        <b-card no-body
                                bg-variant="light"
                                itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                            <b-card-header role="tab">
                                <a v-b-toggle
                                   href="#what-is-ethereum"
                                   @click.prevent
                                   class="btn-block text-reset text-decoration-none">
                                    <span itemprop="name">
                                        What is Ethereum?
                                    </span>
                                </a>
                            </b-card-header>
                            <b-collapse id="what-is-ethereum" class="p-4" accordion="ethereum-accordion">
                                <b-card-text itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                                    <span itemprop="text">
                                        Ethereum is a decentralized platform that runs Smart Contracts: applications
                                        that run exactly as programmed without any possibility of downtime, censorship,
                                        fraud or third-party interference.<br>
                                        These apps run on a custom built blockchain, an enormously powerful shared
                                        global infrastructure that can move value around and represent the ownership of
                                        property.<br>
                                        This enables developers to create markets, store registries of debts or
                                        promises, move funds in accordance with instructions given long in the past
                                        (like a will or a futures contract) and many other things that have not been
                                        invented yet, all without a middleman or counterparty risk.
                                    </span>
                                </b-card-text>
                                <b-link href="https://www.ethereum.org" class="card-link" target="_blank">
                                    Ethereum official website
                                </b-link>
                            </b-collapse>
                        </b-card>
                        <b-card no-body
                                bg-variant="light"
                                itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                            <b-card-header role="tab">
                                <a v-b-toggle
                                   href="#explore-ethereum"
                                   @click.prevent
                                   class="btn-block text-reset text-decoration-none">
                                    <span itemprop="name">
                                        How to explore the Ethereum blockchain?
                                    </span>
                                </a>
                            </b-card-header>
                            <b-collapse id="explore-ethereum" class="p-4" accordion="ethereum-accordion">
                                <b-card-text itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                                    <span itemprop="text">
                                        A Block Explorer is basically a search engine that allows users to easily
                                        lookup, confirm and validate transactions that have taken place on the Ethereum
                                        Blockchain.
                                    </span>
                                </b-card-text>
                                <b-link href="https://etherscan.io" class="card-link" target="_blank">
                                    Etherscan
                                </b-link>
                            </b-collapse>
                        </b-card>
                        <b-card no-body
                                bg-variant="light"
                                itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                            <b-card-header role="tab">
                                <a v-b-toggle
                                   href="#what-is-a-dapp"
                                   @click.prevent
                                   class="btn-block text-reset text-decoration-none">
                                    <span itemprop="name">
                                        What is a DApp?
                                    </span>
                                </a>
                            </b-card-header>
                            <b-collapse id="what-is-a-dapp" class="p-4" accordion="ethereum-accordion">
                                <b-card-text itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                                    <span itemprop="text">
                                        DApp is an abbreviated form for decentralized application.<br>
                                        A DApp has its backend code running on a decentralized peer-to-peer network.
                                        Contrast this with an app where the backend code is running on centralized
                                        servers.<br>
                                        A DApp can have frontend code and user interfaces written in any language (just
                                        like an app) that can make calls to its backend. Furthermore, its frontend can
                                        be hosted on decentralized storage such as Swarm or IPFS.<br>
                                        For an application to be considered a Dapp (pronounced Dee-app, similar to
                                        Email) it must meet the following criteria:
                                        <ul>
                                            <li>
                                                The application must be completely open-source, it must operate
                                                autonomously, and with no entity controlling the majority of its tokens.
                                                The application may adapt its protocol in response to proposed
                                                improvements and market feedback but all changes must be decided by
                                                consensus of its users.
                                            </li>
                                            <li>
                                                The application's data and records of operation must be
                                                cryptographically stored in a public, decentralized blockchain in order
                                                to avoid any central points of failure.
                                            </li>
                                            <li>
                                                The application must use a cryptographic token (bitcoin or a token
                                                native to its system) which is necessary for access to the application
                                                and any contribution of value from (miners / farmers) should be rewarded
                                                in the application’s tokens.
                                            </li>
                                            <li>
                                                The application must generate tokens according to a standard
                                                crytptographic algorithm acting as a proof of the value nodes are
                                                contributing to the application (Bitcoin uses the Proof of Work
                                                Algorithm).
                                            </li>
                                        </ul>
                                    </span>
                                </b-card-text>
                            </b-collapse>
                        </b-card>
                        <b-card no-body
                                bg-variant="light"
                                itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                            <b-card-header role="tab">
                                <a v-b-toggle
                                   href="#what-is-an-erc20-token"
                                   @click.prevent
                                   class="btn-block text-reset text-decoration-none">
                                    <span itemprop="name">
                                        What is an ERC20 token?
                                    </span>
                                </a>
                            </b-card-header>
                            <b-collapse id="what-is-an-erc20-token" class="p-4" accordion="ethereum-accordion">
                                <b-card-text itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                                    <span itemprop="text">
                                        The Ethereum token standard (ERC20) defines a common list of rules that an
                                        Ethereum token has to implement. Giving developers the ability to program how
                                        new tokens will function within the Ethereum ecosystem. This token protocol
                                        became popular with crowdfunding companies via initial coin offering (ICO).
                                    </span>
                                </b-card-text>
                                <b-link href="https://eips.ethereum.org/EIPS/eip-20" class="card-link" target="_blank">
                                    ERC20 Technical specification
                                </b-link>
                            </b-collapse>
                        </b-card>
                        <b-card no-body
                                bg-variant="light"
                                itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                            <b-card-header role="tab">
                                <a v-b-toggle
                                   href="#what-is-gas"
                                   @click.prevent
                                   class="btn-block text-reset text-decoration-none">
                                    <span itemprop="name">
                                        What is GAS and how to set Gas price?
                                    </span>
                                </a>
                            </b-card-header>
                            <b-collapse id="what-is-gas" class="p-4" accordion="ethereum-accordion">
                                <b-card-text itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                                    <span itemprop="text">
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
                                        lot of intensive work that isn't valuable to anyone.<br>
                                        Use the links below to discover more about Gas and Gas Price.
                                    </span>
                                </b-card-text>
                                <b-link href="https://ethereum.stackexchange.com/questions/3/what-is-meant-by-the-term-gas"
                                        class="card-link" target="_blank">
                                    Good explanation of Gas
                                </b-link>
                                <b-link href="https://etherscan.io/gastracker"
                                        class="card-link" target="_blank">
                                    Etherscan Gas tracker
                                </b-link>
                                <b-link href="https://ethgasstation.info"
                                        class="card-link" target="_blank">
                                    ETH Gas Station
                                </b-link>
                            </b-collapse>
                        </b-card>
                        <b-card no-body
                                bg-variant="light"
                                itemscope itemprop="mainEntity" itemtype="https://schema.org/Question">
                            <b-card-header role="tab">
                                <a v-b-toggle
                                   href="#what-is-multisig"
                                   @click.prevent
                                   class="btn-block text-reset text-decoration-none">
                                    <span itemprop="name">
                                        What is a Multisig Wallet?
                                    </span>
                                </a>
                            </b-card-header>
                            <b-collapse id="what-is-multisig" class="p-4" accordion="ethereum-accordion">
                                <b-card-text itemscope itemprop="acceptedAnswer" itemtype="https://schema.org/Answer">
                                    <span itemprop="text">
                                        If such an account (wallet) with privileges is lost or were to fall in the
                                        hands of a malicious user, they could wreak havoc in your system.
                                        A good option for securing owner accounts is to use a special contract, such as
                                        a multisig, instead of a regular externally owned account.<br>
                                        Multisig is a smart contract wallet running on Ethereum that requires a minimum
                                        number of people to approve a transaction before it can occur.
                                        If for example you have 3 main stakeholders in your business, you are able to
                                        set up the wallet to require approval from all 3 people before the transaction
                                        is sent. This assures that no single person could compromise the funds.
                                    </span>
                                </b-card-text>
                                <b-link href="https://gnosis-safe.io/"
                                        class="card-link" target="_blank">
                                    Gnosis Safe Multisig
                                </b-link>
                            </b-collapse>
                        </b-card>
                    </div>
                </b-collapse>
            </b-col>
        </b-row>
        <b-row>
            <b-col>
                <b-alert show variant="warning" class="mt-4">
                    <h4 class="alert-heading">DISCLAIMER</h4>
                    <p>
                        ERC20 Token Generator and its author are free of any liability regarding Tokens built using
                        this App, and the use that is made of them. Tokens built on ERC20 Token Generator, their
                        projects, their teams, their use of Token (as well as anything related to Token) are in no way
                        connected to ERC20 Token Generator or its author.
                    </p>
                    <hr>
                    <small>
                        ERC20 Token Generator's code is provided under MIT License. Anyone can use it as per their
                        needs. The App's purpose is to make people able to tokenize their ideas without coding or
                        paying large amounts for it. Source code is public and well tested and continuously updated to
                        reduce risk of bugs and introduce language optimizations. Anyway the purchase of tokens
                        involves a high degree of risk. Before acquiring tokens, it is recommended to carefully weighs
                        all the information and risks detailed in Token owner's Conditions.
                    </small>
                </b-alert>
            </b-col>
        </b-row>
    </div>
</template>

<script>
  export default {
    name: 'Faq',
  };
</script>
