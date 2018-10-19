<template>
    <b-row>
        <b-col lg="8" offset-lg="2" class="mt-4 p-0">
            <b-link href="https://www.friendsfingers.com/?utm_campaign=github&utm_source=erc20-generator" target="_blank">
                <img :src="$withBase('/assets/images/friends-fingers-banner.png')" class="img-fluid" alt="FriendsFingers">
            </b-link>
        </b-col>
        <b-col lg="8" offset-lg="2" class="text-center text-white p-0">
            <ul class="list-inline mt-2">
                <li class="list-inline-item">
                    <small>created by <a class="text-light" href="https://github.com/vittominacori" target="_blank">@vittominacori</a></small>
                </li>
                <li class="list-inline-item">
                    <small>
                        GitHub:
                        <a class="text-light" href="https://github.com/vittominacori/erc20-generator" target="_blank">Smart Contract</a> -
                        <a class="text-light" href="https://github.com/vittominacori/erc20-generator/tree/gh-pages" target="_blank">DApp</a>
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
