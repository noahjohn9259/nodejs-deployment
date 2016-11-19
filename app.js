require('express')()
	.get('/', (req, res, next) => {
		res.send('Hey World');
	})
	.listen(3000);