const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

function createMeals(name, total_calories) {
    return database.raw(`INSERT INTO meals (name, total_calories, created_at) VALUES (?, ?, ?)`,
    [name, total_calories, new Date])
}

function resetMeals() {
  return database.raw(`TRUNCATE meals RESTART IDENTITY`)
}

function findAll(){
  return database.raw(`SELECT * FROM meals`)
}

module.exports = {
  createMeals: createMeals,
  resetMeals: resetMeals,
  findAll: findAll
}