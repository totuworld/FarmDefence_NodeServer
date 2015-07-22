'use strict';
/// <reference path="typings/node/node.d.ts"/>
module.exports = function(sequelize, DataTypes) {
  var userupgrade = sequelize.define('userupgrade', {
    no: {type : DataTypes.INTEGER.UNSIGNED,  primaryKey: true}
    , user : {type : DataTypes.INTEGER.UNSIGNED, defaultValue:0}
    , attLv : {type : DataTypes.INTEGER(3).UNSIGNED, defaultValue:1}
    , defLv : {type : DataTypes.INTEGER(3).UNSIGNED, defaultValue:1}
    , moneyLv : {type : DataTypes.INTEGER(3).UNSIGNED, defaultValue:1}
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return userupgrade;
};