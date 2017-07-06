
exports.up = function(knex, Promise) {
  let createColumn = `ALTER TABLE foods
    ADD active BOOLEAN NOT NULL DEFAULT true
    `;
  return knex.raw(createColumn);
};

exports.down = function(knex, Promise) {
  let createColumn = `ALTER TABLE foods
    DROP COLUMN active
  `;
  return knex.raw(createColumn);
};
