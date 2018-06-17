util = require('../index')
assert = require('assert')

describe('stringify()', function () {

	it('string', function(done) {
		var d = util.stringify( 'text' )
		assert.deepStrictEqual(d, { S: 'text'})
		done()
	});

	it('number', function(done) {
		var d = util.stringify( 1 )
		assert.deepStrictEqual(d, { N: '1'})
		done()
	});

	it('boolean true', function(done) {
		var d = util.stringify( true )
		assert.deepStrictEqual( d,  {BOOL: true} )
		done()
	});

	it('boolean false', function(done) {
		var d = util.stringify( false )
		assert.deepStrictEqual( d,  {BOOL: false} )
		done()
	});

	it('null', function(done) {
		var d = util.stringify( null )
		assert.deepStrictEqual( d,  {NULL: true} )
		done()
	});
	it('[]', function(done) {
		var d = util.stringify( [] )
		assert.deepStrictEqual( d,  {L: [] } )
		done()
	});
	it('[1,"text",true, false, null, [], {} ]', function(done) {
		var d = util.stringify( [1,"text",true, false, null, [], {} ] )
		assert.deepStrictEqual( d,  {L: [
			{N: '1' },
			{S: 'text'},
			{BOOL: true},
			{BOOL: false},
			{NULL: true},
			{L: []},
			{M: {}}
		] } )
		done()
	});

	it('{}', function(done) {
		var d = util.stringify( {} )
		assert.deepStrictEqual( d,  {M: {} } )
		done()
	});

	it('{ number: 1, string: "text", bool: true, nulled: null, arr: [], obj: {} }', function(done) {
		var d = util.stringify( { number: 1, string: "text", bool: true, nulled: null, arr: [], obj: {} } )
		assert.deepStrictEqual( d,  {M: {
			number: {N: '1'},
			string: {S: 'text'},
			bool: { BOOL: true},
			nulled: {NULL: true},
			arr: {L: []},
			obj: {M: {}},
		} } )
		done()
	});

})
