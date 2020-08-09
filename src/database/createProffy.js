module.exports = async function(database, {proffyValue, classValue, classScheduleValues}) {
    // inserir dados no proffys
    const insertedProffy = await database.run(`
        INSERT INTO proffys (
            name, 
            avatar,
            whatsapp,
            bio
        ) VALUES (
            "${proffyValue.name}",
            "${proffyValue.avatar}",
            "${proffyValue.whatsapp}",
            "${proffyValue.bio}"
        );
    `)

    const proffy_id = insertedProffy.lastID

    // inserir dados no classes
    const insertedClass = await database.run(`
            INSERT INTO classes (
                subject,
                cost,
                proffy_id
            ) VALUES (
                "${classValue.subject}",
                "${classValue.cost}",
                "${proffy_id}"
            );
    `)

    const class_id = insertedClass.lastID

    // inserir dados no classSchedule
     insertedAllClassScheduleValues= classScheduleValues.map((classScheduleValue) => {
        return database.run(`
            INSERT INTO class_schedule (
                class_id,
                weekday,
                time_from,
                time_to

            ) VALUES (
                "${class_id}",
                "${classScheduleValue.weekday}",
                "${classScheduleValue.time_from}",
                "${classScheduleValue.time_to}"
            );
        `)
    })

    // Executar as runs da class_schedules
    await Promise.all(insertedAllClassScheduleValues)
}