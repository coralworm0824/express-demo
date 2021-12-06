var express = require('express');
var router = express.Router();
var user = require('../api/user.js');
//这个路由可以设置用户
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});
router.post('/userInfo', function(req, res, next) {
  user.getUserInfo(req, res, next)
})
router.post('/menuList', function(req, res, next) {
  user.menuList(req, res, next)
})

module.exports = router;
