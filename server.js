var express = require('express')
var app = express()
var Foods = require('./lib/models/food')


app.set('port', process.env.PORT || 3000)
app.locals.title = 'Quantified Self'


app.get('/api/v1/foods', function(request, response) {
  Foods.findAll().then(function (data) {
    response.json(data.rows)
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
