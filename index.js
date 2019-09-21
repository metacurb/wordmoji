#!/usr/bin/env node

const { createCharacterMap, outputEmojis, stringToLetters } = require('./utils/characters')
const { parseArgs, usageText } = require('./utils/args')
const pbcopy = require('./utils/copy-to-clipboard')

const render = function render(phrase, emoji, space) {
  const chunks = stringToLetters(phrase)
  const characterMap = createCharacterMap(chunks)
  return outputEmojis(characterMap, emoji, space)
}

const { phrase, args } = parseArgs(process.argv)

if (Object.keys(args).includes('help')) {
  usageText()
  return
}

if (!phrase) {
  console.log(`\x1b[31m%s\x1b[0m`, 'Error: please supply a phrase')
  usageText()
  return
}

const emoji = args.emoji || '⬛️'
const space = args.background || '⬜️'

const wordmoji = render(phrase, emoji, space)

console.log(wordmoji)
if (args.copy) pbcopy(phrase, wordmoji)