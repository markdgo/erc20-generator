require('babel-register');
require('babel-polyfill');

module.exports = {
  networks: {
    develop: {
      host: 'localhost',
      port: 9545,
      network_id: '*', // Match any network id
      gas: 6000000, // Gas limit used for deploys
    },
    ganache: {
      host: 'localhost',
      port: 8545,
      network_id: '*', // eslint-disable-line camelcase
    },
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
};
