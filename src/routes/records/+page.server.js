import db from "$lib/database"

export const load = async ({ url }) => {
	const conn = await db.getConnection()
	
	let page = Number(url.searchParams.get('page')) ?? 1
	if (page <= 0) page = 1

	let offset = page * 10 - 10

	let results = await conn.query(`select * from history order by id desc limit 10 offset ${offset};`)

	conn.end()

	return { results, page }
}
