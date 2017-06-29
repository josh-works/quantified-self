var pry = require('pryjs')
var assert = require('chai').assert
var app = require('../server')
var request = require('request')
var Foods = require('../lib/models/food')


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

      beforeEach(function(done){
        Foods.createFoods("pizza", 155).then(function () { done() });
      })

      afterEach(function(done){
        Foods.resetFoods().then(function () { done() })
      })

      it('should return list of foods', function (done) {
        this.request.get('/api/v1/foods', function (error, response) {
          if (error) {done(error)}
          var parsedFood = JSON.parse(response.body)

          assert.equal(response.statusCode, 200)
          assert.include(parsedFood[0].name, "pizza")
          assert.equal(parsedFood.length, 1)
          done()
        })
      })
    })

    describe('GET /foods/:id', function () {
      beforeEach(function(done){
        Foods.createFoods("pizza", 155).then(function () { done() });
      })

      afterEach(function(done){
        Foods.resetFoods().then(function () { done() })
      })

      it('should return 404 if resource is not found', function (done) {
        this.request.get('/api/v1/foods/10000', function (error, response) {
          if (error) { done(error) }
          assert.equal(response.statusCode, 404)
          done();
        })
      })

      it('should return id, name, calorie, created_at', function (done) {
          var myRequest = this.request
          Foods.findFirst().then(function (data) {
              var id = data.rows[0].id
              var name = data.rows[0].name
              var calories = data.rows[0].calories
              var created_at = data.rows[0].created_at
              myRequest.get('/api/v1/foods/' + id, function(error, response){
                if (error) { done(error) }

                var parsedFood = JSON.parse(response.body)
                assert.equal(parsedFood.id, id)
                assert.equal(parsedFood.name, name)
                assert.equal(parsedFood.calories, calories)
                assert.ok(parsedFood.created_at)
                done()
              })

            })
      })
    })

    desc
  })

})
