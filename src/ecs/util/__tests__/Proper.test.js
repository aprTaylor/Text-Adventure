import { getArticle, loadCustomNouns, getArticleInPlace, getToBe, getToBeInPlace } from '../Proper'
import chai from 'chai'
global.jestExpect = global.expect;
global.expect = chai.expect;


describe("Proper", () => {
    describe("getArticle", () => {
        it("returns proper article", () => {
            loadCustomNouns({"bear":'Singular'});
            let nouns = ["Bear", "Bears", "Amount", "Transmission", "Necklace", "Necklaces"];
            let nounArticles = ["a", "the", "an", "a", "a", "the"];
            nouns.forEach((noun, index) => expect(getArticle(noun)).to.equal(nounArticles[index]));
        }); 
        
        it("returns given noun", () => {
            let nouns = ["Bear", "Bears", "Amount", "Transmission", "Necklace", "Necklaces"];
            nouns.forEach((noun, index) => expect(getArticle(noun, true).noun).to.equal(noun));
        }); 
    });

    describe("getArticleInPlace", () => {
        it("returns sentenceFragment", () => {
            let nouns = ["Bear", "Bears", "Amount", "Transmission", "Necklace", "Necklaces"];
            let nounArticles = ["a", "the", "an", "a", "a", "the"];
            nouns.forEach((noun, index) => expect(getArticleInPlace(noun)).to.equal(nounArticles[index] + " " + noun));
        }); 
    });

    describe("getToBe", () => {
        it("returns proper article", () => {
            let nouns = ["Bear", "Bears", "Amount", "Transmission", "Necklace", "Necklaces"];
            let nounArticles = ["is", "are", "is", "is", "is", "are"];
            nouns.forEach((noun, index) => expect(getToBe(noun)).to.equal(nounArticles[index]))
        }); 

        it("returns proper article for pronoun", () => {
            let nouns = ["I", "You", "We", "They", "She", "He"];
            let nounArticles = ["am", "are", "are", "are", "is", "is"];
            nouns.forEach((noun, index) => expect(getToBe(noun)).to.equal(nounArticles[index]))
        }); 
        
        it("returns given noun", () => {
            let nouns = ["Bear", "Bears", "Amount", "Transmission", "Necklace", "Necklaces"];
            nouns.forEach((noun, index) => expect(getToBe(noun, true).noun).to.equal(noun));
        }); 
    });

    describe("getToBeInPlace", () => {
        it("returns sentenceFragment", () => {
            let nouns = ["Bear", "Bears", "Amount", "Transmission", "I", "We", "He"];
            let nounArticles = ["is", "are", "is", "is", "am", "are", "is"];
            nouns.forEach((noun, index) => expect(getToBeInPlace(noun)).to.equal(noun + " " + nounArticles[index]));
        }); 
    });


});