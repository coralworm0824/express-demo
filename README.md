# nodejs服务端开发（Express+Mysql） #
## 项目展示 ##

1、github地址：

```

	git clone https://github.com/coralworm0824/express-demo.git
```

2、再导入express.sql到数据库，数据库名test，表名：good,doc, user 结构如下



3、直接run：npm start就能使用了！

```

	npm start

```

3、最好自己重新建一遍，才能更好适配自己的需求！下面有详细步骤
## 项目开发 ##
### 1、官网下载 nodejs（带npm包管理器）和 git； ###
### 2、使用git，通过npm包管理器，安装express 和express种子生成器（express-generator 生成目录文件）； ###

```

	//express
	cnpm i	express -g

	//express-generator
	npm install express-generator -g

	//生成项目文件
	express nodeproject

```

/bin: 用于应用启动

/public: 静态资源目录

/routes：可以认为是controller（控制器）目录

/views: jade模板目录，可以认为是view(视图)目录

/api: 接口实现目录

app.js 程序main文件

目录结构


### 3、启动express项目 ###

```
	npm start

```

通过localhost就可以访问了

### 4、新建mysql建表 ###
路由信息新建一个conf文件夹，再新建db.js
表名：test
（可以将本项目的express.sql导入在mysql数据库中）


###解决问题###
1、解决跨域问题（在app.js里面添加）
```
	//设置跨域访问
	app.all('*', function(req, res, next) {
	    res.header("Access-Control-Allow-Origin", "*");//*表示允许的域名地址，本地则为'http://localhost' 
	    res.header("Access-Control-Allow-Headers", "X-Requested-With");
	    res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
	    res.header("X-Powered-By",' 3.2.1')
	    res.header("Content-Type", "application/json;charset=utf-8");
	    next();
	});
```	

2、拼凑sql语句

	var id = +req.query.id; // 为了拼凑正确的sql语句，这里要转下整数
