var pry = require('pryjs')
var assert = require('chai').assert
var app = require('../server')
var request = require('request')
var Foods = require('../lib/models/food')
var Meals = require('../lib/models/meal')
var MealFoods = require('../lib/models/mealFood')

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

    describe("POST /foods", function(){

      beforeEach(function(done){
        Foods.createFoods("pizza", 155).then(function () { done() });
      })

      afterEach(function(done){
        Foods.resetFoods().then(function () { done() })
      })

      it("can create a new food object with properties", function(done){
        var food = {name: "banana", calories: 50}
        this.request.post('/api/v1/foods', {form: food}, function(error, response){
          // console.log(response.body)
          if(error) {done(error)}
          var parsedFood = JSON.parse(response.body)
          assert.equal(response.statusCode, 201)
          // assert.equal(Foods.countFoods(), 2)
          assert.equal(parsedFood.status, "success")
          assert.equal(parsedFood.message, 'Inserted one food')
          done()
        })
      })

      it("cannot create without both name and calories", function(done){
        var food = {name: "banana"}
        this.request.post('/api/v1/foods', {form: food}, function(error, response){
          if(error) {done(error)}

          var parsedFood = JSON.parse(response.body)
          assert.equal(response.statusCode, 422)
          done()
        })
      })
    })

    describe("PUT /foods/:id", function(){
      this.timeout(1000000)
      beforeEach(function(done){
        Foods.createFoods("pizza", 155).then(function () { done() });
      })

      afterEach(function(done){
        Foods.resetFoods().then(function () { done() })
      })

      it('should return 404 if food is not found', function (done) {
        var food = {name: "cheese pizza"}
        this.request.get('/api/v1/foods/10000', {food: food}, function (error, response) {
          if (error) { done(error) }
          assert.equal(response.statusCode, 404)
          done();
        })
      })

      it("can update existing food's name", function(done){
        var myRequest = this.request
        var food = {name: "cheese pizza"}
        Foods.find(1).then(function(data){
          var food2 = data.rows[0]
          // console.log(food2);
          myRequest.put("api/v1/foods/1", {form: food}, function(error, response){
            if (error) {done(error)}

            // var parsedFood = JSON.parse(response.body)
            assert.equal(response.statusCode, 202)
            Foods.find(1).then(function(data){
              var newFood2 = data.rows[0]
              // console.log(newFood2);
              assert.equal(food.name, newFood2.name)
              done()
            })
          })
        })
      })

      it("can update existing food's calories", function(done){
        var myRequest = this.request
        var food = {calories: "400"}
        Foods.find(1).then(function(data){
          var food2 = data.rows[0]
          // console.log(food2);
          myRequest.put("api/v1/foods/1", {form: food}, function(error, response){
            if (error) {done(error)}

            // var parsedFood = JSON.parse(response.body)
            assert.equal(response.statusCode, 202)
            Foods.find(1).then(function(data){
              var newFood2 = data.rows[0]
              // console.log(newFood2);
              assert.equal(food.calories, newFood2.calories)
              done()
            })
          })
        })
      })

      it("can update existing food's name and calories", function(done){
        var myRequest = this.request
        var food = {name: "cheese pizza", calories: 300}
        Foods.find(1).then(function(data){
          var food2 = data.rows[0]
          // console.log(food2);
          myRequest.put("api/v1/foods/1", {form: food}, function(error, response){
            if (error) {done(error)}

            // var parsedFood = JSON.parse(response.body)
            assert.equal(response.statusCode, 202)
            Foods.find(1).then(function(data){
              var newFood2 = data.rows[0]
              // console.log(newFood2);
              assert.equal(food.name, newFood2.name)
              assert.equal(food.calories, newFood2.calories)
              done()
            })
          })
        })
      })
    })
  })

  describe("DELETE /foods/:id", function(){
    // this.timeout(1000000)
    beforeEach(function(done){
      Foods.createFoods("pizza", 155).then(function () { done() });
    })

    afterEach(function(done){
      Foods.resetFoods().then(function () { done() })
    })

    it("should return 404 if food not found", function(done){
      this.request.delete('/api/v1/foods/1000', function(error, response){
        if(error){done(error)}
        assert.equal(response.statusCode, 404)
        done()
      })
    })

    it("should delete the food from the database", function(done){
      var myRequest = this.request
        Foods.findAll().then(function(data){
          var countBefore = data.rowCount

          myRequest.delete('/api/v1/foods/1', function(error, response){
            if(error){done(error)}

            assert.equal(response.statusCode, 200)

            Foods.findAll().then(function(data){
              var countAfter = data.rowCount

              assert.equal(countAfter, 0)
              done()
            })
          })

        })
      })

  })
  // meals
  describe("GET /meals", function(){
    this.timeout(1000000)
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
      this.request.get('/api/v1/meals', function(error, response){
        if(error) {done(error)}
        var parsedMeals = JSON.parse(response.body)

        assert.equal(response.statusCode, 200)
        assert.equal(parsedMeals[0].name, "breakfast")
        assert.equal(parsedMeals[0].total_calories, 300)
        assert.equal(parsedMeals[0].foods.length, 2)
        done()
      })
    })

    it("should return several meals", function (done) {
      const myRequest = this.request
      Meals.createMeals("lunch", 500).then(function() {
        Meals.addFood(2, 1).then(function () {
          myRequest.get('/api/v1/meals', function(error, response){
            if(error) {done(error)}
            var parsedMeals = JSON.parse(response.body)

            console.log(parsedMeals[0].name);
            assert.equal(parsedMeals.length, 2)
            assert.equal(parsedMeals[0].name, "breakfast")
            assert.equal(parsedMeals[1].name, "lunch")

            done()
          })
        })
      })
    })
  })


})
