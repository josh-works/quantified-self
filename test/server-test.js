var assert = require('chai').assert
var app = require('../server')
var request = require('request')

describe('Server', function(){
  before(function(done){
    this.port = 9876
    this.server = app.listen(this.port, function(err, result){
      if (err) { return done(err)}
      done()
    })
    this.request = request.defaults({
      baseUrl: 'http://localhost:9876'
    })
  })

  after(function(){
    this.server.close()
  })

  it('should exist', function() {
    assert(app)
  })

  context('/api/v1', function(){
    describe('GET /foods', function () {
      beforeEach(function(){
        app.locals.foods = [
          {id: 1, name: "pizza", calories: 100},
          {id: 2, name: "banana", calories: 50}
        ]
      })
      it('should return list of foods', function (done) {
        this.request.get('/api/v1/foods', function (error, response) {
          if (error) {done(error)}
          assert.equal(response.statusCode, 200)
          assert.include(response.body, JSON.stringify(app.locals.foods))
          done()
        })
      })
    })
  })

})