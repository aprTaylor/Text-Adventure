/**
 * Very simple state machine component that stores map of states to components
 * and current state.
 * @param {object} displayMap {...,stateName: Component}
 * @param {string} entryPoint stateName to start on
 */
export default function DisplayManager(displayMap, entryPoint) {
    this.map = displayMap;
    this.currentState = entryPoint;
}