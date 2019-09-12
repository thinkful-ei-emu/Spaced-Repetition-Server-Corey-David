const LanguageService = {
  getUsersLanguage(db, user_id) {
    return db
      .from('language')
      .select(
        'language.id',
        'language.name',
        'language.user_id',
        'language.head',
        'language.total_score',
      )
      .where('language.user_id', user_id)
      .first();
  },

  getLanguageWords(db, language_id) {
    return db
      .from('word')
      .select(
        'id',
        'language_id',
        'original',
        'translation',
        'next',
        'memory_value',
        'correct_count',
        'incorrect_count',
      )
      .where({ language_id });
  },
  getWordByOriginal(db,language_id,original){
    return db('word').select('*').where({original}).first();
  },
  getHeadWord(db,user_id){//returns word corrently set as head
    return db('language')
      .innerJoin('word','language.head','word.id' )
      .select('original as nextWord','translation as answer','correct_count as wordCorrectCount', 'incorrect_count as wordIncorrectCount')
      .where('language.user_id',user_id).first();
  },
  setHead(db,language_id,next_id){
    return db('language')
      .update('head',next_id).where('id',language_id);
  },
  setNextWord(db,word_id,next_id){
    return db('word').update('next',next_id).where('id',word_id);
  },
  getNextWord(db,startWordId){
    return db('word')
      .innerJoin('word as word2', 'word.next', 'word2.id')
      .select('*').where({'word.id':startWordId}).first();
  },
  updateWord(db,id,newWord){
    return db('word').update(newWord).where({id});
  }
};

module.exports = LanguageService;
