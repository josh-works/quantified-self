
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
        [6, 1, new Date]
      ),
      knex.raw(
        'INSERT INTO mealFoods (food_id, meal_id, created_at) VALUES (?, ?, ?)',
        [11, 2, new Date]
      ),
      knex.raw(
        'INSERT INTO mealFoods (food_id, meal_id, created_at) VALUES (?, ?, ?)',
        [4, 2, new Date]
      ),
      knex.raw(
        'INSERT INTO mealFoods (food_id, meal_id, created_at) VALUES (?, ?, ?)',
        [1, 3, new Date]
      ),
      knex.raw(
        'INSERT INTO mealFoods (food_id, meal_id, created_at) VALUES (?, ?, ?)',
        [7, 3, new Date]
      ),
      knex.raw(
        'INSERT INTO mealFoods (food_id, meal_id, created_at) VALUES (?, ?, ?)',
        [18, 4, new Date]
      ),
      knex.raw(
        'INSERT INTO mealFoods (food_id, meal_id, created_at) VALUES (?, ?, ?)',
        [10, 4, new Date]
      )
    ]);
  });
};
