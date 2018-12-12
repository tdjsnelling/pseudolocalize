const fs = require('fs')
const psuedolocalize = require('./psuedolocalize')

let localizedData = {}

fs.readFile(process.argv[2], (err, data) => {
  if (err) throw err
  localizeFile(JSON.parse(data), null)
})

localizeFile = (data, parent) => {
  const keys = Object.keys(data)
  for (i in keys) {
    const key = keys[i]
    const value = data[keys[i]]
    if (typeof value === 'string') {
      if (!parent) {
        localizedData[key] = psuedolocalize(value)
      }
      else {
        if (!localizedData[parent]) {
          localizedData[parent] = {}
        }
        localizedData[parent][key] = psuedolocalize(value)
      }
      if (value.includes('{{') && value.includes('}}')) {
        const re = new RegExp(/{{.*?}}/gm)
        const stringWithoutVariables = value.split(re)
        if (stringWithoutVariables.length === 2) {
            let localizedStringWithoutVariables = []
            for (j in stringWithoutVariables) {
                localizedStringWithoutVariables.push(psuedolocalize(stringWithoutVariables[j]))
            }
            localizedData[key] = localizedStringWithoutVariables.join(value.match(re))
        }
        else {
          throw `${key}: strings with multiple variables are not currently supported`
        }
      }
    }
    else if (typeof value === 'object' && !Array.isArray(value)) {
      localizeFile(value, key)
    }
    else if (Array.isArray(value)) {
      let localizedArray = []
      for (j in value) {
        localizedArray.push(psuedolocalize(value[j]))
      }
      localizedData[key] = localizedArray
    }
    else {
      localizedData[key] = value
    }
  }
  fs.writeFile(`localized-${process.argv[2]}`, JSON.stringify(localizedData, null, 2), err => {
    if (err) throw err
  })
}
