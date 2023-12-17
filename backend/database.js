const pgp = require('pg-promise')()
const db = pgp('postgres://postgres:password@localhost:5432/boards')

module.exports = db;