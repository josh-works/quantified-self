
exports.seed = function(knex, Promise) {
  return knex.raw('TRUNCATE meals RESTART IDENTITY')
  .then(function() {
    return Promise.all([
      knex.raw(
        'INSERT INTO meals (name, total_calories, created_at) VALUES (?, ?, ?)',
        ["breakfast", 400, new Date]
      ),
      knex.raw(
        'INSERT INTO meals (name, total_calories, created_at) VALUES (?, ?, ?)',
        ["lunch", 600, new Date]
      ),
      knex.raw(
        'INSERT INTO meals (name, total_calories, created_at) VALUES (?, ?, ?)',
        ["dinner", 800, new Date]
      ),
      knex.raw(
        'INSERT INTO meals (name, total_calories, created_at) VALUES (?, ?, ?)',
        ["snack", 200, new Date]
      )
    ]);
  });
};
