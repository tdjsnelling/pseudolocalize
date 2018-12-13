const assert = require('assert')
const pseudolocalize = require('./index')

describe('String', () => {
  it('should pseudolocalize the string correctly', () => {
    assert.equal(pseudolocalize('This is a string'), 'Tλïƨ ïƨ á ƨƭřïñϱ')
  })
  it('should return null if no string is supplied', () => {
    assert.equal(pseudolocalize(), null)
  })
})

describe('Object', () => {
  it('should pseudolocalize all object values correctly', () => {
    const pre = { firstKey: 'First value', secondKey: 'Second value' }
    const post = { firstKey: 'Fïřƨƭ Ʋáℓúè', secondKey: '§èçôñδ Ʋáℓúè' }
    assert.equal(pseudolocalize(pre).firstKey, post.firstKey)
    assert.equal(pseudolocalize(pre).secondKey, post.secondKey)
  })
  it('should pseudolocalize all nested object values correctly', () => {
    const pre = { firstKey: 'First value', secondKey: { nestedKey: 'Nested value' } }
    const post = { firstKey: 'Fïřƨƭ Ʋáℓúè', secondKey: { nestedKey: 'Nèƨƭèδ Ʋáℓúè' } }
    assert.equal(pseudolocalize(pre).firstKey, post.firstKey)
    assert.equal(pseudolocalize(pre).secondKey.nestedKey, post.secondKey.nestedKey)
  })
})

describe('Array', () => {
  it('should pseudolocalize all array elements correctly', () => {
    const pre = [ 'First element', 'Second element', 'Third element' ]
    const post = [ 'Fïřƨƭ èℓè₥èñƭ', '§èçôñδ èℓè₥èñƭ', 'Tλïřδ èℓè₥èñƭ' ]
    assert.equal(pseudolocalize(pre)[0], post[0])
    assert.equal(pseudolocalize(pre)[1], post[1])
    assert.equal(pseudolocalize(pre)[2], post[2])
  })
})

describe('Number', () => {
  it('should not alter numbers', () => {
    assert.equal(pseudolocalize(0), 0)
  })
})

describe('Boolean', () => {
  it('should not alter booleans', () => {
    assert.equal(pseudolocalize(true), true)
  })
})
