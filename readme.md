[Colleen Ward](https://github.com/caward12) and [Josh Thompson](https://github.com/josh-works) built a sweet calorie tracking application.

Front-end available live at

- https://caward12.github.io/quantified-self-frontend/
- https://github.com/caward12/quantified-self-frontend


# API documentation

This is the API endpoints for the backend of this quantified self application.

The backend is live on Heroku: https://quantified-self-backend.herokuapp.com/api/v1

View the repo: https://github.com/caward12/quantified-self


## Foods

`GET /foods`

Returns array of all active food objects, sorted in descending order based on `id`
```
[
  {
    id: 19,
    name: "burger",
    calories: 367,
    created_at: "2017-07-12T23:09:14.295Z",
    active: true
  },
  {
    id: 18,
    name: "popcorn",
    calories: 50,
    created_at: "2017-07-12T23:06:53.148Z",
    active: true
  }
]
```

`GET /foods/:id`

Returns specific food object

```
  {
    id: 18,
    name: "popcorn",
    calories: 50,
    created_at: "2017-07-12T23:06:53.148Z",
    active: false
  }
```



`POST /foods/`

Requires `name` and `calories` in body
```
{
  name: food_name,
  calories: food_calories
}
```
If successful, returns created `food` object and `202`



`PUT /foods/:id`

accepts `name` or `calories` in body, returns `202` if successful
{
  name: food_name,
  calories: food_calories
}

`DELETE /foods/:id`

Delete's specific food, if successful returns `200`


## Meals

`GET /:meal`

Returns foods associated with meal name. Responds to:

```
/breakfast
/lunch
/dinner
/snack
```

Returns list of food objects:

```
[
  {
    food_id: 6,
    food_name: "cheerios",
    food_calories: 190
  },
  {
    food_id: 1,
    food_name: "banana",
    food_calories: 55
  }
]
```

`PUT /:meal`

Requires existing food id in message body:

```
{
  id: 2
}
```

Adds food item to specified meal, returns `202` if successful.

`DELETE /:meal`

Requires existing food id in message body:
```
{
  id: 2
}
```

Removes food from specified meal. Returns `202` if successful.
