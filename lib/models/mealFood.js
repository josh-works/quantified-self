const environment = process.env.NODE_ENV || 'development';
const configuration = require('../../knexfile')[environment];
const database = require('knex')(configuration);

function resetMealFoods() {
  return database.raw('TRUNCATE mealFoods RESTART IDENTITY')
}

function count(){
  return database.raw('SELECT * FROM mealFoods')
}

module.exports = {
  resetMealFoods: resetMealFoods,
  count: count
}