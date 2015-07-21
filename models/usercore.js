'use strict';
/// <reference path="typings/node/node.d.ts"/>
module.exports = function(sequelize, DataTypes) {
  var usercore = sequelize.define('usercore', {
    no: {type : DataTypes.INTEGER.UNSIGNED,  primaryKey: true}
    , id : {type : DataTypes.STRING(14)}
    , gems : {type : DataTypes.INTEGER(5).UNSIGNED, defaultValue:0}
    , coins : {type : DataTypes.INTEGER.UNSIGNED, defaultValue:0}
    , hearts : {type : DataTypes.INTEGER(3).UNSIGNED, defaultValue:0}
    , highScore : {type : DataTypes.INTEGER.UNSIGNED, defaultValue:0}
    , loginTime : {type : DataTypes.INTEGER(10).UNSIGNED, defaultValue:0}
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return usercore;
};