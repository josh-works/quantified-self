var assert = require('chai').assert
var app = require('../server')
var request = require('request')

const environment = process.env.NODE_ENV || 'development';
const configuration = require('../knexfile')[environment];
const database = require('knex')(configuration);


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
        // do stuff here later
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

    describe('GET /foods/:id', function () {
      beforeEach(function(done){
        database.raw(`INSERT INTO foods (name, calories, created_at) VALUES (?, ?, ?)`,
          ["bananana", 100, new Date]).then(function () { done() });
      })

      afterEach(function(done){
        database.raw(`TRUNCATE foods RESTART IDENTITY`)
        .then(function () { done() })
      })

      it('should return 404 if resource is not found', function (done) {
        this.request.get('/api/v1/foods/10000', function (error, response) {
          if (error) { done(error) }
          assert.equal(response.statusCode, 404)
          done();
        })
      })
    })
  })

})
