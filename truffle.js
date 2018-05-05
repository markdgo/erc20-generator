require('babel-register');
require('babel-polyfill');

module.exports = {
  networks: {
    develop: {
      host: '127.0.0.1',
      port: 9545,
      network_id: '*', // Match any network id
      gas: 6000000, // Gas limit used for deploys
    },
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
};
