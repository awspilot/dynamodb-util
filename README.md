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

```