const fs = require('fs')
const pseudolocalize = require('./pseudolocalize')

let localizedData = {}

fs.readFile(process.argv[2], (err, data) => {
  if (err) throw err
  localizeFile(JSON.parse(data), null)
})

localizeFile = (data) => {
  const keys = Object.keys(data)
  for (i in keys) {
    const key = keys[i]
    const value = data[keys[i]]
    localizedData[key] = pseudolocalize(key, value, null)
  }
  fs.writeFile(`localized-${process.argv[2]}`, JSON.stringify(localizedData, null, 2), err => {
    if (err) throw err
  })
}

