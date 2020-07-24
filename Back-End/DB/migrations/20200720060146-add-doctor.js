'use strict';

var dbm;
var type;
var seed;
var fs = require('fs');
var path = require('path');
var bcrypt =require( 'bcrypt');


/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};
/*
exports.up = function(db) {
  return db.createTable('doctor', {
    id_doctor: { type: 'int',autoIncrement:false, primaryKey: true },
    name: { type: 'string', notNull:true},
    password:  { type: 'string', notNull:true},
  }, ()=>{
    db.insert('doctor', ["id_doctor","name","password"], [201629338,'Daniel','123456789'])
    db.insert('doctor', ["id_doctor","name","password"], [201612345,'Felipe','123456789'])
    db.insert('doctor', ["id_doctor","name","password"], [201654321,'Steban','123456789'])
  });;
};
*/
exports.up = function(db, callback) {
  var filePath = path.join(__dirname + '/../psique.sql');
  fs.readFile(filePath, {encoding: 'utf-8'}, function(err,data){
    if (err) return console.log(err);
    db.runSql(data, async(err) =>{
      if (err) return console.log(err);
      else {
        var password = await bcrypt.hash('123456789', 12)
        console.log(password)
        db.insert('doctor', ["id_doctor","name","surname","password"], [201629338,'Daniel','Diaz',password])
        db.insert('doctor', ["id_doctor","name","surname","password"], [201612345,'Felipe','Gil',password])
        db.insert('doctor', ["id_doctor","name","surname","password"], [201654321,'Steban','Cadena',password])
      }
      callback();
    });
  });
};

exports.down = function(db) {
  return db.dropTable('assessment',()=>
  db.dropTable('doctor',()=>db.dropTable('patient')));
  
};

exports._meta = {
  "version": 1
};
