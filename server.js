var express = require('express')
var app = express()
var bodyParser = require('body-parser')
var Foods = require('./lib/models/food')
var Meals = require('./lib/models/meal')
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

  if (name && calories){
    Foods.createFoods(name, calories)
    .then(function(data){
      response.status(201).json({
            status: 'success',
            message: 'Inserted one food'
          })
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
  var calories = request.body.calories
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
      Foods.destroy(id).then(function(data){
        return response.sendStatus(200)
      })
    })
  })

  // GET meals
  app.get('/api/v1/meals', function(request, response){
    Meals.findAll().then(function (data){
      var meals = data.rows
      meals.forEach(function(meal){
        // eval(pry.it)
        Meals.foods(meal.id).then(function(data){
          response.json({id: meal.id,
                        name: meal.name,
                        total_calories: meal.total_calories,
                        foods: data.rows})
        })
      })
    })
  })


if(!module.parent) {
  app.listen(app.get('port'), function() {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`)
  })
}

module.exports = app
