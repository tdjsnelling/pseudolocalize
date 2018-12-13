# pseudolocalize

## Progmatic use

This module provides an easy way to progmatically [pseudolocalize](http://www.pseudolocalize.com/) strings. Supports strings, objects, arrays, and strings with a variable.

Example:

```JavaScript
const pseudolocalize = require('pseudolocalize')

// results in £ôřè₥ ïƥƨú₥ δôℓôř ƨïƭ á₥èƭ
const pseudolocalizedString = pseudolocalize('Lorem ipsum dolor sit amet')

// results in { foo: '£ôřè₥ ïƥƨú₥', bar: 'δôℓôř ƨïƭ á₥èƭ'}
const pseudolocalizedObject = pseudolocalize({ foo: 'Lorem ipsum', bar: 'dolor sit amet' })

// results in [ '£ôřè₥ ïƥƨú₥', 'δôℓôř ƨïƭ á₥èƭ' ]
const pseudolocalizedArray = pseudolocalize([ 'Lorem ipsum', 'dolor sit amet' ])

// results in £ôřè₥ ïƥƨú₥ {{dolor}} ƨïƭ á₥èƭ
const pseudolocalizedStringWithVariable = pseudolocalize('Lorem ipsum {{dolor}} sit amet')
```

## Command line

It also provides a command line program that will pseudolocalize a JSON file, which is how i18n strings are usually provided.

Example:

```Shell
npm i pseudolocalize -g
pseudolocalize strings.json
```

This will create a new JSON file called `localized-strings.json` containing exactly the same JSON data as the initial file, but with all strings pseudolocalized.

## Tests

The tests can be run with `npm test`

## Contributing

Please feel to open a PR if you have any improvements or find any bugs!
