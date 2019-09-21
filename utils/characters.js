const characters = require('../characters')

const flatten = arrs => arrs.reduce((acc, arr) => {
  acc.push(...arr)
  return acc
}, [])

const arrayFromCount = (count, filler = null) => Array(count).fill(filler)

const padWithSpaces = (arr, desiredLength) => {
  const diff = desiredLength - arr.length

  if (diff > 0) return [...arr, ...arrayFromCount(diff, 0)]
  return arr
}

const stringToLetters = phrase => phrase.toLowerCase().split(' ').map(word => word.split(''))

const calculateLineLength = words => words.reduce((acc, word) => {
  const wordLength = word.length
  const merged = flatten(word.map(char => characters[char][0]))
  const count = merged.length + wordLength
  return acc > count ? acc : count
}, 0) + 1

const insertBreakBetween = (chunks, lineBreak) => chunks.reduce((acc, chunk) => acc.concat(chunk, [lineBreak]), [lineBreak]);

const mapCharacters = (chunk, lineLength) => arrayFromCount(5).map((_, index) => {
  const row = chunk.reduce((acc, char) => {
    const characterRef = characters[char]
    if (!characterRef) return acc
    acc.push(...characterRef[index], 0)
    return acc
  }, [0])

  return padWithSpaces(row, lineLength)
})

const createCharacterMap = chunks => {
  const lineLength = calculateLineLength(chunks)
  const lineBreak = arrayFromCount(lineLength, 0)
  return insertBreakBetween(chunks.map(chunk => mapCharacters(chunk, lineLength)), lineBreak)
}

const outputEmojis = (charMap, emoji, space) => charMap.map(row => row.map(column => column ? emoji : space).join('')).join('\n')

module.exports = {
  createCharacterMap,
  outputEmojis,
  stringToLetters,
}