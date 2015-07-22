'use strict';
/// <reference path="typings/node/node.d.ts"/>
module.exports = function(sequelize, DataTypes) {
  var usermessage = sequelize.define('usermessage', {
    no: {type : DataTypes.INTEGER.UNSIGNED,  primaryKey: true}
    , user : {type : DataTypes.INTEGER.UNSIGNED, defaultValue:0}
    , sender : {type : DataTypes.STRING(14)}
    , senderNo : {type : DataTypes.INTEGER.UNSIGNED, defaultValue:0}
    , msgType : {type : DataTypes.INTEGER(4).UNSIGNED, defaultValue:0}
    , amount : {type : DataTypes.INTEGER(6).UNSIGNED, defaultValue:0}
    , time : {type : DataTypes.INTEGER(10).UNSIGNED, defaultValue:0}
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
    , timestamps:false
  });
  return usermessage;
};