## Purpose

Learning JSON API is essential as it allows seamless communication and data exchange between different applications and systems in a standardized, efficient, and platform-independent manner.

## Concept

Suppose we have table, `users` and `posts` with structure:

```javascript
User {
  id: integer,
  name: string,
  email: string,
}
```

and

```javascript
POST {
  id: integer,
  title: string,
  article: text,
  userId: integer,
}
```

### Create

POST /posts

```JSON
{
  "data": {
    "type": "posts",
    "attributes": {
      "title": "test_title",
      "article": "test article"
    },
    "relationships": {
      "user": {
        "data": {
          "type": "users",
          "id": 2
        }
      }
    }
  }
}
```

and the response from server:

```JSON
{
  "data": {
    "type": "posts",
    "id": 442,
    "attributes": {
      "title": "test_title",
      "article": "test article",
    },
    "links": {
      "self": "https://test.example.com/posts/442"
    }
  }
}
```

### Read

* Get all posts with `GET /posts` and it returns
  ```JSON
  {
    "data": [
      {
        "type": "posts",
        "id": 442,
        "attributes": {
          "title": "test_title",
          "article": "test article",
          "created": "20xx-mm-dd"
        }
        "relationships": {
          "user": {
            "data": {
              "type": "users",
              "id": 2,
            }
          }
        }
      },
      ... // other data like above
    ]
  }
  ```
* Get posts along with user, `GET /posts?include=user` and it returns
  ```JSON
  {
    "data": [
      {
        "type": "posts",
        "id": 442,
        "attributes": {
          "title": "test_title",
          "article": "test article",
          "created": "20xx-mm-dd"
        },
        "relationships": {
          "user": {
            "data": {
              "type": "users",
              "id": 2,
            }
          }
        }
      },
      ... // other data like the first element of this array
    ],
    "included": [
      {
        "type": "users",
        "id": 2,
        "attributes": {
          "name": "test_name",
          "email": "test@example.com"
        }
      },
      ... // other data like the first element of this array
    ]
  }
  ```
* Specify the fields, `GET /posts?include=user&fields[users]=name`
  ```JSON
  {
    "data": [
      {
        "type": "posts",
        "id": 442,
        "attributes": {
          "title": "test_title",
          "article": "test article",
          "created": "20xx-mm-dd"
        },
        "relationships": {
          "user": {
            "data": {
              "type": "users",
              "id": 2,
            }
          }
        }
      },
      ... // other data like the first element of this array
    ],
    "included": [
      {
        "type": "users",
        "id": 2,
        "attributes": {
          "name": "test_name",
        }
      },
      ... // other data like the first element of this array
    ]
  }
  ```
* GET /posts/442
  ```JSON
  {
    "data": {
        "type": "posts",
        "id": 442,
        "attributes": {
          "title": "test_title",
          "article": "test article",
          "created": "20xx-mm-dd"
        },
        "relationships": {
          "user": {
            "data": {
              "type": "users",
              "id": 2,
            }
          }
        }
    }
  }
  ```

### Update

PATCH /posts/2

```JSON
{
  "data": {
    "type": "posts",
    "id": 442,
    "attributes": {
      "title": "new_title",
    },
  }
}
```

### Delete

DELETE /posts/2

No request body required

## Reference

[JSON API: Explained in 4 minutes (+ EXAMPLES)](https://www.youtube.com/watch?v=N-4prIh7t38)
