# Spaced repetition API!

## endpoints
root `https://protected-ravine-87000.herokuapp.com/api/`
### AUTH
- `POST` /auth/token req`{username, password }` returns `{authToken: encodeToken}` used to login

### Language
- `POST` language/guess req `{guess}` returns   `{"nextWord", "wordCorrectCount","wordIncorrectCount","totalScore","answer","isCorrect"} `- make a guess and return if you were right or wrong as well as the next question

- `GET` language/head returns `{"nextWord", "wordCorrectCount","wordIncorrectCount","totalScore","test-answer-from-correct-guess","isCorrect"} `- returns current head

### User
- `POST` user/ req `{ password, username, name }` returns 201 code and location of user



# Deploying APP
1) Ensure that postgrator-cli is in dependencies so that migration will happen automatically
2) open control panel on HEROKU.COM and input all .env file varibles using heroku provided credentials

$heroku login
$heroku create
npm run deploy -deploy will automatically audit packages and run migration files