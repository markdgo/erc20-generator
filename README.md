# ERC20 Token Generator

The source code for ERC20 Token Generator DApp. 

Simply deploy Smart Contract for a Standard, Mintable, Burnable, ERC20 Token with Minter Role.

Token has a Role Based Access Control so you can add the "minter" permission to users or Smart Contracts.

Token also has [ERC1363](https://github.com/ethereum/EIPs/issues/1363) Behaviours to work like a Payable Token.

Smart Contract code here [https://github.com/vittominacori/erc20-generator](https://github.com/vittominacori/erc20-generator)

Live Demo here [https://vittominacori.github.io/erc20-generator](https://vittominacori.github.io/erc20-generator)

## Download and Installation

```bash
git clone https://github.com/vittominacori/erc20-generator.git
cd erc20-generator
git checkout gh-pages
gem install jekyll bundler
bundle install
npm install
gulp
```

## Usage

### Run locally

```bash
bundle exec jekyll serve --config _config-dev.yml
```

Go to [http://localhost:4000](http://localhost:4000)

### Build

#### Gulp Tasks

- `gulp` the default task that builds everything
- `gulp sass` compiles SCSS files into CSS
- `gulp minify-css` minifies the compiled CSS file
- `gulp minify-js` minifies the themes JS file
- `gulp watch` watches JS and SCSS files and makes previous tasks
- `gulp copy` copies dependencies from node_modules to the vendor directory

## Helpful Links
 
Web3.js [Doc 0.20.6](https://github.com/ethereum/wiki/wiki/JavaScript-API) [Doc 1.0](http://web3js.readthedocs.io/en/1.0) [Github](https://github.com/ethereum/web3.js)
 
Jekyll [Doc](https://jekyllrb.com/docs/home/) [GitHub](https://github.com/jekyll/jekyll)

## Bugs and Issues

Have a bug? [Open a new issue](https://github.com/vittominacori/erc20-generator/issues).

## Copyright and License

Copyright 2018 @vittominacori. Code released under the [MIT](https://github.com/vittominacori/erc20-generator/blob/master/LICENSE) license.
