const Database = require('./database/db')

const {subjects, weekdays, getSubject, convertHoursToMinutes} = require('./utils/format')

function pageLanding(request, response){
    return response.render("index.html")
}

async function pageStudy(request, response){
    const filters = request.query

    if (!filters.subject || !filters.weekday || !filters.time) {
        return response.render("study.html", {filters, subjects, weekdays})
    }

    // converter horas em minutos
    const timeToMinutes = convertHoursToMinutes(filters.time)

    const query =  `
    SELECT classes.*, proffys.*
    FROM proffys
    JOIN classes ON (classes.proffy_id = proffys.id)
    WHERE EXISTS(
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = classes.id
        AND class_schedule.weekday = ${filters.weekday}
        AND class_schedule.time_from <= ${timeToMinutes}
        AND class_schedule.time_to > ${timeToMinutes}
    )
    AND classes.subject = ${filters.subject}
    `

    // Erro na consulta
    try {
        const database = await Database
        const proffys = await database.all(query)

        proffys.map((proffy) => {
            proffy.subject = getSubject(proffy.subject)
        })

         return response.render("study.html", {proffys, subjects, filters , weekdays})
    } catch (error) {
        console.log(error)
    }
}

function pageGiveClasses(request, response){
    return response.render("give-classes.html", {subjects, weekdays})
}

async function saveClasses(request, response) {
    const createProffy = require("./database/createProffy")
    const data = request.body


    const proffyValue = {
        name: data.name,
        avatar: data.avatar,
        whatsapp: data.whatsapp,
        bio: data.bio
    }

    const classValue = {
        subject: data.subject,
        cost: data.cost
    }

    const classScheduleValues = data.weekday.map((weekday, index) => {
        return{
            weekday,
            time_from: convertHoursToMinutes( data.time_from[index]),
            time_to: convertHoursToMinutes( data.time_to[index])
        }
    })

    try {
        const database = await Database
        await createProffy(database, {proffyValue, classValue, classScheduleValues})
        
        let queryString = "?subject=" + data.subject
        queryString += "&weekday=" + data.weekday[0]
        queryString += "&time=" + data.time_from[0]

        return response.redirect("/study")
        
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    pageLanding,
    pageStudy,
    pageGiveClasses,
    saveClasses
}