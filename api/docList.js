// import { pool, jsonWrite } from './poolConn'
var conn = require('./poolConn')
var $sql = require('./sql')
var $util=require('../util/util.js');
var pool = conn.pool
var jsonWrite = conn.jsonWrite


module.exports = {
	//增加、更新商品
	docSave: function (req, res, next) {
		pool.getConnection(function(err, connection) {
			// 获取前台页面传过来的参数
			var param = req.body;
			var currentTime = $util.dateFormat0(new Date(), "yyyy-MM-dd hh:mm:ss")
			// 建立连接，向表中插入值
			let sql = ""
			sql = param.id ? $sql.docupdate : $sql.docinsert
			let paramArr = [param.title, param.category,param.author,param.content]
			let dtArr = param.id ? [currentTime, param.id] : [currentTime, currentTime]
			let valList = paramArr.concat(dtArr)
			// 'INSERT INTO user(id, name, age) VALUES(0,?,?)',
			// update by id
        	// 为了简单，要求同时传name和age两个参数
			console.log(valList)
			connection.query(sql, valList, function(err, result) {
				if(result) {
					console.log('result-->', result)
					result = {
						code: 200,
						msg:'保存成功'
					};    
				}
 
				// 以json形式，把操作结果返回给前台页面
				jsonWrite(res, result);
 
				// 释放连接 
				connection.release();
			});
		});
	},
    docDel: function (req, res, next) {
        // delete by Id
        pool.getConnection(function(err, connection) {
            var id = +req.body.id;
            connection.query($sql.docdelete, id, function(err, result) {
                if(result.affectedRows > 0) {
                    result = {
                        code: 200,
                        msg:'删除成功'
                    };
                } else {
                    result = void 0;
                }
                jsonWrite(res, result);
                connection.release();
            });
        });
    },
    /**
	 * 查询文档列表
	 * @param {} id 
	 * @param {*} name 
	 * @returns 
	 */
    docListBy: function (req, res, next) {
        // var id = +req.body.id; // 为了拼凑正确的sql语句，这里要转下整数
		let {id, pageNo, pageSize, title, category} = req.body
		let obj = {id: "文档id", pageNo: "pageNo", pageSize: "pageSize", title:"标题"}
		if(Object.prototype.toString.call(+pageNo) != '[object Number]'){
			jsonWrite(res, `${obj['pageNo']}不正确！`, false)
			return
		}
		if(Object.prototype.toString.call(+pageSize) != '[object Number]'){
			jsonWrite(res, `${obj['pageSize']}不正确！`, false)
			return
		}
		let offset = (+pageNo - 1) * (+pageSize)
		let limit = +pageSize
		let where = ''
		let tempArr = []
		let paramArr = []
		let valArr = []
		
		if(id) {
			tempArr.push('id = ?')
			paramArr.push(id)
		} else if(title) {
			tempArr.push(`title like "%"?"%"`)
			paramArr.push(title)
		} else if(category) {
			tempArr.push('category = ?')
			paramArr.push(category)
		}
		console.log(tempArr)
		if(tempArr.length == 1){
			where = 'where ' + tempArr[0]
		}else if(tempArr.length > 1){
			where = 'where ' + tempArr.join(' and ')
		}
		valArr = paramArr.concat([offset, limit])
		let sql = `select * from doc  ${where} ORDER BY last_modify_dt DESC limit ?,?`
		let sqlCount = `select count(1) count from doc ${where}`
		console.log(sql,valArr, sqlCount)
		pool.getConnection(function(err, connection) {
			connection.query(sqlCount, paramArr, function(err, result){
				console.log(paramArr)
				console.log('result-->',result)
				total = (result && result.length) > 0 ? result[0].count : 0
				connection.query(sql, valArr, function(err, result) {
					jsonWrite(res, {
						body: {
							data: result,
							total: total
						},
						code: 200,
						msg: "success"
					});
					connection.release();
				})
			});
		});
    }
};