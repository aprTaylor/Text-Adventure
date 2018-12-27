export const room_schema = {
  version: 0,
  type: 'object',
  properties: {
    name: {
      type: 'string',
      primary: true
    },
    description: {type: "string", ref: 'description'},
    exits: {
      type: 'object',
      properties: {
        N: {type: 'string', ref: 'room'},
        E: {type: 'string', ref: 'room'},
        S: {type: 'string', ref: 'room'},
        W: {type: 'string', ref: 'room'},
      }
    },
    flags: {
      type: 'object',
      properties: {
        hasEntered: {type: 'boolean', default: false}
      }
    }
  },
  required: ['descriptions']
}

export const description_schema = {
  version: 0,
  type: 'object',
  properties: {
    name: {type: 'string', primary: true},
    text: {type: 'string'},
    next: {type: 'string', ref: 'description'}
  },
  required: ['text']
}