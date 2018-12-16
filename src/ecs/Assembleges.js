import DisplayManager from "./components/Description";


export function Room (world, roomData, descriptionMap) {
    let entry = descriptionMap.intro?"intro":"standard";

    return world.createEntity()
    .addComponent(DisplayManager, descriptionMap, entry)
    .addTag('room')
} 