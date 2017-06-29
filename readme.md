## Quantified Self

### Setup instructions and notes


Start w/loading up dependencies:

`npm install`

create databases:

```shell
$ psql
CREATE DATABASE quantified_self;
CREATE DATABASE quantified_self_test;
```

run migrations, seed db:

```shell
knex migrate:latest
knex seed:run
```

Set up migrations to run the tests:

```shell
knex migrate:latest --env test
```

and run the tests!

```shell
npm test
```

### Josh

-


### Colleen

-
