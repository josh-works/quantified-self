var express = require('express')
var app = express()

app.set('port', process.env.PORT || 3000)
app.locals.title = 'Quantified Self'
app.locals.foods = [
  {id: 1, name: "pizza", calories: 100},
  {id: 2, name: "banana", calories: 50}
]
app.get('/api/v1/foods', function(request, response) {
  response.json(app.locals.foods)
})

if(!module.parent) {
  app.listen(app.get('port'), function() {
    console.log(`${app.locals.title} is running on ${app.get('port')}.`)
  })
}

module.exports = app