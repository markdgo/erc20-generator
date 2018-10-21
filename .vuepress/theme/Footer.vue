<template>
    <b-row>
        <b-col lg="8" offset-lg="2" class="mt-4 p-0">
            <b-link href="https://www.friendsfingers.com/?utm_campaign=github&utm_source=erc20-generator" target="_blank">
                <b-img fluid :src="$withBase('/assets/images/friends-fingers-banner.png')" alt="FriendsFingers"></b-img>
            </b-link>
        </b-col>
        <b-col lg="8" offset-lg="2" class="text-center text-white p-0">
            <ul class="list-inline mt-2">
                <li class="list-inline-item">
                    <small>created by <b-link class="text-light" href="https://github.com/vittominacori" target="_blank">@vittominacori</b-link></small>
                </li>
                <li class="list-inline-item">
                    <small>
                        GitHub:
                        <b-link class="text-light" href="https://github.com/vittominacori/erc20-generator" target="_blank">Smart Contracts</b-link> -
                        <b-link class="text-light" href="https://github.com/vittominacori/erc20-generator/tree/dapp" target="_blank">DApp</b-link>
                    </small>
                </li>
            </ul>
        </b-col>
    </b-row>
</template>

<script>
  export default {
    name: "Footer"
  }
</script>

<style scoped>

</style>
