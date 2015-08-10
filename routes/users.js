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
  
  //하트가 5개 이하인 상태이고 10분이 지났으면 하트를 채운다.
  function FillHeartsAndUpdateLoginTime(userCore, callback) {
    var now = new Date();
    var updateOptions = {};
    updateOptions['loginTime'] = ToTimeString(now);
    
    if(userCore.hearts < 5) {
      var spendTime = now.getTime() - new Date(userCore.loginTime).getTime();
      var totalHeart = userCore.hearts + Math.floor(spendTime/ 600*1000 );
      if(totalHeart > 5) {
        totalHeart = 5;
      }
      if(userCore.hearts != totalHeart) {
        updateOptions['hearts'] = totalHeart;
        userCore.hearts = totalHeart;
      }
    }

    models.usercore
      .update(updateOptions, {where:{no:userCore.no}})
      .then(function(updateResults){
        userCore.loginTime = now.getTime()/1000; 
        callback(null, userCore.loginTime);
      });
  }
  
  //Date()를 YYYY-MM-DD hh:mm:ss 형태로 변경.
  function ToTimeString(date) {
    return date.getFullYear() + '-' + (date.getMonth()+1) + '-' + date.getDate() + ' ' 
      + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds(); 
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
      FillHeartsAndUpdateLoginTime(results[0], function(nowTime) {
        var returnObj = {
          farmdefence: {
            usercore: {
              'ID':results[0].id,
              'gems':results[0].gems,
              'coins':results[0].coins,
              'hearts':results[0].hearts,
              'highScore':results[0].highScore,
              'loginTime':results[0].loginTime,
              'serverTime':nowTime,
              'upgradeNo':results[1].upgradeNo,
              'attLv':results[1].attLv,
              'defLv':results[1].defLv,
              'moneyLv':results[1].moneyLv,
            }
          }
        };
        
        var xmlResult = xmlbuilder.create(returnObj).end({ pretty: true});
        res.set({'Content-type':'text/xml', 'charset':'UTF-8'});
        res.send(xmlResult);
      });
     
    }
  });
});



module.exports = router;