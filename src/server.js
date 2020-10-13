const {pageLanding, pageStudy, pageGiveClasses, saveClasses}  = require('./pages')
const express = require('express')
const server = express()
const nunjucks = require('nunjucks')

// configurando arquivo estático
server.use(express.urlencoded({ extended: true }))
server.use(express.static("public"))

// rotas do servidor
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.post("/save-classes", saveClasses)
.listen(3333)

// configurando nunjucks
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

