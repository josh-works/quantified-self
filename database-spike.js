const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);


// database.raw(
//   `INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)`,
//   ["bananananana", 800, new Date]
// ).then( function () {
//   database.raw('SELECT * FROM foods')
//   .then( function(data) {
//     console.log(data.rows)
//     process.exit();
//   });
// });

// database.raw(
//   `INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)`,
//   ["bananananana", 800, new Date]
// ).then( function (data) {
//   console.log(data)
//   database.raw('SELECT * FROM foods ORDER BY created_at DESC LIMIT 1')
//   .then( function(data) {
//     console.log(data.rows)
//     process.exit();
//   });
// });

//  database.raw("SELECT * FROM foods;").then(function(data){
//    console.log("this is the count:" + data.rowCount);
//   process.exit();
//
// })

database.raw(`UPDATE foods SET name = ? WHERE id = ?;`, ["coffee", 3] )
  .then( function () {
    database.raw('SELECT * FROM foods')
    .then( function(data) {
      console.log(data.rows)
      process.exit();
    });
})
