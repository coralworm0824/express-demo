var sql={
	//增
	goodinsert:'INSERT INTO `good` (`name`,`desc`,`price`,`sum`,`link`,`image`,`status`,`isRecommend`, `create_dt`, `last_modify_dt`) VALUES(?,?,?,?,?,?,?,?,?,?)',
	//删
	gooddelete: 'delete from good where id=?',
	//改
	goodupdate:'UPDATE `good` SET `name`=?,`desc`=?,`price`=?,`sum`=?,`link`=?,`image`=?,`status`=?,`isRecommend`=?, `last_modify_dt`=? WHERE `id`=?',
    //查
    goodAll: 'select * from good',
    goodById: 'select * from good where id=?',
	goodBy: 'select * from good where id=? and name=?  order by last_modify_dt desc limit ?,?',
	//文档增
	docinsert:'INSERT INTO `doc` (`title`,`category`,`author`,`content`,`create_dt`,`last_modify_dt`) VALUES(?,?,?,?,?,?)',
	//文档删
	docdelete: 'delete from doc where id=?',
	//文档改
	docupdate:'UPDATE `doc` SET `title`=?,`category`=?,`author`=?,`content`=? WHERE `id`=?'
}

module.exports=sql;