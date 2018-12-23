/**
 * Very simple state machine component that stores map of states to components
 * and current state.
 * @param {object} displayMap {...,stateName: {data: new type(), meta: {}}}
 * @param {string} entryPoint stateName to start on
 */
/*
export default function Description(displayMap, entryPoint) {
    this.map = displayMap;
    this.currentState = entryPoint;
    this.toDisplay;
}
*/

/**
 * 
 *
 * @export
 * @param {*} text
 */
export function Description(entity, text) {
    this.text = text;
}

export const types = {
    /**
     * As basic of a description as you can get. 
     * Displays the same description every time.
     * @param {string} standard Standard description
     */
    basic: (standard) => {
        this.standard = standard;
    },

    /**
     * Descriptions meant to be displayed sequentially, as in a book. 
     * 
     * @param {[string]} pages An array of descriptions
     */
    flipbook: (pages) => {
        this.pages = pages;
        this.pageNum = -1;
        this.done = false;
    },

    /**
     * This description is meant to be used once in the game.
     *
     * @param {string} desc
     */
    once: (desc) =>{
        this.standard = desc;
        this.viewed = false;
    },

    /**
     * The description displayed will depend on the in-game time.
     *
     * @param {object} times The map of time to description
     * @param {string} standard Any missing times will use this description
     */
    timebased(times, standard) {
        this.times = times;
        this.standard = standard;
    }
}