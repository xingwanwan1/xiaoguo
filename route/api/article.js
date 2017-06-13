const db = require(process.cwd() + "/config/dbconnect")
module.exports = (req, res) => {
    var sql = `insert into article(name,content,num,time) values('${req.body.name}','${req.body.content}',0,'${req.body.time}')`
        // var sql = `insert into article(name,content,num) values('guang','xiayule',1)`
        console.log(sql)
    db.query(sql, (err, rows) => {
        console.log()
        if (rows.affectedRows >= 1) {
            var data = {
                msg: "插入成功",
                state: true
            }
            res.send(data)
        } else {
            var data = {
                msg: "插入失败",
                state: false
            }
            res.header("Access-Control-Allow-Origin", "*");
            res.send(data)
        }

    })
}