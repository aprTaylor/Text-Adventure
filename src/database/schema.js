export const scene_schema = {
  version: 0,
  type: 'object',
  properties: {
    name: {
      type: 'string',
      primary: true
    },
    rooms: {
      type: 'array',
      'uniqueItems': true,
      ref: 'room',
      items: {type: 'string'},
    }
  }
}
export const room_schema = {
  version: 0,
  type: 'object',
  properties: {
    name: {
      type: 'string',
      primary: true
    },
    description: {type: 'string', ref: 'description'},
    exits: {
      type: 'object',
      properties: {
        N: {type: 'string', ref: 'room', "optional": true},
        E: {type: 'string', ref: 'room', "optional": true},
        S: {type: 'string', ref: 'room', "optional": true},
        W: {type: 'string', ref: 'room', "optional": true},
      }
    },
    flags: {
      type: 'object',
      properties: {
        hasEntered: {type: 'boolean', default: false}
      }
    }
  },
  required: ['description']
}

export const description_schema = {
  version: 0,
  type: 'object',
  properties: {
    name: {type: 'string', primary: true},
    text: {type: 'array', item: {type: 'string'}},
    next: {type: 'string', ref: 'description'}
  },
  required: ['text']
}