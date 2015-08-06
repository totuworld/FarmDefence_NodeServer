'use strict';

module.exports = function(sequelize, DataTypes) {
  var usercore = sequelize.define('usercore', {
    no: {type : DataTypes.INTEGER.UNSIGNED,  primaryKey: true}
    , id : {type : DataTypes.STRING(14)}
    , gems : {type : DataTypes.INTEGER(6).UNSIGNED, defaultValue:0}
    , coins : {type : DataTypes.INTEGER.UNSIGNED, defaultValue:0}
    , hearts : {type : DataTypes.INTEGER(4).UNSIGNED, defaultValue:0}
    , highScore : {type : DataTypes.INTEGER.UNSIGNED, defaultValue:0}
    , loginTime : {type : DataTypes.INTEGER(10).UNSIGNED, defaultValue:0}
  }, 
  {
    timestamps:false,
    tableName: 'usercore'
  });
  return usercore;
};