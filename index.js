const prisma = require('./db.js');
(async function () {
	console.log({ prisma })
		try {
			const result = await prisma.$queryRaw`SELECT * FROM users`
			console.log({ result })
		} catch (error) {
			console.log({ error });
		}
})(); 