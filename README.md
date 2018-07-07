# dynamodb-util

[![Build Status](https://travis-ci.org/awspilot/dynamodb-util.svg?branch=master)](https://travis-ci.org/awspilot/dynamodb-util) 

serialize dynamodb style documents into and out of objects



```
var util = require('@awspilot/dynamodb-util')

util.parse( { S: 'text' } ) 
	=> 'text'

util.parse( { M: { number: {N: '1'}, string: {S: 'text'}, bool: { BOOL: true}, } } ) 
	=> { number: 1, string: "text", bool: true }

util.stringify( 'text' ) 
	=> { S: 'text'}

util.stringify( { number: 1, bool: true, } ) 
	=> { 'M': { number: {N: '1'}, bool: { BOOL: true}, } }

util.stringify( { s1: new Set([1,2,3]), s2: new Set(['a','b','c']) } ) 
	=> { 'M': { s1: {NS: ['1','2','3']}, s2: { SS: ['a','b', 'c']}, } }

// empty Set is converted as DynamoDB List
// mixed type Sets are also converted to DynamoDB List

util.stringify( { s1: new Set(), s2: new Set(['a',1) } ) 
	=> { 'M': { s1: { L: [ ] }, s2: { L: [ 'a', 1 ]}, } }

```