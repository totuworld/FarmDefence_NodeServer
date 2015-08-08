'use strict';

module.exports = function(sequelize, DataTypes) {
  var usercore = sequelize.define('usercore', {
	  no : { type : Sequelize.INTEGER.UNSIGNED, primaryKey: true, autoIncrement: true}
	  , id : { type : Sequelize.STRING(14) }
	  , gems : { type : Sequelize.INTEGER(5).UNSIGNED, defaultValue: 0}
	  , coins : { type : Sequelize.INTEGER.UNSIGNED, defaultValue: 0}
	  , hearts : { type : Sequelize.INTEGER(3).UNSIGNED, defaultValue: 0}
	  , highScore : { type : Sequelize.INTEGER.UNSIGNED, defaultValue: 0}
	  , loginTime : { type : Sequelize.DATE, defaultValue: '2002-06-05 00:00:00'
		  , get:function(){var convertTime=new Date(this.getDataValue('loginTime')); return convertTime.getTime()/1000;}}
  }, {
	  timestamps: false,
	  tableName: 'usercore'
  });
  return usercore;
};