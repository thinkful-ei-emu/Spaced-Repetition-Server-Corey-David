const express = require('express');
const LanguageService = require('./language-service');
const { requireAuth } = require('../middleware/jwt-auth');

const languageRouter = express.Router();

languageRouter
  .use(requireAuth)
  .use(async (req, res, next) => {
    try {
      const language = await LanguageService.getUsersLanguage(
        req.app.get('db'),
        req.user.id,
      );

      if (!language)
        return res.status(404).json({
          error: 'You don\'t have any languages',
        });

      req.language = language;
      next();
    } catch (error) {
      next(error);
    }
  });

languageRouter
  .get('/', async (req, res, next) => {//returns all words that user is learning
    try {
      const words = await LanguageService.getLanguageWords(
        req.app.get('db'),
        req.language.id,
      );

      res.json({
        language: req.language,
        words,
      });
      next();
    } catch (error) {
      next(error);
    }
  });

languageRouter
  .get('/head', async (req, res, next) => {//? return current word user is learning?

    LanguageService.getNextWord(req.app.get('db'),req.user.id)
      .then(result=>{
        //todo check if valid response

        result.totalScore = result.wordCorrectCount + result.wordIncorrectCount;
        return res.status(200).json(result);

      }).catch(error=>next(error));
  });

languageRouter
  .post('/guess', async (req, res, next) => {//user submits a guess
    // implement me
    res.send('implement me!');
  });

module.exports = languageRouter;
