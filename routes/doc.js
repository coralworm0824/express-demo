var express = require('express');
var router = express.Router();
//关联主程序
var docList = require('../api/docList.js');


//增、改
router.post('/docSave',function(req,res,next){
	docList.docSave(req,res,next);
});

//删
router.post('/docDel',function(req,res,next){
	docList.docDel(req,res,next);
});
router.post('/docListBy',function(req,res,next){
	docList.docListBy(req,res,next);
});


module.exports = router;
