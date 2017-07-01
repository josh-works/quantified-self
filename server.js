var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var Foods = require('./lib/models/food')
var pry = require('pryjs')

app.set('port', process.env.PORT || 3000)
app.locals.title = 'Quantified Self'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//GET foods
app.get('/api/v1/foods', function(request, response) {
  Foods.findAll().then(function (data) {
    response.json(data.rows)
  })
})
// POST foods
app.post('/api/v1/foods', function(request, response) {
  var name = request.body.name
  var calories = request.body.calories
  // eval(pry.it)
  // console.log(name);
  // console.log(calories);
  Foods.createFoods(name, calories)
  .then(function(data){
    response.status(201).json({
          status: 'success',
          message: 'Inserted one food'
        })
  })
})

app.get('/api/v1/foods/:id', function (request, response) {
  var id = request.params.id
  Foods.find(id).then(function (data) {
      if (data.rowCount == 0) { return response.sendStatus(404) }
      response.json(data.rows[0])
    })

})

if(!module.parent) {
  app.listen(app.get('port'), function() {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`)
  })
}

module.exports = app
