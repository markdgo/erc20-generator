module.exports = {
  copyNodeModules: true,
  norpc: true,
  testCommand: 'node --max-old-space-size=4096 ../node_modules/.bin/truffle test --network ganache',
  compileCommand: 'node --max-old-space-size=4096 ../node_modules/.bin/truffle compile --network ganache',
  skipFiles: []
};
