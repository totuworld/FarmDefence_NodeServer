/// <reference path="../typings/express/express.d.ts"/>
/// <reference path="../typings/async/async.d.ts"/>
var express = require('express');
var router = express.Router();

var models = require('../models');
var async = require('async');



/* POST 사용자 아이디를 등록할 때 사용한다. */
router.post('/add/:userID', function(req, res) {
  
  //아이디 중복 확인
  function CheckIsHaveID(callback) {
    models.usercore.find({where:{id:req.params.userID}})
    .then(function(findUserCoreData) {
      callback( !(findUserCoreData == null || findUserCoreData == undefined) );
    });
  }
  //아이디를 등록한다.
  function CreateAccount(callback) {
    models.usercore
    .create({id:req.parmas.userID, gems:20, coins:1000, hearts:5})
    .then(function(createdUserCore) {
      callback(null, createdUserCore.no);
    });
  }

  async.waterfall([
    CheckIsHaveID,
    CreateAccount
  ], function(err, usercore_id) {
    if(err) {
      //err:아이디가 중복되는 경우.
      res.send('exist');
    }
    else {
      //완료 결과 전송.
      res.send('done0'+usercore_id);
    }
  });
  
});



module.exports = router;