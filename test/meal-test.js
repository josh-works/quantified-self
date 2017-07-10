var Foods = require('../lib/models/food')
var app = require('../server')
var request = require('request')
var assert = require('chai').assert
var Foods = require('../lib/models/food')
var Meals = require('../lib/models/meal')
var MealFoods = require('../lib/models/mealFood')


describe('Meals', function(){
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

  describe("GET /:meal", function(){
    beforeEach(function(done){
      Meals.createMeals("breakfast", 300).then(function() {
        Foods.createFoods("apple", 50).then(function(){
          Foods.createFoods("banana", 500).then(function(){
            Meals.addFood(1, 1).then(function() {
              Meals.addFood(1, 2).then(function() { done()})
            })
          })
        })
      })
    })

    afterEach(function(done){
      Foods.resetFoods().then(function(){
        Meals.resetMeals().then(function() {
          MealFoods.resetMealFoods().then(function() { done()})
        })
      })
    })

    it("should return a single meal", function(done){
      this.request.get('/api/v1/breakfast', function(error, response){
        if(error) {done(error)}
        var parsedMeals = JSON.parse(response.body)

        assert.equal(response.statusCode, 200)
        assert.equal(parsedMeals.length, 2)
        done()
      })
    })

  })

  describe("PUT /:meal", function(){
    beforeEach(function(done){
      Meals.createMeals("breakfast", 300).then(function() {
        Foods.createFoods("apple", 50).then(function(){
          Foods.createFoods("banana", 500).then(function(){ done()})
        })
      })
    })

    afterEach(function(done){
      Foods.resetFoods().then(function(){
        Meals.resetMeals().then(function() {
          MealFoods.resetMealFoods().then(function() { done()})
        })
      })
    })

    it("should add a food to a single meal", function(done){
      var myRequest = this.request
      var food = {name: "banana"}
      myRequest.put('/api/v1/breakfast', {form: food}, function(error, response){
        if(error) {done(error)}

        assert.equal(response.statusCode, 202)
         Meals.foods("breakfast").then(function(data){
          var breakfastFoods = data.rows
          assert.equal(breakfastFoods.length, 1)
          done()
        })
      })
    })
  })


  describe('DELETE /:meal', function(){
    beforeEach(function(done){
      Meals.createMeals("breakfast", 300).then(function() {
        Foods.createFoods("apple", 50).then(function(){
          Foods.createFoods("banana", 500).then(function(){
            Meals.addFood(1, 1).then(function() {
              Meals.addFood(1, 2).then(function() { done()})
            })
          })
        })
      })
    })

    afterEach(function(done){
      Foods.resetFoods().then(function(){
        Meals.resetMeals().then(function() {
          MealFoods.resetMealFoods().then(function() { done()})
        })
      })
    })

    it('should remove food from given meal', function (done) {
      var myRequest = this.request
      Meals.foods("breakfast").then(function (data) {
        var count = data.rowCount

        myRequest.delete('/api/v1/breakfast?id=1', function(error, response) {
          if (error) {done(error)}
          Meals.foods("breakfast").then(function (data) {
            var newCount = data.rowCount
            assert.equal(newCount, 1)
            assert.equal(count, 2)
            done()
          })
        })
      })
    })
  })


})
