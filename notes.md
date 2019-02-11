Action -> 
    Click Exit (moveTo(location))
        * Load new Room entity (Room System)
        * Move Player to new room (Room System)(change presence location)
        * Process Descriptions (Description System)
        * Document Descriptions of everything seen (SightSystem)
    Output -> Room Description

Create a SceneManger
    A scene will be a section of the map 
    Certian exits can be given a loadNextScene component
    Loading a scene:
        load all rooms in scene
        load all exits in scene
        load all objects in scene