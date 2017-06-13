const index = require("./view/index")
const article = require("./api/article")
const back = require("./view/back")
const select = require("./api/select")
const detail = require("./view/detail")
const detailapi = require("./api/detail")

module.exports = (app) => {
    app.use("/index", index)
    app.use("/api/article", article)
    app.use("/api/select", select)
    app.use("/back", back)
    app.use("/detail", detail)
    app.use("/api/detail/:id", detailapi)
}