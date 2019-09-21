module.exports = function pbcopy(phrase, data) {
  const proc = require('child_process').spawn('pbcopy'); 
  proc.stdin.write(data); proc.stdin.end();
  console.log(`"${phrase}" copied to clipboard`)
}
