//实现与mysql交互
var mysql=require('mysql');
var $conf=require('../conf/db.js');
const { param } = require('../routes/index.js');
var $util=require('../util/util.js');
var $sql=require('./sql.js');
//使用连接池
var pool  = mysql.createPool($util.extend({}, $conf.mysql));

// 向前台返回JSON方法的简单封装
var jsonWrite = function (res, ret) {
	console.log(ret)
	if(typeof ret === 'undefined') {
		res.json({
			code:'500',
			msg: '操作失败'
		});
	} else {
		res.json(ret);
	}
};
module.exports = {
    pool,
    jsonWrite
}