'use strict';
/// <reference path="typings/node/node.d.ts"/>
module.exports = function(sequelize, DataTypes) {
  var useritem = sequelize.define('useritem', {
    no: {type : DataTypes.INTEGER.UNSIGNED,  primaryKey: true}
    , user : {type : DataTypes.INTEGER.UNSIGNED, defaultValue:0}
    , itemNo : {type : DataTypes.INTEGER(4).UNSIGNED, defaultValue:1}
    , amount : {type : DataTypes.INTEGER(4).UNSIGNED, defaultValue:0}
    , use : {type : DataTypes.BOOLEAN, defaultValue:false}
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
    , timestamps:false
  });
  return useritem;
};