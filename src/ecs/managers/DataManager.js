import Manager from "./Manager";
import Rooms from '../../data/room'

class DataManager extends Manager {
  getRooms()  {
    return Rooms;
  }
}

export default DataManager