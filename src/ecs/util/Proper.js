import nlp from 'compromise'

export const loadCustomNouns = (nouns) => {
    nlp("", nouns);
}
/**
 * get the correct article of the first occurring noun in the given text
 * @param {string} text Can be a single noun or a a sentence 
 * @param {boolean} returnNoun flag to also return noun
 * @throws {NoNounError} Will throw an error if no noun is present
 */
export const getArticle = (text, returnNoun) => {
    let noun = getNoun(text, true);
    let article = noun.nlp.articles()[0].article;
    return returnNoun?{article: article, noun:noun.noun}
                     : article
}

/**
 * get the correct combo of noun and article
 * @param {string} text Can be a single noun or a a sentence 
 * @param {boolean=} excludePlural Avoid awkward sentences like 'There are the necklaces in here'
 * @throws {NoNounError} Will throw an error if no noun is present
 */
export const getArticleInPlace = (text, excludePlural = false) => {
    let article = getArticle(text, true);
    let innerArticle = article.article + " ";
    if(excludePlural && article.article === 'the') innerArticle = ""; 
    return `${innerArticle}${article.noun}`;
}

/**
 * 
 * @param {string} text 
 * @param {boolean} returnNoun 
 * @returns {boolean|{noun:string, isPlural:boolean}}
 */
export const getToBe = (text, returnNoun) => {
    let toBe;

    //Pronoun
    let pronouns = nlp(text).match('#pronoun').data();
    if(pronouns.length > 0){
        let pronoun = pronouns[0].text.toLowerCase();
        switch(pronoun){
            case "i"   : toBe = "am"; break;
            case "you" : 
            case "we"  :
            case "they":
                         toBe = "are"; break;
            default    : toBe = "is";  
        }
        return returnNoun?{noun:pronouns[0].text, toBe:toBe}:toBe;
    }

    //Noun
    let plural = isPlural(text, true);
    toBe = plural.isPlural?"are":"is"
    return returnNoun?{noun:plural.noun, toBe:toBe}:toBe;
}

export const getToBeInPlace = (text) => {
    let toBe = getToBe(text, true);
    return `${toBe.noun} ${toBe.toBe}`; 
}

/**
 * Returns whether the first noun is plural
 * @param {string} text 
 * @param {boolean} returnNoun 
 * @returns {boolean|{noun:string, isPlural:boolean}}
 */
export const isPlural = (text, returnNoun) => {
    let noun = getNoun(text, true);

    let plural = noun.nlp.isPlural().data().length;
    return returnNoun?{noun:noun.noun, isPlural:plural}:plural;    

}

/**
 * If there are multiple words, use context to get noun.
 * If it is one word, it is a noun if it is not a verb, adverb, or adjective.
 * @param {string} text Complete sentence or single word
 * @param {boolean} returnNLP  
 * @return {string|{noun:string, nlp:object}}
 */
export const getNoun = (text, returnNLP) => {
    let parse = nlp(text);

    let noun = parse.nouns(0).data();
    if(noun.length === 0) throw new NoNounError(text);
    return returnNLP?{noun:noun[0].text, nlp:parse.nouns(0)}:noun[0].text;
}



export class NoNounError extends Error {
    constructor(text) {
      super(`No noun was found in text: '${text}'`);
      this.name = "NoNounError";
    }
}