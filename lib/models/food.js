const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

function createFoods(name, calories) {
    return database.raw(`INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)`,
    [name, calories, new Date])
}

function resetFoods() {
  return database.raw(`TRUNCATE foods RESTART IDENTITY`)
}

function findFirst() {
  return database.raw('SELECT * FROM foods LIMIT 1')
}

function find(id) {
  return database.raw("SELECT * from foods where id=?", [id])
}

function findAll() {
  return database.raw("SELECT * FROM foods;")
}

function update(id, name){
  return database.raw(`UPDATE foods SET name = ? WHERE id = ?;`, [name, id] )
}


module.exports = {
  createFoods: createFoods,
  resetFoods: resetFoods,
  findFirst: findFirst,
  find: find,
  findAll: findAll,
  update: update
}
