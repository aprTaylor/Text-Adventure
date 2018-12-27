import * as RxDB from 'rxdb';
import { room_schema, description_schema } from './schema';

const collections = [
  { name: 'rooms', schema: room_schema },
  { name: 'descriptions', schema: description_schema }
];

let dbPromise = null;

const _create = async () => {
  RxDB.plugin(require('pouchdb-adapter-idb'));

  const db = await RxDB.create(
    {name: "Apothecary Game", adapter: 'idb'}
  );

  // create collections
  await Promise.all(collections.map(colData => db.collection(colData)));
}

export const get = () => {
  if (!dbPromise)
    dbPromise = _create();
  return dbPromise;
}

export const fillDatabase = () => {
  const db = await get();

  //Do not re-initialize database
  if(await db.getLocal('initialized')) return false;

  //Data
  ['rooms', 'descriptions'].forEach(name => fill(name, db));
} 

const fill = (name, db) => {
  let data = require(`./data/${name}.json`);
  data.forEach(entity => db[name].insert(entity));
}
