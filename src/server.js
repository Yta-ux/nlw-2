const proffys = [
    {
    name: "Diego Fernandes",
    avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
    whatsapp: "82999900695",
    bio:"Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
    subject:"Química",
    cost:"20",
    weekday: [0],
    time_form: [720],
    time_to:[1220]
    },
    {
        name: "Hugo Fernandes",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp: "82999900695",
        bio:"Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
        subject:"Química",
        cost:"20",
        weekday: [0],
        time_form: [720],
        time_to:[1220]
    }
]

const subjects = [

    "Artes",
    "Biologia",
    "Ciências",
    "Educação física",
    "Física",
    "Geografia",
    "História",
    "Filosofia",
    "Sociologia",
    "Matemática",
    "Português",
    "Química",
]

const weekdays = [

    "Domingo",
    "Segunda-feira",
    "Terça-feira",
    "Quarta-feira",
    "Quinta-feira",
    "Sexta-feira",
    "Sábado",
]

function getSubject(subjectNumber){
    const position = +subjectNumber -1
    return subjects[position]
}

function pageLanding(request, response){
    return response.render("index.html")
}

function pageStudy(request, response){
    const filters = request.query
    return response.render("study.html" , {proffys, filters, subjects, weekdays})
}

function pageGiveClasses(request, response){
    const data = request.query

    const isNotEmpty = Object.keys(data).length > 0

    if (isNotEmpty){
        data.subject = getSubject(data.subject)

        proffys.push(data)

        return response.redirect("/study")
    }
    
    return response.render("give-classes.html", {subjects, weekdays})
}

const express = require('express')
const server = express()
const nunjucks = require('nunjucks')

// configurando arquivo estático
server.use(express.static("public"))

// rotas do servidor
.get("/", pageLanding)
.get("/study", pageStudy)
.get("/give-classes", pageGiveClasses)
.listen(4400)

// configurando nunjucks
nunjucks.configure('src/views', {
    express: server,
    noCache: true,
})

