import Manager from "./Manager";

class DataManager extends Manager {
  async get(collection, name) {
    return this.database[collection]
               .findOne(name)
               .exec()
  } 
}

export default DataManager