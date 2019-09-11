const express = require('express');
const LanguageService = require('./language-service');
const { requireAuth } = require('../middleware/jwt-auth');
const parser = express.json();
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
    
    LanguageService.getHeadWord(req.app.get('db'),req.user.id)
      .then(result=>{
        //todo check if valid response
        result.totalScore = result.wordCorrectCount + result.wordIncorrectCount;
        return res.status(200).json(result);

      }).catch(error=>next(error));
  });

languageRouter
  .post('/guess',parser, async (req, res, next) => {//user submits a guess
    let db = req.app.get('db');
    let {nextWord,wordCorrectCount,wordIncorrectCount,totalScore,answer,isCorrect} = req.body;
    //todo check if everything is there
    try{
      let currentWord = await LanguageService.getWordByOriginal(req.app.get('db'),req.language.id,nextWord);
      await LanguageService.setHead(req.app.get('db'),req.language.id,currentWord.next);

      if(isCorrect)
        currentWord.memory_value *= 2;
      else
        currentWord.memory_value = 1;

      let n = currentWord.id;
      let insert;
      debugger;
      for(let x = 0; x < currentWord.memory_value;x++){
        insert =  await LanguageService.getNextWord(db,n);
        n = insert.id;
      }
      currentWord.next = insert.next;
      insert.next = currentWord.id;
      await LanguageService.updateWord(db,currentWord.id,currentWord);
      await LanguageService.updateWord(db,insert.id,insert);
    }
    catch(err){
      next(err);
    }
    LanguageService.getHeadWord(req.app.get('db'),req.user.id)
      .then(result=>{
      //todo check if valid response
        result.totalScore = result.wordCorrectCount + result.wordIncorrectCount;
        return res.status(200).json(result);

      }).catch(error=>next(error));

    /*  {
      "nextWord": "test-next-word-from-correct-guess",
      "wordCorrectCount": 111,
      "wordIncorrectCount": 222,
      "totalScore": 333,
      "answer": "test-answer-from-correct-guess",
      "isCorrect": true
    } */
    

    //update head in lamg db to point to next

    //check if right
    //update values according to algorithm
    //send respons
  });

module.exports = languageRouter;
