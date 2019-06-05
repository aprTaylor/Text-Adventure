

class Manager {
  /**
   * Has access to outside resources
   * @param {RxDatabase} database
   * @param {object} managers
   * @param {DataManager} managers.DataManager
   * @param {SceneManager} managers.SceneManager
   */
  constructor(managers, world) {
    this.managers = managers;
    this.world = world;
  }
}

export default Manager