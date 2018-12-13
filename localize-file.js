#!/usr/bin/env node
const fs = require('fs')
const path = require('path')
const pseudolocalize = require('./index')

let localizedData = {}

const inputFile = process.argv[0].indexOf('node') !== -1 ? process.argv[2] : process.argv[1]
const fullPath = path.resolve(process.cwd(), inputFile)
const outputFile = path.basename(fullPath)

fs.readFile(fullPath, (err, data) => {
  if (err) throw err
  localizeFile(JSON.parse(data), null)
})

localizeFile = (data) => {
  const keys = Object.keys(data)
  for (i in keys) {
    const key = keys[i]
    const value = data[keys[i]]
    localizedData[key] = pseudolocalize(value, key, null)
  }
  fs.writeFile(`localized-${outputFile}`, JSON.stringify(localizedData, null, 2), err => {
    if (err) throw err
  })
}

