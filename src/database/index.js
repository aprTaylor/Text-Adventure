import  * as RxDB from 'rxdb';
import { scene_schema, room_schema, description_schema } from './schema';

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
  if(process.env.NODE_ENV === 'development')
    RxDB.plugin(require('pouchdb-adapter-memory'));
  else 
    RxDB.plugin(require('pouchdb-adapter-idb'));

  const adapter = process.env.NODE_ENV === 'development'?'memory':'idb'

  console.log('DatabaseService: creating database..');
  const db = await RxDB.create(
    {name: "apothecary_game", adapter: adapter}
  );
  console.log('DatabaseService: created database');

  // create collections
  console.log('DatabaseService: create collections');
  await Promise.all(collections.map(colData => db.collection(colData)));

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
