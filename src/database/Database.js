import PouchDB from 'pouchdb'
class Database {
  /** 
   * @param {object} config
   * @param {object} config.adapter
   * @param {{name: string, path: string}} config.adapter.dev
   * @param {{name: string, path: string}} config.adapter.prod
   * @param {[{singular: string, plural: string, relations: {}}]} config.schema
   * @param {boolean} config.autoCompact */
  constructor (name, config) {
    this.name = name;
    this.config = config;
    this.isDev = process.env.NODE_ENV === 'development';
  }

  loadPlugins() {
    PouchDB.plugin(require('relational-pouch'));
    PouchDB.plugin(require('pouchdb-find'));
    PouchDB.plugin(this.isDev?this.config.adapter.dev.path:this.config.adapter.prod.path);
  }

  async create() {
    this.loadPlugins();
    this.db = new PouchDB(this.name, {  auto_compaction: !!this.config.autoCompact,
                                        adapter: this.isDev?
                                                 this.config.adapter.dev.name:
                                                 this.config.adapter.prod.name});
    this.db.setSchema(this.config.schema);
    return this;
  }

  //TODO: load database
  async load() {
    return this;
  }
}

export default Database