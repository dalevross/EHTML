'use strict'

const { AsyncObject } = require('@page-libs/cutie')

class ExtractedDocument extends AsyncObject {
  constructor (html) {
    super(html)
  }

  syncCall () {
    return (html) => {
      const domparser = new DOMParser()
      return domparser.parseFromString(html, 'text/html')
    }
  }
}

module.exports = ExtractedDocument
