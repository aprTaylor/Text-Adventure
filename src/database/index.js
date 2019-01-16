import * as RxDB from 'rxdb';
import { scene_schema, room_schema, description_schema } from './schema';

const collections = [
  { name: 'scene', schema: scene_schema },
  { name: 'room', schema: room_schema },
  { name: 'description', schema: description_schema }
];

let dbPromise = null;

const _create = async () => {
  RxDB.plugin(require('pouchdb-adapter-idb'));

  console.log('DatabaseService: creating database..');
  const db = await RxDB.create(
    {name: "apothecary_game", adapter: 'idb'}
  );
  console.log('DatabaseService: created database');

  // create collections
  console.log('DatabaseService: create collections');
  await Promise.all(collections.map(colData => db.collection(colData)));

  return db;
}

export const get = async () => {
  if (!dbPromise)
    dbPromise = await _create();
  return dbPromise;
}

export const loadDatabase = async () => {
  const db = await get();
  console.log("DATABASE", db)
  //Do not re-initialize database
  if(process.env.NODE_ENV !== 'development')
    if(await db.getLocal('initialized')) return false;

  //Data
  ['scene','room', 'description'].forEach(name => fill(name, db));

  if(process.env.NODE_ENV !== 'development')
    //Do not re-init database
    await db.insertLocal('initialized', {isTrue: true})

  return db;
} 

const fill = (name, db) => {
  let data = require(`./data/${name}.json`);
  data.forEach(entity => db[name].insert(entity));
}
