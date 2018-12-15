import DisplayManager from "./components/displays/DisplayManager";


export function Room (world, roomData, descriptionMap) {
    let entry = descriptionMap.intro?"intro":"standard";

    return world.createEntity()
    .addComponent(DisplayManager, descriptionMap, entry)
    .addTag('room')
} 