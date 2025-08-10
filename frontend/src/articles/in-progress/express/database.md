# Title

## Purpose

Set up a database and models for a node project using PG and Sequelize. The process involves creating a database, installing Sequelize, configuring it using a .sequelizerc file and a config.js file, generating a migration file for the models, and migrating the database.

## Concept

### Choose a database

I choose PG and please refer to [PG]({{site.baseurl}}/pg/2022/12/30/postgresql.html) for how to setup it with docker.

```bash
yarn add pg
```

### migration

Migration in database is necessary to manage and track changes in the structure and content of a database, such as adding or modifying tables, columns, or data. It allows for a more organized and controlled approach to database development, deployment, and maintenance.

#### Install Sequelize

```bash
yarn add --save sequelize
yarn add --dev sequelize-cli
```

#### configuration

* Use it in ES6 (reference: [Sequelize - run migration with es6 and modules](https://stackoverflow.com/questions/68304477/sequelize-run-migration-with-es6-and-modules))
  ```bash
  yarn add --dev babel-register
  ```
* Create `./.sequelizerc` with
  ```javascript
  require("babel-register");

  const path = require('path');

  module.exports = {
    config: path.resolve('./database', 'config.js'),
    'models-path': path.resolve('./models'),
    'seeders-path': path.resolve('./database/seeders'),
    'migrations-path': path.resolve('./database/migrations'),
  };
  ```
* Init to create `config`, `models`, `seeders` and `migrations` in `./database`
  ```bash
  sequelize init
  ```
  * It will create `config.js` and `model/index.js`
* In `config.js`
  ```javascript
  import 'dotenv/config';
  
  export default {
    development: {
        url: process.env.DEV_DATABASE_URL,
        dialect: 'postgres',
    },
    test: {
        url: process.env.TEST_DATABASE_URL,
        dialect: 'postgres',
    },
    production: {
        url: process.env.DATABASE_URL,
        dialect: 'postgres',
    },
  }
  ```
* In `.env`,
  ```bash
  DEV_DATABASE_URL=postgres://postgres:test1234@127.0.0.1:5432/my_db
  ```
  * remember to change `test1234`, `my_db` to what you desired

#### migration file

* Create model; for example, user
  ```bash
  sequelize model:generate --name user --attributes name:string,email:string,password:string
  ```
  * It will create `models/user.js` and `migrations/...create-user.js`
    * In `model/index.js`
      ```javascript
      'use strict';
    
      const dotenv = require('dotenv');
      dotenv.config();
      
      const Sequelize = require('sequelize');
      
      let sequelize
      if (process.env.NODE_ENV === 'development') {
        sequelize = new Sequelize(process.env.DEV_DATABASE_URL)
      } else if (process.env.NODE_ENV === 'test') {
        sequelize = new Sequelize(process.env.TEST_DATABASE_URL)
      } else {
        sequelize = new Sequelize(process.env.DATABASE_URL)
      }
      
      module.exports = sequelize;
      ```
    * In `model/user.js`
      ```javascript
      'use strict';

      import Sequelize from 'sequelize';
      import sequelize from './index.js';
      
      const user = sequelize.define('user', {
        email: {
          type: Sequelize.STRING,
        },
        password: {
          type: Sequelize.STRING
        }
      })
      
      export default user
      ```
* run migration to create tables
  ```bash
  npx sequelize-cli db:migrate
  ```
* Add column, for example, I want to add column, purpose to tasks table
  * In terminal, to create migration file
    ```bash
    npx sequelize-cli migration:generate --name add-purpose-to-tasks
    ```
  * A migration file created and input as follow
    ```bash
    module.exports = {
      up: async (queryInterface, Sequelize) => {
        await queryInterface.addColumn('YourModelNameHere', 'purpose', {
          type: Sequelize.STRING,
          allowNull: false,
          defaultValue: ''
        });
      },

      down: async (queryInterface, Sequelize) => {
        await queryInterface.removeColumn('YourModelNameHere', 'purpose');
      }
    };
    ```
  * Update model for column, purpose
    ```javascript
    'use strict';

    import Sequelize from 'sequelize';
    import sequelize from './index.js';

    const task = sequelize.define('task', {
      project: {
        type: Sequelize.STRING,
      },
      purpose: {
        type: Sequelize.STRING,
      },
      spec: {
        type: Sequelize.TEXT
      },
      price: {
        type: Sequelize.FLOAT
      }
    })
    
    export default task
    ```

#### Migrate

migrate with

```bash
sequelize db:migrate
```

or add script to migrate both test and development

```JSON
"scripts": {
  "migrate:dev": "NODE_ENV=development npx sequelize-cli db:migrate",
  "migrate:test": "NODE_ENV=test npx sequelize-cli db:migrate"
}
```

#### rollback

* all
  ```bash
  npx sequelize-cli db:migrate:undo:all --to XXXXXXXXXXXXXX-create-posts.js
  ```
* last one
  ```bash
  npx sequelize-cli db:migrate:undo
  ```

or add script to migrate both test and development

```JSON
"scripts": {
  "rollback:dev": "NODE_ENV=development npx sequelize-cli db:migrate:undo",
  "rollback:all:dev": "NODE_ENV=development npx sequelize-cli db:migrate:undo:all",
  "rollback:to:dev": "NODE_ENV=development npx sequelize-cli db:migrate:undo:all --to"
}
```

### match test database with development

```JSON
"scripts": {
  "migrate:test": "NODE_ENV=test npx sequelize-cli db:drop && NODE_ENV=test npx sequelize-cli db:create && NODE_ENV=test npx sequelize-cli db:migrate",
}
```

### Populate data

Say I want to create data in users table

In, `fixtures/users.json`

```JSON
[
  {
    "model": "User",
    "data": {
      "username": "devuser",
      "email": "dev@example.com"
    }
  }
]
```

```javascript
// Populate data
const SequelizeFixtures = require('sequelize-fixtures');

SequelizeFixtures.loadFiles([
  'fixtures/users.json',
], models).then(() => {
  console.log('Data populated successfully');
}).catch((error) => {
  console.error('Error populating data:', error);
});
```

## What?

* blog

## Reference

[DB-Migrate Simplified – How to Generate PosgreSQL Database From Node.js](https://www.kindsonthegenius.com/db-migrate-simplified-how-to-generate-posgresql-database-from-node-js/)

[透過 sequelize 來達成 DB Schema Migration](https://hackmd.io/@TSMI_E7ORNeP8YBbWm-lFA/ryCtaVW_M?print-pdf)

[Use Sequelize ORM with PostgreSQL in Your Express Project](https://blog.devgenius.io/use-sequelize-orm-with-postgresql-in-your-express-project-3c277b289522)

[How to easily create a Postgres database in Docker](https://dev.to/andre347/how-to-easily-create-a-postgres-database-in-docker-4moj)

[Resolving 'Must use import to load ES Module' error while using Sequelize ORM and ES6 syntax in Node.js"](https://dev.to/emekaofe/resolving-must-use-import-to-load-es-module-error-while-using-sequelize-orm-and-es6-syntax-in-nodejs-1o2c)
