import db from "$lib/database"

/** @type {import('./$types').PageServerLoad} */
export const load = async ({ url }) => {
	const conn = await db.getConnection()
	
	let pageNum = Number(url.searchParams.get('page')) ?? 1
	if (pageNum <= 0) pageNum = 1

	let offset = pageNum * 10 - 10

	/** @type {import('$lib/types').Record[]} */
	let records = await conn.query(`select * from history order by id desc limit 10 offset ${offset};`)

	conn.end()

	return { records, pageNum }
}
