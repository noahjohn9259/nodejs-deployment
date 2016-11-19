const express = require('express')
const db = require('./db')
express()
	.get('/', (req, res, next) => {
		res.send('Hey World');
	})
	.listen(3000);