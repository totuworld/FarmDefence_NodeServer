/// <reference path="../typings/express/express.d.ts"/>
/// <reference path="../typings/async/async.d.ts"/>
var express = require('express');
var router = express.Router();

var models = require('../models');
var async = require('async');
var xmlbuilder = require('xmlbuilder');



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
  //userupgrade테이블에 업그레이드 기록할 행을 추가한다.
  function CreateUserUpgradeRow(no, callback) {
    models.userupgrade.create({no:no})
    .then(function(createdUserUpgrade) {
      callback(null, no);
    });
  }

  async.waterfall([
    CheckIsHaveID,
    CreateAccount,
    CreateUserUpgradeRow
  ], function(err, usercore_no) {
    if(err) {
      //err:아이디가 중복되는 경우.
      res.send('exist');
    }
    else {
      //완료 결과 전송.
      res.send('done0'+usercore_no);
    }
  });
  
});


/* GET 사용자의 기본 정보를 로딩한다 */
router.get('/get/:no', function(req, res) {
  //usercore 데이터 로딩
  function GetUserCore(callback) {
    models.usercore.find({where:{no:req.params.no}})
    .then(function(findUserCore) {
      //사용자  정보가 있는지 확인
      if(findUserCore == null || findUserCore == undefined) {
        //err:존재하지 않는 사용자
        callback(true);
        return;
      }
      
      //정상적인 콜백.
      callback(null, findUserCore);
    });
  }
  
  //userupgrade 데이터 로딩
  function GetUserUpgrade(callback) {
    models.userupgrade.find({where:{no:req.params.no}})
    .then(function(findUserUpgrade) {
      //정보가 있는지 확인
      if(findUserUpgrade == null || findUserUpgrade == undefined) {
        //err:존재하지 않는 정보
        callback(true);
        return;
      }
      
      //정상적인 콜백.
      callback(null, findUserUpgrade);
    });
  }
  
  async.parallel([
    GetUserCore,
    GetUserUpgrade
  ], function(err, results) {
    if(err) {
      //err:사용자 정보가 존재하지 않는 경우.
      res.send('none0');
    }
    else {
      //TODO: 전송할 결과 생성.
    }
  });
});



module.exports = router;