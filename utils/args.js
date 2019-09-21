const usageText = function() {
  console.log(`
  Wordmoji turns your phrases into emojis.

  usage:
    wordmoji "phrase" <arguments>

    arguments can be:

    --emoji:           set the emoji used for your phrase
    --background:      set your background emoji
    --copy:            copy the wordmoji to your clipboard

  example:
    wordmoji "hello there!" --emoji=🍆 --background=⬜️
  `)
}

const stripFlagDashes = flagWithDash => flagWithDash.substring(2)

const filterArgs = args => args.slice(0, 2) === '--' && args.slice(2, 3) !== '-'

const mapArg = arg => {
  const [key, value] = arg.split('=')
  if (!value) return [stripFlagDashes(arg), true]
  return [stripFlagDashes(key), value]
}

const reduceArgs = (acc, [key, value]) => {
  acc[key] = value
  return acc
};

const parseArgs = args => ({
  phrase: !args[2] || args[2].startsWith('--') ? false : args[2],
  args: args
    .filter(filterArgs)
    .map(mapArg)
    .reduce(reduceArgs, {}),
})

module.exports = {
  parseArgs,
  usageText,
}