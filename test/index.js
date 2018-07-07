util = require('../index')
assert = require('core-assert')

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

	it('binary', function(done) {
		var d = util.stringify( new Buffer("\0") )
		assert.deepStrictEqual( d,  { B: new Buffer("\0") } )
		done()
	});

	it('StringSet from Set', function(done) {
		var d = util.stringify( new Set(['a','b', 'c']) )
		assert.deepStrictEqual( d,  { SS: [ 'a', 'b', 'c' ] } )
		done()
	});
	it('NumberSet from Set', function(done) {
		var d = util.stringify( new Set([1,2,-3]) )
		assert.deepStrictEqual( d,  { NS: [ "1", "2", "-3" ] } )
		done()
	});
	it('List from empty Set', function(done) {
		var d = util.stringify( new Set() )
		assert.deepStrictEqual( d,  { L: [] } )
		done()
	});
	it('List from mixed Set', function(done) {
		var d = util.stringify( new Set(['string', 1 ]) )
		assert.deepStrictEqual( d,  { L: [ { S: 'string' },  { N: '1'} ] } )
		done()
	});
})




describe('parse()', function () {

	it('string', function(done) {
		var d = util.parse( { S: 'text' } )
		assert.deepStrictEqual(d, 'text' )
		done()
	});

	it('number', function(done) {
		var d = util.parse( { N: '1'} )
		assert.deepStrictEqual(d, 1 )
		done()
	});

	it('boolean true', function(done) {
		var d = util.parse( {BOOL: true} )
		assert.deepStrictEqual( d, true  )
		done()
	});

	it('boolean false', function(done) {
		var d = util.parse( {BOOL: false} )
		assert.deepStrictEqual( d, false  )
		done()
	});

	it('null', function(done) {
		var d = util.parse( {NULL: true} )
		assert.deepStrictEqual( d, null  )
		done()
	});
	it('[]', function(done) {
		var d = util.parse( {L: [] } )
		assert.deepStrictEqual( d, []  )
		done()
	});
	it('[1,"text",true, false, null, [], {} ]', function(done) {
		var d = util.parse(
			{
				L: [
					{N: '1' },
					{S: 'text'},
					{BOOL: true},
					{BOOL: false},
					{NULL: true},
					{L: []},
					{M: {}}
				]
			}
		)
		assert.deepStrictEqual( d, [1,"text",true, false, null, [], {} ]  )
		done()
	});

	it('{}', function(done) {
		var d = util.parse( {M: {} } )
		assert.deepStrictEqual( d, {} )
		done()
	});

	it('{ number: 1, string: "text", bool: true, nulled: null, arr: [], obj: {} }', function(done) {
		var d = util.parse(

			{
				M: {
					number: {N: '1'},
					string: {S: 'text'},
					bool: { BOOL: true},
					nulled: {NULL: true},
					arr: {L: []},
					obj: {M: {}},
				}
			}


			 )
		assert.deepStrictEqual( d, { number: 1, string: "text", bool: true, nulled: null, arr: [], obj: {} } )
		done()
	});

	it('binary', function(done) {
		var d = util.parse( { B: new Buffer("\0") } )
		assert.deepStrictEqual( d, new Buffer("\0")  )
		done()
	});
})
