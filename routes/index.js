var express = require('express');
var router = express.Router();
//关联主程序
var goodlist = require('../api/goodlist.js');

/* GET home page. */
//进入主页面信息
router.get('/', function(req, res, next) {
  res.render('index', { title: '烟雨江南'});
});
//增、改
router.post('/goodsSave',function(req,res,next){
	goodlist.goodsSave(req,res,next);
});

//删
router.post('/goodsDel',function(req,res,next){
	goodlist.goodsDel(req,res,next);
});
router.post('/goodsListBy',function(req,res,next){
	goodlist.goodsListBy(req,res,next);
});
// 登录
router.post('/login',function(req,res,next){
	goodlist.login(req,res,next);
});

module.exports = router;
