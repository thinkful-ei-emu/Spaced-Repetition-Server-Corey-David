# Spaced repetition API!

## endpoints
root https://protected-ravine-87000.herokuapp.com/api/
### AUTH
- `POST` /auth/token req`{username, password }` returns `{authToken: encodeToken}` used to login

### Language
- `POST` language/guess req `{guess}` returns   `{"nextWord": "test-next-word-from-correct-guess", "wordCorrectCount":111,"wordIncorrectCount": 222,"totalScore": 333,"answer":"test-answer-from-correct-guess","isCorrect": true} `- make a gusee and return the wether u were right or wrong aswell as next question

- `GET` language/head returns `{"nextWord": "test-next-word-from-correct-guess", "wordCorrectCount":111,"wordIncorrectCount": 222,"totalScore": 333,"answer":"test-answer-from-correct-guess","isCorrect": true} `- returns current head

### User
- `POST` user/ req `{ password, username, name }` returns 201 code and location of user



# Deploying APP
1) Ensure that postgrator-cli is in dependecies so that migration will happen automatically
2) open control panel on HEROKU.COM and input all .env file varibles using heroku provided credintials

$heroku login
$heroku create
npm run deploy -deploy will automatically audit packages and run migration files

