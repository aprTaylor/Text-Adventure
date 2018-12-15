/**
 * Descriptions meant to be displayed sequentially, as in a book. 
 * 
 * @param {[string]} pages An array of descriptions
 */
export default function Flipbook(pages) {
    this.pages = pages;
    this.pageNum = -1;
    this.done = false;
}