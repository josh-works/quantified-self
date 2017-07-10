var express = require('express')
var cors = require('cors')
var app = express()
var bodyParser = require('body-parser')
var Foods = require('./lib/models/food')
var Meals = require('./lib/models/meal')
var pry = require('pryjs')
var cors = require('cors')


app.use(cors())
app.set('port', process.env.PORT || 3000);
app.locals.title = 'Quantified Self'

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function(request, response) {
  response.send('Welcome to the Quantified Self API')
})

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

  if (name && calories){
    return Foods.createFoods(name, calories)
    .then(function(data){
      response.status(201).json(data.rows[0])
      // json({
      //       status: 'success',
      //       message: 'Inserted one food'
      //     })
    })
  }else {
    return response.status(422).json({error: "You must have both name and calories"})
  }
})

app.get('/api/v1/foods/:id', function (request, response) {
  var id = request.params.id

  Foods.find(id).then(function (data) {
      if (data.rowCount == 0) { return response.sendStatus(404) }
      response.json(data.rows[0])
    })

})

// PUT foods/:id
app.put('/api/v1/foods/:id', function (request, response){
  var id = request.params.id
  var name = request.body.name
  var calories = Number(request.body.calories)
  // var calories = request.body.calories
  Foods.find(id).then(function(data){
    if (data.rowCount == 0) {return response.sendStatus(404)}
    Foods.update(id, name, calories).then(function (data){
      return response.sendStatus(202)
    })
  })
})
  // DELETE foods
  app.delete('/api/v1/foods/:id', function (request, response){
    var id = request.params.id

    Foods.find(id).then(function(data){
      if (data.rowCount ==0) {return response.sendStatus(404)}
      Foods.setInactive(id).then(function(data){
        return response.sendStatus(200)
      })
    })
  })

  // GET meals
  app.get('/api/v1/:meal', function(request, response){
    var meal_name = request.params.meal
    Meals.foods(meal_name).then(function(data){
      if (data.rowCount ==0) {return response.sendStatus(404)}
      response.json(data.rows)
    })
  })

  app.put('/api/v1/:meal', function(request, response){
    Meals.findByName(request.params.meal).then(function(data){
      var mealId = data.rows[0].id
      Foods.findByName(request.body.name).then(function(data){
        var foodId = data.rows[0].id
        Meals.addFood(mealId, foodId).then(function(data){
          return response.sendStatus(202)
        })
      })
    })
  })

  app.delete('/api/v1/:meal', function (request, response) {
    var foodId = request.query.id
    Meals.findByName(request.params.meal).then(function (data) {
      if (data.rowCount ==0) {return response.sendStatus(404)}

      var mealId = data.rows[0].id
      Meals.deleteFood(mealId, foodId).then(function (data) {
        return response.sendStatus(202)
      })
    })
  })


if(!module.parent) {
  app.listen(app.get('port'), function() {
    console.log(`${app.locals.title} is running.`)
  })
}

module.exports = app
