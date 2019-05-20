class IO {
  constructor(state) {
    this.state = state;
  }
  /**
   * @param {String} action Name of action to take
   * @memberof IO
   */
  takeAction = (action) => {
      this.state.events.actions[action] = true;
  }

  /**
   * @param {String} event Name of event to trigger
   * @param {any=} data relevant event data
   * @memberof IO
   */
  triggerEvent = (event, data) => {
      this.state.events[event] = data;
  }

  getState() {
      return Object.assign({}, this.state);
  }
}

export default IO



