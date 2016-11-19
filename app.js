require('express')()
	.get('/', (req, res, next) => {
		res.send('Hello World!');
	})
	.listen(3000);