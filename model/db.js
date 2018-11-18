const MongoDB = require('mongodb');
const MongoClient = MongoDB.MongoClient;
const ObjectID = MongoDB.ObjectID;

const Config = require('./config.js');

class Db {

  static getInstance() {
    if (!Db.instance) {
      Db.instance = new Db();
    }
    return Db.instance;
  }

  constructor() {
    this.dbClient = '';
    this.connect();
  }

  connect() {
    let _that = this;
    return new Promise((resolve, reject) => {
      if (!_that.dbClient) {
        MongoClient.connect(Config.dbUrl, {useNewUrlParser: true}, (err, client) => {
          if (err) {
            reject(err)
          } else {
            _that.dbClient = client.db(Config.dbName);
            resolve(_that.dbClient)
          }
        })
      } else {
        resolve(_that.dbClient);
      }
    })
  }

  find(collectionName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
        let result = db.collection(collectionName).find(json);
        result.toArray(function (err, docs) {

          if (err) {
            reject(err);
            return;
          }
          resolve(docs);
        })

      })
    })
  }

  update(collectionName, json1, json2) {
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
        db.collection(collectionName).updateOne(json1, {
          $set: json2
        }, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        })

      })

    })

  }

  insert(collectionName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
        db.collection(collectionName).insertOne(json, (err, result) => {
          if (err) {
            reject(err);
          } else {
            resolve(result);
          }
        })
      })
    })
  }

  remove(collectionName, json) {
    return new Promise((resolve, reject) => {
      this.connect().then((db) => {
        db.collection(collectionName).removeOne(json, (err, result) => {
          if (err) {
            reject(err);
          } else {

            resolve(result);
          }
        })


      })
    })
  }

  getObjectId(id) {
    return new ObjectID(id);
  }
}


module.exports = Db.getInstance();
