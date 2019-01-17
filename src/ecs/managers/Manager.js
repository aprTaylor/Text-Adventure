import {RxDatabase} from 'rxdb'
//jsDoc
import SceneManager from './SceneManger';

class Manager {
  /**
   * Has access to outside resources
   * @param {RxDatabase} database
   * @param {object} managers
   * @param {DataManager} managers.DataManager
   * @param {SceneManager} managers.SceneManager
   */
  constructor(managers, database, world) {
    this.managers = managers;
    this.database = database
    this.world = world;
  }
}

export default Manager