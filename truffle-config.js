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
    coverage: {
      host: 'localhost',
      network_id: '*', // eslint-disable-line camelcase
      port: 8555,
      gas: 0xfffffffffff,
      gasPrice: 0x01,
    },
  },
  solc: {
    optimizer: {
      enabled: true,
      runs: 200,
    },
  },
};
