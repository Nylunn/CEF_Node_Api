const format = require('../services/format')
const assert = require('assert');


describe('Test du module format', function() {
    it('return name with a underscore', function(){
        let name = "John doe"
        assert.equal(format.formatName(name), 'John_doe', 'split of space character didn\'t work on username ')
    })
})