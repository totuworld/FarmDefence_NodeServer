'use strict';

module.exports = function(sequelize, DataTypes) {
  var userupgrade = sequelize.define('userupgrade', {
    no: {type : DataTypes.INTEGER.UNSIGNED,  primaryKey: true}
    , attLv : {type : DataTypes.INTEGER(3).UNSIGNED, defaultValue:1}
    , defLv : {type : DataTypes.INTEGER(3).UNSIGNED, defaultValue:1}
    , moneyLv : {type : DataTypes.INTEGER(3).UNSIGNED, defaultValue:1}
  }, {
    timestamps:false,
    tableName: 'userupgrade'
  });
  return userupgrade;
};