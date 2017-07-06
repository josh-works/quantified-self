const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

function createFoods(name, calories) {
  return database.raw(`INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)`,
  [name, calories, new Date])
}

function setInactive(id) {
  return database.raw(`UPDATE foods SET active = false WHERE id = ?;`, id)
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
  return database.raw("SELECT * FROM foods WHERE active = true;")
}

function findByName(name){
  return database.raw(`SELECT * FROM foods WHERE foods.name = ?`, name)
}

function update(id, name, calories){
  if(name && calories){
    return database.raw(`UPDATE foods SET name = ?, calories = ? WHERE id = ?;`, [name, calories, id] )
  } else if (name && !calories) {
    return database.raw(`UPDATE foods SET name = ? WHERE id = ?;`, [name, id] )
  } else {
    return database.raw(`UPDATE foods SET calories = ? WHERE id = ?;`, [calories, id] )
  }
}



module.exports = {
  createFoods: createFoods,
  resetFoods: resetFoods,
  findFirst: findFirst,
  find: find,
  findAll: findAll,
  update: update,
  findByName: findByName,
  setInactive: setInactive
}
