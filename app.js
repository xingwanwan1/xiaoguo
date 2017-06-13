const express = require("express")
const app = express()
const ejs = require("ejs")
const path = require("path")
const bodyParser = require("body-parser")
const configRoute = require("./route/configRoute")


app.engine("html", ejs.__express)
app.set("view engine", "html")

app.set("views", path.join(__dirname, "/views"))


app.use(express.static(path.join(__dirname, "/public")))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//加载ueditor 模块
var ueditor = require("ueditor");
console.log(ueditor)
//使用模块
app.use("/common/UEditor/ue", ueditor(path.join(__dirname, 'public'), function(req, res, next) {
    // ueditor 客户发起上传图片请求
    if (req.query.action === 'uploadimage') {
        var foo = req.ueditor;

        var imgname = req.ueditor.filename;

        var img_url = '/images/ueditor/';
        res.ue_up(img_url); //你只要输入要保存的地址 。保存操作交给ueditor来做
        res.setHeader('Content-Type', 'text/html'); //IE8下载需要设置返回头尾text/html 不然json返回文件会被直接下载打开
    }
    //  客户端发起图片列表请求
    else if (req.query.action === 'listimage') {
        var dir_url = '/images/ueditor/';
        res.ue_list(dir_url); // 客户端会列出 dir_url 目录下的所有图片
    }
    // 客户端发起其它请求
    else {
        console.log('config.json')

        res.setHeader('Content-Type', 'application/json');
        res.redirect('/common/UEditor/jsp/config.json');
    }
}));

configRoute(app)
app.listen(9999)
