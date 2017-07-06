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

function findByName(name){
  return database.raw(`SELECT * FROM meals WHERE meals.name = ?`, name)
}

function foods(meal_name){
  return database.raw('SELECT f.id food_id, f.name food_name, f.calories food_calories FROM meals m JOIN mealFoods ON m.id = mealFoods.meal_id JOIN foods f ON f.id = mealFoods.food_id WHERE m.name = ?', meal_name)
}

function addFood(meals_id, foods_id){
  return database.raw('INSERT INTO mealFoods (food_id, meal_id, created_at) VALUES (?, ?, ?)', [foods_id, meals_id, new Date])
}

function deleteFood(meal_id, food_id) {
  return database.raw('DELETE FROM mealFoods WHERE meal_id = ? AND food_id = ?', [meal_id, food_id])
}

module.exports = {
  createMeals: createMeals,
  resetMeals: resetMeals,
  findAll: findAll,
  foods: foods,
  addFood: addFood,
  findByName: findByName,
  deleteFood: deleteFood
}
