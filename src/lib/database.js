import { env } from '$env/dynamic/private'

// set up mariadb
import mariadb from 'mariadb'

const db = mariadb.createPool({
  host: env.DB_HOST,
  user: env.DB_USER,
  password: env.DB_PASSWORD,
  database: env.DB_NAME,
  acquireTimeout: 5000 // 5s to make a connection
})

console.log(env.DB_HOST)

export default db
