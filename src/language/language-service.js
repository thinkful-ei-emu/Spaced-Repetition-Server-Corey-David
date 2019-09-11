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
  getNextWord(db,user_id){
    return db('language')
      .innerJoin('word','language.head','word.id' )
      .select('original as nextWord','correct_count as wordCorrectCount', 'incorrect_count as wordIncorrectCount')
      .where('language.user_id',user_id).first();
  }
};

module.exports = LanguageService;
