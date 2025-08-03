# title

## Purpose

TBC

## Concept

### CRUDs

* Init
  * Install
    ```bash
    brew install postgresql
    ```
  * Start server
    ```bash
    brew services start postgresql
    ```
  * List services
    ```bash
    brew services list
    ```
  * Debug (You should try to do it)
    ```bash
    tail -n 50 /usr/local/var/log/postgresql@14.log
    ```
* Connect
  * Stepup for apps: In `~/pgpass.conf`, add the following and permissions set to 0600
    ```bash
    hostname:port:database:username:password
    ```
  * Terminal
    * input when we did not setup hostname, port, database, username, password
      ```bash
      psql -h <host> -p <port> -U <username> <database>
      ```
    * input when we already setup hostname, port, database, username, password
      ```bash
      psql postgres
      ```
  * Docker
    * [Docker]({{site.baseurl}}/docker/2022/01/09/docker.html#run)
    * Init
      ```bash
      docker run --name my_db \
          -e POSTGRESQL_PORT=5432 \
          -e POSTGRESQL_DB=my_db \
          -e POSTGRESQL_USER=postgres \
          -e POSTGRES_PASSWORD=test1234 \
          -d postgres
      ```
      * remember to create desired database first
      * remember to change desired `my_db`, `postgres` and `test1234`
  * remove process
    ```bash
    ps -ef | grep postmaster | grep -v grep | awk '{print $2}'
    kill <the_pid_you_just_got>
    ```
  * Show users
    ```bash
    \du
    ```
* Database
  * create
    ```bash
    CREATE DATABASE <database_name>;
    ```
  * Read
    * Show all databases  
      ```bash
      \l
      ```
    * Use database
      ```bash
      \c <database_name>;
      ```
  * Update
  * Destroy
    ```bash
    DROP DATABASE <database name>;
    ```
* Table
  * Create
    ```bash
    ```
  * Read
    * Show all tables
      ```bash
      \dt
      ```
* Record (row)
  * Create
    ```SQL
    -- general
    INSERT INTO table (variable1, variable2, variable3) VALUES (value1, value2, value3);
    
    -- example
    INSERT INTO users (username, password, email) VALUES ('john', '123456', 'john@example.com');
    ```
  * Read
    ```SQL
    -- general
    SELECT * FROM table WHERE variable1 = value1;
    
    -- example
    SELECT * FROM users WHERE username = 'john';
    ```
  * Update
    ```SQL
    -- general
    UPDATE table SET variable1 = value1 WHERE variable2 = value2;
    
    -- example
    UPDATE users SET password = '654321' WHERE username = 'john';
    ```
  * Destroy
    ```SQL
    -- general
    DELETE FROM table WHERE variable1 = value1;
    
    -- example
    DELETE FROM users WHERE username = 'john';
    ```

## Reference
