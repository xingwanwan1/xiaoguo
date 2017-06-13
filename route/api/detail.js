const db = require(process.cwd() + "/config/dbconnect")
module.exports = (req, res) => {
    var sql = "select * from article where id=" + req.params.id
    db.query(sql, (err, rows) => {
        res.send(rows[0])
    })

}