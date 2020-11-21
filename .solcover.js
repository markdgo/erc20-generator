module.exports = {
  norpc: true,
  testCommand: 'npm run hardhat:test',
  compileCommand: 'npm run hardhat:compile',
  copyPackages: [
    'erc-payable-token',
    'eth-token-recover',
    '@openzeppelin/contracts',
  ],
  skipFiles: [
    'mocks'
  ],
};
