import  * as RxDB from 'rxdb';
import { scene_schema, room_schema, description_schema } from './schema';
import Database from './Database';

const collections = [
  { name: 'scene', schema: scene_schema },
  { name: 'room', schema: room_schema },
  { name: 'description', schema: description_schema }
];

let dbPromise = null;

/**
 * Create database and collections
 */
const _create = async () => {
  const db = new Database("apothecary_game", {
    adapter: {
      dev: {
        name: "memory",
        path: "pouchdb-adapter-memory"
      },
      prod: {
        name: "idb",
        path: "pouchdb-adapter-idb"
      }
    }
  })
  console.log('DatabaseService: creating database..');
    await db.create()
  console.log('DatabaseService: created database');

  return db;
}

/**
 * Get initialized database
 * @returns {RxDB.RxDatabase}
 */
export const get = async () => {
  if (!dbPromise)
    dbPromise = await _create();
  return dbPromise;
}

/**
 * Initializes and loads database
 * @returns {RxDB.RxDatabase}
 */
export const loadDatabase = async () => {
  const db = await get();

  //Do not re-initialize database
  if(await db.getLocal('initialized')) return db;

  //Data
  ['scene','room', 'description'].forEach(name => fill(name, db));

  //Do not re-init database
  await db.insertLocal('initialized', {isTrue: true})

  return db;
} 

const fill = (name, db) => {
  let data = require(`./data/${name}.json`);
  data.forEach(entity => db[name].insert(entity));
}
