const pseudolocalize = (value, key = null, parent = null) => {
  if (typeof value === 'string') {
    if (value.includes('{{') && value.includes('}}')) {
      const re = new RegExp(/{{.*?}}/gm)
      const stringWithoutVariables = value.split(re)
      if (stringWithoutVariables.length === 2) {
          let localizedStringWithoutVariables = []
          for (j in stringWithoutVariables) {
              localizedStringWithoutVariables.push(localizeString(stringWithoutVariables[j]))
          }
          return localizedStringWithoutVariables.join(value.match(re))
      }
      else {
        throw `${key}: strings with multiple variables are not currently supported`
      }
    }
    return localizeString(value)
  }
  else if (Array.isArray(value)) {
    let localizedArray = []
    for (j in value) {
      localizedArray.push(localizeString(value[j]))
    }
    return localizedArray
  }
  else if (value === null) {
    // needed because `typeof null === 'object'`
    return null
  }
  else if (typeof value === 'object') {
    let tempObject = {}
    const subKeys = Object.keys(value)
    for (i in subKeys) {
      const subKey = subKeys[i]
      const subData = value[subKey]
      if (!tempObject[key]) {
        tempObject[key] = {}
      }
      tempObject[key][subKey] = pseudolocalize(subData, subKey, key)
    }
    return tempObject[Object.keys(tempObject)[0]]
  }
  else {
    return value
  }
}

const localizeString = string => {
  const preChars = string.split('')
  let post = ''
  for (i in preChars) {
    post += localizeChar(preChars[i])
  }
  return post
}

const localizeChar = char => {
  switch (char) {
    case 'a': return 'á'; break;
    case 'b': return 'β'; break;
    case 'c': return 'ç'; break;
    case 'd': return 'δ'; break;
    case 'e': return 'è'; break;
    case 'f': return 'ƒ'; break;
    case 'g': return 'ϱ'; break;
    case 'h': return 'λ'; break;
    case 'i': return 'ï'; break;
    case 'j': return 'J'; break;
    case 'k': return 'ƙ'; break;
    case 'l': return 'ℓ'; break;
    case 'm': return '₥'; break;
    case 'n': return 'ñ'; break;
    case 'o': return 'ô'; break;
    case 'p': return 'ƥ'; break;
    case 'q': return '9'; break;
    case 'r': return 'ř'; break;
    case 's': return 'ƨ'; break;
    case 't': return 'ƭ'; break;
    case 'u': return 'ú'; break;
    case 'v': return 'Ʋ'; break;
    case 'w': return 'ω'; break;
    case 'x': return 'ж'; break;
    case 'y': return '¥'; break;
    case 'z': return 'ƺ'; break;
    case 'A': return 'Â'; break;
    case 'B': return 'ß'; break;
    case 'C': return 'Ç'; break;
    case 'D': return 'Ð'; break;
    case 'E': return 'É'; break;
    case 'F': return 'F'; break;
    case 'G': return 'G'; break;
    case 'H': return 'H'; break;
    case 'I': return 'Ì'; break;
    case 'J': return 'J'; break;
    case 'K': return 'K'; break;
    case 'L': return '£'; break;
    case 'M': return 'M'; break;
    case 'N': return 'N'; break;
    case 'O': return 'Ó'; break;
    case 'P': return 'Þ'; break;
    case 'Q': return 'Q'; break;
    case 'R': return 'R'; break;
    case 'S': return '§'; break;
    case 'T': return 'T'; break;
    case 'U': return 'Û'; break;
    case 'V': return 'V'; break;
    case 'W': return 'W'; break;
    case 'X': return 'X'; break;
    case 'Y': return 'Ý'; break;
    case 'Z': return 'Z'; break;
    default: return char; break;
  }
}

module.exports = pseudolocalize
