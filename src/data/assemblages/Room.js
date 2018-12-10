//Depends
import CES from 'ces';
//Components
import {Description} from '../components/descriptive'

let 
export const Room = (desc) => {
    let room = new CES.Entity();
    room.addComponent(new Description(desc));
    return room;
}
