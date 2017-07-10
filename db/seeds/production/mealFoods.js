
exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE mealFoods RESTART IDENTITY')
  .then(function() {
    return Promise.all([
      knex.raw(
        'INSERT INTO mealFoods (food_id, meal_id, created_at) VALUES (?, ?, ?)',
        [3, 1, new Date]
      ),
      knex.raw(
        'INSERT INTO mealFoods (food_id, meal_id, created_at) VALUES (?, ?, ?)',
        [1, 2, new Date]
      ),
      knex.raw(
        'INSERT INTO mealFoods (food_id, meal_id, created_at) VALUES (?, ?, ?)',
        [2, 3, new Date]
      ),
      knex.raw(
        'INSERT INTO mealFoods (food_id, meal_id, created_at) VALUES (?, ?, ?)',
        [3, 4, new Date]
      )
    ]);
  });
};