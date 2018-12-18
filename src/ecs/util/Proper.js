import nlp from 'compromise'
/**
 * get the correct article of the first occurring noun in the given text
 * @param {string} text Can be a single noun or a a sentence 
 * @param {boolean} returnNoun flag to also return noun
 * @throws {NoNounError} Will throw an error if no noun is present
 */
export const getArticle = (text, returnNoun) => {
    let articles = nlp(text).nouns(0).articles();
    if(articles.length === 0 ) throw new NoNounError(text);
    return returnNoun?{article: articles[0].article, noun:articles[0].text}:articles[0].article;
}

/**
 * get the correct combo of noun and article
 * @param {string} text Can be a single noun or a a sentence 
 * @throws {NoNounError} Will throw an error if no noun is present
 */
export const getArticleInPlace = (text) => {
    let article = getArticle(text, true);
    return `${article.article} ${article.noun}`;
}



export class NoNounError extends Error {
    constructor(text) {
      super(`No noun was found in text: '${text}'`);
      this.name = "NoNounError";
    }
}