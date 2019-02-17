import Descriptions from './description'
const Rooms = 
{
  Field: { 
    exits: {
      E: "Forest",
      W: "Home"
    },
    description: Descriptions.field.intro
  },
  Forest: {
    exits: {
      W: "Home"
    },
    description: Descriptions.forest.standard
  },
  Home: {
    exits: {
      E: "Field"
    },
    description: Descriptions.home.standard
  }
}

export default Rooms;