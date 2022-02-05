## User management API
## What does this PR do?
    A user can create an account.
    A user can login an account.
    Post a question
    Get questions.
    Get a specific question.
    Delete a question.
    Get an Answer to a question
## local host.
    http://127.0.0.1:5000
    Heroku https://edu-api-group2.herokuapp.com/
## End points.
#### POST /auth/signup
        http://127.0.0.1:5000/api/v1/auth/signup
        https://edu-api-group2.herokuapp.com/api/v1/auth/signup
#### POST /auth/login
        http://127.0.0.1:5000/api/v1/auth/login
        https://edu-api-group2.herokuapp.com/api/v1/auth/login
#### POST /questions 
        http://127.0.0.1:5000/api/v1/questions/
        https://edu-api-group2.herokuapp.com/api/v1/questions
#### GET /questions 
        http://127.0.0.1:5000/api/v1/questions
        https://edu-api-group2.herokuapp.com/api/v1/questions
#### GET /questions/<questionId>
        http://127.0.0.1:5000/api/v1/questions/:id
        https://edu-api-group2.herokuapp.com/api/v1/questions/:id
#### DELETE /questions/<questionId> 
        http://127.0.0.1:5000/api/v1/questions/:id
        https://edu-api-group2.herokuapp.com/api/v1/questions/:id
#### POST /questions/
    <questionId>/answers
