const db = require(process.cwd() + "/config/dbconnect")
module.exports = (req, res) => {
    var sql = `select * from article `
        // var sql = `insert into article(name,content,num) values('guang','xiayule',1)`
    db.query(sql, (err, rows) => {
        console.log()
        if (rows.length > 0) {
            var data = {
                msg: "查询成功",
                state: true,
                data: rows
            }
            res.send(data)
        } else {
            var data = {
                msg: "查询失败",
                state: false

            }
            res.header("Access-Control-Allow-Origin", "*");
            res.send(data)
        }

    })
}