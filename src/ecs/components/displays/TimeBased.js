/**
 * The description displayed will depend on the in-game time.
 *
 * @param {object} times The map of time to description
 * @param {string} standard Any missing times will use this description
 */
export default function TimeBased(times, standard) {
    this.times = times;
    this.standard = standard;
}