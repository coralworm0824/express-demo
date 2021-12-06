var express = require('express');
var router = express.Router();
var poolConn = require('../api/poolConn');
var jsonWrite = poolConn.jsonWrite

var multer  = require('multer');
const { readFile } = require('fs');

var upload = multer({
  limits: {
    //限制文件大小100kb
    fileSize: 2*1024*1024,
    //限制文件数量
    files: 5
  },
  storage: multer.diskStorage({
    destination: function(req, file, cb){
      cb(null, 'upload_tmp/images')
    },
    filename: function(req, file, cb){
      var changeName = (new Date().getTime() + "-" + file.originalname)
      cb(null, changeName)
    }
  }),
  fileFilter: (req, file, cb) => {
    //限制文件上传类型，仅可上传png或jpg格式、文件大小2M以内的图片
    console.log("req-->", req.error)
    console.log("file-->", file)
    if(file.mimetype != 'image/png' && file.mimetype != 'image/jpeg') {
      req.error = "不允许上传" + file.mimetype + "类型的文件！";
      cb(null, false)
    }else {
      cb(null, true)
    }
  }
});

router.get('/test', function(req, res, next) {
  res.send('upload');
});

var singleUpload = upload.single('file');
router.post('/single',  function(req, res, next) {
  singleUpload(req, res, (err) => {
    console.log(req.file)
    if(!!err){
        console.log(err.message);
        jsonWrite(res, {
            code: 500,
            msg: err.message
        });
    }else{
        jsonWrite(res, {
            code: 200,
            type: 'single',
            fileName: req.file.filename,
            relativePath: req.file.path
        })
    }
  })           
});

var multerUpload = upload.array('multerFile');
router.post('/multer', function(req, res, next) {
  multerUpload(req, res, err => {
    if(!!err){
      console.log(err.message);
      jsonWrite(res, {
          code: 500,
          msg: err.message
      });
    }else{
      let fileList = []
        req.files.map(el => {
            fileList.push({
                fileName: el.originalname,
                relativePath: el.path
            })
        });
        jsonWrite(res, {
            code: 200,
            type: 'multer',
            fileList: fileList
        })
    }
  })
})


module.exports = router;
