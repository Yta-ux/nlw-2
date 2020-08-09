const Database = require("./db.js")
const createProffy = require('./createProffy.js')

Database.then(async (database) => {
    // Inserir dados
    proffyValue = {
        name: "Diego Fernandes",
        avatar: "https://avatars2.githubusercontent.com/u/2254731?s=460&amp;u=0ba16a79456c2f250e7579cb388fa18c5c2d7d65&amp;v=4",
        whatsapp: "82999900695",
        bio:"Entusiasta das melhores tecnologias de química avançada.<br><br>Apaixonado por explodir coisas em laboratório e por mudar a vida das pessoas através de experiências. Mais de 200.000 pessoas já passaram por uma das minhas explosões.",
    }

    classValue = {
        subject: 1,
        cost:"20",
        // proffy id gerado pelo bd
    }

    classScheduleValues = [
        // class_id gerado pelo bd
        {
            weekday: 1,
            time_from: 720,
            time_to:1220
        },
        {
            weekday: 0,
            time_from: 520,
            time_to: 1220
        }
    ]

    // await createProffy(database, {proffyValue, classValue, classScheduleValues})

    // Consultar dados
    // Todos os proffys
    const selectedProffys = await database.all("SELECT * FROM proffys")
    // console.log(selectedProffys)

    // Consultar as tabelas proffys e classes
    // Unir as duas tabelas
    const selectClassesAndProffys = await database.all(`
        SELECT classes.*, proffys.*
        FROM proffys
        JOIN classes ON (classes.proffy_id = proffys.id)
        WHERE classes.proffy_id = 1;
    `)

    const selectClassesSchedules = await database.all(`
        SELECT class_schedule.*
        FROM class_schedule
        WHERE class_schedule.class_id = "1"
        AND class_schedule.weekday = "0"
        AND class_schedule.time_from <= "1300"
        AND class_schedule.time_to > "1300"
    `)
})