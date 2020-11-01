<template>
    <b-navbar toggleable="md" type="dark" variant="dark">

        <b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

        <b-navbar-brand to="/">
            <b-icon-house></b-icon-house>
        </b-navbar-brand>

        <b-collapse is-nav id="nav_collapse">
            <b-navbar-nav>
                <b-nav-item to="/create-token/">
                    <span class="text-white">Create your Token</span>
                </b-nav-item>
            </b-navbar-nav>

            <b-navbar-nav class="ml-auto">
                <b-nav-item to="/docs/">Docs</b-nav-item>
                <b-nav-item target="_blank"
                            href="https://medium.com/@vittominacori/create-an-erc20-token-in-less-than-a-minute-2a8751c4d6f4">
                    About
                </b-nav-item>
                <b-nav-item target="_blank"
                            href="https://vittominacori.github.io/ethereum-badge/detail.html?address=0x158D6727B17aaBa726D7318ac7dcA5edf8fAf6f8">
                    Donate
                </b-nav-item>
            </b-navbar-nav>

        </b-collapse>
    </b-navbar>
</template>

<script>
  export default {
    name: 'Header',
  };
</script>
