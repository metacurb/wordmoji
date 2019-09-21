const alphabet = require('./alphabet')
const numbers = require('./numbers')
const symbols = require('./symbols')

module.exports = {
  ...alphabet,
  ...numbers,
  ...symbols,
}